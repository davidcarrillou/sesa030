import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { CitasService } from '../../core/services/citas.service';
import { UserDataService } from '../../core/services/user.service';
import { validacionesCampos } from '../../shared/validacionesCampos';
import { PacientesService } from '../../core/services/pacientes.service';
import { PersonalService } from '../../core/services/personal.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { constantesGlobales } from '../../shared/global.constants';


@Component({
  selector: 'app-citas',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatTableModule,
    NgSelectModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatIconModule,
    FormsModule,
  ],
  templateUrl: './citas.component.html',
  styleUrl: './citas.component.css'
})
export class CitasComponent implements OnInit {
  altaCitaForm: FormGroup;
  estadoShow = false;
  datosCargados: any;
  idelement: number = 0;
  listacita: any[] = [];
  listaPersonal: any[] = [];
  listaPaciente: any[] = [];
  mensajeError: string = '';
  mensajeExito: string = '';
  columnas: string[] = ['idCita', 'paciente', 'fecha', 'hora', 'tipocita', 'estado', 'atiende', 'acciones'];

  constructor(
    private userDataService: UserDataService,
    private citasService: CitasService,
    private pacientesService: PacientesService,
    private personalService: PersonalService,
    private fb: FormBuilder,
  ) {
    this.altaCitaForm = this.fb.group({
      fecha_cita: ['', Validators.required],
      hora_cita: ['', Validators.required],
      personal: ['0'],
      paciente: ['0'],
      tipo: ['0'],
      estado: ['0'],
    });
  }

  ngOnInit(): void {
    console.log("entrando en el componente pacientes");
    this.cargaCitas();
    this.cargaListaPersonal();
    this.cargaListaPacientes();
  }

  cargaCitas(): void {
    this.citasService.obtenerCitas().subscribe({
      next: data => {
        console.log('Respuesta del API:', data);
        this.listacita = data;
        this.actualizarTabla();
      },
      error: error => console.error('Error al obtener la lista de citas:', error)
    });
  }

  cargaListaPersonal(): void {
    this.personalService.obtenerPersonal().subscribe({
      next: (data) => {
        // Filtrar solo los elementos que tienen CVE_ESTADO distinto de 2
        this.listaPersonal = data.filter((personal: { CVE_ESTADO: number; }) => personal.CVE_ESTADO !== 2);
        console.log('Lista de personal cargada:', this.listaPersonal); // Agrega un log si quieres revisar la lista filtrada
      },
      error: (error) => {
        console.error('Error al obtener la lista de personal:', error);
        // Puedes mostrar un mensaje de error en la UI si lo deseas
        this.mensajeError = 'Ocurrió un error al cargar la lista de personal. Intenta nuevamente más tarde.';
      }
    });
  }


  cargaListaPacientes(): void {
    this.pacientesService.obtenerPacientes().subscribe({
      next: (data) => {
        // Filtrar solo los elementos que están activos (ACTIVO === true) y tienen seguro (CVE_SEGURO === true)
        this.listaPaciente = data.filter(
          (paciente: { ACTIVO: boolean; CVE_SEGURO: boolean }) =>
            paciente.ACTIVO === true && paciente.CVE_SEGURO === true
        );
        console.log('Lista de pacientes cargada:', this.listaPaciente); // Agrega un log si quieres revisar la lista filtrada
      },
      error: (error) => {
        console.error('Error al obtener la lista de pacientes:', error);
        // Puedes mostrar un mensaje de error en la UI si lo deseas
        this.mensajeError = 'Ocurrió un error al cargar la lista de pacientes. Intenta nuevamente más tarde.';
      }
    });
  }

  registrarCita(): void {
    if (this.altaCitaForm.valid) {
      this.mensajeExito = "";
      this.mensajeError = "";
      const fechaActual = new Date();
      const nuevaFechaCaducidad = new Date(fechaActual);
      nuevaFechaCaducidad.setDate(nuevaFechaCaducidad.getDate() + 30);

      // Preparar el JSON con los datos del formulario
      const dataPersonal = {
        FECHA_CITA: this.altaCitaForm.value.fecha_cita,
        HORA_CITA: this.altaCitaForm.value.hora_cita,
        CVE_TIPO_CITA: this.altaCitaForm.value.tipo,
        ID_PACIENTE: this.altaCitaForm.value.paciente,
        MATRICULAMED: this.altaCitaForm.value.personal,
        CVE_ESTADO: 1,
        ACTIVO: true,
      };
      console.log('Formulario enviado con éxito:', dataPersonal);

      // Llamar al servicio para registrar el horario
      this.citasService.crearCita(dataPersonal).subscribe({
        next: (response) => {
          console.log('Personal dado de alta con éxito:', response);
          this.mensajeExito = 'Personal registrado con éxito';
          this.mensajeError = '';

          // Limpiar el formulario
          this.limpiarFormulario();

          // Actualizar la lista de pacientes
          this.cargaCitas();
        },
        error: (error) => {
          console.error('Error en el alta del personal:', error);
          this.mensajeError = 'Ocurrió un error al dar de alta al personal, por favor intente de nuevo.';
          this.mensajeExito = '';
        }
      });
    } else {
      this.validarFormulario();
    }
  }

  editar(element: any): void {
    console.log('Actualizar estado de:', element);
  }

