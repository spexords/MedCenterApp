using System;

namespace Application.Dto
{
    public class PatientInfoDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Pesel { get; set; }
        public DateTime BirthDate { get; set; }
        public string Gender { get; set; }
    }
}
