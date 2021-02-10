using EriaProject.Interfaces.Services;
using EriaProject.Models.Entities;
using EriaProject.Utilities.Exceptions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EriaProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KindController : ControllerBase
    {
        private readonly IKindService _kindService;
        public KindController(IKindService kindService)
        {
            _kindService = kindService;
        }
        public async Task<ActionResult<ICollection<Kind>>> GetAllAsync()
        {
            var result = await _kindService.GetAllAsync();

            return Ok(result);
        }
        [HttpGet("{kID:int}")]
        public async Task<ActionResult<ICollection<Chore>>> GetByIdAsync(int kID)
        {
            try
            {
                var result = await _kindService.GetByIdAsync(kID);

                return Ok(result);
            }
            catch (NotFoundException ex)
            {
                return NotFound();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
        [HttpPost]
        public async Task<ActionResult<Chore>> PostAsync([FromBody] Kind kind)
        {
            try
            {
                await _kindService.PostAsync(kind);

                return CreatedAtAction(nameof(PostAsync), new { id = kind.KindID }, kind);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
    }
}
