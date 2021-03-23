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

namespace Application.Patients
{
    public class Create
    {
        public class Command : IRequest<PatientDto>
        {
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public string Pesel { get; set; }
            public DateTime BirthDate { get; set; }
            public string Gender { get; set; }

        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.FirstName).NotEmpty();
                RuleFor(x => x.LastName).NotEmpty();
                RuleFor(x => x.Pesel).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command, PatientDto>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }

            public async Task<PatientDto> Handle(Command request, CancellationToken cancellationToken)
            {
                if(await context.Patients.AnyAsync(p => p.Pesel == request.Pesel))
                {
                    throw new RestException(HttpStatusCode.BadRequest, new { Pesel = "Pesel is already in database" });
                }

                var patient = new Patient
                {
                    FirstName = request.FirstName,
                    LastName = request.LastName,
                    BirthDate = request.BirthDate,
                    Gender = Enum.Parse<Gender>(request.Gender),
                    Pesel = request.Pesel
                };

                await context.Patients.AddAsync(patient);

                var success = await context.SaveChangesAsync() > 0;

                if (success)
                {
                    return mapper.Map<PatientDto>(patient);
                }
                throw new Exception("Problem saving changes");
            }
        }
    }
}
