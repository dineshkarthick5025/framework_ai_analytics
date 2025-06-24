import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-user-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent {
  loginForm: FormGroup;
  signUpForm: FormGroup;
  isBusiness: boolean = false;
  isLoginMode: boolean = true;

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.signUpForm = this.fb.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      isBusiness: [false],
      businessName: [''],
      businessAddress: [''],
      businessPhone: ['']
    });

    this.signUpForm.get('isBusiness')?.valueChanges.subscribe(value => {
      this.isBusiness = value;
      if (value) {
        this.signUpForm.get('businessName')?.setValidators(Validators.required);
        this.signUpForm.get('businessAddress')?.setValidators(Validators.required);
        this.signUpForm.get('businessPhone')?.setValidators(Validators.required);
      } else {
        this.signUpForm.get('businessName')?.clearValidators();
        this.signUpForm.get('businessAddress')?.clearValidators();
        this.signUpForm.get('businessPhone')?.clearValidators();
      }
      this.signUpForm.get('businessName')?.updateValueAndValidity();
      this.signUpForm.get('businessAddress')?.updateValueAndValidity();
      this.signUpForm.get('businessPhone')?.updateValueAndValidity();
    });
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onLoginSubmit() {
    if (this.loginForm.valid) {
      this.http.post('http://localhost:8080/api/auth/signin', this.loginForm.value).subscribe({
        next: (response) => {
          console.log('Login successful', response);
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Login failed', error);
          alert('Invalid username or password');
        }
      });
    }
  }

  onSignUpSubmit() {
    if (this.signUpForm.valid) {
      this.http.post('http://localhost:8080/api/auth/signup', this.signUpForm.value).subscribe({
        next: (response) => {
          console.log('Sign Up successful', response);
          this.isLoginMode = true;
        },
        error: (error) => {
          console.error('Sign Up failed', error);
          alert('Sign Up failed: ' + error.error);
        }
      });
    }
  }

  onForgotPassword() {
    // Handle forgot password logic here
    console.log('Forgot password clicked');
  }
}
