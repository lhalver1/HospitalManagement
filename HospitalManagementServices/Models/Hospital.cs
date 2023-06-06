using System.ComponentModel.DataAnnotations.Schema;

namespace HospitalManagementServices.Models
{
    [Table("Hospital")]
    public class Hospital : Base 
    {
        public Hospital()
        {
            Name = string.Empty;
        }

        public string Name { get; set; }

        public string? Address { get; set; }

        public string? Phone { get; set; }

        public string? Manager { get; set; }

        public int? Specialty_ID { get; set; }

        public virtual Specialty? Specialty { get; set; }
    }
}