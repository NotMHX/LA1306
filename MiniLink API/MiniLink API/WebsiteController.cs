using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;
using System;

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

        [HttpGet("all")]
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
                return BadRequest("No sites to fetch.");
            }
        }

        [HttpPost("add")]
        public async Task<ActionResult<Website>> addSite(Website newSite)
        {
            // ID Checker
            if (_db.Websites.Any())
            {
                newSite.Id = _db.Websites.OrderByDescending(i => i.Id).First().Id + 1; // Gets the item in the list with the highest Id and adds 1
            }
            else // If the list is empty, then there's also no Ids to find, so we'll put 1
            {
                newSite.Id = 1;
            }

            // URL Checker
            try
            {
                HttpWebRequest request = (HttpWebRequest)WebRequest.Create(newSite.Weblink);
                request.Timeout = 15000;
                request.Method = "HEAD";
                using (HttpWebResponse response = (HttpWebResponse)request.GetResponse())
                {
                    if (response.StatusCode != HttpStatusCode.OK)
                    {
                        throw new Exception();
                    }
                }
            }
            catch
            {
                return BadRequest("URL doesn't exist.");
            }

            // Date Giver
            newSite.DateAdded = DateTime.Now;

            _db.Websites.Add(newSite);
            await _db.SaveChangesAsync();
            return Ok(_db.Websites.SingleOrDefault(r => r.Id == newSite.Id));
        }

        [HttpDelete("id")]
        public async Task<ActionResult<Website>> deleteSiteWithId(int id) 
        {
            Website site = _db.Websites.SingleOrDefault(r => r.Id == id);
            _db.Websites.Remove(site);
            await _db.SaveChangesAsync();

            return Ok($"Deleted website {id}: {site.Title}");
        }
    }
}
