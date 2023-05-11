using System.ComponentModel.DataAnnotations;

namespace JuniorTriWizardTournament.Models
{
    public class Word
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public Category Category { get; set; }
    }
}
