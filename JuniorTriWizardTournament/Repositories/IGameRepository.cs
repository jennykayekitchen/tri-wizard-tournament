using JuniorTriWizardTournament.Models;

namespace JuniorTriWizardTournament.Repositories
{
    public interface IGameRepository
    {
        //Game GetPointsBySchoolId(int id);
        Game GetPointsByUserId(int id);
        void Add(Game game);
    }
}