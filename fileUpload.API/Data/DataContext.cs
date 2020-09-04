using fileUpload.API.Models;
using Microsoft.EntityFrameworkCore;

namespace fileUpload.API.Data
{
    public class DataContext: DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<FileModel> Files { get; set; }
    }
}