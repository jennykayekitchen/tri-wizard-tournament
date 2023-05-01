using JuniorTriWizardTournament.Models;
using System.Collections.Generic;

namespace JuniorTriWizardTournament.Repositories
{
    public interface IWordRepository
    {
        Word GetById(int id);
        List<Word> GetWords();
    }
}