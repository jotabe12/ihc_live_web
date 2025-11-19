# ✅ PRUEBAS RÁPIDAS - Header Unificado

## 🧪 GUÍA DE VERIFICACIÓN RÁPIDA

### ⏱️ Tiempo estimado: 5 minutos

---

## 📋 CHECKLIST DE PRUEBAS

### **TEST 1: Consistencia del Header** ⏱️ 2 min

1. **Abrir index.html**
   - [ ] ¿El header tiene fondo gris claro?
   - [ ] ¿Hay 5 enlaces: Inicio, Zonas, Comparador, Comunidad, Contacto?
   - [ ] ¿Los enlaces son color turquesa?
   - [ ] ¿El logo está a la izquierda?

2. **Navegar a cada página:**
   - [ ] page/agendar_visita.html → ¿Header igual?
   - [ ] page/catalogo.html → ¿Header igual?
   - [ ] page/mapa_seguridad.html → ¿Header igual?
   - [ ] page/foro_estudiantil.html → ¿Header igual?
   - [ ] page/perfil_usuario.html (después de login) → ¿Header igual?

**✅ Resultado esperado**: Todos los headers se ven IDÉNTICOS

---

### **TEST 2: Logo Clickeable** ⏱️ 30 seg

1. **Desde index.html:**
   - [ ] Click en logo → ¿Recarga la página?

2. **Desde cualquier página interna:**
   - [ ] Click en logo → ¿Va a index.html?

3. **Efecto hover:**
   - [ ] Pasar mouse sobre logo → ¿Se agranda ligeramente?

**✅ Resultado esperado**: Logo siempre redirige al inicio

---

### **TEST 3: Enlaces de Navegación** ⏱️ 1 min

1. **Probar cada enlace desde index.html:**
   - [ ] "Inicio" → Recarga index.html
   - [ ] "Zonas" → Va a mapa_seguridad.html
   - [ ] "Comparador" → Va a catalogo.html ← **NUEVO**
   - [ ] "Comunidad" → Va a foro_estudiantil.html
   - [ ] "Contacto" → Va a agendar_visita.html

2. **Efecto hover:**
   - [ ] Pasar mouse → ¿Aparece línea azul debajo?
   - [ ] Pasar mouse → ¿Color cambia a turquesa oscuro?

**✅ Resultado esperado**: Todos los enlaces funcionan correctamente

---

### **TEST 4: Dropdown con Emojis** ⏱️ 1 min

1. **Registrarse e iniciar sesión** (si no lo has hecho)
   - Email: test@upc.edu.pe
   - Password: 123456
   - Nombres: Juan Pérez
   - Celular: 987654321

2. **Verificar dropdown:**
   - [ ] ¿Se ve un emoji 👤 grande en el círculo?
   - [ ] ¿El círculo tiene fondo azul con gradiente?
   - [ ] ¿Se ve el nombre del usuario?
   - [ ] ¿Hay una flecha ▼?

3. **Click en el dropdown:**
   - [ ] ¿Aparece el menú desplegable?
   - [ ] ¿Primera opción tiene emoji 👤 y dice "Ver Perfil"?
   - [ ] ¿Segunda opción tiene emoji 🚪 y dice "Cerrar Sesión"?
   - [ ] ¿Hay una línea separadora entre las opciones?

4. **Efecto hover:**
   - [ ] Pasar mouse sobre dropdown → ¿Aparece borde azul?
   - [ ] Pasar mouse sobre opciones → ¿Fondo cambia a gris claro?

**✅ Resultado esperado**: Dropdown se ve claro y profesional con emojis visibles

---

### **TEST 5: Funcionalidad del Sistema de Sesión** ⏱️ 30 seg

1. **Con sesión iniciada:**
   - [ ] Click en "Ver Perfil" → ¿Va a perfil_usuario.html?
   - [ ] ¿El perfil muestra tu nombre correctamente?

2. **Cerrar sesión:**
   - [ ] Click en "Cerrar Sesión" → ¿Aparece confirmación?
   - [ ] Aceptar → ¿Vuelve a index.html?
   - [ ] ¿El dropdown desaparece?
   - [ ] ¿Aparecen botones "Iniciar Sesión" y "Registrarse"?

