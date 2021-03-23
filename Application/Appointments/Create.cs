using Application.Dto;
using Application.Error;
using Application.Interfaces;
using Application.Mail;
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
    public class Create
    {
        public class Command : IRequest<AppointmentDto>
        {
            public int PatientId { get; set; }
            public string DoctorId { get; set; }
            public string Reason { get; set; }
            public DateTime Date {get; set;}
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.PatientId).NotEmpty();
                RuleFor(x => x.DoctorId).NotEmpty();
                RuleFor(x => x.Date).NotNull();
            }
        }

        public class Handler : IRequestHandler<Command, AppointmentDto>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;
            private readonly IMailService mailService;

            public Handler(DataContext context, IMapper mapper, IMailService mailService)
            {
                this.context = context;
                this.mapper = mapper;
                this.mailService = mailService;
            }

            public async Task<AppointmentDto> Handle(Command request, CancellationToken cancellationToken)
            {
                var patient = await context.Patients.FirstOrDefaultAsync(p => p.Id == request.PatientId);
                if(patient == null)
                {
                    throw new RestException(HttpStatusCode.BadRequest, new { Patient = "Invalid patient id" });
                }

                var doctor = await context.Users.FirstOrDefaultAsync(u => u.Id == request.DoctorId);
                if (doctor == null)
                {
                    throw new RestException(HttpStatusCode.BadRequest, new { Patient = "Invalid doctor id" });
                }

                var appointment = new Appointment
                {
                    Date = request.Date,
                    Doctor = doctor,
                    Status = AppointmentStatus.Upcomming,
                    Patient = patient,
                    Reason = request.Reason
                };

                context.Appointments.Add(appointment);

                var success = await context.SaveChangesAsync() > 0;

                if (success)
                {
                    await mailService.SendEmailAsync(new MailRequest
                    {
                        Body = $"Nowa wizyta {appointment.Date:HH:mm dd-MM-yyyy} z {patient.FirstName} {patient.LastName}",
                        Subject = $"Nowa wizyta(#{appointment.Id}) - Medical Center",
                        ToEmail = doctor.Email
                    });
                    
                    return mapper.Map<AppointmentDto>(appointment);
                }
                throw new Exception("Problem saving appointment");
            }
        }
    }
}
