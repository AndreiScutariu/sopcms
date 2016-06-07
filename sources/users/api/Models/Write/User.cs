using System;
using System.Collections.Generic;
using FluentNHibernate.Utils;

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

        public virtual void RejectExistingTokens() 
            => Tokens.Each(t => t.IsRejected = true);

        public virtual Token GenerateNewToken()
            => new Token
            {
                User = this,
                ExpireTime = DateTime.Now.AddMinutes(60),
                GeneratedToken = $"{Guid.NewGuid()}{Guid.NewGuid()}"
            };
    }
}