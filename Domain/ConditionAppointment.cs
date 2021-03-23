using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class ConditionAppointment
    {
        public int AppointmentId { get; set; }
        public virtual Appointment Appointment { get; set;}
        public int ConditionId { get; set; }
        public virtual Condition Condition { get; set;}
    }

}
