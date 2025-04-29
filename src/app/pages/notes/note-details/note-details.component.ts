import { Component, Input } from '@angular/core';
import { NotesService } from '../../../services/notes/notes.service';
import { Note } from '../../../interfaces/note/note';
import { AuthService } from '../../../services/auth/auth.service';
import { AuthRequest } from '../../../interfaces/auth/auth';

@Component({
  selector: 'app-note-details',
  imports: [],
  templateUrl: './note-details.component.html',
  styleUrl: './note-details.component.css'
})
export class NoteDetailsComponent {

  constructor(private noteService: NotesService,
    private authService: AuthService
  ){

    }
    notes!: Note[]
    users!: AuthRequest[]
    @Input() note!: Note;

    ngOnInit(): void {
      this.noteService.getNotes().subscribe((response: Note[])=>{
        this.notes = response
      })

      this.authService.getAllUsers().subscribe((response: AuthRequest[])=> {
        this.users = response
      })
    }

    // onSubmit(){
    //   this.noteService.getNoteById()
    // }

}
