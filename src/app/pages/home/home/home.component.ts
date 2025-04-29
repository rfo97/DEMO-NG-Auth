import { Component, Input } from '@angular/core';
import { Note } from '../../../interfaces/note/note';
import { NotesService } from '../../../services/notes/notes.service';
import { NotesComponent } from "../../notes/notes.component";
import { AuthRequest, AuthResponse } from '../../../interfaces/auth/auth';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-home',
  imports: [NotesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {

  email: string = '';

  user!: AuthRequest
  users: AuthRequest[] = [];
  
  constructor(private authService: AuthService){
    this.email = sessionStorage.getItem('email') || '';
    this.authService.getAllUsers().subscribe((response: AuthRequest[])=>{
      this.users = response
      console.log(this.users)
    })
    }

    ngOnInit(){
      const filtered = this.users.filter(user => user.email === this.email);
      if (filtered.length > 0) {
        this.user = filtered[0];
        console.log("user:", this.user);
      } else {
        console.log("User not found");
      }
    }
}
