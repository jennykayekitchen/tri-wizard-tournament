using System.ComponentModel.DataAnnotations;

namespace JuniorTriWizardTournament.Models
{
    public class Game
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        public int TotalPoints { get; set; }

        //public School School { get; set; }

        //public User User { get; set; }
    }
}
