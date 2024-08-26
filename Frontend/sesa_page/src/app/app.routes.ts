import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { InicioComponent } from './component/inicio/inicio.component';
import { CitasComponent } from './component/citas/citas.component';
import { PersonalComponent } from './component/personal/personal.component';
import { PerfilComponent } from './component/perfil/perfil.component';
import { NavBarComponent } from './component/navbar/navbar.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'inicio', component: InicioComponent },
    { path: 'citas', component: CitasComponent },
    { path: 'personal', component: PersonalComponent },
    { path: 'perfil', component: PerfilComponent },
    { path: 'bar', component: NavBarComponent },
];
