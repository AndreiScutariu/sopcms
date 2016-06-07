using FluentNHibernate.Mapping;

namespace api.Models.Write
{
    public class BaseEntityMap<T> : ClassMap<T> where T : BaseEntity
    {
        public BaseEntityMap()
        {
            Id(x => x.Id).Not.Nullable().GeneratedBy.Guid();
        }
    }
}