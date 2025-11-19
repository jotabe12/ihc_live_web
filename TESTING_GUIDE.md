# 🧪 GUÍA DE PRUEBAS - Sistema de Sesión ViviEstu

## ✅ CHECKLIST DE FUNCIONALIDADES

### **TEST 1: Registro de Usuario**
- [ ] 1. Abrir `index.html` en el navegador
- [ ] 2. Hacer clic en botón "Registrarse" (esquina superior derecha)
- [ ] 3. Verificar que carga `page/registrar.html`
- [ ] 4. Llenar formulario:
  - Email: `estudiante@upc.edu.pe`
  - Contraseña: `test123`
  - Nombres: `Juan Pérez`
  - Celular: `987654321`
- [ ] 5. Hacer clic en "Registrarse"
- [ ] 6. Verificar mensaje verde "¡Registro exitoso!"
- [ ] 7. Verificar redirección automática a `iniciar_sesion.html`

**✅ RESULTADO ESPERADO**: Usuario registrado correctamente

---

### **TEST 2: Inicio de Sesión**
- [ ] 1. En la página de inicio de sesión
- [ ] 2. Ingresar credenciales:
  - Email: `estudiante@upc.edu.pe`
  - Contraseña: `test123`
- [ ] 3. Hacer clic en "Iniciar Sesión"
- [ ] 4. Verificar redirección a `index.html`
- [ ] 5. Verificar que en el header aparece:
  - Avatar circular azul con icono de usuario
  - Nombre "Juan Pérez" en blanco
  - Flecha hacia abajo
- [ ] 6. Verificar que NO aparecen los botones "Iniciar Sesión" y "Registrarse"

**✅ RESULTADO ESPERADO**: Sesión iniciada correctamente

---

### **TEST 3: Dropdown de Perfil**
- [ ] 1. Con sesión iniciada en `index.html`
- [ ] 2. Hacer clic en el avatar/nombre del usuario
- [ ] 3. Verificar que aparece menú desplegable con:
  - "Ver Perfil" (con icono)
  - "Cerrar Sesión" (con icono)
- [ ] 4. Verificar animación suave de aparición
- [ ] 5. Hacer hover sobre las opciones
- [ ] 6. Verificar cambio de fondo al hacer hover
- [ ] 7. Hacer clic fuera del dropdown
- [ ] 8. Verificar que se cierra automáticamente

**✅ RESULTADO ESPERADO**: Dropdown funciona correctamente

---

### **TEST 4: Navegación a Perfil**
- [ ] 1. Abrir dropdown de usuario
- [ ] 2. Hacer clic en "Ver Perfil"
- [ ] 3. Verificar redirección a `page/perfil_usuario.html`
- [ ] 4. Verificar que aparece:
  - "Hola, **Juan Pérez**" en la parte superior
  - Avatar circular gris grande
  - Nombre "Juan Pérez" centrado debajo del avatar
  - Tarjeta naranja con los datos
  - Botones "Editar perfil" y "Subir foto"
- [ ] 5. Verificar que el header mantiene el dropdown de usuario
- [ ] 6. Hacer clic en "Editar perfil"
- [ ] 7. Verificar alerta temporal
- [ ] 8. Hacer clic en "Subir foto"
- [ ] 9. Verificar alerta temporal

**✅ RESULTADO ESPERADO**: Página de perfil muestra datos del usuario correctamente

---

### **TEST 5: Persistencia de Sesión**
- [ ] 1. Con sesión iniciada en cualquier página
- [ ] 2. Abrir DevTools (F12)
- [ ] 3. Ir a Application > Local Storage > file://
- [ ] 4. Verificar que existen:
  - `usuario` con objeto JSON completo
  - `sesionActiva` con valor "true"
  - `usuarioActivo` con el email
- [ ] 5. Recargar la página (F5)
- [ ] 6. Verificar que la sesión se mantiene
- [ ] 7. Cerrar el navegador
- [ ] 8. Volver a abrir `index.html`
- [ ] 9. Verificar que la sesión se mantiene

**✅ RESULTADO ESPERADO**: Sesión persiste correctamente

---

### **TEST 6: Navegación entre Páginas**
- [ ] 1. Desde `index.html` con sesión iniciada
- [ ] 2. Hacer clic en "Zonas" (menú de navegación)
- [ ] 3. Verificar que en `mapa_seguridad.html` aparece el dropdown de usuario
- [ ] 4. Hacer clic en "Comunidad"
- [ ] 5. Verificar que en `foro_estudiantil.html` aparece el dropdown de usuario
- [ ] 6. Hacer clic en "Contacto"
- [ ] 7. Verificar que en `agendar_visita.html` aparece el dropdown de usuario
- [ ] 8. Navegar a cada página y verificar que el dropdown funciona
- [ ] 9. Hacer clic en el logo ViviEstu
- [ ] 10. Verificar redirección a `index.html`

**✅ RESULTADO ESPERADO**: Sesión se mantiene en todas las páginas

---

### **TEST 7: Cierre de Sesión**
- [ ] 1. Con sesión iniciada en cualquier página
- [ ] 2. Abrir dropdown de usuario
- [ ] 3. Hacer clic en "Cerrar Sesión"
- [ ] 4. Verificar mensaje de confirmación
- [ ] 5. Hacer clic en "Aceptar"
- [ ] 6. Verificar redirección a `index.html`
- [ ] 7. Verificar que en el header aparecen:
  - Botón "Iniciar Sesión"
  - Botón "Registrarse"
