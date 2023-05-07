using JuniorTriWizardTournament.Models;
using JuniorTriWizardTournament.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;


namespace JuniorTriWizardTournament.Repositories
{
    public class UserRepository : BaseRepository, IUserRepository
    {
        public UserRepository(IConfiguration configuration) : base(configuration) { }

        public User GetByFirebaseUserId(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT u.Id, u.FirebaseUserId, u.FirstName, u.LastName, 
                               u.EmailAddress, u.SchoolId, u.AboutMe, s.Id, s.Name as SchoolName                               
                          FROM Users u
                               LEFT JOIN Schools s on u.SchoolId = s.Id
                         WHERE FirebaseUserId = @FirebaseuserId";

                    DbUtils.AddParameter(cmd, "@FirebaseUserId", firebaseUserId);

                    User user = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        user = new User()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            EmailAddress = DbUtils.GetString(reader, "EmailAddress"),
                            AboutMe = DbUtils.GetString(reader, "AboutMe"),
                            SchoolId = DbUtils.GetInt(reader, "SchoolId"),
                            School = new School()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "SchoolName"),
                            }
                        };
                    }
                    reader.Close();

                    return user;
                }
            }
        }

        public User GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT u.Id, u.FirebaseUserId, u.FirstName, u.LastName, 
                               u.EmailAddress, u.SchoolId, u.AboutMe, s.Id, s.Name as SchoolName                               
                          FROM Users u
                               LEFT JOIN Schools s on u.SchoolId = s.Id
                         WHERE u.Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    User user = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        user = new User()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            EmailAddress = DbUtils.GetString(reader, "EmailAddress"),
                            AboutMe = DbUtils.GetString(reader, "AboutMe"),
                            SchoolId = DbUtils.GetInt(reader, "SchoolId"),
                            School = new School()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "SchoolName"),
                            }
                        };
                    }
                    reader.Close();

                    return user;
                }
            }
        }

        public List<User> GetUsers()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT u.Id, u.FirebaseUserId, u.FirstName, u.LastName, u.EmailAddress, u.SchoolId, u.AboutMe, 
                                        s.Id, s.Name as SchoolName                               
                                        FROM [Users] u
                                        LEFT JOIN Schools s ON u.SchoolId = s.Id
                                        ORDER BY u.LastName";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var users = new List<User>();
                        while (reader.Read())
                        {
                            users.Add(new User()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                                FirstName = DbUtils.GetString(reader, "FirstName"),
                                LastName = DbUtils.GetString(reader, "LastName"),
                                EmailAddress = DbUtils.GetString(reader, "EmailAddress"),
                                AboutMe = DbUtils.GetString(reader, "AboutMe"),
                                SchoolId = DbUtils.GetInt(reader, "SchoolId"),
                                School = new School()
                                {
                                    Id = DbUtils.GetInt(reader, "Id"),
                                    Name = DbUtils.GetString(reader, "SchoolName"),
                                }
                            });
                        }
                        return users;
                    }
                }
            }
        }

        public void Add(User user)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Users (FirebaseUserId, FirstName, LastName, EmailAddress, SchoolId, AboutMe)
                                        OUTPUT INSERTED.ID
                                        VALUES (@FirebaseUserId, @FirstName, @LastName, @EmailAddress, @SchoolId, @AboutMe)";
                    DbUtils.AddParameter(cmd, "@FirebaseUserId", user.FirebaseUserId);
                    DbUtils.AddParameter(cmd, "@FirstName", user.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName", user.LastName);
                    DbUtils.AddParameter(cmd, "@SchoolId", user.SchoolId);
                    DbUtils.AddParameter(cmd, "@EmailAddress", user.EmailAddress);
                    DbUtils.AddParameter(cmd, "@AboutMe", user.AboutMe);

                    user.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(User user)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Users
                                        SET 
                                            FirstName = @firstName,
                                            LastName = @lastName,
                                            EmailAddress = @emailAddress,
                                            AboutMe = @aboutMe                                            
                                        WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@firstName", user.FirstName);
                    DbUtils.AddParameter(cmd, "@lastName", user.LastName);
                    DbUtils.AddParameter(cmd, "@emailAddress", user.EmailAddress);
                    DbUtils.AddParameter(cmd, "@aboutMe", user.AboutMe);
                    DbUtils.AddParameter(cmd, "@id", user.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public FavoriteSubject GetFavoriteSubjectByFavoriteSubjectId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT fs.Id as FavoriteSubjectId, u.Id as UserId, u.FirstName, u.LastName, s.Name AS SubjectName, s.Id as SubjectId                            
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
                            Id = DbUtils.GetInt(reader, "FavoriteSubjectId"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            SubjectId = DbUtils.GetInt(reader, "SubjectId"),
                            Subject = new Subject()
                            {
                                //Id = DbUtils.GetInt(reader, "SubjectId"),
                                Name = DbUtils.GetString(reader, "SubjectName"),
                            },
                            User = new User()
                            {
                                FirstName = DbUtils.GetString(reader, "FirstName"),
                                LastName = DbUtils.GetString(reader, "LastName"),
                                //Id = DbUtils.GetInt(reader, "UserId"),
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
                    cmd.CommandText = @"SELECT fs.Id as FavoriteSubjectId, u.Id as UserId, u.FirstName, u.LastName, s.Name AS SubjectName, s.Id as SubjectId                              
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
                                Id = DbUtils.GetInt(reader, "FavoriteSubjectId"),
                                UserId = DbUtils.GetInt(reader, "UserId"),
                                SubjectId = DbUtils.GetInt(reader, "SubjectId"),
                                Subject = new Subject()
                                {
                                    //Id = DbUtils.GetInt(reader, "SubjectId"),
                                    Name = DbUtils.GetString(reader, "SubjectName"),
                                },
                                User = new User()
                                {
                                    FirstName = DbUtils.GetString(reader, "FirstName"),
                                    LastName = DbUtils.GetString(reader, "LastName"),
                                    //Id = DbUtils.GetInt(reader, "UserId"),
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
                    cmd.CommandText = @"SELECT fs.Id as FavoriteSubjectId, u.Id as UserId, u.FirstName, u.LastName, s.Name AS SubjectName, s.Id as SubjectId                              
                                        FROM FavoriteSubjects fs
                                        JOIN Users u ON fs.UserId = u.Id
                                        JOIN Subjects s ON fs.SubjectId = s.Id
                                        WHERE u.Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    var reader = cmd.ExecuteReader();
                    var favoriteSubjects = new List<FavoriteSubject>();
                    while (reader.Read())
                    {
                        favoriteSubjects.Add(new FavoriteSubject()
                        {
                            Id = DbUtils.GetInt(reader, "FavoriteSubjectId"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            SubjectId = DbUtils.GetInt(reader, "SubjectId"),
                            Subject = new Subject()
                            {
                                //Id = DbUtils.GetInt(reader, "SubjectId"),
                                Name = DbUtils.GetString(reader, "SubjectName"),
                            },
                            User = new User()
                            {
                                FirstName = DbUtils.GetString(reader, "FirstName"),
                                LastName = DbUtils.GetString(reader, "LastName"),
                                //Id = DbUtils.GetInt(reader, "UserId"),
                            }
                        });
                    }
                    return favoriteSubjects;
                }
            }
        }

        public void Add(FavoriteSubject favoriteSubject)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO FavoriteSubjects (SubjectId, UserId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@SubjectId, @UserId)";
                    DbUtils.AddParameter(cmd, "@SubjectId", favoriteSubject.SubjectId);
                    DbUtils.AddParameter(cmd, "@UserId", favoriteSubject.UserId);                   

                    favoriteSubject.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM FavoriteSubjects WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@Id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }

}

