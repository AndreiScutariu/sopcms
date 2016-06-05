namespace api.Models.Write
{
    public class UserMapping : BaseEntityMapping<User>
    {
        public UserMapping()
        {
            Map(x => x.Name);
            Map(x => x.Password);
            Map(x => x.Location);
            Map(x => x.Website);
            Map(x => x.Email);
            HasMany(x => x.Roles);
            HasMany(x => x.Tokens);
        }
    }
}