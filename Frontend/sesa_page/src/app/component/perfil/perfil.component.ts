import { Component, OnInit } from '@angular/core';
import { TemaService } from '../../core/services/tema.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

// Angular Material Modules
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    FormsModule, // Necesario para [(ngModel)]
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {

  userData = {
    name: '',
    email: ''
  };
  userIcon = '../assets/img/mujer.png'; // Ruta del ícono del usuario
  selectedTheme = 'tema-claro'; // Tema por defecto

  constructor(private temaService: TemaService) { }

  ngOnInit() {
    this.selectedTheme = this.temaService.getTheme(); // Establece el tema al cargar el componente
  }

  onSave() {
    // Lógica para guardar los datos del usuario
    console.log('Datos guardados:', this.userData);
  }

  onThemeChange(theme: string) {
    this.temaService.setTheme(theme);
    document.body.classList.remove('tema-claro', 'tema-oscuro');
    document.body.classList.add(theme);
  }
}