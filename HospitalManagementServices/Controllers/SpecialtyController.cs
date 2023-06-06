using HospitalManagementServices.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HospitalManagementServices.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SpecialtyController : ControllerBase
    {

        private readonly ILogger<SpecialtyController> _logger;

        public SpecialtyController(ILogger<SpecialtyController> logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = nameof(GetSpecialties))]
        public IEnumerable<Specialty> GetSpecialties()
        {
            using (var context = new DBContext())
            {
                return context.Specialties.Include(x => x.Hospitals).ToList();
            }

        }
    }
}