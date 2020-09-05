using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using fileUpload.API.Data;
using fileUpload.API.Dtos;
using fileUpload.API.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
            FileModel file = null;
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
                var userName = HttpContext.Connection.Id;
                var currentDate = DateTime.Now;
                var fileType = System.IO.Path.GetExtension(fileForUpload.FileName).ToLower();
                file = new FileModel
                {
                    Name = fileForUpload.FileName,
                    FileType = fileType,
                    FileSize = fileForUpload.Length/1024,
                    Path = path,
                    UserName = userName,
                    UploadedDate = currentDate
                };
                _context.Files.Add(file);
                _context.SaveChanges();
            }

            if (uploadResult == HttpStatusCode.OK)
                return Ok(file);
            return BadRequest("File not uploaded");
        }

        [HttpGet("files")]
        public async Task<List<FileModel>> getFiles()
        {
            var files = await _context.Files.OrderBy(f => f.UploadedDate).ThenBy(f => f.Name).ToListAsync();
            return files;
        }
    }
}