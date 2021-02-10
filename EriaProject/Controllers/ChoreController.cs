using EriaProject.Interfaces.Repositories;
using EriaProject.Models;
using EriaProject.Models.Contexts;
using EriaProject.Models.Entities;
using EriaProject.Utilities.Exceptions;
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
            try
            {
                var result = await _choreService.GetAllAsync();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
        [HttpGet("{cID:int}")]
        public async Task<ActionResult<ICollection<Chore>>> GetByIdAsync(int cID)
        {
            try
            {
                var result = await _choreService.GetByIdAsync(cID);

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
        public async Task<ActionResult<Chore>> PostAsync([FromBody] Chore chore)
        {
            try
            {
                await _choreService.PostAsync(chore);

                return CreatedAtAction(nameof(PostAsync), new { id = chore.ChoreID }, chore);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
        [HttpDelete("{cID:int}")]
        public async Task<ActionResult> DeleteByIdAsync(int cID)
        {
            try
            {
                await _choreService.DeleteByIdAsync(cID);

                return Ok();
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
        [HttpPut]
        public async Task<ActionResult> PutAsync([FromBody] Chore chore)
        {
            try
            {
                await _choreService.PutAsync(chore);

                return Ok();
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
    }
}