  eliminar(element: any): void {
    // Cambiar el estado del elemento localmente
    const nuevoEstado = { ACTIVO: false, CVE_ESTADO: 6 };

    console.log('eliminar a:', this.idelement);

    // Llamar al servicio para actualizar el estado en la base de datos
    this.citasService.actualizarCita(this.idelement, nuevoEstado).subscribe({
      next: (respuesta) => {
        console.log('Estado de la cita actualizado correctamente:', respuesta);

        // Actualizar la tabla para reflejar los cambios
        this.cargaCitas();
      },
      error: (error) => {
        console.error('Error al actualizar los datos de la cita:', error);
        // Manejar el error (mostrar un mensaje o algo similar)
      }
    });
  }

  cargarDatos(element: any): void {
    console.log(element)
    this.idelement = element.ID_CITA
    this.altaCitaForm.setValue({
      fecha_cita: element.FECHA_CITA,
      hora_cita: element.HORA_CITA,
      personal: element.MATRICULAMED,
      paciente: element.ID_PACIENTE,
      tipo: element.CVE_TIPO_CITA,
      estado: element.CVE_ESTADO,
    });
    console.log(element.CVE_ESTADO)
    this.estadoShow = element.CVE_ESTADO !== 6;
    console.log(this.estadoShow);
    this.datosCargados = this.altaCitaForm.value;
  }

  actualizarRegistro(): void {
    this.mensajeExito = "";
    this.mensajeError = "";
    if (this.altaCitaForm.valid) {
      if (this.datosCargados === this.altaCitaForm.value) {
        this.mensajeError = constantesGlobales.ERROR_SIN_CAMBIO
      } else {

        // Preparar el JSON con los datos del formulario
        const dataPersonal = {
          FECHA_CITA: this.altaCitaForm.value.fecha_cita,
          HORA_CITA: this.altaCitaForm.value.hora_cita,
          CVE_TIPO_CITA: this.altaCitaForm.value.tipo,
          ID_PACIENTE: this.altaCitaForm.value.paciente,
          MATRICULAMED: this.altaCitaForm.value.personal,
          CVE_ESTADO: this.altaCitaForm.value.estado,
          ACTIVO: true,
        };
        console.log('Formulario enviado con éxito:', dataPersonal);
        console.log(this.idelement);

        // Llamar al servicio para registrar el horario
        this.citasService.actualizarCita(this.idelement, dataPersonal).subscribe({
          next: (response) => {
            console.log('cita actualizada con éxito:', response);
            this.mensajeExito = 'Cita actualizada con éxito';
            this.mensajeError = '';

            // Actualizar la lista de pacientes
            this.cargaCitas();
          },
          error: (error) => {
            if (error.message === constantesGlobales.ERROR_CITA_SIN_CAMBIO) {
              console.log(constantesGlobales.ERROR_SIN_CAMBIO);
              this.mensajeError = constantesGlobales.ERROR_SIN_CAMBIO
            } else {
              console.error('Ocurrió un error al actualizar los datos del personal:', error);
              this.mensajeError = `Ocurrió un error al actualizar el personal: ${error}`;
            }
          }

        });
      }
    } else {
      this.validarFormulario();
    }
  }

  validarFormulario(): void {
    const validaciones = validacionesCampos(this.altaCitaForm);
    this.mensajeError = validaciones.mensajeError;
    this.mensajeExito = validaciones.mensajeExito;
  }

  limpiarFormulario(): void {
    this.altaCitaForm.reset();
    this.altaCitaForm.patchValue({
      personal: 0,
      paciente: 0,
      tipo: 0
    });
  }

  actualizarTabla(): void {
    // Filtrar los horarios que estén activos
    this.listacita = this.listacita
      .sort((a, b) => {
        // Ordenar por FECHA_CITA en orden descendente
        return new Date(b.FECHA_CITA).getTime() - new Date(a.FECHA_CITA).getTime();
      });
  }

  tiposAgenda = [
    { value: 1, label: 'Peso y Talla' },
    { value: 2, label: 'Control Embarazos' },
    { value: 3, label: 'Control Mensual' },
    { value: 4, label: 'Diagnóstico' },
    { value: 5, label: 'Dentista' },
    { value: 6, label: 'Otro' }
  ];

  estadosCita = [
    { value: 1, label: 'Pendiente' },
    { value: 2, label: 'En Atención' },
    { value: 3, label: 'Atendido' },
    { value: 4, label: 'Atrasado' },
    { value: 5, label: 'Pospuesto' },
    { value: 6, label: 'Cancelado' },
    { value: 7, label: 'Reprogramado' }
  ];

  getTipoCita(CVE_TIPO_CITA: number): string {
    const estados: { [key: number]: string } = {
      1: 'Peso y Talla',
      2: 'control Embarazos',
      3: 'Control Mensual',
      4: 'Diagnóstico',
      5: 'Dentista',
      6: 'Otro',
    };
    return estados[CVE_TIPO_CITA] || 'Desconocido';
  }
  getEstadoCita(CVE_TIPO_CITA: number): string {
    const estados: { [key: number]: string } = {
      1: 'Pendiente',
      2: 'En Atención',
      3: 'Atendido',
      4: 'Atrasado',
      5: 'Pospuesto',
      6: 'Cancelado',
      7: 'Reprogramado',
    };
    return estados[CVE_TIPO_CITA] || 'Estado Desconocido';
  }


}
