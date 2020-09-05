import { Component, OnInit, Input } from '@angular/core';
import { FileModel } from '../_models/fileModel';

@Component({
  selector: 'app-file-view',
  templateUrl: './file-view.component.html',
  styleUrls: ['./file-view.component.scss'],
})
export class FileViewComponent implements OnInit {
  public files: FileGroup[];

  @Input() set fileList(fileList: FileModel[]) {
    this.files = [];
    const groups = new Set(fileList.map((item) => item.fileType));
    groups.forEach((fileType) => {
      this.files.push({
        fileType,
        fileModels: fileList.filter((f) => f.fileType === fileType),
      });
    });
  }

  constructor() {}

  ngOnInit(): void {}

}

interface FileGroup
  {
    fileType: string;
    fileModels: FileModel[];
  }

