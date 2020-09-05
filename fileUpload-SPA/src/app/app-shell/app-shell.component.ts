import { Component, OnInit } from '@angular/core';
import { FileService } from '../_services/file.service';
import { FileModel } from '../_models/fileModel';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-shell',
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.scss'],
})
export class AppShellComponent implements OnInit {
  public fileList: FileModel[] = [];
  public allowedFileTypes = environment.allowedFileTypes;
  public allowedFileMaxSize = environment.allowedFileMaxSize;
  constructor(private fileService: FileService) {}

  ngOnInit(): void {
    this.getFilesListFromServer();
  }

  UploadFile(fileToUpload: File) {
    this.fileService.uploadFile(fileToUpload).subscribe(
      (file: FileModel) => {
        this.getFilesListFromServer();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  private getFilesListFromServer() {
    this.fileService.getFiles().subscribe((files: FileModel[]) => {
      this.fileList = files;
    });
  }
  }

