using Application.Error;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Net;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Xml.Schema;

namespace Application.Appointments
{
    public class DisconnectCondition
    {
        public class Command : IRequest
        {
            public int AppointmentId { get; set; }
            public int ConditionId { get;  set; }
        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext context;

            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var conditionAppointment = await context.ConditionAppointments.FirstOrDefaultAsync(ca => ca.AppointmentId == request.AppointmentId && ca.ConditionId == request.ConditionId);
                if(conditionAppointment == null)
                {
                    throw new RestException(HttpStatusCode.BadRequest, new { Appointment = "Could not disconnect condition" });
                }

                context.ConditionAppointments.Remove(conditionAppointment);

                var success = await context.SaveChangesAsync() > 0;

                if (success)
                {
                    return Unit.Value;
                }
                throw new Exception("Problem saving changes");
            }
        }
    }
}
