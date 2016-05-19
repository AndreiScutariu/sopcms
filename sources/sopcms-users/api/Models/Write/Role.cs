namespace api.Models.Write
{
    public class Role : BaseEntity
    {
        public virtual string Name { get; set; }

        public virtual User User { get; set; }
    }
}