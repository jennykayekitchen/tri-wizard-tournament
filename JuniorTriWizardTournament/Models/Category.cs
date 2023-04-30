using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace JuniorTriWizardTournament.Models
{
    public class Category
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }
    }
}
