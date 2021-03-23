using Application.Dto;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Conditions
{
    public class List
    {
        public class Query : IRequest<List<ConditionStatsDto>> 
        {
            public int? Size { get; set; }
            public bool? Descending { get; set; }

            public Query(int? size, bool? descending)
            {
                Size = size ?? 5;
                Descending = descending ?? true;
            }
        }

        public class Handler : IRequestHandler<Query, List<ConditionStatsDto>>
        {
            private readonly DataContext context;

            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<List<ConditionStatsDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var condtionsQueryable = context.Conditions
                                            .Include(c => c.ConditionAppointments)
                                            .Select(c => new ConditionStatsDto { Name = c.Name, Count = c.ConditionAppointments.Count() })
                                            .AsQueryable();
                if(request.Descending.Value)
                {
                    condtionsQueryable = condtionsQueryable.OrderByDescending(s => s.Count);
                }
                else
                {
                    condtionsQueryable = condtionsQueryable.OrderBy(s => s.Count);
                }

                var conditions = await condtionsQueryable.Take(request.Size.Value).ToListAsync();

                return conditions;
            }
        }
    }
}
