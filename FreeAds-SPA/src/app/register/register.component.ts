import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Cities } from '../_models/constants/cities';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserForRegister } from '../_models/user-for-register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  user: UserForRegister;
  cities: Cities[];
  registerForm: FormGroup;
  submited: boolean;

  constructor(private authService: AuthService, private alertify: AlertifyService,
    private route: ActivatedRoute, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.cities = data['cities'];
    });
    this.createRegisterForm();
    this.submited = false;
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      email: ['', Validators.required, Validators.email],
      username: ['', Validators.required],
      city: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      confirmPassword: ['', Validators.required]
    }, {validator: this.passwordMatchValidator});
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : {'mismatch': true};
  }

  register() {
    this.submited = true;
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
      this.authService.register(this.user).subscribe(() => {
        // this.alertify.success('Registration successful');
        this.alertify.success('Регистрацијата беше успешна');
      }, error => {
        this.alertify.error(error);
      }, () => {
        this.authService.login(this.user).subscribe(() => {
          this.router.navigate(['/ads-list']);
        });
      });
    } 
  }

  cancel() {
    this.submited = false;
    this.cancelRegister.emit(false);
  }

}
