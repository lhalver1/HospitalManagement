using Microsoft.EntityFrameworkCore;
using HospitalManagementServices.Models;

namespace HospitalManagementServices
{
    public class DBContext : DbContext
    {

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Data Source=HospitalManagement.db;");
        }

        public DbSet<Hospital> Hospitals { get; set; }
        public DbSet<Specialty> Specialties { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Hospital>().HasOne(x => x.Specialty).WithMany(x => x.Hospitals).HasForeignKey(x => x.Specialty_ID);
            modelBuilder.Entity<Specialty>().HasMany(x => x.Hospitals).WithOne(x => x.Specialty);
        }
    }
}