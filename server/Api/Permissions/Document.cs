using System.Security.AccessControl;

namespace chancies.Api.Permissions
{
    public class Document
        : BaseCrudPermission
    {
        private const string EntityName = "document";

        public const string Create = EntityName + ":" + CreatePermission;
        public const string Read = EntityName + ":" + ReadPermission;
        public const string Update = EntityName + ":" + UpdatePermission;
        public const string Delete = EntityName + ":" + DeletePermission;
    }
}
