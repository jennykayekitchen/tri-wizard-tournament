using JuniorTriWizardTournament.Models;
using JuniorTriWizardTournament.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

namespace JuniorTriWizardTournament.Repositories
{
    public class SubjectRepository : BaseRepository, ISubjectRepository
    {
        public SubjectRepository(IConfiguration configuration) : base(configuration) { }

        public Subject GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, Name                              
                        FROM Subjects                                
                        WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    Subject subject = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        subject = new Subject()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                        };
                    }
                    reader.Close();

                    return subject;
                }
            }
        }

        public List<Subject> GetSubjects()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, Name                               
                                        FROM Subjects                                        
                                        ORDER BY Name";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var categories = new List<Subject>();
                        while (reader.Read())
                        {
                            categories.Add(new Subject()
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

