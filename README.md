# Portafolio Web Con Diseño Interactivo y Responsivo

## Descripción General del Proyecto

El presente documento detalla la arquitectura, el diseño y la implementación de un portafolio web desarrollado bajo el paradigma *WebStack* moderno y un enfoque estético minimalista. Su propósito fundamental es la exposición estructurada de la trayectoria académica y profesional del autor, con énfasis en sus competencias como Ingeniero en Sistemas Electrónicos Inteligentes y Técnico en Automatización. La plataforma prioriza la experiencia de usuario (UX) y la optimización del rendimiento mediante la implementación de tecnologías web nativas.

## Características Principales y Diseño de Interfaz

* **Interfaz Gráfica basada en el Paradigma "Mica" (Windows 11):** Integración de una estética corporativa contemporánea mediante el empleo de técnicas de *glassmorphism* y el filtro de desenfoque de fondo (*backdrop-filter*).
* **Gestión de Temas (Oscuro/Claro):** Implementación técnica soportada por variables de CSS y almacenamiento local persistente a través de la interfaz genérica `localStorage`.
* **Internacionalización (ES/EN):** Sistema dinámico de conmutación de idiomas gestionado íntegramente a nivel de cliente a través de rutinas en JavaScript.
* **Currículum Vitae (CV) Web Interactivo y Responsivo:** Página de CV web integrada (`cv.html`) y optimizada para ser completamente fluida en móviles/escritorio, permitiendo la conmutación de idioma e impresión optimizada a PDF.
* **Interactividad y Dinamismo de Interfaz de Usuario (UI):**
  * Proyección isométrica e inclinación tridimensional (*3D Tilt*) aplicada a los contenedores de los proyectos.
  * Animación de tipografía dinámica mediante la técnica de máquina de escribir (*Typewriter*).
  * Retroalimentación auditiva ante la interacción del usuario (*Hover sounds*).
  * Animaciones personalizadas en tiempo de ejecución, incluyendo retroalimentación visual al enviar formularios.
* **Diseño Adaptativo (*Responsive Web Design*):** Arquitectura fluida que garantiza la escalabilidad y correcta visualización en dispositivos móviles, tabletas y computadoras de escritorio.
* **Optimización de Impresión y Exportación a PDF:** Configuración avanzada de estilos de impresión (`@media print`) para la conversión fiel a formato físico o digital A4 del CV, forzando la renderización de gráficos de fondo y colores mediante directivas CSS.

## Pila Tecnológica (Tech Stack)

El proyecto prescinde de frameworks de terceros, utilizando tecnologías fundamentales para asegurar un alto rendimiento:

* **HTML5:** Establecimiento de una estructura semántica rigurosa orientada a la optimización para motores de búsqueda (SEO) y accesibilidad.
* **CSS3:** Empleo avanzado de propiedades personalizadas (variables CSS), modelos de diseño flexible (*Flexbox*), cuadrículas (*Grid Layout*) y control de animaciones mediante *Keyframes*.
* **JavaScript Nativo (ES6+):**
  * Uso de la interfaz `Intersection Observer API` para la gestión eficiente de transiciones de opacidad (*fade-in*) vinculadas al evento de desplazamiento (*scroll*).
  * Implementación de la interfaz `localStorage` para la preservación de las preferencias de sesión del usuario (Tema e Idioma cruzados entre el portafolio y el CV).
  * Manipulación de eventos sonoros a través de `Web Audio API` (o gestión nativa de elementos de audio).
  * Motor de traducción interactiva bidireccional por nodos de texto (`TreeWalker` nativo).
* **FontAwesome:** Integración de fuentes iconográficas para la representación visual de elementos técnicos y redes de contacto.

## Estructura de Directorios y Archivos

* `index.html`: Define la estructura base, jerarquía y contenido semántico del sitio principal del portafolio.
* `styles.css`: Hoja de estilos en cascada del portafolio estructurada bajo los principios de la arquitectura de diseño *Fluent*.
* `script.js`: Controlador lógico principal del portafolio para la gestión de interactividad, validación del formulario de contacto y conmutación de idioma.
* `enDict.js`: Diccionario de internacionalización al inglés.
* `cv.html`: Estructura web responsiva del Currículum Vitae, enlazada a las opciones del portafolio.
* `cv_styles.css`: Estilo del CV adaptado a pantallas y optimizado bajo un layout A4 de alta fidelidad para impresión física y PDF.
* `cv_script.js`: Controlador para las interacciones del CV (sincronización de tema, impresión rápida y traducción dinámica).
* `sonido.mp3`: Recurso multimedia de retroalimentación auditiva asociado a las acciones del usuario.

---

### Créditos y Contexto Académico

* **Autoría:** Aram Isai Orozco Soto
* **Matrícula Estudiantil:** 229095
* **Contexto de Desarrollo:** Proyecto Final correspondiente a la asignatura de Programación Full Web Stack.
* **Institución Académica:** Universidad Autónoma de Ciudad Juárez (UACJ).
