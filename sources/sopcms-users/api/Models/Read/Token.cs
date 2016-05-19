namespace api.Models.Read
{
    public class Token
    {
        public string GeneratedToken { get; set; }
        
        public int ExpireIn { get; set; }
    }
}