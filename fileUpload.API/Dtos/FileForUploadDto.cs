using Microsoft.AspNetCore.Http;

namespace jsite.api.Dtos
{
    public class FileForUploadDto
    {
        public string Name { get; set; }
        public IFormFile File { get; set; }

    }
}