using JuniorTriWizardTournament.Models;
using JuniorTriWizardTournament.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Security.Claims;

namespace JuniorTriWizardTournament.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet("{firebaseUserId}")]
        public IActionResult GetUser(string firebaseUserId)
        {
            return Ok(_userRepository.GetByFirebaseUserId(firebaseUserId));
        }

        [HttpGet("DoesUserExist/{firebaseUserId}")]
        public IActionResult DoesUserExist(string firebaseUserId)
        {
            var user = _userRepository.GetByFirebaseUserId(firebaseUserId);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        [HttpGet]
        public IActionResult GetAllUsers()
        {
            return Ok(_userRepository.GetUsers());
        }

        [HttpGet("details/{id}")]
        public IActionResult GetUserById(int id)
        {
            var user = _userRepository.GetById(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);

        }

        [HttpPost]
        public IActionResult Post(User user)
        {
            _userRepository.Add(user);
            return CreatedAtAction(
                nameof(GetUser),
                new { firebaseUserId = user.FirebaseUserId },
                user);
        }

        [HttpPut("{id}")]
        public IActionResult Edit(int id, User user)
        {

            if (id != user.Id)
            {
                return BadRequest();
            }

            _userRepository.Update(user);
            return NoContent();

        }

        private User GetCurrentUser()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepository.GetByFirebaseUserId(firebaseUserId);
        }

        [HttpGet("favoritesubject/{id}")]
        public IActionResult GetFavoriteSubjectByFavoriteSubjectId(int id)
        {
            var favoriteSubject = _userRepository.GetFavoriteSubjectByFavoriteSubjectId(id);
            if (favoriteSubject == null)
            {
                return NotFound();
            }
            return Ok(favoriteSubject);
        }

        [HttpGet("favoritesubjects")]
        public IActionResult GetFavoriteSubjects()
        {
            return Ok(_userRepository.GetFavoriteSubjects());
        }

        [HttpGet("{id}/favoritesubjects")]
        public IActionResult GetFavoriteSubjectsByUserId(int id)
        {
            List<FavoriteSubject> favoriteSubjects = _userRepository.GetFavoriteSubjectsByUserId(id);
            return Ok(favoriteSubjects);
        }
    }
}
