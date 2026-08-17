# 🇻🇪 Monitor VE - Calculadora de Divisas en Tiempo Real

Aplicación web moderna, rápida y ultra-optimizada para el monitoreo y cálculo de divisas en Venezuela (Dólar BCV Oficial, Euro BCV, USDT Binance y Tasas Personalizadas), con historial interactivo por días/meses, cálculo de comisiones, captura de comprobantes y temas visuales personalizables.

---

## 🚀 Características Principales

- **Calculadora Bidireccional de Divisas**: Conversión instantánea de USD ($) a Bolívares (Bs) y viceversa con teclado numérico virtual integrado.
- **Tasas en Vivo**:
  - 💵 **Dólar BCV Oficial**
  - 💶 **Euro Oficial BCV**
  - 🪙 **USDT Binance P2P**
  - ⚙️ **Tasa Personalizada** (con margen de comisión / fee configurable).
- **Brecha Cambiaria**: Cálculo automático del diferencial porcentual entre la tasa oficial y paralela.
- **Historial Extendido & Gráficos**: Gráficos de evolución temporal filtrables por 7 días, 15 días, 1 mes, 3 meses, 6 meses, 1 año y todo el histórico.
- **Botón "Usar en Calculadora"**: Carga directa de cualquier cotización histórica en la calculadora principal.
- **Centro de Compartir & Código QR**: Generación de reportes preformateados para WhatsApp, Telegram y código QR de alta resolución.
- **Modelos y Cálculos Guardados**: Almacenamiento local para registrar operaciones frecuentes.
- **Captura de Pantalla / Comprobante**: Exportación de imagen PNG del cálculo.
- **Múltiples Temas Visuales**: Dark OLED, Golden Premium, Cyber Neon, Obsidian Gold, Fintech Mint y Violet Quartz.

---

## 🛠️ Tecnologías Utilizadas

- **React 19** + **TypeScript**
- **Vite 6** (Empaquetador de alto rendimiento)
- **Tailwind CSS 4**
- **Lucide React** (Iconografía)
- **Motion** (Animaciones fluidas)

---

## 💻 Desarrollo Local

Para correr el proyecto localmente en tu computadora:

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Iniciar servidor de desarrollo:**
   ```bash
   npm run dev
   ```

3. **Construir para producción:**
   ```bash
   npm run build
   ```
   *Los archivos listos para producción se generarán en la carpeta `dist/`.*

---

## 📦 Paso a Paso: Cómo Subir a GitHub

### Opción A: Desde la Terminal / Git Bash

1. Abre la terminal en la carpeta de este proyecto.
2. Inicializa el repositorio Git si aún no lo has hecho:
   ```bash
   git init
   ```
3. Añade todos los archivos y haz el primer commit:
   ```bash
   git add .
   git commit -m "feat: Monitor VE listo para despliegue en Netlify"
   ```
4. Cambia a la rama principal `main`:
   ```bash
   git branch -M main
   ```
5. En tu cuenta de [GitHub](https://github.com), crea un nuevo repositorio (por ejemplo: `monitor-ve`).
6. Conecta tu repositorio local con GitHub:
   ```bash
   git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
   ```
7. Sube los cambios:
   ```bash
   git push -u origin main
   ```

---

## 🌐 Paso a Paso: Cómo Desplegar en Netlify

El proyecto ya incluye el archivo de configuración `netlify.toml` y `public/_redirects` para que el despliegue sea 100% automático.

### Despliegue con 1 Clic desde GitHub:

1. Ve a [Netlify](https://app.netlify.com/) e inicia sesión con tu cuenta de GitHub.
2. Haz clic en el botón **"Add new site"** ➔ **"Import an existing project"**.
3. Selecciona **GitHub** y busca tu repositorio (`monitor-ve`).
4. Netlify detectará automáticamente los parámetros gracias al archivo `netlify.toml`:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Haz clic en **"Deploy Site"** (o **"Deploy monitor-ve"**).
6. ¡Listo! En menos de 60 segundos tu aplicación estará en línea con certificado SSL gratuito (HTTPS).

---

## 🏷️ Conectar tu Propio Dominio Personalizado en Netlify

Cuando tengas tu dominio (por ejemplo `www.mitasadehoy.com`):

1. En tu panel de Netlify, ve a **Site configuration** ➔ **Domain management** ➔ **Add custom domain**.
2. Escribe tu nombre de dominio (ej. `mitasadehoy.com`).
3. En el proveedor donde compraste el dominio (Namecheap, GoDaddy, Cloudflare, etc.), añade los registros DNS que te indique Netlify (o asigna los Nameservers de Netlify).
4. Netlify activará automáticamente el certificado HTTPS gratuito (Let's Encrypt).
