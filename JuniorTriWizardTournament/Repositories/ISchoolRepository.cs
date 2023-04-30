using JuniorTriWizardTournament.Models;
using System.Collections.Generic;

namespace JuniorTriWizardTournament.Repositories
{
    public interface ISchoolRepository
    {
        School GetById(int id);

        public List<School> GetSchools();
    }
}