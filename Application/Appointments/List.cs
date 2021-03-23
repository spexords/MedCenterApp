using Application.Dto;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Appointments
{
    public class List
    {
        public class Query : IRequest<List<AppointmentDto>> 
        { 
            public bool AllAppointments { get; set; }
            public DateTime? Date { get; set; }
            public int? Size { get; }
            public string Status { get; }

            public Query(bool allAppointments, DateTime? date, int? size, string status)
            {
                AllAppointments = allAppointments;
                Date = date ?? DateTime.Now;
                Size = size;
                Status = status;
            }
        }

        public class Handler : IRequestHandler<Query, List<AppointmentDto>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;
            private readonly IUserAccessor userAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                this.context = context;
                this.mapper = mapper;
                this.userAccessor = userAccessor;
            }

            public async Task<List<AppointmentDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var appointmentsQueryable = context.Appointments
                                                   .Include(a => a.Doctor)
                                                   .Include(a => a.Patient)
                                                   .Where(a => a.Date >= request.Date)
                                                   .AsQueryable();
                if(!request.AllAppointments)
                {
                    appointmentsQueryable = appointmentsQueryable.Where(a => a.Doctor.UserName == userAccessor.GetCurrentUserName());
                }

                if (request.Status != null)
                {
                    appointmentsQueryable = appointmentsQueryable.Where(a => a.Status == Enum.Parse<AppointmentStatus>(request.Status));
                }

                if(request.Size.HasValue)
                {
                    appointmentsQueryable = appointmentsQueryable.Take(request.Size.Value);
                }


                var appointments = await appointmentsQueryable.OrderBy(a => a.Date).ToListAsync();
                return mapper.Map<List<AppointmentDto>>(appointments);
            }
        }   
    }
}
