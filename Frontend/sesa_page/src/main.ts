import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// Importar solo los estilos de Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// Importar el script de Bootstrap para que se registre en el scope global
import 'bootstrap';

// Iniciar la aplicación Angular
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
