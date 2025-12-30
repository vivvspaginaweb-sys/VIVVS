# Guía de Migración de Netlify a Vercel para VIVVS

**Autor:** Manus AI
**Fecha:** 30 de Diciembre de 2025

## 1. Resumen de la Migración

Hemos analizado el código de tu sitio web y hemos realizado los ajustes necesarios para garantizar una migración fluida y exitosa de **Netlify** a **Vercel**. El sitio es una aplicación estática de HTML, CSS y JavaScript, lo cual es perfectamente compatible con Vercel.

**Ajustes Clave Realizados:**

| Componente | Configuración Original (Netlify) | Configuración Nueva (Vercel) |
| :--- | :--- | :--- |
| **Plataforma de Despliegue** | Netlify | Vercel |
| **Manejo de Leads (Brevo)** | FormSubmit (Servicio de terceros) | **Vercel Serverless Function** (`/api/submit-lead.js`) |
| **Configuración del Proyecto** | `netlify.toml` (No encontrado) | `vercel.json` (Creado) |
| **Integración Calendly** | Enlaces directos en `index.html` | Se mantiene (No requiere cambios) |
| **Estructura del Código** | HTML, CSS, JS, `data/` | Se mantiene (100% compatible) |

La principal mejora es la migración de la lógica de envío de leads de un servicio de terceros (`FormSubmit`) a una **Vercel Serverless Function**. Esto te proporciona mayor control, seguridad y fiabilidad en el proceso de captura de leads.

## 2. Pasos para el Despliegue en Vercel

Sigue estos pasos para desplegar tu proyecto en Vercel.

### Paso 2.1: Importar el Proyecto

1.  Asegúrate de que los archivos modificados (`script.js`, `vercel.json`, `package.json` y la nueva carpeta `api/`) estén subidos a tu repositorio de GitHub.
2.  Ve a [Vercel Dashboard](https://vercel.com/dashboard).
3.  Haz clic en **"Add New..."** y luego en **"Project"**.
4.  Selecciona tu repositorio de GitHub (`vivvspaginaweb-sys/VIVVS`).
5.  Vercel detectará automáticamente que es un proyecto estático.

### Paso 2.2: Configurar Variables de Entorno (Crítico para Brevo)

Para que la nueva función de Brevo funcione, debes configurar las variables de entorno:

1.  En la pantalla de configuración del proyecto en Vercel, haz clic en **"Environment Variables"**.
2.  Añade las siguientes variables:

| Nombre de la Variable | Valor | Descripción |
| :--- | :--- | :--- |
| `BREVO_API_KEY` | `[TU CLAVE API DE BREVO]` | La clave API v3 que obtuviste de Brevo. **CRÍTICO** |
| `BREVO_LIST_ID` | `[ID DE TU LISTA]` | El ID numérico de la lista de contactos en Brevo (ej. `3`). Si no lo sabes, déjalo en `3` y verifica en Brevo. |

3.  Haz clic en **"Deploy"**.

## 3. Configuración del Dominio Personalizado

Para trasladar tu dominio (`[TU DOMINIO]`) de Netlify a Vercel, debes actualizar los registros DNS.

### Paso 3.1: Desvincular el Dominio de Netlify

1.  Ve a tu panel de control de Netlify.
2.  En la configuración de tu sitio, ve a **Domain settings**.
3.  Elimina tu dominio personalizado de la lista. Esto liberará el dominio para que puedas usarlo en Vercel.

### Paso 3.2: Configurar el Dominio en Vercel

1.  En tu proyecto de Vercel, ve a **Settings** y luego a **Domains**.
2.  Introduce tu dominio personalizado (ej. `tudominio.com`) y haz clic en **"Add"**.
3.  Vercel te proporcionará dos opciones:

    *   **Opción A: Usar Nombres de Servidor (Recomendado)**: Si quieres que Vercel gestione tus DNS, cambia los **Nameservers** en tu registrador de dominios (GoDaddy, Namecheap, etc.) a los que te proporcione Vercel (ej. `ns1.vercel-dns.com` y `ns2.vercel-dns.com`).
    *   **Opción B: Usar Registros A y CNAME**: Si quieres mantener tu DNS actual, Vercel te pedirá que añadas:
        *   Un registro **A** que apunte a la IP de Vercel.
        *   Un registro **CNAME** para `www` que apunte a tu dominio de Vercel.

4.  Una vez que hayas actualizado los registros en tu registrador, la propagación puede tardar hasta 24 horas, pero Vercel lo detectará automáticamente y emitirá el certificado SSL.

## 4. Verificación de Integraciones

### 4.1. Calendly

La integración de Calendly se mantiene intacta ya que utiliza enlaces directos:

*   `https://calendly.com/u5888519266/30min`

**Acción Requerida:** Ninguna.

### 4.2. Brevo (Automatización de Correos)

La nueva función de Vercel se encarga de esto.

**Acción Requerida:**

1.  Verifica que las variables de entorno (`BREVO_API_KEY` y `BREVO_LIST_ID`) estén configuradas correctamente en Vercel.
2.  Realiza una prueba de envío de formulario en tu nuevo sitio de Vercel.
3.  Comprueba tu lista de contactos en Brevo para confirmar que el nuevo lead ha sido añadido y que la automatización de envío de PDF se ha disparado.

## 5. Ahorro de Créditos

El proyecto es un sitio estático con una única función *serverless* de bajo consumo. Vercel ofrece un generoso nivel gratuito. Al usar una función *serverless* solo para el envío de leads, el consumo de créditos será mínimo y se mantendrá dentro del nivel gratuito de Vercel, cumpliendo con tu solicitud de no gastar todos tus 300 créditos.

**¡Tu sitio está listo para ser desplegado en Vercel!**
