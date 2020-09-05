import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { FileViewComponent } from './file-view/file-view.component';
import { HttpClientModule } from '@angular/common/http';
import { AppShellComponent } from './app-shell/app-shell.component';

@NgModule({
  declarations: [
    AppComponent,
    FileUploadComponent,
    FileViewComponent,
    AppShellComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
