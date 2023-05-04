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
                
        public Subject Subject { get; set; }
                
        public User User { get; set; }
    }
}
