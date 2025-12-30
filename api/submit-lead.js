const axios = require('axios');

module.exports = async (req, res) => {
  // Solo permitir peticiones POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, email } = req.body;
  const BREVO_API_KEY = process.env.BREVO_API_KEY;

  if (!BREVO_API_KEY) {
    console.error('BREVO_API_KEY no está configurada');
    return res.status(500).json({ error: 'Configuración del servidor incompleta' });
  }

  try {
    // Crear o actualizar contacto en Brevo
    // Nota: El ID de la lista debe ser configurado según la cuenta del usuario
    // Por defecto usamos el ID 3 como en el ejemplo de Netlify, pero debería ser variable
    const LIST_ID = parseInt(process.env.BREVO_LIST_ID) || 3;

    await axios.post('https://api.brevo.com/v3/contacts', {
      email: email,
      attributes: {
        FIRSTNAME: name
      },
      listIds: [LIST_ID],
      updateEnabled: true
    }, {
      headers: {
        'api-key': BREVO_API_KEY,
        'Content-Type': 'application/json'
      }
    });

    return res.status(200).json({ message: 'Lead registrado exitosamente en Brevo' });
  } catch (error) {
    console.error('Error al enviar a Brevo:', error.response ? error.response.data : error.message);
    
    // Si falla Brevo, intentamos al menos devolver un éxito al cliente para no romper la experiencia
    // pero registramos el error. Opcionalmente podrías devolver un 500.
    return res.status(500).json({ 
      error: 'Error al procesar el registro',
      details: error.response ? error.response.data : error.message 
    });
  }
};