**✅ Resultado esperado**: Todo funciona sin errores

---

## 🎨 VERIFICACIÓN VISUAL RÁPIDA

### **El header debe verse así en TODAS las páginas:**

```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│  [Logo]  Inicio  Zonas  Comparador  Comunidad  Contacto │
│                                        [Login] [Registrar]│
│                                                          │
└──────────────────────────────────────────────────────────┘
```

**Características visuales:**
- ✅ Fondo gris claro (#e0e0e0)
- ✅ Logo a la izquierda con cursor pointer
- ✅ Enlaces en turquesa (#007c91) centrados
- ✅ Botones a la derecha
- ✅ Altura consistente (~100px)
- ✅ Padding uniforme

---

### **El dropdown debe verse así (con sesión):**

```
┌──────────────────────────────┐
│  [👤]  Juan Pérez  ▼         │  ← Emoji grande visible
└──────────────────────────────┘
       ↑ Círculo azul con gradiente
       ↑ Fondo semi-transparente
            │
            ↓
      ┌──────────────────┐
      │ 👤  Ver Perfil   │  ← Emoji + texto
      ├──────────────────┤  ← Línea separadora
      │ 🚪  Cerrar Sesión│  ← Emoji + texto
      └──────────────────┘
```

---

## 🐛 PROBLEMAS COMUNES Y SOLUCIONES

### **Problema: El header no se ve gris**
**Solución:**
1. Limpiar caché del navegador (Ctrl + Shift + Delete)
2. Recargar con Ctrl + F5
3. Verificar que agendar_visita.css esté cargando

### **Problema: No se ven los emojis en el dropdown**
**Solución:**
1. Verificar que hay sesión iniciada
2. Abrir DevTools > Console
3. Buscar errores de JavaScript
4. Verificar que app.js está cargando

### **Problema: El logo no redirige**
**Solución:**
1. Verificar que el logo tiene el tag `<a>` alrededor
2. Verificar la ruta: `../index.html` o `index.html`
3. Verificar que no hay errores en console

### **Problema: Faltan enlaces en el menú**
**Solución:**
1. Verificar que la página tiene `<nav class="nav-menu">` con 5 enlaces
2. Debe tener: Inicio, Zonas, Comparador, Comunidad, Contacto
3. Si falta alguno, revisar el HTML de la página

---

## ✅ VERIFICACIÓN EXITOSA

**Si todos los tests pasan:**

✅ Header unificado correctamente
✅ Logo funcional en todas las páginas
✅ Navegación completa (5 enlaces)
✅ Dropdown con emojis visibles
✅ Sistema de sesión operativo
✅ Diseño consistente y profesional

**¡Tu proyecto está listo!** 🎉

---

## 📸 CAPTURAS ESPERADAS

### **1. Header en cualquier página:**
- Fondo gris claro
- 5 enlaces visibles en turquesa
- Logo a la izquierda
- Botones a la derecha

### **2. Dropdown abierto:**
- Avatar con emoji 👤 grande
- Nombre del usuario visible
- Dos opciones con emojis
- Línea separadora entre opciones

### **3. Hover en enlaces:**
- Línea azul animada debajo del enlace
- Color del texto más oscuro

### **4. Hover en dropdown:**
- Borde azul alrededor del trigger
- Fondo más blanco
- Sombra sutil

---

## 🚀 SIGUIENTE PASO

Una vez verificado todo:

```bash
git add .
git commit -m "feat: Unificación de header con diseño consistente y emojis en dropdown"
git push origin main
```

**Netlify desplegará automáticamente** 🎯

---

## 📊 TIEMPO TOTAL DE VERIFICACIÓN

- Test 1: Consistencia del Header → 2 min
- Test 2: Logo Clickeable → 30 seg
- Test 3: Enlaces de Navegación → 1 min
- Test 4: Dropdown con Emojis → 1 min
- Test 5: Funcionalidad → 30 seg

**TOTAL: ~5 minutos** ⏱️

---

**¡Todo listo para probar y desplegar!** ✨

**Fecha**: 18 de Noviembre de 2025
**Estado**: ✅ COMPLETADO

