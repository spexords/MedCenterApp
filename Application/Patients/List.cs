using Application.Dto;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query.SqlExpressions;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Patients
{
    public class List
    {
        public class Query : IRequest<List<PatientDto>> 
        {
            public string Pesel { get; set; }
            public string LastName { get; set; }
            public string FirstName { get; set; }

            public Query(string pesel, string lastName, string firstName)
            {
                Pesel = pesel;
                LastName = lastName;
                FirstName = firstName;
            }
        }

        public class Handler : IRequestHandler<Query, List<PatientDto>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }

            public async Task<List<PatientDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var patientsQueryable = context.Patients.AsQueryable();
                if(request.Pesel != null)
                {
                    patientsQueryable = patientsQueryable.Where(p => p.Pesel.Contains(request.Pesel));
                }

                if(request.LastName != null)
                {
                    patientsQueryable = patientsQueryable.Where(p => p.LastName.ToLower().Contains(request.LastName.ToLower()));
                }

                if (request.FirstName != null)
                {
                    patientsQueryable = patientsQueryable.Where(p => p.FirstName.ToLower().Contains(request.FirstName.ToLower()));
                }

                return mapper.Map<List<PatientDto>>(await patientsQueryable.ToListAsync());
            }
        }
    }
}
