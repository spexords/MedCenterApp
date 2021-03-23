using Application.Dto;
using Application.Error;
using Application.Interfaces;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Appointments
{
    public class Details
    {
        public class Query : IRequest<AppointmentDto>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, AppointmentDto>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }

            public async Task<AppointmentDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var appointment = await context.Appointments
                                                 .Include(a => a.Doctor)
                                                 .Include(a => a.Patient)
                                                 .Include(a => a.ConditionAppointments)
                                                 .ThenInclude(ca => ca.Condition)
                                                 .FirstOrDefaultAsync(a => a.Id == request.Id);

                if(appointment == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { Appointment = "Invalid appointment id" });
                }

                return mapper.Map<AppointmentDto>(appointment);
            }
        }
    }
}
