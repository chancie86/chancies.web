using System;
using Microsoft.AspNetCore.Authorization;

namespace chancies.Auth.Policies
{
    public class HasPermissionRequirement : IAuthorizationRequirement
    {
        public string Issuer { get; }
        public string Permission { get; }

        public HasPermissionRequirement(string permission, string issuer)
        {
            Permission = permission ?? throw new ArgumentNullException(nameof(permission));
            Issuer = issuer ?? throw new ArgumentNullException(nameof(issuer));
        }
    }
}
