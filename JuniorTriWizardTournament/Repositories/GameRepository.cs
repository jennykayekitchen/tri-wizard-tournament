using JuniorTriWizardTournament.Models;
using JuniorTriWizardTournament.Utils;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace JuniorTriWizardTournament.Repositories
{
    public class GameRepository : BaseRepository, IGameRepository
    {
        public GameRepository(IConfiguration configuration) : base(configuration) { }

        public Game GetPointsByUserId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT UserId, SUM(TotalPoints) as TotalPoints                              
                        FROM Games                                
                        WHERE UserId = @id
                        GROUP BY UserId";

                    DbUtils.AddParameter(cmd, "@id", id);

                    Game game = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        game = new Game()
                        {
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            TotalPoints = DbUtils.GetInt(reader, "TotalPoints"),
                        };
                    }
                    reader.Close();

                    return game;
                }
            }
        }

        public List<Game> GetAllPoints()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                SELECT SUM(g.TotalPoints) as TotalPoints, s.Name                             
                FROM Games g        
                JOIN Users u ON g.UserId = u.Id
                JOIN Schools s ON u.SchoolId = s.Id                         
                GROUP BY s.Name
                ORDER BY SUM(g.TotalPoints) DESC";

                    List<Game> games = new List<Game>();

                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        games.Add(new Game()
                        {
                            TotalPoints = DbUtils.GetInt(reader, "TotalPoints"),
                            School = new School()
                            {
                                Name = DbUtils.GetString(reader, "Name"),
                            }
                        });
                    }
                    reader.Close();

                    return games;
                }
            }
        }

        public void Add(Game game)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Games (UserId, TotalPoints)
                                        OUTPUT INSERTED.ID
                                        VALUES (@UserId, @TotalPoints)";
                    DbUtils.AddParameter(cmd, "@TotalPoints", game.TotalPoints);
                    DbUtils.AddParameter(cmd, "@UserId", game.UserId);

                    game.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
    }
}
