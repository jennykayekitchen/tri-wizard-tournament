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
        
     public class CategoryController : ControllerBase
     {
        private readonly ICategoryRepository _categoryRepository;
        public CategoryController(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        [HttpGet("details/{id}")]
        public IActionResult GetCategoryById(int id)
        {
            var category = _categoryRepository.GetById(id);
            if (category == null)
            {
            return NotFound();
            }
            return Ok(category);
        }

        [HttpGet]
        public IActionResult GetAllCategories()
        {
            return Ok(_categoryRepository.GetCategories());
        }

    }    
}

