namespace chancies.Api.Permissions
{
    public class Section
        : BaseCrudPermission
    {
        private const string EntityName = "section";

        public const string Create = EntityName + ":" + CreatePermission;
        public const string Update = EntityName + ":" + UpdatePermission;
        public const string Delete = EntityName + ":" + DeletePermission;
    }
}
