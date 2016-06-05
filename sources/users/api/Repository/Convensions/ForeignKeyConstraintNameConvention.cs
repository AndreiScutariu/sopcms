using FluentNHibernate.Conventions;
using FluentNHibernate.Conventions.Instances;

namespace api.Repository.Convensions
{
    public class ForeignKeyConstraintNameConvention : IHasManyConvention
    {
        public void Apply(IOneToManyCollectionInstance instance)
        {
            instance.Key.ForeignKey(
                $"Fk_{instance.ChildType.Name}_{instance.EntityType.Name}");
        }
    }
}