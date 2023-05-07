using System.ComponentModel.DataAnnotations;

namespace JuniorTriWizardTournament.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        [StringLength(28, MinimumLength = 28)]
        public string FirebaseUserId { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        public string EmailAddress { get; set; }

        [Required]
        public int SchoolId { get; set; }
                
        public School School { get; set; }

        public string AboutMe { get; set; }
                
        public Subject Subject { get; set; }
                
        public FavoriteSubject FavoriteSubject { get; set; }




    }
}
