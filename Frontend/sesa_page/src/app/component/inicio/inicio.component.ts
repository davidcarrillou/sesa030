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


@Component({
  selector: 'app-inicio',
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
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit {

  colorToolbar: string = 'primary';
  notificationCount: number = 5;

  constructor(private temaService: TemaService) { }

  ngOnInit() {
    this.temaService.temaActual$.subscribe(tema => {
      this.colorToolbar = tema === 'tema-claro' ? 'primary' : 'accent';
    });
  }

  cambiarTema(tema: string) {
    this.temaService.setTheme(tema);
  }

  getTemaActual(): string {
    return this.temaService.getTheme();
  }
}
