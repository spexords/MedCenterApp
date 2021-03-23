using Application.Dto;
using Application.Error;
using AutoMapper;
using Domain;
using FluentValidation;
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
    public class ConnectCondition
    {
        public class Command : IRequest<ConditionDto>
        {
            public int AppointmentId { get; set; }
            public string Condition { get; set; }
        }



        public class Handler : IRequestHandler<Command, ConditionDto>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }

            public async Task<ConditionDto> Handle(Command request, CancellationToken cancellationToken)
            {
                var appointment = await context.Appointments.FirstOrDefaultAsync(a => a.Id == request.AppointmentId);
                if (appointment == null)
                {
                    throw new RestException(HttpStatusCode.BadRequest, new { Appointment = "Could not find appointment." });
                }

                var condtionName = request.Condition.ToLower();


                var condition = await context.Conditions.FirstOrDefaultAsync(c => c.Name.ToLower() == condtionName);
                if (condition == null)
                {
                    condtionName = char.ToUpper(condtionName[0]) + condtionName.Substring(1);
                    condition = new Condition { Name = condtionName };
                }


                var conditionAppointment = await context.ConditionAppointments
                                                        .FirstOrDefaultAsync(ca => ca.AppointmentId == request.AppointmentId && ca.ConditionId == condition.Id);
                if(conditionAppointment != null)
                {
                    throw new RestException(HttpStatusCode.BadRequest, new { Condition = "Condition is already connected" });
                }
                conditionAppointment = new ConditionAppointment
                {
                    Appointment = appointment,
                    Condition = condition
                };

                context.ConditionAppointments.Add(conditionAppointment);


                var success = await context.SaveChangesAsync() > 0;

                if (success)
                {
                    return mapper.Map<ConditionDto>(conditionAppointment);
                }
                throw new Exception("Problem saving changes");
            }
        }
    }
}
