using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext: IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options) { }
        public DbSet<Appointment> Appointments { get; set; }
        public DbSet<Condition> Conditions { get; set; }
        public DbSet<ConditionAppointment> ConditionAppointments{ get; set; }
        public DbSet<Patient> Patients { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<ConditionAppointment>()
                .HasKey(k => new { k.AppointmentId, k.ConditionId });

            builder.Entity<Condition>()
                .HasMany(c => c.ConditionAppointments)
                .WithOne(ca => ca.Condition)
                .HasForeignKey(ca => ca.ConditionId)
                .OnDelete(DeleteBehavior.SetNull);

            builder.Entity<Appointment>()
                .HasMany(a => a.ConditionAppointments)
                .WithOne(ca => ca.Appointment)
                .HasForeignKey(ca => ca.AppointmentId)
                .OnDelete(DeleteBehavior.Cascade);


            builder.Entity<AppUser>()
                .HasMany(a => a.Appointments)
                .WithOne(d => d.Doctor)
                .OnDelete(DeleteBehavior.SetNull);

            builder.Entity<Patient>()
              .HasMany(a => a.Appointments)
              .WithOne(p => p.Patient)
              .OnDelete(DeleteBehavior.SetNull);

        }
    }
}
