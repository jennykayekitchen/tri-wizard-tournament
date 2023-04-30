using JuniorTriWizardTournament.Models;
using System.Collections.Generic;

namespace JuniorTriWizardTournament.Repositories
{
    public interface ICategoryRepository
    {
        public List<Category> GetCategories();

        public Category GetById(int id);

    }
}
