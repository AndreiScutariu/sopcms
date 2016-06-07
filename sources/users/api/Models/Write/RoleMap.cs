namespace api.Models.Write
{
    public class RoleMap : BaseEntityMap<Role>
    {
        public RoleMap()
        {
            Map(x => x.Name);
            References(x => x.User);
        }
    }
}