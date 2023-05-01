using System.ComponentModel.DataAnnotations;

namespace JuniorTriWizardTournament.Models
{
    public class FavoriteSubject
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        public int SubjectId { get; set; }

        [Required]
        public Subject Subject { get; set; }

        [Required]
        public User User { get; set; }
    }
}
