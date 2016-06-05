using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using Endpoint.Config;
using IdentityServer3.Core;
using IdentityServer3.Core.Configuration;
using IdentityServer3.Core.Models;
using IdentityServer3.Core.Services.InMemory;
using Owin;

namespace Endpoint
{
    internal static class Configuration
    {
        public static IEnumerable<InMemoryUser> Users //users
        {
            get
            {
                yield return new InMemoryUser
                {
                    Username = "test",
                    Password = "test",
                    Subject = "test", //must be unique
                    Claims = new List<Claim>
                    {
                        new Claim("name", "test user"),
                        new Claim("email", "test@gmail.com")
                    }
                };
            }
        }

        public static IEnumerable<Client> Clients
        {
            get
            {
                yield return new Client
                {
                    ClientId = "sopcms",
                    ClientName = "sopcms-demo",
                    Flow = Flows.Implicit,
                    RedirectUris = new List<string>
                    {
                        "http://localhost:3000/login/callback" // application link
                    },
                    ClientSecrets = new List<Secret>
                    {
                        new Secret
                        {
                            Value = "61B754C541BBCFC6A45A9E9EC5E47D8702B78C29",
                            Type = Constants.SecretTypes.X509CertificateThumbprint
                        }
                    },
                    AllowedScopes = new List<string>
                    {
                        "openid",
                        "email",
                        "profile",
                        "roles"
                    } //resources that app requests
                };
            }
        }

        public static IEnumerable<Scope> Scopes => new[]
        {
            ////////////////////////
            // identity scopes
            ////////////////////////

            StandardScopes.OpenId,
            StandardScopes.ProfileAlwaysInclude,
            StandardScopes.EmailAlwaysInclude,
            StandardScopes.Address,
            new Scope
            {
                Name = "roles",
                Claims = new List<ScopeClaim> {new ScopeClaim("role")}
            }
        };
    }

    internal class Startup
    {
        public void Configuration(IAppBuilder appBuilder)
        {
            var factory = new IdentityServerServiceFactory();
            factory.UseInMemoryUsers(Endpoint.Configuration.Users.ToList());
            factory.UseInMemoryClients(Endpoint.Configuration.Clients.ToList());
            factory.UseInMemoryScopes(Endpoint.Configuration.Scopes.ToList());

            appBuilder.UseIdentityServer(new IdentityServerOptions
            {
                SiteName = "IdentityServer3 (self host)",
                SigningCertificate = Certificate.Get(),
                Factory = factory
            });
        }
    }
}