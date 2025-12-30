# Configuración de Brevo para VIVVS en Netlify

## 🎯 Objetivo
Asociar la integración de Brevo con tu dominio `vivvs.netlify.com` para automatizar el envío de leads y PDFs.

---

## 📋 Pasos de Configuración

### Paso 1: Crear una Lista de Contactos en Brevo
1.  Inicia sesión en tu cuenta de **Brevo** (https://www.brevo.com)
2.  Ve a **Contactos** → **Listas**
3.  Haz clic en **Crear una lista**
4.  Nombre: `Leads VIVVS Auditoría`
5.  Descripción: `Contactos que descargaron la auditoría web gratuita desde vivvs.netlify.com`
6.  Guarda la lista

### Paso 2: Obtener tu API Key de Brevo
1.  Ve a **Configuración** → **Claves de API**
2.  Copia tu **Clave de API v3** (la necesitarás más adelante)
3.  Guárdala en un lugar seguro

### Paso 3: Crear un Formulario en Brevo
1.  Ve a **Contactos** → **Formularios**
2.  Haz clic en **Crear un formulario**
3.  Selecciona **Formulario embebido**
4.  Configura los campos:
   - **Nombre Completo** (obligatorio)
   - **Email** (obligatorio)
   - **Empresa** (obligatorio)
5.  Selecciona la lista `Leads VIVVS Auditoría` como destino
6.  En la sección de **Confirmación**, selecciona:
   - ✅ Enviar un email de confirmación
   - ✅ Descargar un archivo (adjunta el PDF de auditoría)
7.  Guarda el formulario

### Paso 4: Integrar Brevo con tu Landing Page (Opción A: Usando el Formulario de Brevo)
1.  En el formulario que acabas de crear, ve a **Código embebido**
2.  Copia el código HTML proporcionado por Brevo
3.  Reemplaza el formulario actual en tu `index.html` con este código de Brevo
4.  Esto garantiza que los leads se añadan directamente a tu lista de Brevo

### Paso 5: Integrar Brevo con Netlify (Opción B: Usando Netlify Functions)
Si prefieres mantener tu formulario actual y usar Netlify Functions para enviar los datos a Brevo:

1.  Crea un archivo `netlify/functions/submit-lead.js`:
```javascript
const axios = require('axios');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { nombre, email, empresa } = JSON.parse(event.body);
  const BREVO_API_KEY = process.env.BREVO_API_KEY;

  try {
    // Crear contacto en Brevo
    await axios.post('https://api.brevo.com/v3/contacts', {
      email: email,
      attributes: {
        FIRSTNAME: nombre,
        COMPANY: empresa
      },
      listIds: [3] // Reemplaza 3 con el ID de tu lista
    }, {
      headers: {
        'api-key': BREVO_API_KEY,
        'Content-Type': 'application/json'
      }
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Lead registrado exitosamente' })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
```

2.  En tu `netlify.toml`, añade:
```toml
[build]
  functions = "netlify/functions"
  
[env]
  [env.production]
    BREVO_API_KEY = "tu_clave_api_brevo"
```

3.  En tu `script.js`, actualiza el endpoint del formulario:
```javascript
fetch('/.netlify/functions/submit-lead', {
  method: 'POST',
  body: JSON.stringify({ nombre, email, empresa })
})
```

### Paso 6: Configurar Variables de Entorno en Netlify
1.  Ve a tu sitio en **Netlify**
2.  **Configuración** → **Variables de entorno**
3.  Añade:
   - **Nombre:** `BREVO_API_KEY`
   - **Valor:** Tu clave de API de Brevo
4.  Guarda

### Paso 7: Crear una Automatización en Brevo
1.  Ve a **Automatización** → **Crear escenario**
2.  Punto de entrada: **Un contacto es añadido a una lista**
3.  Selecciona la lista `Leads VIVVS Auditoría`
4.  **Acción 1:** Enviar email
   - Plantilla: Crea una plantilla de bienvenida con el enlace de descarga del PDF
   - Retraso: Inmediato
5.  **Acción 2:** Enviar email de seguimiento (opcional)
   - Retraso: 3 días
   - Contenido: Propuesta de consulta en Calendly
6.  Guarda la automatización

---

## 🔗 Asociación con vivvs.netlify.com

Una vez que hayas completado los pasos anteriores, tu integración estará automáticamente asociada con `vivvs.netlify.com` porque:

1.  **El formulario en tu web** (alojada en Netlify) enviará los datos a Brevo
2.  **Brevo recibirá los leads** desde tu dominio `vivvs.netlify.com`
3.  **Los emails de confirmación** se enviarán automáticamente con el PDF adjunto
4.  **Las automatizaciones** se ejecutarán para cada nuevo lead

---

## 📊 Monitoreo y Análisis

En Brevo, puedes ver:
- **Contactos** → Todos los leads capturados desde `vivvs.netlify.com`
- **Campañas** → Rendimiento de tus emails de seguimiento
- **Automatización** → Estadísticas de tus escenarios

---

## 🆘 Troubleshooting

| Problema | Solución |
| :--- | :--- |
| Los leads no aparecen en Brevo | Verifica que la API Key sea correcta y que el ID de lista sea válido |
| El PDF no se descarga | Asegúrate de que el archivo esté en la carpeta correcta y que Brevo tenga acceso |
| Los emails no se envían | Verifica que la plantilla de email esté publicada y que el escenario esté activo |

---

## 💡 Recomendaciones

1.  **Prueba primero:** Envía un lead de prueba para verificar que todo funciona
2.  **Monitorea:** Revisa regularmente tus estadísticas en Brevo
3.  **Optimiza:** Ajusta tus emails y automatizaciones según los resultados
4.  **Seguridad:** Nunca compartas tu API Key de Brevo públicamente

---

## 📞 Soporte

Si necesitas ayuda adicional:
- **Brevo:** https://www.brevo.com/es/soporte/
- **Netlify:** https://docs.netlify.com/
- **Tu equipo VIVVS:** vivvspaginaweb@gmail.com
