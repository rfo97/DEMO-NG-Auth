import { Component, Input } from '@angular/core';
import { NotesService } from '../../../services/notes/notes.service';
import { Note } from '../../../interfaces/note/note';
import { AuthService } from '../../../services/auth/auth.service';
import { AuthRequest } from '../../../interfaces/auth/auth';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-note-details',
  imports: [],
  templateUrl: './note-details.component.html',
  styleUrl: './note-details.component.css'
})
export class NoteDetailsComponent {
  BASE_URL: string = "http://task-react-auth-backend.eapi.joincoded.com/"
  selectednote: any;
  constructor(private noteService: NotesService,
    private authService: AuthService, 
    private route: ActivatedRoute,
    private router: Router
  ){
    this.noteService.getNotes().subscribe((response: Note[])=>{
      this.notes = response
    })
    }
    notes!: Note[]
    users!: AuthRequest[]
    @Input() note!: Note;

    ngOnInit(): void {
      this.noteService.getNotes().subscribe((response: Note[])=>{
        this.notes = response
      })
      this.selectednote = this.noteService.selectedNote;
    
      if (!this.note) {
        const id = this.route.snapshot.paramMap.get('id') ?? "";
        this.noteService.getNoteById(id).subscribe(data => this.note = data);
      }
    }

    goBack(){
      this.router.navigate(['/notes']);
    }
}
