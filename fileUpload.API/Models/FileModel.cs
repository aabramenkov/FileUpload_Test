using System;

namespace fileUpload.API.Models
{
    public class FileModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string FileType {get;set;}
        public long FileSize {get;set;}
        public string Path { get; set; }
        public DateTime UploadedDate { get; set; }
        public string UserName { get; set; }
    }
}