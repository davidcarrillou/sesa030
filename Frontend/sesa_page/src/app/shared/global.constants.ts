export class constantesGlobales {

    // Mensajes de Error
    static readonly ERROR_CREDENCIALES_INCORRECTAS = "Credenciales incorrectas. Por favor, inténtelo de nuevo.";
    static readonly ERROR_SESION_EXPIRADA = "Su sesión ha expirado. Por favor, inicie sesión nuevamente.";
    static readonly ERROR_CAMPOS_OBLIGATORIOS = "Por favor, complete todos los campos obligatorios.";
    static readonly ERROR_FORMATO_INCORRECTO = "El formato del campo es incorrecto. Verifique los datos ingresados.";
    static readonly ERROR_CONEXION_RED = "No se pudo conectar al servidor. Por favor, intente nuevamente más tarde.";
    static readonly ERROR_PERMISOS = "No tiene permiso para acceder a esta página.";
    static readonly ERROR_SERVIDOR = "Se ha producido un error en el servidor. Intente de nuevo más tarde.";
    static readonly ERROR_DATOS_NO_ENCONTRADOS = "No se encontraron datos. Verifique los criterios de búsqueda.";

    // Mensajes de Éxito
    static readonly EXITO_INICIO_SESION = "Inicio de sesión exitoso. Bienvenido de nuevo.";
    static readonly EXITO_REGISTRO = "Registro exitoso. Por favor, verifique su correo electrónico para confirmar su cuenta.";
    static readonly EXITO_GUARDAR = "Los datos se han guardado correctamente.";
    static readonly EXITO_ACTUALIZACION = "Los cambios se han guardado exitosamente.";
    static readonly EXITO_ELIMINACION = "El elemento ha sido eliminado exitosamente.";
    static readonly EXITO_ENVIAR = "El formulario se ha enviado correctamente.";
}

export class Validaciones {
    // Expresión regular para correos electrónicos
    public static emailRegex: string = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";

    // Expresión regular para números de teléfono
    public static phoneRegex: string = "^\\+?[1-9]\\d{1,14}$";
    public static phoneMexRegex: string = "^(\\+52\\s?)?(\\d{10})$";

    // Expresión regular para CURP
    public static curpRegex: string = "^[A-Z][A-Z][0-9]{6}[A-Z][A-Z][A-Z][0-9][A-Z][0-9][A-Z][0-9][A-Z][0-9][A-Z]$";
}