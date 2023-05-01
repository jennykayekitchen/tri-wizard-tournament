using Azure;
using JuniorTriWizardTournament.Models;
using JuniorTriWizardTournament.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

namespace JuniorTriWizardTournament.Repositories
{
    public class CategoryRepository : BaseRepository, ICategoryRepository
    {
        public CategoryRepository(IConfiguration configuration) : base(configuration) { }

        public Category GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, Name                              
                        FROM Categories                                
                        WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    Category category = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        category = new Category()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                        };
                    }
                    reader.Close();

                    return category;
                }
            }
        }

        public List<Category> GetCategories()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, Name                               
                                        FROM Categories                                        
                                        ORDER BY Name";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var categories = new List<Category>();
                        while (reader.Read())
                        {
                            categories.Add(new Category()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "Name"),                                
                            });
                        }
                        return categories;
                    }
                }
            }
        }

        
    }
}
