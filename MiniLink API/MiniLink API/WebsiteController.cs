using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MiniLink_API
{
    [Route("api/[controller]")]
    [ApiController]
    public class WebsiteController : ControllerBase
    {
        private readonly WebsiteDb _db;

        public WebsiteController(WebsiteDb db)
        {
            _db = db;
        }

        [HttpGet]
        public IActionResult getAllSites() 
        {
            List<Website> list = new();

            if (_db.Websites.Any())
            {
                list = _db.Websites.ToList();
                return Ok(list);
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
