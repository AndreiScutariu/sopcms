using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using api.Attributes;
using api.Models.Api;
using api.Repository.Dao;

namespace api.Controllers
{
    [RunInTransaction]
    public class UsersController : BaseApiController
    {
        [HttpGet]
        public HttpResponseMessage Get()
        {
            return HandleRequest(() =>
            {
                var userDao = new UserDao();
                var users = userDao.AllUsers;
                return Request.CreateResponse(HttpStatusCode.Found, users);
            });
        } 

        [HttpGet]
        public HttpResponseMessage GetUser(Guid id)
        {
            return HandleRequest(() =>
            {
                var userDao = new UserDao();
                var user = userDao.GetById(id);
                return Request.CreateResponse(HttpStatusCode.Found, user);
            });
        }

        [HttpGet]
        public HttpResponseMessage GetUser([FromUri] string email)
        {
            return HandleRequest(() =>
            {
                var userDao = new UserDao();
                var user = userDao.GetByEmail(email);
                return Request.CreateResponse(HttpStatusCode.Found, user);
            });
        }

        [HttpPost]
        public HttpResponseMessage SaveUser([FromBody] CreateUserModel model)
        {
            return HandleRequest(() =>
            {
                var userDao = new UserDao();
                var id = userDao.Save(model);
                return Request.CreateResponse(HttpStatusCode.Created, userDao.GetById(id));
            });
        }
        
        [HttpPut]
        public HttpResponseMessage UpdateUser(Guid id, [FromBody] UpdateUserModel userModel)
        {
            return HandleRequest(() =>
            {
                var userDao = new UserDao();
                userDao.Update(id, userModel);
                var updatedUser = userDao.GetById(id);
                return Request.CreateResponse(HttpStatusCode.Created, updatedUser);
            });
        }

        [HttpDelete]
        public HttpResponseMessage DeleteUser(Guid id)
        {
            return HandleRequest(() =>
            {
                var userDao = new UserDao();
                userDao.Delete(id);
                return Request.CreateResponse(HttpStatusCode.OK);
            });
        }
    }
}