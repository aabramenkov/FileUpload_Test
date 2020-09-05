using Microsoft.AspNetCore.Http;

namespace fileUpload.API.Dtos
{
    public class FileForUploadDto
    {
        public string Name { get; set; }
        public IFormFile File { get; set; }

    }
}