using System;
using System.Collections;
using System.Linq;
using api.Exceptions;
using api.Models.Api;
using api.Models.Write;
using NHibernate;
using Token = api.Models.Read.Token;

namespace api.Repository.Dao
{
    public class UserDao : BaseDao
    {
        private readonly IQueryOver<User, User> _userQuery;

        public IEnumerable AllUsers
        {
            get
            {
                var userList = _userQuery.List();

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

        public UserDao()
        {
            _userQuery = Session.QueryOver<User>();
        }

        public Token GenerateToken(CreateTokenModel model)
        {
            var userEntity =
                _userQuery
                    .Where(x => x.Email == model.Email && x.Password == model.Password)
                    .SingleOrDefault();

            if (userEntity == null)
                throw new ResourceNotFoundException();

            var token = new Models.Write.Token
            {
                User = userEntity,
                ExpireTime = DateTime.Now.AddMinutes(60),
                GeneratedToken = $"{new Guid()}{new Guid()}"
            };

            Session.Save(token);

            return new Token
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

        public Guid Save(CreateUserModel model)
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

        public void Update(Guid id, UpdateUserModel userModelModelUserModel) => HandleUserAction(id, user =>
        {
            user.Email = userModelModelUserModel.Email;
            user.Location = userModelModelUserModel.Location;
            user.Website = userModelModelUserModel.Website;
            user.Name = userModelModelUserModel.Name;

            Session.Save(user);
        });

        public void Delete(Guid id) => HandleUserAction(id, user => Session.Delete(user));

        #region private handlers

        private void HandleUserAction(Guid id, Action<User> action)
        {
            var user = _userQuery.Where(x => x.Id == id).SingleOrDefault();

            if (user == null)
            {
                throw new ResourceNotFoundException();
            }

            action(user);
        }

        #endregion
    }
}