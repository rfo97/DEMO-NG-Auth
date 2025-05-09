import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormErrorComponent } from '../../../shared/form-error/form-error.component';
import { AuthService } from '../../../services/auth/auth.service';
import { AuthResponse } from '../../../interfaces/auth/auth';
import { TokenService } from '../../../services/token/token.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, FormErrorComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router) {
    this.registerForm = this.fb.group({
      name: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
     // image: [null, [Validators.required]]
    });
  }

  onSubmit() {
    console.log('Form Data:', this.registerForm.value);
    if(this.registerForm){

    const fileInput = document.querySelector<HTMLInputElement>('#image');

    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const fileName = file.name;
      console.log('Selected file name:', fileName);
      const formdata = new FormData();
      // formdata.append("image", `http://task-react-auth-backend.eapi.joincoded.com/${fileName}`);
      formdata.append("image", `media/${fileName}`);
      formdata.append("name", this.registerForm.value.name);
      formdata.append("email", this.registerForm.value.email);
      formdata.append("password", this.registerForm.value.password);

      this.authService.register(formdata).subscribe((response: AuthResponse)=>{
        console.log("Response: ", response)
        if(response){
          this.tokenService.setToken(response.token)

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
        //console.log("successful subscribe")
        Toast.fire({
          icon: 'success',
          title: 'Registration Successful! Please log in'
        });
        this.router.navigate(['/login'])



          
        }
      })

    }
  }







  }
}
