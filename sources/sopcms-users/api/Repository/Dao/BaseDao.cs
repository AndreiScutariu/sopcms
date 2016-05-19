using api.Models.Write;
using api.Repository.Config;
using NHibernate;

namespace api.Repository.Dao
{
    public class BaseDao<T> where T: BaseEntity
    {
        protected ISession Session
        {
            get { return NHibernateConfig.SessionFactory.GetCurrentSession(); }
        }
    }
}