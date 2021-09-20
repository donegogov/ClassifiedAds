import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxMasonryOptions } from 'ngx-masonry';

@Component({
  selector: 'app-classified-ads-modal',
  templateUrl: './classified-ads-modal.component.html',
  styleUrls: ['./classified-ads-modal.component.css']
})
export class ClassifiedAdsModalComponent implements OnInit {
  photos: any[] = [];
  approveOrDissapproveForm: FormGroup;
  myOptions: NgxMasonryOptions = {
    gutter: 10
  };

  approveOrDissapproveData: ApprovedOrDissapprovedData = {
    is_approved_checked: false,
    is_dissapproved_checked: false
  };

  constructor(public dialogRef: MatDialogRef<ClassifiedAdsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.approveOrDissapproveForm = this.fb.group({
      approve: false,
      dissapprove: false
    });
    console.log(this.data);
    this.photos = this.data.photos;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

export interface DialogData {
  photos: any[];
}

export interface ApprovedOrDissapprovedData {
  is_approved_checked: boolean;
  is_dissapproved_checked: boolean;
}
