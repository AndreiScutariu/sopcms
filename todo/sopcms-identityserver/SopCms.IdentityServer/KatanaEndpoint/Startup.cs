using System.Collections.Generic;
using System.Security.Claims;
using Endpoint.Config;
using IdentityServer3.Core.Configuration;
using IdentityServer3.Core.Models;
using IdentityServer3.Core.Services.InMemory;
using Owin;

namespace Endpoint
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            var users = new List<InMemoryUser>
            {
                new InMemoryUser
                {
                    Username = "test",
                    Password = "test",
                    Subject = "pkForUser",
                    Claims = new List<Claim>()
                    {
                        new Claim("name", "test user"),
                        new Claim("email", "test email"),
                        new Claim("role", "role"),
                    }
                }
            };

            var clients = new List<Client>
            {
                new Client
                {
                    ClientId = "TestMvc",
                    ClientName = "TestMvc-Website",
                    Flow = Flows.Implicit,
                    RedirectUris = new List<string>
                    {
                        //"http://localhost:12345"
                    },
                    AllowedScopes = new List<string> {"openid", "email", "profile", "roles"}
                }
            };

            var scopes = new List<Scope>
            {
                StandardScopes.OpenId,
                StandardScopes.ProfileAlwaysInclude,
                StandardScopes.EmailAlwaysInclude,
                new Scope
                {
                    Name = "roles",
                    Claims = new List<ScopeClaim> {new ScopeClaim("role")}
                }
            };

            var factory = new IdentityServerServiceFactory();
            factory.UseInMemoryClients(clients);
            factory.UseInMemoryScopes(scopes);
            factory.UseInMemoryUsers(users);

            var options = new IdentityServerOptions
            {
                SiteName = "IdentityServer3 (self host)",
                SigningCertificate = Certificate.Get(),
                Factory = factory,
            };

            app.UseIdentityServer(options);
        }
    }
}