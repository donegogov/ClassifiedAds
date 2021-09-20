import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-roles-modal',
  templateUrl: './roles-modal.component.html',
  styleUrls: ['./roles-modal.component.css']
})
export class RolesModalComponent implements OnInit {
  username: string = '';
  city: string = '';
  roles: any[] = [];
  userRoles: any[] = ['Member', 'Moderator', 'Admin'];
  rolesForm: FormGroup;

  rolesData: RolesData = {
    is_member_checked: false,
    is_moderator_checked: false,
    is_admin_checked: false,
  };

  constructor(public dialogRef: MatDialogRef<RolesModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.rolesForm = this.fb.group({
      member: false,
      moderator: false,
      admin: false
    });
    console.log('this.roles');
    console.log(this.data.roles.includes('Moderator'));
    this.rolesData.is_member_checked = this.data.roles.includes('Member');
    this.rolesData.is_moderator_checked = this.data.roles.includes('Moderator');
    this.rolesData.is_admin_checked = this.data.roles.includes('Admin');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

export interface DialogData {
  username: string;
  roles: string[];
  city: string;
}

export interface RolesData {
  is_member_checked: boolean;
  is_moderator_checked: boolean;
  is_admin_checked: boolean;
}
