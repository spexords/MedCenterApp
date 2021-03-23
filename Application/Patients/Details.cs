using Application.Dto;
using Application.Error;
using AutoMapper;
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
    public class Details
    {
        public class Query : IRequest<PatientDto> 
        { 
            public int Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, PatientDto>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }

            public async Task<PatientDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var patient = await context.Patients
                    .Include(p => p.Appointments)
                    .ThenInclude(a => a.ConditionAppointments)
                    .ThenInclude(ca => ca.Condition)
                    .Include(p => p.Appointments)
                    .ThenInclude(a => a.Doctor)
                    .FirstOrDefaultAsync(p => p.Id == request.Id);
                if(patient == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { Patient = "Invalid patient id" });
                }
                return mapper.Map<PatientDto>(patient);
            }
        }
    }
}
