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

namespace Application.Appointments
{
    public class Delete
    {
        public class Command : IRequest
        {
            public int Id { get; set; }
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
                var appointment = await context.Appointments.FirstOrDefaultAsync(a => a.Id == request.Id);

                if(appointment == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { Appointment = "Invalid appointment id." });
                }

                context.Appointments.Remove(appointment);

                //logic handler
                var success = await context.SaveChangesAsync() > 0;

                if (success)
                {
                    return Unit.Value;
                }
                throw new Exception("Problem deleting appointment");
            }
        }
    }
}
