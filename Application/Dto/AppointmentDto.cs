using System;
using System.Collections.Generic;

namespace Application.Dto
{
    public class AppointmentDto
    {
        public int Id { get; set; }
        public string Status { get; set; }
        public string Reason { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; }
        public PatientInfoDto Patient { get; set; }
        public DoctorInfoDto Doctor { get; set; }
        public ICollection<ConditionDto> Conditions { get; set; }
    }
}
