import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { PersonalService } from '../../core/services/personal.service';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { BusyService } from '../../core/services/busy.service';
import { UserDataService } from '../../core/services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  hide = true;
  mensajeError: string = '';
  mostrarMensajeError = false;

  constructor(
    private fb: FormBuilder,
    private personalService: PersonalService,
    private busyService: BusyService,
    private userService: UserDataService,
    private router: Router,
    private spinner: NgxSpinnerService) {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.maxLength(21)]]
    });
  }

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

  onSubmit(): void {
    this.showSpinner();
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    if (this.loginForm.valid) {
      console.log('datos a enviar:', this.loginForm.value);
      this.personalService.iniciarSesion(email, password).subscribe({
        next: response => {
          // Maneja la respuesta del API
          console.log('Respuesta del API:', response);
          this.mostrarMensajeError = false
          this.mensajeError = "";
          this.userService.setUserData(response);
          // Ejemplo de redirección tras el inicio de sesión
          this.router.navigate(['/page/cita']);
        },
        error: error => {
          // Manejo de errores HTTP, como mostrar un mensaje de error al usuario
          this.hideSpinner();
          this.mostrarMensajeError = true
          this.mensajeError = error.message; // Muestra el mensaje de error al usuario
          console.log('Error al iniciar sesión:', error);
        },
        complete: () => {
          // Opcional: código que quieres ejecutar cuando se complete la suscripción
          this.hideSpinner();
          console.log('Petición de inicio de sesión completada');
        }
      });
    }
  }
}