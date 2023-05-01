using JuniorTriWizardTournament.Models;
using System.Collections.Generic;

namespace JuniorTriWizardTournament.Repositories
{
    public interface ISubjectRepository
    {
        Subject GetById(int id);
        List<Subject> GetSubjects();
    }
}