import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { PersonalService } from '../../core/services/personal.service';
import { validacionesCampos } from '../../shared/validacionesCampos';
import { constantesGlobales } from '../../shared/global.constants';

@Component({
  selector: 'app-personal',
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
  templateUrl: './personal.component.html',
  styleUrl: './personal.component.css'
})
export class PersonalComponent implements OnInit {
  altaPersonalForm: FormGroup;
  hide = true;
  estadoShow = false;
  datosCargados: any;
  idelement: number = 0;
  mensajeError: string = '';
  mensajeExito: string = '';
  personalList: any[] = [];
  displayedColumns: string[] = ['matricula', 'nombre', 'rol', 'cveEstado', 'fecha', 'fechaexpira', 'acciones'];

  constructor(
    private personalService: PersonalService,
    private fb: FormBuilder,
  ) {
    this.altaPersonalForm = this.fb.group({
      matricula: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      nombre: ['', Validators.required],
      apellidoPat: ['', Validators.required],
      apellidoMat: [''],
      telefono: ['', [Validators.required, Validators.maxLength(10)]],
      rol: ['0', Validators.required],
      sexo: ['0', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.maxLength(21)]],
      estado: ['0'],
    });
  }

  ngOnInit(): void {
    console.log("entrando en el componente personal");
    this.cargaPersonal();

  }

  cargaPersonal() {
    this.personalService.obtenerPersonal().subscribe({
      next: data => {
        console.log('Respuesta del API:', data);
        this.personalList = data;
        this.actualizarTabla();
      },
      error: error => console.error('Error al obtener personal:', error)
    });
  }

  alta_Personal(): void {
    if (this.altaPersonalForm.valid) {
      this.mensajeExito = "";
      this.mensajeError = "";
      const fechaActual = new Date();
      const nuevaFechaCaducidad = new Date(fechaActual);
      nuevaFechaCaducidad.setDate(nuevaFechaCaducidad.getDate() + 30);

      // Preparar el JSON con los datos del formulario
      const dataPersonal = {
        MATRICULA: this.altaPersonalForm.value.matricula,
        NOMBRE: this.altaPersonalForm.value.nombre,
        APELLIDO_PATERNO: this.altaPersonalForm.value.apellidoPat,
        APELLIDO_MATERNO: this.altaPersonalForm.value.apellidoMat,
        TELEFONO: this.altaPersonalForm.value.telefono,
        ID_ROL: this.altaPersonalForm.value.rol,
        CVE_SEXO: this.altaPersonalForm.value.sexo,
        CORREO: this.altaPersonalForm.value.correo,
        PASSWORD: this.altaPersonalForm.value.password,
        CVE_ESTADO: 1,
        FECHA_CADPASSWORD: nuevaFechaCaducidad, // Nueva fecha de caducidad sumando 30 días
        FECHA_ULTACTUALIZACION: fechaActual, // Fecha de la actualización (fecha actual)
      };
      console.log('Formulario enviado con éxito:', dataPersonal);

      // Llamar al servicio para registrar el horario
      this.personalService.crearPersonal(dataPersonal).subscribe({
        next: (response) => {
          console.log('Personal dado de alta con éxito:', response);
          this.mensajeExito = 'Personal registrado con éxito';
          this.mensajeError = '';

          // Limpiar el formulario
          this.limpiarFormulario();

          // Actualizar la lista de pacientes
          this.cargaPersonal();
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

  limpiarFormulario(): void {
    this.altaPersonalForm.reset();
    this.altaPersonalForm.patchValue({
      sexo: 0,
      rol: 0
    });
  }

  cargarDatos(element: any): void {
    this.idelement = element.MATRICULA
    this.altaPersonalForm.setValue({
      matricula: element.MATRICULA,
      nombre: element.NOMBRE,
      apellidoPat: element.APELLIDO_PATERNO,
      apellidoMat: element.APELLIDO_MATERNO,
      telefono: element.TELEFONO,
      rol: element.ID_ROL,
      sexo: element.CVE_SEXO,
      correo: element.CORREO,
      password: element.PASSWORD,
      estado: element.CVE_ESTADO,
    });
    console.log(element.CVE_ESTADO)
    this.estadoShow = element.CVE_ESTADO === 2;
    console.log(this.estadoShow);
    this.datosCargados = this.altaPersonalForm.value;
  }

  actualizarRegistro(): void {
    console.log('Actualizar estado de:', this.altaPersonalForm.value);
    console.log('id del elemento:', this.idelement);
    this.mensajeExito = "";
    this.mensajeError = "";
    if (this.altaPersonalForm.valid) {
      if (this.datosCargados === this.altaPersonalForm.value) {
        this.mensajeError = constantesGlobales.ERROR_SIN_CAMBIO
      } else {
        // Calcular la nueva fecha de caducidad (sumar 30 días)
        const fechaActual = new Date();
        const nuevaFechaCaducidad = new Date(fechaActual);
        var estado = 0;
        nuevaFechaCaducidad.setDate(nuevaFechaCaducidad.getDate() + 30);

        // Preparar el JSON con los datos del formulario
        const dataPersonal = {
          MATRICULA: this.altaPersonalForm.value.matricula,
          NOMBRE: this.altaPersonalForm.value.nombre,
          APELLIDO_PATERNO: this.altaPersonalForm.value.apellidoPat,
          APELLIDO_MATERNO: this.altaPersonalForm.value.apellidoMat,
          TELEFONO: this.altaPersonalForm.value.telefono,
          ID_ROL: this.altaPersonalForm.value.rol,
          CVE_SEXO: this.altaPersonalForm.value.sexo,
          CORREO: this.altaPersonalForm.value.correo,
          PASSWORD: this.altaPersonalForm.value.password,
          CVE_ESTADO: this.estadoShow ? this.altaPersonalForm.value.estado : 3,
          FECHA_CADPASSWORD: nuevaFechaCaducidad, // Nueva fecha de caducidad sumando 30 días
          FECHA_ULTACTUALIZACION: fechaActual, // Fecha de la actualización (fecha actual)

        };
        /*/ Llamar al servicio para actualizar el estado en la base de datos*/
        this.personalService.actualizarPersonalPorMatricula(this.idelement, dataPersonal).subscribe({
          next: (respuesta) => {
            console.log('Paciente actualizado correctamente:', this.personalList);
            this.mensajeExito = constantesGlobales.EXITO_ACTUALIZACION;
            this.cargaPersonal();
          },
          error: (error) => {
            if (error.message === constantesGlobales.ERROR_DATOS_SIN_CAMBIO) {
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
    const validaciones = validacionesCampos(this.altaPersonalForm);
    this.mensajeError = validaciones.mensajeError;
    this.mensajeExito = validaciones.mensajeExito;
  }


  eliminar(element: any): void {
    // Cambiar el estado del elemento localmente
    const nuevoEstado = { CVE_ESTADO: 2 };

    console.log('eliminar a:', this.idelement);

    // Llamar al servicio para actualizar el estado en la base de datos
    this.personalService.actualizarPersonalPorMatricula(this.idelement, nuevoEstado).subscribe({
      next: (respuesta) => {
        console.log('Personal actualizado correctamente:', respuesta);

        // Actualizar la tabla para reflejar los cambios
        this.cargaPersonal();
      },
      error: (error) => {
        console.error('Error al actualizar los datos del personal:', error);
        // Manejar el error (mostrar un mensaje o algo similar)
      }
    });
  }

  getEstadoDescripcion(cveEstado: number): string {
    const estados: { [key: number]: string } = {
      1: 'Alta de Usuario',
      2: 'Baja de Usuario',
      3: 'Modificación de Usuario',
      4: 'Inicio de Sesión',
      5: 'Cierre de Sesión'
    };
    return estados[cveEstado] || 'Estado Desconocido';
  }

  getRolDescripcion(cveEstado: number): string {
    const roles: { [key: number]: string } = {
      1: 'Médico General',
      2: 'Asistente Médico',
      3: 'Médico Tratante',
      4: 'Director',
      5: 'Coordinador Clínico'
    };
    return roles[cveEstado] || 'Rol Desconocido';
  }

  getDiasParaExpirar(fechaCadPassword: string | Date): number {
    const fechaExpiracion = new Date(fechaCadPassword);
    const fechaActual = new Date();

    // Cálculo de la diferencia en milisegundos
    const diferenciaTiempo = fechaExpiracion.getTime() - fechaActual.getTime();

    // Convertimos de milisegundos a días
    const diasRestantes = Math.ceil(diferenciaTiempo / (1000 * 3600 * 24));

    return diasRestantes;
  }

  actualizarTabla(): void {
    // Filtrar los horarios que estén activos
    this.personalList = this.personalList
      .sort((a, b) => {
        // Ordenar por FECHA_REGISTRO en orden descendente (los más nuevos primero)
        return new Date(b.FECHA_ULTACTUALIZACION).getTime() - new Date(a.FECHA_ULTACTUALIZACION).getTime();
      });
  }

}