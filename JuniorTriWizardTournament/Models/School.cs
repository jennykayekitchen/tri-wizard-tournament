using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace JuniorTriWizardTournament.Models
{
    public class School
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }
        
        [Required]
        public int TotalPoints { get; set; }
    }
}
