using System;
using Microsoft.Owin.Hosting;
using Serilog;

namespace Endpoint
{
    static class Program
    {
        static void Main()
        {
            Console.Title = "IdentityServer3 Endpoint";

            Log.Logger = new LoggerConfiguration()
                .WriteTo
                .LiterateConsole(outputTemplate: "{Timestamp:HH:MM} [{Level}] ({Name:l}){NewLine} {Message}{NewLine}{Exception}")
                .CreateLogger();

            const string url = "https://localhost:44333/";

            using (WebApp.Start<Startup>(url))
            {
                Console.WriteLine("\nServer listening at {0}. Press enter to stop", url);
                Console.ReadLine();
            }
        }
    }
}