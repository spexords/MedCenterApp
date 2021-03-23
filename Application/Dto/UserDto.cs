using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Dto
{
    public class UserDto
    {
        public string Id { get; set; }
        public string Token { get; set; }
        public string Username { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Pesel { get; set; }
        public string Email { get; set; }
        public string DisplayName { get; set; }
        public DateTime BirthDate { get; set; }
        public string Role { get; set; }
        public string Gender { get; set; }
    }
}
