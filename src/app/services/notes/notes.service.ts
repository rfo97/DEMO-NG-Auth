import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthRequest, AuthResponse } from '../../interfaces/auth/auth';
import { Note } from '../../interfaces/note/note';

@Injectable({
  providedIn: 'root'
})
export class NotesService extends BaseService {
  private readonly baseUrl = 'https://task-react-auth-backend.eapi.joincoded.com/api';

  constructor(_http: HttpClient) {
    super(_http);
  }
  selectedNote!: Note
  getNotes(): Observable<Note[]> {
    return this.get<Note[]>(
      `${this.baseUrl}/notes`,
    ).pipe(
      catchError((error) => {
        console.error('getNotes() failed:', error);
        return throwError(() => error);
      })
    );
  }


  getNoteById1(id:string): Observable<Note[]>{
    return this.get<Note[]>(
      `${this.baseUrl}/notes/id`,
    ).pipe(
      catchError((error) => {
        console.error('getNoteById() failed:', error);
        return throwError(() => error);
      })
    );

  }

  getNoteById(id: string): Observable<any> {
    return this.get(`${this.baseUrl}/notes/${id}`);
  }

  // register(data: FormData): Observable<AuthResponse> {
  //   return this.post<AuthResponse, FormData>(
  //     `${this.baseUrl}/auth/register`,
  //     data
  //   ).pipe(
  //     catchError((error) => {
  //       console.error('Registration failed:', error);
  //       return throwError(() => error);
  //     })
  //   );
  // }
}
