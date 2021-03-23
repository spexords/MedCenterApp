using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class Appointment

    {
        [Key]
        public int Id { get; set; }
        public AppointmentStatus Status { get; set; }
        public DateTime Date { get; set; }
        public string Reason { get; set; }
        public string Description { get; set; }
        public virtual Patient Patient { get; set; }
        public virtual AppUser Doctor { get; set; }
        public virtual ICollection<ConditionAppointment> ConditionAppointments { get; set; }
    }

}
