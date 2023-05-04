using JuniorTriWizardTournament.Models;
using System.Collections.Generic;

namespace JuniorTriWizardTournament.Repositories
{
    public interface IUserRepository
    {
        void Add(User user);
        
        User GetByFirebaseUserId(string firebaseUserId);
        
        public User GetById(int id);
       
        List<User> GetUsers();
        
        void Update(User user);

        FavoriteSubject GetFavoriteSubjectByFavoriteSubjectId(int id);

        List<FavoriteSubject> GetFavoriteSubjects();

        List<FavoriteSubject> GetFavoriteSubjectsByUserId(int id);

        void Add(FavoriteSubject favoriteSubject);

        void Delete(int id);
    }
}
