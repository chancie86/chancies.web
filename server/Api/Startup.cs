using System.Linq;
using Autofac;
using chancies.Api.Permissions;
using chancies.Auth.Config;
using chancies.Auth.Extensions;
using chancies.Blog;
using chancies.Persistence.Cosmos;
using chancies.Persistence.Cosmos.Config;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;

namespace chancies.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services
                .Configure<AzureConfig>(Configuration.GetSection("Azure"))
                .Configure<Auth0Config>(Configuration.GetSection("Auth0"));

            services
                .AddCors(options =>
                {
                    options.AddDefaultPolicy(builder =>
                    {
                        var allowedOrigins = Configuration.GetSection("Cors:AllowedOrigins")?
                            .GetChildren()
                            .Select(selector => selector.Value)
                            .ToArray();
                        builder.WithOrigins(allowedOrigins)
                            .AllowAnyMethod()
                            .AllowAnyHeader()
                            .AllowCredentials();
                    });
                })
                .AddControllers()
                .AddNewtonsoftJson();

            services.AddChanciesAuthentication(PermissionsHelper.GetPermissions());

            services.AddSwaggerGen(options =>
            {
                var securityScheme = new OpenApiSecurityScheme
                {
                    Name = "Bearer",
                    Description = "Enter JWT Bearer token ",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.Http,
                    Scheme = "bearer", // must be lower case
                    BearerFormat = "JWT",
                    Reference = new OpenApiReference
                    {
                        Id = JwtBearerDefaults.AuthenticationScheme,
                        Type = ReferenceType.SecurityScheme
                    }
                };
                options.AddSecurityDefinition(securityScheme.Reference.Id, securityScheme);
                options.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {securityScheme, new string[] { }}
                });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection()
                .UseSwagger()
                .UseSwaggerUI(options =>
                {
                    options.SwaggerEndpoint("/swagger/v1/swagger.json", "My API");
                })
                .UseRouting()
                .UseCors()
                .UseChanciesAuthentication()
                .UseEndpoints(endpoints =>
                {
                    endpoints.MapControllers();
                });
        }

        public void ConfigureContainer(ContainerBuilder cb)
        {
            cb.RegisterModule<BlogModule>();
            cb.RegisterModule<PersistenceModule>();
        }
    }
}
