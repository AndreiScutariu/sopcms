namespace api.Models.Write
{
    public class TokenMap : BaseEntityMap<Token>
    {
        public TokenMap()
        {
            Map(x => x.GeneratedToken);
            Map(x => x.ExpireTime);
            Map(x => x.IsRejected);
            References(x => x.User);
        }
    }
}