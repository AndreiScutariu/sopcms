using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using api.Exceptions;

namespace api.Controllers
{
    public class BaseApiController : ApiController
    {
        protected HttpResponseMessage HandleRequest(Func<HttpResponseMessage> action)
        {
            HttpResponseMessage response;
            try
            {
                response = action();
            }
            catch (ResourceAlreadyExistException)
            {
                response = Request.CreateResponse(HttpStatusCode.Found, "");
            }
            catch (ResourceNotFoundException)
            {
                response = Request.CreateResponse(HttpStatusCode.NotFound, "");
            }
            return response;
        }
    }
}