import { Component, OnInit, Input } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { Photo } from 'src/app/_models/photo';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/_services/auth.service';
import { ClassifiedAdsService } from 'src/app/_services/classifiedAds.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() photos: Photo[];
  @Input() classifiedAdId: number;
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  currentMain: Photo;

  constructor(private authService: AuthService, private classifiedAdService: ClassifiedAdsService,
      private alertify: AlertifyService) {}

  ngOnInit() {
    this.initializeUploader();
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + this.authService.decodedToken.nameid + '/photos/' + this.classifiedAdId,
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => {file.withCredentials = false; };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: Photo = JSON.parse(response);
        const photo = {
          id: res.id,
          url: res.url,
          dateAdded: res.dateAdded,
          isMain: res.isMain
        };

        this.photos.push(photo);
      }
    };
  }

  setMainPhoto(photo: Photo) {
    this.classifiedAdService.setMainPhoto(this.authService.decodedToken.nameid, this.classifiedAdId, photo.id).subscribe(() => {
      this.currentMain = this.photos.filter(p => p.isMain === true)[0];
      this.currentMain.isMain = false;
      photo.isMain = true;
    }, error => {
      this.alertify.error(error);
    });
  }

  deletePhoto(id: number) {
    // this.alertify.confirm('Are you sure you want to delete this photo?', () => {
      this.alertify.confirm('Сигурни ли сте дека сакате да ја избришете сликата?', () => {
      this.classifiedAdService.deletePhoto(this.authService.decodedToken.nameid, this.classifiedAdId, id).subscribe(() => {
        this.photos.splice(this.photos.findIndex(p => p.id === id), 1);
        // this.alertify.success('Photo has been deleted');
        this.alertify.success('Сликата беше успешно избришана');
      }, error => {
        // this.alertify.error('Failed to delete the photo');
        this.alertify.error('Грешка при бришење на сликата');
      });
    });
  }
}
