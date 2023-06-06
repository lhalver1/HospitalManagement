using HospitalManagementServices.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HospitalManagementServices.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HospitalController : ControllerBase
    {

        private readonly ILogger<HospitalController> _logger;

        public HospitalController(ILogger<HospitalController> logger)
        {
            _logger = logger;
        }

        // api/Hospital
        [HttpGet(Name = nameof(GetHospitals))]
        public async Task<IEnumerable<Hospital>> GetHospitals()
        {
            using (var context = new DBContext())
            {
                return await context.Hospitals.Include(x => x.Specialty).ToListAsync();
            }
        }

        // api/Hospital/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Hospital>> GetHospital(int id)
        {
            try
            {
                using (var context = new DBContext())
                {
                    var result = await context.Hospitals.Include(x => x.Specialty).FirstOrDefaultAsync(x => x.ID == id);
                    if (result == null) 
                    { 
                        return NotFound();
                    }
                    return result;
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            
        }

        [HttpPost]
        public async Task<ActionResult<Hospital>> PostHospital(Hospital hospital)
        {
            try
            {
                if (hospital == null) 
                { 
                    return BadRequest(); 
                }

                using (var context = new DBContext())
                {
                    var entry = context.Hospitals.Add(hospital);
                    await context.SaveChangesAsync();

                    return Ok(entry.Entity);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            
        }

        // api/Hospital/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult<Hospital>> DeleteHospital(int id)
        {
            try
            {
                using (var context = new DBContext())
                {
                    var hospital = context.Hospitals.FirstOrDefault(x => x.ID == id);

                    if (hospital == null)
                    {
                        return NotFound();
                    }

                    var deleteResult = context.Hospitals.Remove(hospital);
                    await context.SaveChangesAsync();
                    
                    return Ok();
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpPut]
        public async Task<ActionResult<Hospital>> PutHospital(Hospital hospital)
        {
            try
            {
                if (hospital == null)
                {
                    return NotFound();
                }

                using (var context = new DBContext())
                {
                    var entry = context.Hospitals.Update(hospital);
                    await context.SaveChangesAsync();

                    return Ok(entry.Entity);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
    }
}