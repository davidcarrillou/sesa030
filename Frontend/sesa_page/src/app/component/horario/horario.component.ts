import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { HorariosService } from '../../core/services/horario.service';
import { validacionesCampos } from '../../shared/validacionesCampos';
import { PersonalService } from '../../core/services/personal.service';
import { constantesGlobales } from '../../shared/global.constants';

@Component({
  selector: 'app-horario',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatIconModule,
  ],
  templateUrl: './horario.component.html',
  styleUrl: './horario.component.css'
})
export class HorarioComponent implements OnInit {
  altaHorarioForm: FormGroup;
  listahorario: any[] = [];
  mensajeError: string = '';
  mensajeExito: string = '';
  listaPersonal: any[] = [];
  datosCargados: any;
  idelement: number = 0;
  charCount: number = 0;
  charCountColor: string = 'black';
  columnas: string[] = ['idHorario', 'horario', 'hora', 'personal', 'matricula', 'notas', 'acciones'];
  row: any;

  constructor(
    private personalService: PersonalService,
    private horarioService: HorariosService,
    private fb: FormBuilder,
  ) {
    this.altaHorarioForm = this.fb.group({
      dias: [''],
      horaini: [''],
      horafin: [''],
      selectPersonal: ['0'],
      nota: [''],
    });

    // Actualizar contador cuando cambie el valor del campo
    this.altaHorarioForm.get('nota')?.valueChanges.subscribe(value => {
      this.updateCharCount();
    });
  }

  ngOnInit(): void {
    console.log("entrando en el componente pacientes");
    this.cargaHorarios();
    this.cargaListaPersonal();
  }

  cargaHorarios() {
    this.horarioService.obtenerHorarios().subscribe({
      next: data => {
        console.log('Respuesta del API:', data);
        this.listahorario = data;
        this.actualizarTabla();
      },
      error: error => console.error('Error al obtener personal:', error)
    });
  }

  cargaListaPersonal() {
    this.personalService.obtenerPersonal().subscribe({
      next: data => {
        console.log('Respuesta del API:', data);
        this.listaPersonal = data;
      },
      error: error => console.error('Error al obtener personal:', error)
    });
  }

  alta_Horario(): void {
    if (this.altaHorarioForm.valid) {
      console.log('datos exito formulario:', this.altaHorarioForm.value);
      this.mensajeExito = 'Formulario enviado con éxito';
      this.mensajeError = '';

      // Preparar el JSON con los datos del formulario
      const dataHorario = {
        HORARIO: this.altaHorarioForm.value.dias,
        MATRICULAMED: this.altaHorarioForm.value.selectPersonal,
        ACTIVO: true,
        HORA_INICIO: this.altaHorarioForm.value.horaini,
        HORA_FIN: this.altaHorarioForm.value.horafin,
        NOTAS: this.altaHorarioForm.value.nota
      };

      // Llamar al servicio para registrar el horario
      this.horarioService.crearHorario(dataHorario).subscribe({
        next: (response) => {
          console.log('Horario creado con éxito:', response);
          this.mensajeExito = 'Horario registrado con éxito';
          this.mensajeError = '';

          // Limpiar el formulario
          this.limpiarFormulario();
          //actualiza la tabla de horarios
          this.cargaHorarios();
        },
        error: (error) => {
          console.error('Error al crear el horario:', error);
          this.mensajeError = 'Ocurrió un error al crear el horario, por favor intente de nuevo.';
          this.mensajeExito = '';
        }
      });
    } else {
      this.validarFormulario();
    }
  }


  validarFormulario(): void {
    const validaciones = validacionesCampos(this.altaHorarioForm);
    this.mensajeError = validaciones.mensajeError;
    this.mensajeExito = validaciones.mensajeExito;
  }

