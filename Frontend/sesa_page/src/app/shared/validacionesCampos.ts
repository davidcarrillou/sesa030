import { FormGroup, AbstractControl } from '@angular/forms';

export function validacionesCampos(form: FormGroup): { mensajeError: string, mensajeExito: string } {
  let mensajeError = '';
  let mensajeExito = '';

  // Recorre todos los controles en el formulario
  Object.keys(form.controls).forEach(field => {
    const control = form.get(field);

    // Si el control tiene un error, genera el mensaje correspondiente
    if (control && control.errors) {
      const errores = control.errors;

      if (errores['required']) {
        mensajeError = `El campo ${obtenerNombreCampo(field)} es obligatorio.`;
      } else if (errores['minlength']) {
        mensajeError = `El campo ${obtenerNombreCampo(field)} debe tener al menos ${errores['minlength'].requiredLength} caracteres.`;
      } else if (errores['maxlength']) {
        mensajeError = `El campo ${obtenerNombreCampo(field)} no debe exceder los ${errores['maxlength'].requiredLength} caracteres.`;
      } else if (errores['email']) {
        mensajeError = `El campo ${obtenerNombreCampo(field)} no es un correo válido.`;
      }
    }

    // Si el campo tiene un valor '0' por defecto y es obligatorio, muestra un mensaje de selección
    if (control?.value === "0" || control?.value === '0') {
      mensajeError = `Debe seleccionar un ${obtenerNombreCampo(field)}.`;
    }
  });

  // Si no hay errores, muestra el mensaje de éxito
  if (!mensajeError) {
    mensajeExito = 'Formulario completado correctamente.';
  }

  return { mensajeError, mensajeExito };
}

// Función auxiliar para convertir el nombre del campo en algo más legible
function obtenerNombreCampo(campo: string): string {
  const nombresAmigables: { [key: string]: string } = {
    matricula: 'Matrícula',
    nombre: 'Nombre',
    apellidoPat: 'Apellido Paterno',
    apellidoMat: 'Apellido Materno',
    telefono: 'Teléfono',
    rol: 'Rol',
    sexo: 'Sexo',
    gnero: 'Genero',
    correo: 'Correo',
    password: 'Contraseña',
    dias: 'Dias',
    horaini: 'Hora Inicio',
    horafin: 'Hora Fin',
    selectPersonal: 'Personal',
    nota: 'Nota',
    curp: 'Curp',
  };

  return nombresAmigables[campo] || campo;
}
