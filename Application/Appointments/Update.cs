using Application.Error;
using Application.Interfaces;
using Application.Mail;
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
    public class Update
    {
        public class Command : IRequest
        {
            public int AppointmentId { get; set; }
            public int? PatientId { get; set; }
            public string DoctorId { get; set; }
            public string Description { get; set; }
            public string Status { get; set; }
            public string Reason { get; set; }
            public DateTime? Date { get; set; }
        }


        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext context;
            private readonly IMailService mailService;

            public Handler(DataContext context, IMailService mailService)
            {
                this.context = context;
                this.mailService = mailService;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var appointment = await context.Appointments
                                                .Include(a => a.Doctor)
                                                .Include(a => a.Patient)
                                                .FirstOrDefaultAsync(a => a.Id == request.AppointmentId);
                if(appointment == null)
                {
                    throw new RestException(HttpStatusCode.BadRequest, new { Appointment = "Invalid request body" });
                }

                var doctorId = request.DoctorId ?? appointment.Doctor.Id;
                var doctor = await context.Users.FirstOrDefaultAsync(u => u.Id == doctorId);
                if (doctor == null)
                {
                    throw new RestException(HttpStatusCode.BadRequest, new { Doctor = "Invalid request body" });
                }

                var patientId = request.PatientId ?? appointment.Patient.Id;
                var patient = await context.Patients.FirstOrDefaultAsync(p => p.Id == patientId);
                if (patient == null)
                {
                    throw new RestException(HttpStatusCode.BadRequest, new { Patient = "Invalid request body" });
                }

                appointment.Doctor = doctor;
                appointment.Patient = patient;
                appointment.Description = request.Description ?? appointment.Description;
                appointment.Status = Enum.Parse<AppointmentStatus>(request.Status ?? appointment.Status.ToString());
                appointment.Reason = request.Reason ?? appointment.Reason;
                appointment.Date = request.Date ?? appointment.Date;

                var success = await context.SaveChangesAsync() > 0;

                if (success)
                {
                    await mailService.SendEmailAsync(new MailRequest
                    {
                        Body = $"Zmiana wizyty status: {appointment.Status} data: {appointment.Date:HH:mm dd-MM-yyyy}",
                        Subject = $"Zmiana wizyty(#{appointment.Id}) - Medical Center",
                        ToEmail = doctor.Email
                    });
                    return Unit.Value;
                }
                throw new Exception("Problem saving changes");
            }
        }
    }
}
