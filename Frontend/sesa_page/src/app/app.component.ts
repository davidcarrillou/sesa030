import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { NavBarComponent } from './component/navbar/navbar.component';
import { SidebarComponent } from "./component/sidebar/sidebar.component";
import { LoginComponent } from './component/login/login.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NgxSpinnerModule,
    NavBarComponent,
    SidebarComponent,
    LoginComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'sesa_page';
  constructor(private spinner: NgxSpinnerService) {}

  showSpinner() {
    this.spinner;
    this.spinner.show(undefined, {
      type: "ball-scale-ripple",
      size: "default",
      bdColor: "rgba(0, 0, 0, 0.8)",
      color: "white",
    });
  }

  hideSpinner() {
    this.spinner.hide(); // Oculta el spinner
  }
}
