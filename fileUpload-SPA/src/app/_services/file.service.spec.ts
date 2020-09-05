import { TestBed } from '@angular/core/testing';

import { FileService } from './file.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('FileService', () => {
  let service: FileService;
  let httpTestingController: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FileService],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(FileService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });
  afterEach(() => httpTestingController.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
