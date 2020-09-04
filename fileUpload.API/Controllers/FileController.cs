using System.IO;
using System.Net;
using System.Threading.Tasks;
using fileUpload.API.Data;
using fileUpload.API.Models;
using jsite.api.Dtos;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;

namespace fileUpload.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class FileController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IWebHostEnvironment _appEnvironment;

        public FileController(DataContext context, IWebHostEnvironment appEnvironment)
        {
            _appEnvironment = appEnvironment;
            _context = context;
        }

        [HttpPost("upload")]
        public async Task<IActionResult> UploadFile([FromForm] FileForUploadDto fileForUploadDto)
        {
            HttpStatusCode uploadResult = HttpStatusCode.BadRequest;
            var fileForUpload = fileForUploadDto.File;
            if (fileForUpload.Length > 0)
            {
                string path = "/Files/" + fileForUpload.FileName;
                using (var fileStream = new FileStream(_appEnvironment.WebRootPath + path, FileMode.Create))
                {
                    await fileForUpload.CopyToAsync(fileStream);
                    uploadResult = HttpStatusCode.OK;
                }
                FileModel file = new FileModel { Name = fileForUpload.FileName, Path = path };
                _context.Files.Add(file);
                _context.SaveChanges();
            }

            if (uploadResult == HttpStatusCode.OK)
                return Ok("File uploaded");
            return BadRequest("File not uploaded"); 
        }

        [HttpGet("files")]
        public async Task<IActionResult> getFiles(){
            FileModel file = new FileModel { Name = "Name", Path = "path" };
                _context.Files.Add(file);
                await _context.SaveChangesAsync();


            return Ok();
        }
    }
}