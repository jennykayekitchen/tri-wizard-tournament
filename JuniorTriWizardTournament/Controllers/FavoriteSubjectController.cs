using JuniorTriWizardTournament.Models;
using JuniorTriWizardTournament.Repositories;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace JuniorTriWizardTournament.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]

        public class FavoriteSubjectController : ControllerBase
        {
            private readonly IFavoriteSubjectRepository _favoriteSubjectRepository;
            public FavoriteSubjectController(IFavoriteSubjectRepository favoriteSubjectRepository)
            {
                _favoriteSubjectRepository = favoriteSubjectRepository;
            }

            [HttpGet("details/{id}")]
            public IActionResult GetFavoriteSubjectById(int id)
            {
                var favoriteSubject = _favoriteSubjectRepository.GetById(id);
                if (favoriteSubject == null)
                {
                    return NotFound();
                }
                return Ok(favoriteSubject);
            }

            [HttpGet]
            public IActionResult GetAllFavoriteSubjects()
            {
                return Ok(_favoriteSubjectRepository.GetFavoriteSubjects());
            }

        [HttpGet("{id}/favoriteSubject")]
        public IActionResult GetFavoriteSubjectsByUserId(int id)
        {
            List<FavoriteSubject> favoriteSubjects = _favoriteSubjectRepository.GetFavoriteSubjectsByUserId(id);
            return Ok(favoriteSubjects);
        }
    }
}
