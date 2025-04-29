import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { NotesService } from '../../services/notes/notes.service';
import { Note } from '../../interfaces/note/note';
import { NoteDetailsComponent } from "./note-details/note-details.component";
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-notes',
  imports: [NoteDetailsComponent, FormsModule],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css'
})

export class NotesComponent {

  constructor(private noteService: NotesService, private router: Router){
    this.noteService.getNotes().subscribe((response: Note[])=>{
      this.notes=response
      this.NoteById=response
    })
  }
  notes!: Note[]
  NoteById!: Note[]
  noteId: string = '';
  noteFound: boolean = false;
  getNoteById(){

    
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

      const id = this.noteId.trim();
      if (!id) return;
  
      this.noteService.getNoteById(id).subscribe({
        next: (note) => {
          //console.log('Note found:', note);
          // Navigate to note details or display it
          this.noteService.selectedNote = note;
          this.noteFound = true
          console.log('Note found:'+ this.noteFound + " " +  this.noteService.selectedNote);
          this.router.navigate(['/notes', id]);
        },
        error: (err) => {
          console.error('Note not found or error:', err);
          Toast.fire({
            icon: 'error',
            title: 'Note not found!'
          });
          
        }
      });
  
      this.noteId = '';
    }
    

    
  }
  

