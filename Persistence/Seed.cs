using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if(!userManager.Users.Any())
            {
                var admin = new AppUser
                {
                    Email = "admin@test.com",
                    DisplayName = "admin",
                    UserName = "admin",
                    Role = Role.Admin
                };

                var tester = new AppUser
                {
                    Email = "test@g.com",
                    DisplayName = "test",
                    UserName = "test",
                    Role = Role.Admin
                };
                await userManager.CreateAsync(admin, "Pa$$W0rd");
                await userManager.CreateAsync(tester, "Pa$$W0rd");
            }
        }
 
    }
}
