using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace MiniLink_API
{
    public class WebsiteDb : DbContext
    {
        public WebsiteDb(DbContextOptions<WebsiteDb> options) : base(options)
        {
        }
        public DbSet<Website> Websites { get; set; }
    }
}
