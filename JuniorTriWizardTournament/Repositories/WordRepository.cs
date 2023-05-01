using JuniorTriWizardTournament.Models;
using JuniorTriWizardTournament.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

namespace JuniorTriWizardTournament.Repositories
{
    public class WordRepository : BaseRepository, IWordRepository
    {
        public WordRepository(IConfiguration configuration) : base(configuration) { }

        public Word GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, Name                              
                        FROM Words                                
                        WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    Word word = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        word = new Word()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                        };
                    }
                    reader.Close();

                    return word;
                }
            }
        }

        public List<Word> GetWords()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, Name                               
                                        FROM Words                                        
                                        ORDER BY Name";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var words = new List<Word>();
                        while (reader.Read())
                        {
                            words.Add(new Word()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "Name"),
                            });
                        }
                        return words;
                    }
                }
            }
        }
    }
}
