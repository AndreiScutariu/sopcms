using FluentNHibernate.Conventions;
using FluentNHibernate.Conventions.Instances;

namespace api.Repository.Convensions
{
    public class ForeignKeyConstraintNameConvention : IHasManyConvention
    {
        public void Apply(IOneToManyCollectionInstance instance)
        {
            instance.Key.ForeignKey(
                string.Format("Fk_{0}_{1}", instance.ChildType.Name, instance.EntityType.Name));
        }
    }
}