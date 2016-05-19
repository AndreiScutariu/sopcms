using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using api.Exceptions;
using api.Models.Api;
using api.Models.Write;
using NHibernate;

namespace api.Repository.Dao
{
    public class UserDao : BaseDao<User>
    {
        private readonly IQueryOver<User, User> _userQuery;

        public UserDao()
        {
            _userQuery = Session.QueryOver<User>();
        }

        public IEnumerable AllUsers
        {
            get
            {
                var userList = _userQuery.List();

                if (userList == null || userList.Count == 0)
                {
                    throw new ResourceNotFoundException();
                }

                return userList.Select(user => new Models.Read.User
                {
                    Id = user.Id,
                    Email = user.Email,
                    Name = user.Name,
                    Password = user.Password,
                    Location = user.Location,
                    Website = user.Website
                });
            }
        }

        public Models.Read.Token GenerateToken(CreateToken model)
        {
            var userEntity =
                _userQuery
                    .Where(x => x.Email == model.Email && x.Password == model.Password)
                    .SingleOrDefault();

            if (userEntity == null)
                throw new ResourceNotFoundException();

            var token = new Token
            {
                User = userEntity,
                ExpireTime = DateTime.Now.AddMinutes(60),
                GeneratedToken = string.Format("{0}{1}", new Guid(), new Guid())
            };

            Session.Save(token);

            return new Models.Read.Token
            {
                GeneratedToken = token.GeneratedToken,
                ExpireIn = (token.ExpireTime - DateTime.Now).Minutes
            };
        }

        public Models.Read.User GetByEmail(string email)
        {
            var existingUser = _userQuery.Where(x => x.Email == email).SingleOrDefault();

            if (existingUser == null)
            {
                throw new ResourceNotFoundException();
            }

            return new Models.Read.User
            {
                Id = existingUser.Id,
                Email = existingUser.Email,
                Name = existingUser.Name,
                Password = existingUser.Password
            };
        }

        public Models.Read.User GetById(Guid id)
        {
            var existingUser = _userQuery.Where(x => x.Id == id).SingleOrDefault();

            if (existingUser == null)
            {
                throw new ResourceNotFoundException();
            }

            return new Models.Read.User
            {
                Id = existingUser.Id,
                Email = existingUser.Email,
                Name = existingUser.Name,
                Password = existingUser.Password,
                Location = existingUser.Location,
                Website = existingUser.Website
            };
        }

        public Guid Save(CreateUser model)
        {
            var existingUser = _userQuery.Where(x => x.Email == model.Email).SingleOrDefault();

            if (existingUser != null)
            {
                throw new ResourceAlreadyExistException();
            }

            var user = new User
            {
                Email = model.Email,
                Password = model.Password
            };

            Session.Save(user);

            return user.Id;
        }

        public void Update(Guid id, UpdateUser user)
        {
            var existingUser = _userQuery.Where(x => x.Id == id).SingleOrDefault();

            if (existingUser == null)
            {
                throw new ResourceNotFoundException();
            }

            existingUser.Email = user.Email;
            existingUser.Location = user.Location;
            existingUser.Website = user.Website;
            existingUser.Name = user.Name;

            Session.Save(existingUser);
        }

        public void Delete(Guid id)
        {
            var existingUser = _userQuery.Where(x => x.Id == id).SingleOrDefault();

            if (existingUser == null)
            {
                throw new ResourceNotFoundException();
            }

            Session.Delete(existingUser);
        }
    }
}