using JuniorTriWizardTournament.Models;
using System.Collections.Generic;

namespace JuniorTriWizardTournament.Repositories
{
    public interface IGameRepository
    {
        //Game GetPointsBySchoolId(int id);
        Game GetPointsByUserId(int id);
        void Add(Game game);

        List<Game> GetAllPoints();
    }
}