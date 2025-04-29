import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { NotesService } from '../../services/notes/notes.service';
import { Note } from '../../interfaces/note/note';
import { NoteDetailsComponent } from "./note-details/note-details.component";

@Component({
  selector: 'app-notes',
  imports: [NoteDetailsComponent],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css'
})
export class NotesComponent {

  constructor(private noteService: NotesService){

  }
  notes!: Note[]

  ngOnInit(): void {
    this.noteService.getNotes().subscribe((response: Note[])=>{
      this.notes=response
    })
  }
}
