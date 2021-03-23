using Application.Dto;
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

namespace Application.Doctors
{
    public class List
    {
        public class Query : IRequest<List<DoctorDto>> { }
        public class Handler : IRequestHandler<Query, List<DoctorDto>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }

            public async Task<List<DoctorDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var doctors = await context.Users.ToListAsync();
                return mapper.Map<List<DoctorDto>>(doctors);
            }
        }
    }
}
