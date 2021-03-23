using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;

namespace Domain
{
    public class AppUser: IdentityUser
    {
        public Role Role { get; set; }
        public string Pesel { get; set; }
        public string DisplayName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime BirthDate { get; set; }
        public Gender Gender { get; set; }
        public virtual ICollection<Appointment> Appointments { get; set; }
    }

}
