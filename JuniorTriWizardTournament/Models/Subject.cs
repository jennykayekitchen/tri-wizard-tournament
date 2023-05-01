using System.ComponentModel.DataAnnotations;

namespace JuniorTriWizardTournament.Models
{
    public class Subject
    {        
        [Required]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }
    }
}

