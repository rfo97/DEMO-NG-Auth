import { Component, Input } from '@angular/core';
import { Note } from '../../../interfaces/note/note';
import { NotesService } from '../../../services/notes/notes.service';
import { NotesComponent } from "../../notes/notes.component";

@Component({
  selector: 'app-home',
  imports: [NotesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {


  @Input() notes: Note[] = [];
  constructor(private noteService: NotesService){

    }

    ngOnInit(): void {
      this.noteService.getNotes().subscribe((response: Note[])=>{
        this.notes=response
      })
    }

}
