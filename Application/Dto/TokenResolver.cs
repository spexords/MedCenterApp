using Application.Interfaces;
using AutoMapper;
using Domain;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Dto
{
    public class TokenResolver : IValueResolver<AppUser, UserDto, string>
    {
        private readonly IJwtGenerator jwtGenerator;

        public TokenResolver(IJwtGenerator jwtGenerator)
        {
            this.jwtGenerator = jwtGenerator;
        }

        public string Resolve(AppUser source, UserDto destination, string destMember, ResolutionContext context)
        {
            return jwtGenerator.CreateToken(source);
        }
    }
}
