using System.Collections.Generic;

namespace api.Models.Write
{
    public class User : BaseEntity
    {
        public virtual string Name { get; set; }

        public virtual string Email { get; set; }

        public virtual string Password { get; set; }
        
        public virtual string Website { get; set; }
        
        public virtual string Location { get; set; }

        public virtual IList<Role> Roles { get; set; }

        public virtual IList<Token> Tokens { get; set; }
    }
}