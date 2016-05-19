using System;
using FluentNHibernate;
using FluentNHibernate.Conventions;

namespace api.Repository.Convensions
{
    public class ForeignKeyNameConvention : ForeignKeyConvention
    {
        protected override string GetKeyName(Member property, Type type)
        {
            if (property == null)
                return (type.Name + "Id");

            return (property.Name + "Id");
        }
    }
}