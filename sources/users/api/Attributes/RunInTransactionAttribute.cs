using System.Web.Http.Controllers;
using System.Web.Http.Filters;
using api.Repository.Config;
using NHibernate;
using NHibernate.Context;

namespace api.Attributes
{
    public class RunInTransactionAttribute : ActionFilterAttribute
    {
        public RunInTransactionAttribute()
        {
            SessionFactory = NHibernateConfig.SessionFactory;
        }

        private ISessionFactory SessionFactory { get; set; }

        public override void OnActionExecuting(HttpActionContext actionContext)
        {
            var session = SessionFactory.OpenSession();
            CurrentSessionContext.Bind(session);
            session.BeginTransaction();
        }

        public override void OnActionExecuted(HttpActionExecutedContext actionExecutedContext)
        {
            var session = SessionFactory.GetCurrentSession();
            var transaction = session.Transaction;
            if (transaction != null && transaction.IsActive)
            {
                transaction.Commit();
            }
            session = CurrentSessionContext.Unbind(SessionFactory);
            session.Close();
        }
    }
}