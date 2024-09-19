import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { TemaService } from '../../core/services/tema.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule } from '@angular/router'; // Importa RouterModule
import { UserDataService } from '../../core/services/user.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    CommonModule,
    MatFormFieldModule,
    RouterModule,],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavBarComponent implements OnInit {

  colorToolbar: string = 'primary';
  notificationCount: number = 5;
  correo: string = '';
  rol: string = '';

  constructor(
    private temaService: TemaService,
    private userDataService: UserDataService) { 

  }

  ngOnInit() {
    this.temaService.temaActual$.subscribe(tema => {
      this.colorToolbar = tema === 'tema-claro' ? 'primary' : 'accent';
    });

    const userData = this.userDataService.getUserData();
    if (userData) {
      this.correo = userData.CORREO; 
      this.rol = this.getRol(userData.ID_ROL);
    }

    console.log(this.correo);
    console.log(this.rol);
  }

  cambiarTema(tema: string) {
    this.temaService.setTheme(tema);
  }

  getTemaActual(): string {
    return this.temaService.getTheme();
  }

  getRol(ID_ROL: number): string {
    const estados: { [key: number]: string } = {
      1: 'Médico General',
      2: 'Asistente Médico',
      3: 'Médico Tratante',
      4: 'Director',
      5: 'Coordinador Clínico',
    };
    return estados[ID_ROL] || 'Estado Desconocido';
  }
}