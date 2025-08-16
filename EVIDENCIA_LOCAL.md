# Evidencia de trabajo local (sin CDN)

## 1) Ejecutar localmente
- Usa `start-server.bat` para abrir `http://localhost:5500/index.html`.
- No hay dependencias externas para CSS/JS (Bootstrap y jQuery están en carpetas locales).

## 2) Prueba sin internet
- Desconecta Wi‑Fi/Ethernet.
- Refresca `index.html`: la página mantiene estilos y scripts (porque son locales).
- *Nota:* la **página de API** fallará sin internet (es normal): solo el botón AJAX depende de la red.

## 3) DevTools → Network
- Abre F12 → pestaña **Network** y recarga.
- Verás solicitudes a rutas como `/bootstrap/css/bootstrap.min.css`, `/bootstrap/js/bootstrap.bundle.min.js`, `/js/jquery.min.js` todas desde `http://localhost:5500`.
- No debe aparecer ningún dominio tipo `cdn.jsdelivr.net`, `code.jquery.com`, etc.

## 4) Chequeo automático
- Abre `http://localhost:5500/check-local.html`.
- Debe mostrar **OK: todos los recursos cargan desde origen local**.
- Si muestra rojo, corrige la ruta del recurso señalado.

## 5) Content Security Policy (CSP)
Se agregó un CSP en `index.html` y `demo-api-rest.html` que **bloquea CDNs**:
```html
<meta http-equiv="Content-Security-Policy"
  content="default-src 'self'; connect-src 'self' https://s1uplfovq4.execute-api.us-east-1.amazonaws.com; img-src 'self' data:; style-src 'self'; script-src 'self';">
```
- Permite conexión solo a *self* y al **endpoint de la API** del examen.
- Estilos y scripts solo desde **'self'** (las carpetas locales).

## 6) Carpeta y archivos clave
```
bootstrap/css/bootstrap.min.css
bootstrap/js/bootstrap.bundle.min.js
js/jquery.min.js
img/logo-ultramedic.jpg
```
Esto evidencia que Bootstrap/jQuery **no** vienen de CDN.

---

**Checklist para revisión del docente**
- [ ] El sitio se abre en `http://localhost:5500/`.
- [ ] `Network` solo muestra archivos del mismo origen.
- [ ] `check-local.html` muestra **OK** en verde.
- [ ] CSP presente en ambas páginas.
- [ ] Con internet OFF: la app carga estilos/JS (AJAX fallará, esperado).
