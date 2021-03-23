using Application.Error;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Net;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Patients
{
    public class Update
    {
        public class Command : IRequest
        {
            public int Id { get; set; }
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public string Pesel { get; set; }
            public DateTime? BirthDate { get; set; }
            public string Gender { get; set; }
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
                var patient = await context.Patients.FirstOrDefaultAsync(p => p.Id == request.Id);
                if(patient == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { Patient = "Invalid patient id" });
                }

                patient.FirstName = request.FirstName ?? patient.FirstName;
                patient.LastName = request.LastName ?? patient.LastName;
                patient.Pesel = request.Pesel ?? patient.Pesel;
                patient.BirthDate = request.BirthDate ?? patient.BirthDate;
                patient.Gender = Enum.Parse<Gender>(request.Gender ?? patient.Gender.ToString());

                var success = await context.SaveChangesAsync() > 0;

                if (success)
                {
                    return Unit.Value;
                }
                throw new Exception("Problem saving patient");
            }
        }
    }
}
