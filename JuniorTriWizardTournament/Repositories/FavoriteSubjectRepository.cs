using JuniorTriWizardTournament.Models;
using JuniorTriWizardTournament.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

namespace JuniorTriWizardTournament.Repositories
    {
    public class FavoriteSubjectRepository : BaseRepository, IFavoriteSubjectRepository
    {
        public FavoriteSubjectRepository(IConfiguration configuration) : base(configuration) { }

        public FavoriteSubject GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT fs.Id, fs.UserId, fs.SubjectId, u.FirstName, u.LastName, s.Name AS SubjectName                              
                        FROM FavoriteSubjects fs
                        JOIN Users u ON fs.UserId = u.Id
                        JOIN Subjects s ON fs.SubjectId = s.Id
                        WHERE fs.Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    FavoriteSubject favoriteSubject = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        favoriteSubject = new FavoriteSubject()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            SubjectId = DbUtils.GetInt(reader, "SubjectId"),
                            User = new User()
                            {
                                FirstName = DbUtils.GetString(reader, "FirstName"),
                                LastName = DbUtils.GetString(reader, "LastName"),
                            },
                            Subject = new Subject()
                            {
                                Name = DbUtils.GetString(reader, "SubjectName"),
                            }

                        };
                    }
                    reader.Close();

                    return favoriteSubject;
                }
            }
        }

        public List<FavoriteSubject> GetFavoriteSubjects()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT fs.Id, fs.UserId, fs.SubjectId, u.FirstName, u.LastName, s.Name AS SubjectName                              
                                        FROM FavoriteSubjects fs
                                        JOIN Users u ON fs.UserId = u.Id
                                        JOIN Subjects s ON fs.SubjectId = s.Id";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var favoriteSubjects = new List<FavoriteSubject>();
                        while (reader.Read())
                        {
                            favoriteSubjects.Add(new FavoriteSubject()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                UserId = DbUtils.GetInt(reader, "UserId"),
                                SubjectId = DbUtils.GetInt(reader, "SubjectId"),
                                User = new User()
                                {
                                    FirstName = DbUtils.GetString(reader, "FirstName"),
                                    LastName = DbUtils.GetString(reader, "LastName"),
                                },
                                Subject = new Subject()
                                {
                                    Name = DbUtils.GetString(reader, "SubjectName"),
                                }
                            });
                        }
                        return favoriteSubjects;
                    }
                }
            }
        }

        public List<FavoriteSubject> GetFavoriteSubjectsByUserId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT fs.Id, fs.UserId, fs.SubjectId, u.FirstName, u.LastName, s.Name AS SubjectName                              
                                        FROM Users u
                                        JOIN FavoriteSubjects fs ON fs.UserId = u.Id
                                        JOIN Subjects s ON fs.SubjectId = s.Id
                                        WHERE u.Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    var reader = cmd.ExecuteReader();
                    var favoriteSubjects = new List<FavoriteSubject>();
                    while (reader.Read())
                    {
                        favoriteSubjects.Add(new FavoriteSubject()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            SubjectId = DbUtils.GetInt(reader, "SubjectId"),
                            User = new User()
                            {
                                FirstName = DbUtils.GetString(reader, "FirstName"),
                                LastName = DbUtils.GetString(reader, "LastName"),
                            },
                            Subject = new Subject()
                            {
                                Name = DbUtils.GetString(reader, "SubjectName"),
                            }
                        });
                    }
                    return favoriteSubjects;
                }
            }
        }
    }

}
