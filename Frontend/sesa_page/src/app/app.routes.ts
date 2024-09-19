import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { CitasComponent } from './component/citas/citas.component';
import { PersonalComponent } from './component/personal/personal.component';
import { PerfilComponent } from './component/perfil/perfil.component';
import { HomeComponent } from './component/home/home.component';
import { PacientesComponent } from './component/pacientes/pacientes.component';
import { HorarioComponent } from './component/horario/horario.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    {
        path: 'page', component: HomeComponent,
        children: [
            { path: 'paciente', component: PacientesComponent },
            { path: 'cita', component: CitasComponent },
            { path: 'personal', component: PersonalComponent },
            { path: 'horario', component: HorarioComponent },
            { path: 'perfil', component: PerfilComponent },
        ]
    }
];
