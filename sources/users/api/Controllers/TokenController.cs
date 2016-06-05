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
        public HttpResponseMessage IsValidToken(string token)
        {
            return null;
        }
    }
}