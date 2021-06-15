using System.Collections.Generic;
using System.Security.Claims;
using chancies.Auth.Config;
using chancies.Auth.Policies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace chancies.Auth.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddChanciesAuthentication(this IServiceCollection self, IList<string> permissions)
        {
            var provider = self.BuildServiceProvider();
            var config = provider.GetService<IOptions<Auth0Config>>().Value;

            self
                .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.Authority = config.Domain;
                    options.Audience = config.Audience;

                    // If the access token does not have a `sub` claim, `User.Identity.Name` will be `null`. Map it to a different claim by setting the NameClaimType below.
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        NameClaimType = ClaimTypes.NameIdentifier
                    };
                });

            return self.AddPolicies(config.Domain, permissions);
        }

        public static IApplicationBuilder UseChanciesAuthentication(this IApplicationBuilder self)
        {
            return self
                .UseAuthentication()
                .UseAuthorization();
        }

        private static IServiceCollection AddPolicies(this IServiceCollection self, string domain, IList<string> scopes)
        {
            return self.AddAuthorization(options =>
            {
                foreach (var scope in scopes)
                {
                    options.AddPolicy(scope, policy => policy.Requirements.Add(new HasPermissionRequirement(scope, domain)));
                }
            })
            .AddSingleton<IAuthorizationHandler, HasPermissionHandler>();
        }
    }
}