  cargarDatos(element: any): void {
    console.log('Actualizar estado de:', element);
    this.idelement = element.ID_HORARIO
    this.altaHorarioForm.setValue({
      dias: element.HORARIO,
      horaini: element.HORA_INICIO,
      horafin: element.HORA_FIN,
      selectPersonal: element.MATRICULAMED,
      nota: element.NOTAS,
    });
    this.datosCargados = this.altaHorarioForm.value;
    this.updateCharCount();
  }

  limpiarFormulario() {
    this.mensajeError = "";
    this.mensajeExito = "";
    this.altaHorarioForm.reset();
    this.altaHorarioForm.patchValue({
      selectPersonal: 0
    });
  }

  eliminar(element: any): void {
    // Cambiar el estado del elemento localmente
    const nuevoEstado = { ACTIVO: false };

    // Llamar al servicio para actualizar el estado en la base de datos
    this.horarioService.actualizarHorario(element.ID_HORARIO, nuevoEstado).subscribe({
      next: (respuesta) => {
        console.log('Horario actualizado correctamente:', respuesta);

        // Actualizar el estado del elemento en la lista local
        element.ACTIVO = false;

        // Actualizar la tabla para reflejar los cambios
        this.actualizarTabla();
      },
      error: (error) => {
        console.error('Error al actualizar el estado del horario:', error);
        // Manejar el error (mostrar un mensaje o algo similar)
      }
    });
  }

  actualizarRegistro(): void {
    console.log('Actualizar estado de:', this.altaHorarioForm.value);
    console.log('id del elemento:', this.idelement);
    this.mensajeExito = "";
    this.mensajeError = "";
    if (this.altaHorarioForm.valid) {
      if (this.datosCargados === this.altaHorarioForm.value) {
        this.mensajeError = constantesGlobales.ERROR_SIN_CAMBIO
      } else {
        // Preparar el JSON con los datos del formulario
        const dataHorario = {
          HORARIO: this.altaHorarioForm.value.dias,
          MATRICULAMED: this.altaHorarioForm.value.selectPersonal,
          ACTIVO: true,
          HORA_INICIO: this.altaHorarioForm.value.horaini,
          HORA_FIN: this.altaHorarioForm.value.horafin,
          NOTAS: this.altaHorarioForm.value.nota
        };
        /*/ Llamar al servicio para actualizar el estado en la base de datos*/
        this.horarioService.actualizarHorario(this.idelement, dataHorario).subscribe({
          next: (respuesta) => {
            console.log('Horario actualizado correctamente:', this.listahorario);
            this.mensajeExito = constantesGlobales.EXITO_ACTUALIZACION;
            this.cargaHorarios();
          },
          error: (error) => {
            if (error.message === constantesGlobales.ERROR_DATOS_SIN_CAMBIO) {
              console.log(constantesGlobales.ERROR_SIN_CAMBIO);
              this.mensajeError = constantesGlobales.ERROR_SIN_CAMBIO
            } else {
              console.error('Ocurrió un error al actualizar el horario:', error);
              this.mensajeError = `Ocurrió un error al actualizar el horario: ${error}`;
            }
          }
        });
      }
    } else {
      this.validarFormulario();
    }
  }

  actualizarTabla(): void {
    // Filtrar los horarios que estén activos
    this.listahorario = this.listahorario
      .filter(horario => horario.ACTIVO)  // Filtra los horarios que estén activos
      .sort((a, b) => {
        // Ordenar por FECHA_REGISTRO en orden descendente (los más nuevos primero)
        return new Date(b.FECHA_REGISTRO).getTime() - new Date(a.FECHA_REGISTRO).getTime();
      });
  }

  // Actualiza el contador y cambia el color según la cantidad de caracteres
  updateCharCount() {
    const currentText = this.altaHorarioForm.get('nota')?.value || '';
    this.charCount = currentText.length;

    if (this.charCount >= 250) {
      this.charCountColor = 'red'; // Color rojo al llegar al límite
    } else if (this.charCount >= 200) {
      this.charCountColor = 'Tomato'; // Color naranja cuando se acerque al límite
    } else {
      this.charCountColor = 'black'; // Color por defecto
    }
  }

}