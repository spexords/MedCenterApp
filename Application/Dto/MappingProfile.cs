using System;
using System.Collections.Generic;
using System.Text;
using AutoMapper;
using Domain;

namespace Application.Dto
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<AppUser, UserDto>()
                .ForMember(d => d.Token, opt => opt.MapFrom<TokenResolver>());

            CreateMap<AppUser, DoctorDto>();
            CreateMap<AppUser, DoctorInfoDto>();

            CreateMap<Patient, PatientDto>();
            CreateMap<Patient, PatientInfoDto>();

            CreateMap<Appointment, AppointmentDto>()
                .ForMember(d => d.Conditions, opt => opt.MapFrom(src => src.ConditionAppointments));


            CreateMap<ConditionAppointment, ConditionDto>()
                .ForMember(d => d.Id, opt => opt.MapFrom(src => src.Condition.Id))
                .ForMember(d => d.Name, opt => opt.MapFrom(src => src.Condition.Name));

        }
    }
}
