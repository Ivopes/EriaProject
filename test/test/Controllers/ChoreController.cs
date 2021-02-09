using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace EriaProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChoreController : ControllerBase
    {
        /*private readonly ChoreContext _dbContext;
        public ChoreController(ChoreContext dbContext)
        {
            _dbContext = dbContext;
        }*/
        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            //var s = _dbContext.Chores;

            return Ok();
        }
    }
}
