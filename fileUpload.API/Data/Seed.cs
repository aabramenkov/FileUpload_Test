namespace fileUpload.API.Data
{
    public class Seed
    {
        private readonly DataContext _context;
        public Seed(DataContext context)
        {
            _context = context;
        }
        public static void seedFiles()
        {
            // User adminUser = userManager.FindByEmailAsync("admin@gmail.com").Result;
            // var result  = userManager.AddPasswordAsync(adminUser,"3KoloR7").Result;
        }

    }
}