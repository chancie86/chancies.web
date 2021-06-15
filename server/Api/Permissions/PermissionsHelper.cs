using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace chancies.Api.Permissions
{
    internal static class PermissionsHelper
    {
        public static IList<string> GetPermissions()
        {
            var types = Assembly.GetExecutingAssembly().GetTypes()
                .Where(t =>
                    t.Namespace == "chancies.Api.Permissions"
                        && t.IsClass
                        && !t.IsAbstract
                        && t.IsPublic
                );

            var permissions = new List<string>();

            foreach (var t in types)
            {
                var fields = t.GetFields(BindingFlags.Public | BindingFlags.Static)
                    .Where(p => p.FieldType == typeof(string));

                permissions.AddRange(fields.Select(p => p.GetValue(null).ToString()));
            }

            return permissions;
        }
    }
}
