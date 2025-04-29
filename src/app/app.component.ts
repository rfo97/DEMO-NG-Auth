import { Component, Inject, InjectionToken, Output, output } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'auth-app';
  @Output() note! =

  navi! : any
  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    this.navi = nav?.extractedUrl; // receive the email state sent on successful login
  }

}
