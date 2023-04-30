using JuniorTriWizardTournament.Models;
using JuniorTriWizardTournament.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

namespace JuniorTriWizardTournament.Repositories
{
    public class SchoolRepository : BaseRepository, ISchoolRepository
    {
        public SchoolRepository(IConfiguration configuration) : base(configuration) { }

        public School GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, Name, TotalPoints                              
                        FROM Schools                              
                        WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    School school = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        school = new School()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                            TotalPoints = DbUtils.GetInt(reader, "TotalPoints"),
                        };
                    }
                    reader.Close();

                    return school;
                }
            }
        }

        public List<School> GetSchools()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, Name, TotalPoints                               
                                        FROM Schools                                        
                                        ORDER BY Name";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var schools = new List<School>();
                        while (reader.Read())
                        {
                            schools.Add(new School()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "Name"),
                                TotalPoints = DbUtils.GetInt(reader, "TotalPoints"),
                            });
                        }
                        return schools;
                    }
                }
            }
        }
    }
}
