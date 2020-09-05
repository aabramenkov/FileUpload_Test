import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormControl,
  ValidatorFn,
} from '@angular/forms';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  
})
export class FileUploadComponent implements OnInit {
  private fileToUpload: File;
  @Input() allowedFileTypes: string[];
  @Input() allowedFileMaxSize: number;
  @Output() fileUploadedEvent = new EventEmitter<File>();

  public fileValid = true;

  constructor() {}

  ngOnInit(): void {}

  submitUpload() {
    this.fileUploadedEvent.emit(this.fileToUpload);
  }

  handleFileInput(files: FileList) {
    if (files.length > 1) {
      console.log('Multiply files selecting nog allowed');
      return;
    }
    this.fileToUpload = files.item(0);
    this.fileValid = this.isFileValid(this.fileToUpload);
  }

  private isFileValid(file: File): boolean {
      if (file) {
        const extention = this.getExtension(file.name);
        if (!this.isAcceptedFileFormat(extention) || file.size > this.allowedFileMaxSize) {
          return false;
        }
        return true;
      }
      return true;
    }


  private isAcceptedFileFormat(fileType: string): boolean {
    let result = false;
    this.allowedFileTypes.forEach((allowedType) => {
      if (fileType === allowedType) {
        result = true;
        return;
      }
    });
    return result;
  }

  private getExtension(filename: string): string {
    const parts = filename.split('.');
    return parts[parts.length - 1];
  }
}
