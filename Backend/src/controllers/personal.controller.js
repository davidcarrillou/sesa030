const Personal = require('../models/personal.model');

// Crear un nuevo registro
exports.createPersonal = async (req, res) => {
  try {
    const personal = await Personal.create(req.body);
    res.status(201).json(personal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener todos los registros
exports.getAllPersonal = async (req, res) => {
  try {
    const personal = await Personal.findAll();
    res.status(200).json(personal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un registro por matricula
exports.getPersonalByMatricula = async (req, res) => {
  try {
    const personal = await Personal.findOne({
      where: {
        MATRICULA: req.params.matricula
      }
    });

    if (personal) {
      res.status(200).json(personal);
    } else {
      res.status(404).json({ message: 'Personal no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Actualizar un registro por matricula
exports.updatePersonalByMatricula = async (req, res) => {
  try {
    const personal = await Personal.update(req.body, {
      where: {
        MATRICULA: req.params.matricula
      }
    });

    if (personal[0] > 0) {
      res.status(200).json({ message: 'Personal actualizado exitosamente' });
    } else {
      res.status(404).json({ message: 'Personal no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Eliminar un registro por matricula
exports.deletePersonalByMatricula = async (req, res) => {
  try {
    const result = await Personal.destroy({
      where: {
        MATRICULA: req.params.matricula
      }
    });

    if (result > 0) {
      res.status(200).json({ message: 'Personal eliminado exitosamente' });
    } else {
      res.status(404).json({ message: 'Personal no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Funcion para el inicio de sesion
exports.getDatosInicioSesion = async (req, res) => {
  const { CORREO, PASSWORD } = req.body;
  
  try {
    // Buscar al usuario por correo y contraseña
    const personal = await Personal.findOne({
      where: {
        CORREO,
        PASSWORD
      }
    });

    if (!personal) {
      return res.status(401).json({ message: 'Correo o contraseña incorrectos' });
    }

    // Validar el estado del usuario
    if (personal.CVE_ESTADO === 2) {
      return res.status(403).json({ message: 'El usuario se encuentra inactivo' });
    }

    // Validar si la contraseña ha caducado
    const currentDate = new Date();
    const passwordExpiryDate = new Date(personal.FECHA_CADPASSWORD);

    if (currentDate >= passwordExpiryDate) {
      return res.status(403).json({ message: 'Expiro su contraseña, favor de contactar al administrador' });
    }

    // Si todas las validaciones pasan, iniciar sesión exitosamente
    res.status(200).json({
      message: 'inicio de sesion correcto',
      CORREO: personal.CORREO,
      ID_ROL: personal.ID_ROL
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
