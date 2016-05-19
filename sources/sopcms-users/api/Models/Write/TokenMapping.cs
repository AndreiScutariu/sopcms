namespace api.Models.Write
{
    public class TokenMapping : BaseEntityMapping<Token>
    {
        public TokenMapping()
        {
            Map(x => x.GeneratedToken);
            Map(x => x.ExpireTime);
            References(x => x.User);
        }
    }
}