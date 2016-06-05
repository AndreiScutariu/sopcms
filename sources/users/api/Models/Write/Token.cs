using System;

namespace api.Models.Write
{
    public class Token : BaseEntity
    {
        public virtual string GeneratedToken { get; set; }
        
        public virtual DateTime ExpireTime { get; set; }

        public virtual User User { get; set; }
    }
}