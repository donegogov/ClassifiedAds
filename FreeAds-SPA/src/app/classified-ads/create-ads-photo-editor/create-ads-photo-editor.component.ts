import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FileUploader, FileItem } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/_services/auth.service';
import { NgControl } from '@angular/forms';

@Component({
  selector: 'app-create-ads-photo-editor',
  templateUrl: './create-ads-photo-editor.component.html',
  styleUrls: ['./create-ads-photo-editor.component.css']
})
export class CreateAdsPhotoEditorComponent implements OnInit {
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  classifiedAdId: number;
  fileHelper: FileItem[];

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.initializeUploader();
    this.fileHelper = [];
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploaderUrl(classifiedAdId: number) {
    let i = 0;
    this.uploader.queue.forEach((elem) => {
      this.fileHelper[i].url = this.baseUrl + this.authService.decodedToken.nameid + '/photos/' + classifiedAdId;
      elem = this.fileHelper[i];
      i = i + 1;
    });
  }

  initializeUploader() {
    // this.uploader.options.url = '';
    this.uploader = new FileUploader({
      // url: this.baseUrl + this.authService.decodedToken.nameid + '/photos/' + this.classifiedAdId,
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
      this.fileHelper.push(file);
     };

    // this.uploader.onSuccessItem = (item, response, status, headers) => {
    //   if (response) {
    //     const res: Photo = JSON.parse(response);
    //     const photo = {
    //       id: res.id,
    //       url: res.url,
    //       dateAdded: res.dateAdded,
    //       isMain: res.isMain
    //     };

    //     this.photos.push(photo);
    //   }
    // };
  }

}
