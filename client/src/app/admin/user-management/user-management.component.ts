import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RolesModalComponent } from 'src/app/modals/roles-modal/roles-modal.component';
import { UserForManagement } from 'src/app/_models/users-for-management';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  @Input() users: UserForManagement[];
  dataSource: any[] = [];
  displayedColumns: string[] = [];
  user: any = {};

  constructor(public dialog: MatDialog, private adminService: AdminService) { }

  ngOnInit(): void {
    console.log('userForManagement= ' + this.users);

    this.displayedColumns = ['username', 'roles', 'city', 'edit-roles'];
    this.dataSource = this.users;
  }

  openDialog(user: any) {
    console.log(user);
    this.user = user;
    const dialogRef = this.dialog.open(RolesModalComponent, {
      data: {
        username: this.user.username, city: this.user.city, roles: this.user.roles
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result: ${result}');
      console.log(result);
      let roles: string[] = []
      if (result.is_member_checked) {
        roles.push('Member');
      }
      if (result.is_moderator_checked) {
        roles.push('Moderator');
      }
      if (result.is_admin_checked) {
        roles.push('Admin');
      }


      this.adminService.updateUserRoles(this.user.id, roles).subscribe(response => {
        console.log('response');
        console.log(response);
        if (response['status_code'] === 200) {
          user.roles = roles;
        }
        
      })
    });
  }

}