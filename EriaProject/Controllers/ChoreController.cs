using EriaProject.Interfaces.Repositories;
using EriaProject.Models;
using EriaProject.Models.Contexts;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EriaProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChoreController : ControllerBase
    {
        private readonly IChoreService _choreService;
        public ChoreController(IChoreService choreService)
        {
            _choreService = choreService;
        }
        [HttpGet]
        public async Task<ActionResult<ICollection<Chore>>> GetAllAsync()
        {
            var result = await _choreService.GetAllAsync();

            return Ok(result);
        }
        [HttpPost]
        public async Task<ActionResult> PostAsync([FromBody] Chore chore)
        {
            await _choreService.PostAsync(chore);

            return Ok();
        }
        [HttpDelete]
        public async Task<ActionResult> DeleteAsync([FromBody] Chore chore)
        {
            await _choreService.DeleteAsync(chore);

            return Ok();
        }
    }
}
