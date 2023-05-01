using JuniorTriWizardTournament.Models;
using JuniorTriWizardTournament.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Claims;

namespace JuniorTriWizardTournament.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]

    public class WordController : ControllerBase
    {
        private readonly IWordRepository _wordRepository;
        public WordController(IWordRepository wordRepository)
        {
            _wordRepository = wordRepository;
        }

        [HttpGet("details/{id}")]
        public IActionResult GetWordById(int id)
        {
            var word = _wordRepository.GetById(id);
            if (word == null)
            {
                return NotFound();
            }
            return Ok(word);
        }

        [HttpGet]
        public IActionResult GetAllWords()
        {
            return Ok(_wordRepository.GetWords());
        }

    }
}
