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
                               u.EmailAddress, u.SchoolId, u.TotalPoints, u.AboutMe, s.Id, s.Name as SchoolName                               
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
                            TotalPoints = DbUtils.GetInt(reader, "TotalPoints"),
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
                               u.EmailAddress, u.SchoolId, u.TotalPoints, u.AboutMe, s.Id, s.Name as SchoolName                               
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
                            TotalPoints = DbUtils.GetInt(reader, "TotalPoints"),
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
                    cmd.CommandText = @"SELECT u.Id, u.FirebaseUserId, u.FirstName, u.LastName, u.EmailAddress, u.SchoolId, u.TotalPoints, u.AboutMe, s.Id, s.Name as SchoolName                               
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
                                TotalPoints = DbUtils.GetInt(reader, "TotalPoints"),
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
                    cmd.CommandText = @"INSERT INTO Users (FirebaseUserId, FirstName, LastName, EmailAddress, SchoolId, AboutMe, TotalPoints)
                                        OUTPUT INSERTED.ID
                                        VALUES (@FirebaseUserId, @FirstName, @LastName, @EmailAddress, @SchoolId, @AboutMe, @TotalPoints)";
                    DbUtils.AddParameter(cmd, "@FirebaseUserId", user.FirebaseUserId);
                    DbUtils.AddParameter(cmd, "@FirstName", user.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName", user.LastName);
                    DbUtils.AddParameter(cmd, "@SchoolId", user.SchoolId);
                    DbUtils.AddParameter(cmd, "@EmailAddress", user.EmailAddress);
                    DbUtils.AddParameter(cmd, "@AboutMe", user.AboutMe);
                    DbUtils.AddParameter(cmd, "@TotalPoints", user.TotalPoints);

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
    }
}
