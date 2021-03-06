import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { User } from '../../_models/user';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../../_services/alertify.service';
import { NgForm } from '@angular/forms';
import { UserService } from '../../_services/user.service';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm', { static: true }) editForm: NgForm;
  user: User;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      return event.returnValue = true;
    }
  }

  constructor(private route: ActivatedRoute, private alertify: AlertifyService,
    private userService: UserService, private authService: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });
  }

  updateUser() {
    let createToken = false;
    this.userService.updateUser(this.authService.decodedToken.nameid, this.user).subscribe(next => {
      // this.alertify.success('Profile updated successfully');
      this.alertify.success('Корисничкиот профил беше успешно зачуван');
      this.editForm.reset(this.user);
      createToken = true;
      this.authService.creteToken(this.user.id, this.user.username).subscribe(nextCreateToken => {
        }, error => {
        this.alertify.error(error);
        });
    }, error => {
      this.alertify.error(error);
    });
  }

}
