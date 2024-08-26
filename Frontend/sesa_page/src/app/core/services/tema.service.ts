import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TemaService {

  private temaActual = new BehaviorSubject<string>('tema-claro');
  temaActual$ = this.temaActual.asObservable();

  constructor() {
    const storedTheme = this.getStoredTheme();
    if (storedTheme) {
      this.aplicarTema(storedTheme);
      this.temaActual.next(storedTheme);
    }
  }

  setTheme(theme: string) {
    this.aplicarTema(theme);
    localStorage.setItem('themeColor', theme);
    this.temaActual.next(theme);
  }

  private aplicarTema(theme: string) {
    const body = document.body;
    body.classList.remove('tema-claro', 'tema-oscuro');
    body.classList.add(theme);
  }

  private getStoredTheme(): string | null {
    return localStorage.getItem('themeColor');
  }

  getTheme(): string {
    const storedTheme = this.getStoredTheme();
    return storedTheme ? storedTheme : 'tema-claro'; // 'tema-claro' es el tema predeterminado
  }
}
