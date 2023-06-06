using System.ComponentModel.DataAnnotations.Schema;

namespace HospitalManagementServices.Models
{
    [Table("Specialty")]
    public class Specialty : Base 
    {
        public Specialty()
        {
            Name = string.Empty;
        }

        public string Name { get; set; }

        public virtual List<Hospital>? Hospitals { get; set; }
    }
}