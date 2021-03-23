using System.Collections;
using System.ComponentModel;

namespace Domain
{
    public enum AppointmentStatus
    {
        [Description("Upcomming")]
        Upcomming,
        [Description("Completed")]
        Completed,
        [Description("Rejected")]
        Rejected
    }

}
