using JuniorTriWizardTournament.Models;
using JuniorTriWizardTournament.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace JuniorTriWizardTournament.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class GameController : ControllerBase
    {
        private readonly IGameRepository _gameRepository;
        public GameController(IGameRepository gameRepository)
        {
            _gameRepository = gameRepository;
        }

        [HttpPost]
        public IActionResult Post(Game game)
        {
            _gameRepository.Add(game);
            return Ok(game);
        }
    }
}
