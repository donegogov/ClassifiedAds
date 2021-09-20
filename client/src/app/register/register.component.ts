import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Cities } from '../_models/constants/cities';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder, FormGroupDirective, NgForm, ValidatorFn, AbstractControl } from '@angular/forms';
import { UserForRegister } from '../_models/user-for-register';
import { ErrorStateMatcher } from '@angular/material/core';

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
  /* email: FormControl; */
  username: FormControl;
  city: FormControl;
  password: FormControl;
  confirmPassword: FormControl;
  hide = true;
  hideConfirmPassword = true;
  /* matcher = new MyErrorStateMatcher(); */

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
    /* this.email = new FormControl('', [
      Validators.required,
      Validators.email,
    ]); */
    this.username = new FormControl('', [
      Validators.required,
    ]);
    this.city = new FormControl('', [
      Validators.required,
    ]);
    this.password = new FormControl('', [
      Validators.required,
    ]);
    this.confirmPassword = new FormControl('', [ ]);

    this.registerForm = this.fb.group({
      username: this.username,
      /* email: this.email, */
      city: this.city,
      password: this.password,
      confirmPassword: this.confirmPassword
    }, {validator: [this.checkIfMatchingPasswords('password', 'confirmPassword'),
        this.checkIfPasswordIsCorrect('password')]});
  }

  checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey],
          passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({'notEquivalent': true})
      }
      else {
          return passwordConfirmationInput.setErrors(null);
      }
    }
  }

  checkIfPasswordIsCorrect(passwordKey: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey];
      if (passwordInput.value.lenght < 8) {
        return passwordInput.setErrors({'minLenght': true})
      }
      else {
          return passwordInput.setErrors(null);
      }
    }
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : {'mismatch': true};
  }

  checkPasswords(group: FormGroup) {
    const pass = group.controls.password.value;
    const confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null :  true;
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

  /* getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Внесете емаил';
    }

    return this.email.hasError('email') ? 'Емаилот не е валиден' : '';
  } */

}
