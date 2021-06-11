using Autofac;

namespace chancies.Blog
{
    public class BlogModule
        : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterTypes(ThisAssembly.GetTypes())
                .AsImplementedInterfaces();
        }
    }
}
