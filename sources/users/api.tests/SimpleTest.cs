using api.Repository.Config;
using NUnit.Framework;

namespace api.tests
{
    [TestFixture]
    public class SimpleTest
    {
        [Test]
        public void CreateDb()
        {
            NHibernateConfig.SessionFactory.OpenSession();
        }
    }
}