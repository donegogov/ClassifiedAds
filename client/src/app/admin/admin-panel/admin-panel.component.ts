import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserForManagement } from 'src/app/_models/users-for-management';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  users: any[] = [];
  usersForManagement: UserForManagement[] = [];
  classfiedAds: any[];

  constructor(private adminService: AdminService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      // this.classifiedAdsList = data['classifiedAdsList'];
      this.users = data['users'].users;
      console.log(data['users'].users);
    });

    this.extractUsers();
    console.log('this.usersForManagement= ' + this.usersForManagement);
    console.log(this.usersForManagement);
  }

  /* getUsersWithRoles() {
    this.adminService.getUsersWithRoles().subscribe(users => {
      this.users = users;
      console.log(this.users);
      this.extractUsers();
    })
  } */

  extractUsers() {
    console.log('extractUsers() {');
    this.users.forEach(element => {
      let user: UserForManagement = {
        id: element.id,
        username: element.username,
        roles: element.roles,
        city: element.city
      };
      console.log('element');
      console.log(element);
      
      this.usersForManagement.push(user);
      console.log('user this.usersForManagement');
      console.log(user);
      console.log(this.usersForManagement);
    });
  }

}
