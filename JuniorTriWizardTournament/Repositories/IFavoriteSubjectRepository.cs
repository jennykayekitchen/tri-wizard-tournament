using JuniorTriWizardTournament.Models;
using System.Collections.Generic;

namespace JuniorTriWizardTournament.Repositories
{
    public interface IFavoriteSubjectRepository
    {
        FavoriteSubject GetById(int id);

        List<FavoriteSubject> GetFavoriteSubjects();

        List<FavoriteSubject> GetFavoriteSubjectsByUserId(int id);
    }
}