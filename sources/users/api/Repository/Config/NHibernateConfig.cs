using System;
using api.Models.Write;
using api.Repository.Convensions;
using FluentNHibernate.Automapping;
using FluentNHibernate.Cfg;
using FluentNHibernate.Cfg.Db;
using NHibernate;
using NHibernate.Tool.hbm2ddl;

namespace api.Repository.Config
{
    public class NHibernateConfig : System.Web.HttpApplication
    {
        private const string ConnectionString =
            @"Data Source=.;Initial Catalog=SopCms;Integrated Security=true";

        private static ISessionFactory _sessionFactory;

        public static ISessionFactory SessionFactory
        {
            get
            {
                if (_sessionFactory == null)
                    InitializeSessionFactory();

                return _sessionFactory;
            }
        }

        private static void InitializeSessionFactory()
        {
            _sessionFactory = Fluently.Configure()
                .Database(MsSqlConfiguration.MsSql2012.ShowSql().ConnectionString(ConnectionString))
                .CurrentSessionContext("web")
                .Mappings(m =>
                {
                    m.AutoMappings.Add(
                        () =>
                            new AutoPersistenceModel().Conventions.Add(new ForeignKeyNameConvention(),
                                new ForeignKeyConstraintNameConvention()));

                    m.FluentMappings.Add<RoleMapping>();
                    m.FluentMappings.Add<UserMapping>();
                    m.FluentMappings.Add<TokenMapping>();
                }
                )
                .ExposeConfiguration(cfg => new SchemaUpdate(cfg).Execute(true, true))
                .BuildSessionFactory();
        }
    }
}