import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormErrorComponent } from '../../../shared/form-error/form-error.component';
import { AuthService } from '../../../services/auth/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, FormErrorComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService : AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
      });
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          sessionStorage.setItem('token', response.token); // save token in session storage
          sessionStorage.setItem('email', this.loginForm.value.email); // save email in session storage
          
          Toast.fire({
            icon: 'success',
            title: 'Login Successful!'
          });
          
          this.router.navigate(['/'])
        },
        error: (err) => {
          Toast.fire({
            icon: 'error',
            title: 'Login failed. Please try again'
          });        
        },
      });
    }
  }

  // onSubmit1() {
  //   console.log('Form Data:', this.loginForm.value);
  //   if(this.loginForm){
  //     this.authService.login({
  //       email: this.loginForm.value.email,
  //       password: this.loginForm.value.password
  //     }).subscribe(()=>{
  //         const Toast = Swal.mixin({
  //               toast: true,
  //               position: 'top-end',
  //               showConfirmButton: false,
  //               timer: 3000,
  //               timerProgressBar: true,
  //               didOpen: (toast) => {
  //                 toast.addEventListener('mouseenter', Swal.stopTimer);
  //                 toast.addEventListener('mouseleave', Swal.resumeTimer);
  //               }
                
  //             });
  //       //console.log("successful subscribe")
  //       Toast.fire({
  //         icon: 'success',
  //         title: 'Login Successful!'
  //       });
  //       this.router.navigate([''])
  //       //sessionStorage.setItem('email') 
  //     })
  //   }
  // }
}
