using JuniorTriWizardTournament.Models;
using JuniorTriWizardTournament.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace JuniorTriWizardTournament.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]

    public class GameController : ControllerBase
    {
        private readonly IGameRepository _gameRepository;
        public GameController(IGameRepository gameRepository)
        {
            _gameRepository = gameRepository;
        }

        [HttpGet("usertotalpoints/{id}")]
        public IActionResult GetPointsByUserId(int id)
        {
            var game = _gameRepository.GetPointsByUserId(id);
            if (game == null)
            {
                return NotFound();
            }
            return Ok(game);

        }

        [HttpGet]
        public IActionResult GetAllPoints()
        {
            return Ok(_gameRepository.GetAllPoints());
        }

        [HttpPost("postgame")]
        public IActionResult Post(Game game)
        {
            _gameRepository.Add(game);
            return Ok(game);
        }
    }
}
