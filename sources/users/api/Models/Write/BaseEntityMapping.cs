using FluentNHibernate.Mapping;

namespace api.Models.Write
{
    public class BaseEntityMapping<T> : ClassMap<T> where T : BaseEntity
    {
        public BaseEntityMapping()
        {
            Id(x => x.Id).Not.Nullable().GeneratedBy.Guid();
        }
    }
}