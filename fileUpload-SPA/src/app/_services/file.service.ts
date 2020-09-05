import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FileModel } from '../_models/fileModel';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  uploadFile(fileToUpload: File): Observable<any> {
    const endpoint = this.baseUrl + 'file/upload';
    const formData: FormData = new FormData();
    formData.append('File', fileToUpload);
    formData.append('Name', fileToUpload.name);

    const response = this.http.post<any>(endpoint, formData);
    return response;
  }

  getFiles(): Observable<FileModel[]> {
    return this.http.get<FileModel[]>(this.baseUrl + 'file/files');
  }
}
