using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace chancies.Auth.Policies
{
    public class HasPermissionHandler : AuthorizationHandler<HasPermissionRequirement>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, HasPermissionRequirement requirement)
        {
            const string permissionsKey = "permissions";

            if (!context.User.HasClaim(c => c.Type == permissionsKey && c.Issuer == requirement.Issuer))
            {
                // User does not have the scope claim
                return Task.CompletedTask;
            }

            // Split the permissions string into an array
            var permissions = context.User.FindAll(c => c.Type == permissionsKey && c.Issuer == requirement.Issuer);

            // Succeed if the scope array contains the required scope
            if (permissions.Any(claim => claim.Value == requirement.Permission))
            {
                context.Succeed(requirement);
            }

            return Task.CompletedTask;
        }
    }
}
