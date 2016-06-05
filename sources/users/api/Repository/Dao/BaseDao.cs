using api.Repository.Config;
using NHibernate;

namespace api.Repository.Dao
{
    public class BaseDao
    {
        protected ISession Session => NHibernateConfig.SessionFactory.GetCurrentSession();
    }
}