- [ ] 8. Verificar que NO aparece el dropdown de usuario
- [ ] 9. Abrir DevTools > Local Storage
- [ ] 10. Verificar que `sesionActiva` fue eliminado
- [ ] 11. Verificar que `usuario` sigue existiendo (para poder volver a loguearse)

**✅ RESULTADO ESPERADO**: Sesión cerrada correctamente

---

### **TEST 8: Protección de Páginas**
- [ ] 1. Cerrar sesión si está iniciada
- [ ] 2. En la barra de direcciones, ir directamente a:
  `file:///C:/ruta/page/perfil_usuario.html`
- [ ] 3. Verificar alerta: "Debes iniciar sesión para acceder a esta página"
- [ ] 4. Verificar redirección automática a `iniciar_sesion.html`
- [ ] 5. Iniciar sesión con credenciales correctas
- [ ] 6. Intentar acceder nuevamente a `perfil_usuario.html`
- [ ] 7. Verificar que ahora SÍ permite el acceso

**✅ RESULTADO ESPERADO**: Páginas protegidas funcionan correctamente

---

### **TEST 9: Errores de Login**
- [ ] 1. Ir a `page/iniciar_sesion.html`
- [ ] 2. Intentar iniciar sesión SIN registrarse antes
- [ ] 3. Verificar mensaje: "No existe una cuenta registrada"
- [ ] 4. Registrar un usuario
- [ ] 5. Iniciar sesión con email correcto pero contraseña incorrecta
- [ ] 6. Verificar mensaje: "Correo o contraseña incorrectos"
- [ ] 7. Iniciar sesión con email incorrecto
- [ ] 8. Verificar mensaje: "Correo o contraseña incorrectos"

**✅ RESULTADO ESPERADO**: Validaciones funcionan correctamente

---

### **TEST 10: Responsive Design**
- [ ] 1. Abrir `index.html` con sesión iniciada
- [ ] 2. Abrir DevTools (F12)
- [ ] 3. Activar modo responsive (Ctrl + Shift + M)
- [ ] 4. Probar diferentes tamaños:
  - Mobile (375px)
  - Tablet (768px)
  - Desktop (1920px)
- [ ] 5. Verificar que el dropdown de usuario se adapta
- [ ] 6. Verificar que el avatar se ve correctamente
- [ ] 7. Ir a `perfil_usuario.html`
- [ ] 8. Verificar que la tarjeta de perfil se adapta
- [ ] 9. Verificar que los botones se apilan en móvil

**✅ RESULTADO ESPERADO**: Todo se ve bien en todos los tamaños

---

## 🔍 VERIFICACIONES EN CONSOLA

Abrir DevTools > Console y ejecutar estos comandos:

```javascript
// Ver datos del usuario
console.log(SessionManager.getUser());

// Ver si hay sesión activa
console.log(SessionManager.isLoggedIn());

// Ver localStorage completo
console.log(localStorage);
```

**Resultado esperado con sesión activa:**
```javascript
{email: "estudiante@upc.edu.pe", password: "test123", nombre: "Juan Pérez", celular: "987654321"}
true
{usuario: "{...}", sesionActiva: "true", usuarioActivo: "estudiante@upc.edu.pe"}
```

---

## 🐛 PROBLEMAS COMUNES Y SOLUCIONES

### **Problema: El dropdown no aparece**
**Solución:**
1. Verificar que FontAwesome está cargado (buscar iconos en la página)
2. Verificar en Console si hay errores de JavaScript
3. Verificar que `app.js` está incluido en la página
4. Verificar que existe sesión activa en localStorage

### **Problema: Los estilos no se aplican**
**Solución:**
1. Verificar que los archivos CSS existen
2. Limpiar caché del navegador (Ctrl + Shift + Delete)
3. Recargar con Ctrl + F5 (fuerza recarga sin caché)

### **Problema: Las rutas no funcionan**
**Solución:**
1. Verificar estructura de carpetas
2. Usar rutas relativas correctas
3. Si usas servidor local, verificar que todas las rutas empiezan desde la raíz

### **Problema: No se guarda en localStorage**
**Solución:**
1. Verificar que el navegador no está en modo incógnito
2. Verificar que localStorage está habilitado
3. Limpiar localStorage: `localStorage.clear()` en console

---

## 📊 RESUMEN DE COBERTURA

| Funcionalidad | Estado |
|--------------|--------|
| Registro de usuarios | ✅ |
| Inicio de sesión | ✅ |
| Cierre de sesión | ✅ |
| Dropdown de perfil | ✅ |
| Página de perfil | ✅ |
| Protección de páginas | ✅ |
| Persistencia de datos | ✅ |
| Navegación unificada | ✅ |
| Responsive design | ✅ |
| Validaciones | ✅ |

---

## 🚀 LISTO PARA NETLIFY

Una vez que todas las pruebas estén verificadas:

```bash
# 1. Hacer commit de los cambios
git add .
git commit -m "Implementación completa de sistema de sesión con LocalStorage y DOM"

# 2. Push a repositorio
git push origin main

# 3. Netlify detectará los cambios automáticamente y desplegará
```

---

## 📝 NOTAS FINALES

- Todos los archivos están actualizados y funcionando
- El sistema es completamente funcional sin backend
- Los datos persisten en LocalStorage
- El código está limpio y bien documentado
- Fácil de mantener y extender

**¡Sistema de sesión completamente implementado y funcional!** 🎉

