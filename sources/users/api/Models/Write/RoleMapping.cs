namespace api.Models.Write
{
    public class RoleMapping : BaseEntityMapping<Role>
    {
        public RoleMapping()
        {
            Map(x => x.Name);
            References(x => x.User);
        }
    }
}