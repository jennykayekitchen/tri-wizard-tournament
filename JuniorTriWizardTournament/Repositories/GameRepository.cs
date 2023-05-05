using JuniorTriWizardTournament.Models;
using JuniorTriWizardTournament.Utils;
using Microsoft.Extensions.Configuration;

namespace JuniorTriWizardTournament.Repositories
{
    public class GameRepository : BaseRepository, IGameRepository
    {
        public GameRepository(IConfiguration configuration) : base(configuration) { }

        public void Add(Game game)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Games (UserId, TotalPoints)
                                        OUTPUT INSERTED.ID
                                        VALUES (@TotalPoints, @UserId)";
                    DbUtils.AddParameter(cmd, "@TotalPoints", game.TotalPoints);
                    DbUtils.AddParameter(cmd, "@UserId", game.UserId);

                    game.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
    }
}
