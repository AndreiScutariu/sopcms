using System.Net;
using System.Net.Http;
using System.Web.Http;
using api.Attributes;
using api.Models.Api;
using api.Repository.Dao;

namespace api.Controllers
{
    [RunInTransaction]
    public class TokenController : BaseApiController
    {
        [HttpPost]
        public HttpResponseMessage CreateToken([FromBody] CreateTokenModel model)
        {
            return HandleRequest(() =>
            {
                var userDao = new UserDao();
                var createdModel = userDao.GenerateToken(model);
                return Request.CreateResponse(HttpStatusCode.Created, createdModel);
            });
        }

        [HttpGet]
        public HttpResponseMessage IsValidToken(string id)
        {
            return HandleRequest(() =>
            {
                var token = id;
                var userDao = new UserDao();
                userDao.IsValid(token);
                return Request.CreateResponse(HttpStatusCode.OK, "Valid");
            });
        }

        [HttpDelete]
        public HttpResponseMessage Destroy(string id)
        {
            return HandleRequest(() => Request.CreateResponse(HttpStatusCode.OK));
        }
    }
}