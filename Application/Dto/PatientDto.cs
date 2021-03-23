using System;
using System.Collections.Generic;

namespace Application.Dto
{
    public class PatientDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Pesel { get; set; }
        public DateTime BirthDate { get; set; }
        public string Gender { get; set; }
        public ICollection<AppointmentDto> Appointments { get; set; }
    }
}
