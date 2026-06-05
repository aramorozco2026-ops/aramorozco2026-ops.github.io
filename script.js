/* =======================================================
   ARAM ISAI OROZCO SOTO — PORTAFOLIO · script.js
   Funcionalidades:
   1. Dark / Light Mode + localStorage
   2. Menú Hamburguesa (Mobile)
   3. Scroll → Header sólido + NavLinks activos
   4. Fade-in con IntersectionObserver
   5. Validación de Formulario de Contacto
======================================================= */

/* ── 1. DARK / LIGHT MODE ── */
const themeToggle = document.getElementById('theme-toggle');
const themeIcon   = document.getElementById('theme-icon');
const body        = document.body;

// Leer preferencia guardada
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') applyLight();

themeToggle.addEventListener('click', () => {
  if (body.classList.contains('light')) {
    applyDark();
  } else {
    applyLight();
  }
});

function applyLight() {
  body.classList.add('light');
  themeIcon.classList.remove('fa-moon');
  themeIcon.classList.add('fa-sun');
  localStorage.setItem('theme', 'light');
}

function applyDark() {
  body.classList.remove('light');
  themeIcon.classList.remove('fa-sun');
  themeIcon.classList.add('fa-moon');
  localStorage.setItem('theme', 'dark');
}


/* ── 2. MENÚ HAMBURGUESA ── */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const mobLinks   = document.querySelectorAll('.mob-link');

hamburger.addEventListener('click', toggleMenu);

function toggleMenu() {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
  mobileMenu.setAttribute('aria-hidden', !isOpen);
}

// Cerrar al hacer clic en un enlace
mobLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
    mobileMenu.setAttribute('aria-hidden', true);
  });
});


/* ── 3. SCROLL → HEADER + NAV LINKS ACTIVOS ── */
const header   = document.getElementById('header');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  // Header sólido
  header.classList.toggle('scrolled', window.scrollY > 40);

  // NavLink activo según sección visible
  let currentId = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 100;
    if (window.scrollY >= top) {
      currentId = sec.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.toggle(
      'active',
      link.getAttribute('href') === `#${currentId}`
    );
  });
}, { passive: true });


/* ── 4. FADE-IN con IntersectionObserver ── */
const fadeEls = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

fadeEls.forEach(el => observer.observe(el));


/* ── 5. VALIDACIÓN DE FORMULARIO ── */
const form        = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

const fields = {
  nombre:  { el: document.getElementById('nombre'),  err: document.getElementById('error-nombre') },
  email:   { el: document.getElementById('email'),   err: document.getElementById('error-email') },
  asunto:  { el: document.getElementById('asunto'),  err: document.getElementById('error-asunto') },
  mensaje: { el: document.getElementById('mensaje'), err: document.getElementById('error-mensaje') },
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clearError(field) {
  field.el.classList.remove('error');
  field.err.textContent = '';
}

function showError(field, msg) {
  field.el.classList.add('error');
  field.err.textContent = msg;
}

function validateField(key) {
  const field = fields[key];
  const value = field.el.value.trim();

  if (!value) {
    showError(field, 'Este campo es obligatorio.');
    return false;
  }

  if (key === 'email' && !emailRegex.test(value)) {
    showError(field, 'Ingresa un correo electrónico válido (ej: tu@correo.com).');
    return false;
  }

  if (key === 'mensaje' && value.length < 10) {
    showError(field, 'El mensaje debe tener al menos 10 caracteres.');
    return false;
  }

  clearError(field);
  return true;
}

// Validación en tiempo real al salir del campo
Object.keys(fields).forEach(key => {
  fields[key].el.addEventListener('blur', () => validateField(key));
  fields[key].el.addEventListener('input', () => {
    if (fields[key].el.classList.contains('error')) validateField(key);
  });
});

// (El envío del formulario se maneja en la sección 11 al final del archivo)


/* ── EXTRA: Smooth cursor glow (desktop) ── */
if (window.innerWidth > 900) {
  const glow = document.createElement('div');
  glow.style.cssText = `
    position:fixed;pointer-events:none;z-index:9999;
    width:300px;height:300px;border-radius:50%;
    background:radial-gradient(circle, rgba(0,212,255,0.04) 0%, transparent 70%);
    transform:translate(-50%,-50%);
    transition:left 0.12s ease,top 0.12s ease;
  `;
  document.body.appendChild(glow);

  document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  });
}

/* ── 6. EFECTO DE SONIDO EN HOVER (VENTANAS GRANDES) ── */
// INSTRUCCIONES PARA AÑADIR TU AUDIO:
// 1. Coloca tu archivo MP3 en la misma carpeta que tus archivos HTML y CSS.
// 2. Reemplaza 'hover-sound.mp3' en la línea de abajo con el nombre exacto de tu archivo.
const hoverSound = new Audio('sonido.mp3');
hoverSound.volume = 0.4; // Puedes ajustar el volumen aquí (0.0 a 1.0)

// Seleccionamos las "ventanas grandes" (tarjetas con la clase glass-card)
const glassCards = document.querySelectorAll('.glass-card');

glassCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    // Reiniciamos el audio para que se escuche completo aunque pasemos el cursor rápido
    hoverSound.currentTime = 0;
    
    // Reproducimos el audio
    // Usamos catch para evitar errores en la consola si el navegador bloquea el auto-play
    // antes de que el usuario haga clic en alguna parte de la página.
    hoverSound.play().catch(err => {
      console.log('El navegador requiere interacción previa para reproducir audio.', err);
    });
  });
});

/* ── 7. SCROLL PROGRESS BAR ── */
const progressBar = document.getElementById('scroll-progress');

window.addEventListener('scroll', () => {
  if (!progressBar) return;
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrollPercent = (scrollTop / scrollHeight) * 100;
  progressBar.style.width = scrollPercent + '%';
}, { passive: true });


/* ── 8. TYPEWRITER EFFECT (CON SOPORTE HTML) ── */
const typewriters = document.querySelectorAll('.typewriter');

const typeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      startTypewriter(entry.target);
      typeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

typewriters.forEach(el => {
  el.dataset.originalHtml = el.innerHTML;
  el.innerHTML = ''; // Limpiamos para el efecto
  typeObserver.observe(el);
});

function startTypewriter(element) {
  element.style.visibility = 'visible'; // Hacemos visible el contenedor
  const html = element.dataset.originalHtml;
  let i = 0;
  let isTag = false;
  let currentHTML = '';
  
  function type() {
    if (i < html.length) {
      if (html.charAt(i) === '<') isTag = true;
      currentHTML += html.charAt(i);
      if (html.charAt(i) === '>') isTag = false;
      
      element.innerHTML = currentHTML + '<span class="cursor">|</span>';
      
      if (isTag) {
        i++;
        type(); // Si es un tag (ej: <span>), lo procesamos al instante
      } else {
        i++;
        // Velocidad de tipeo aleatoria para mayor realismo
        const speed = Math.random() * (50 - 20) + 20; 
        setTimeout(type, speed);
      }
    } else {
      // Al terminar, quitamos el cursor
      element.innerHTML = currentHTML;
    }
  }
  
  // Pequeño retraso antes de empezar
  setTimeout(type, 200);
}


/* ── 9. EFECTO 3D TILT (VANILLA JS) ── */
// Seleccionamos las tarjetas, excluyendo el formulario de contacto por UX (escanear y escribir es difícil si se mueve)
const cards = document.querySelectorAll('.glass-card:not(.contact-form)');

cards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    if (window.innerWidth < 900) return; // Desactivar en móvil
    
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Al usar proporciones (x / centerX), evitamos que tarjetas grandes 
    // se inclinen de forma exagerada. Max angle: ~3.5 grados.
    const maxAngle = 3.5; 
    const rotateX = ((y - centerY) / centerY) * maxAngle;
    const rotateY = ((centerX - x) / centerX) * maxAngle;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)`;
  });
});


/* ── 10. FILTRO DE PROYECTOS ── */
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const projectsGrid = document.querySelector('.projects-grid');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Cambiar estado activo de botones
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const filter = btn.dataset.filter;
    
    projectsGrid.classList.add('filtering');
    
    projectCards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.classList.remove('hidden');
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
        }, 10);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.8)';
        setTimeout(() => {
          card.classList.add('hidden');
        }, 300);
      }
    });
  });
});


/* ── 11. ANIMACIÓN DE ENVÍO DE FORMULARIO MEJORADA ── */
// Reemplazamos la lógica anterior de submit para incluir el avión
form.removeEventListener('submit', null); // (Limpieza conceptual, ya lo manejamos abajo)

form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const results = Object.keys(fields).map(key => validateField(key));
  const allValid = results.every(Boolean);

  if (!allValid) return;

  const btn = form.querySelector('button[type="submit"]');
  const icon = btn.querySelector('i');
  
  btn.disabled = true;
  icon.classList.add('flying'); // Inicia animación CSS
  
  setTimeout(() => {
    btn.innerHTML = '<i class="fas fa-check"></i> ¡Enviado!';
    form.reset();
    
    formSuccess.textContent = '¡Mensaje enviado con éxito! El avión va en camino. ✈️';
    formSuccess.classList.add('visible');
    
    setTimeout(() => {
      formSuccess.classList.remove('visible');
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Mensaje';
    }, 4000);
  }, 1000);
});


/* ── 12. PRELOADER ── */
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    // Pequeño retraso para que se aprecie la animación
    setTimeout(() => {
      preloader.classList.add('fade-out');
    }, 600);
  }
});


/* ── 13. BACK TO TOP BUTTON ── */
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  if (!backToTopBtn) return;
  if (window.scrollY > 400) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
}, { passive: true });

backToTopBtn?.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

/* ── 13.5 AVATAR UPLOAD ── */
const avatarUpload = document.getElementById('avatar-upload');
const userAvatarImg = document.getElementById('user-avatar-img');
const avatarIcon = document.getElementById('avatar-icon');

const savedAvatar = localStorage.getItem('userAvatar');
if (savedAvatar && userAvatarImg && avatarIcon) {
  userAvatarImg.src = savedAvatar;
  userAvatarImg.style.display = 'block';
  avatarIcon.style.display = 'none';
}

avatarUpload?.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target.result;
      if (userAvatarImg && avatarIcon) {
        userAvatarImg.src = result;
        userAvatarImg.style.display = 'block';
        avatarIcon.style.display = 'none';
        localStorage.setItem('userAvatar', result);
      }
    };
    reader.readAsDataURL(file);
  }
});



/* ── 14. TRADUCCIÓN COMPLETA ── */
const langToggle = document.getElementById('lang-toggle');
const langText = document.getElementById('lang-text');

// Diccionario de inglés
const enDict = {
  "Aram Isai Orozco Soto | Portafolio": "Aram Isai Orozco Soto | Portfolio",
  "Sobre mí": "About me",
  "Estudios": "Studies",
  "Habilidades": "Skills",
  "Experiencia": "Experience",
  "Proyectos": "Projects",
  "Contacto": "Contact",
  "Hola, soy": "Hello, I am",
  "Aram Isai": "Aram Isai",
  "Orozco Soto": "Orozco Soto",
  "Ingeniero en Sistemas Electrónicos Inteligentes": "Intelligent Electronic Systems Engineer",
  "Técnico en Automatización y Integración Industrial · Desarrollador": "Industrial Automation and Integration Technician · Developer",
  "Apasionado por la electrónica inteligente, los sistemas embebidos y el desarrollo de software. Con experiencia práctica en automatización industrial y conocimientos académicos en SEI. Actualmente cursando la carrera en la": "Passionate about smart electronics, embedded systems, and software development. With practical experience in industrial automation and academic knowledge in SEI. Currently studying at",
  "Universidad Autónoma de Ciudad Juárez": "Autonomous University of Ciudad Juarez",
  "Cd. Juárez, Chih.": "Juarez City, Chih.",
  "UACJ · SEI": "UACJ · IES",
  "Inglés B2": "English B2",
  "23 años": "23 years old",
  "Ver Proyectos": "View Projects",
  "Contáctame": "Contact me",
  "Disponible": "Available",
  "Scroll": "Scroll",
  "Formación": "Education",
  "Trayectoria": "Trajectory",
  "Académica": "Academic",
  "Ingeniería en Sistemas Electrónicos Inteligentes (SEI)": "Intelligent Electronic Systems Engineering (IES)",
  "Universidad Autónoma de Ciudad Juárez (UACJ)": "Autonomous University of Ciudad Juarez (UACJ)",
  "En curso": "In progress",
  "2022 – Actualidad · 3 años completados": "2022 - Present · 3 years completed",
  "Carrera enfocada en la implementación de sistemas electrónicos inteligentes para la solución a problemas complejos de la ingeniería, aplicando la electrónica, diseño de semiconductores, desarrollo de software, inteligencia artificial, la electromovilidad, Internet de las cosas y tecnologías emergentes.": "Degree focused on the implementation of intelligent electronic systems to solve complex engineering problems, applying electronics, semiconductor design, software development, artificial intelligence, electromobility, Internet of Things, and emerging technologies.",
  "Sistemas Embebidos": "Embedded Systems",
  "Electrónica Analógica y Digital": "Analog and Digital Electronics",
  "Programación Avanzada": "Advanced Programming",
  "Machine Learning": "Machine Learning",
  "Diseño de Circuitos": "Circuit Design",
  "Matemática para IA": "Mathematics for AI",
  "Automatización": "Automation",
  "Preparatoria": "High School",
  "Ciudad Juárez, Chihuahua": "Juarez City, Chihuahua",
  "Completado": "Completed",
  "2017 - 2020": "2017 - 2020",
  "Formación media superior con orientación hacia ciencias exactas e ingeniería.": "High school education oriented towards exact sciences and engineering.",
  "Capacidades": "Capabilities",
  "Técnicas": "Technical",
  "Programación": "Programming",
  "Web Full Stack": "Full Stack Web",
  "HTML · CSS · JavaScript": "HTML · CSS · JavaScript",
  "Lenguajes de Propósito General": "General Purpose Languages",
  "C · C++ · Python · MATLAB": "C · C++ · Python · MATLAB",
  "Embebido & Hardware": "Embedded & Hardware",
  "MicroPython · Ensamblador · NumPy · VHDL": "MicroPython · Assembly · NumPy · VHDL",
  "Microprocesadores": "Microprocessors",
  "Implementación y programación directa sobre hardware": "Direct hardware programming and implementation",
  "Integración Hardware/Software": "Hardware/Software Integration",
  "Electrónica y lógica de control": "Electronics and control logic",
  "Programación de Microcontroladores": "Microcontroller Programming",
  "Ensamblador · Microcontroladores PIC · ESP32": "Assembly · PIC Microcontrollers · ESP32",
  "Modelos Clasificadores": "Classifier Models",
  "Implementación en Python (Pandas, PyTorch, NumPy)": "Implementation in Python (Pandas, PyTorch, NumPy)",
  "Modelos Predictivos": "Predictive Models",
  "Análisis y predicción de conjuntos de datos": "Data set analysis and prediction",
  "Álgebra Lineal Aplicada": "Applied Linear Algebra",
  "Base matemática para IA": "Mathematical foundation for AI",
  "Electrónica Analógica & Digital": "Analog & Digital Electronics",
  "Sistemas y Circuitos Digitales": "Digital Systems and Circuits",
  "Diseño y simulación de sistemas lógicos · Lógica binaria · Aplicación de álgebra booleana": "Design and simulation of logic systems · Binary logic · Application of Boolean algebra",
  "VHDL": "VHDL",
  "Programación y diseño de hardware en FPGA": "Hardware design and programming in FPGA",
  "Electrónica Básica": "Basic Electronics",
  "Uso de componentes electrónicos y diseño de circuitos para prácticas académicas": "Use of electronic components and circuit design for academic practices",
  "Automatización Industrial": "Industrial Automation",
  "Gabinetes Eléctricos y de Control": "Electrical and Control Cabinets",
  "Construcción, armado y cableado": "Construction, assembly, and wiring",
  "Sistemas Neumáticos y Mecánicos": "Pneumatic and Mechanical Systems",
  "Ensamblaje e integración de maquinaria para sector maquilador": "Assembly and integration of machinery for the manufacturing sector",
  "Diagnóstico de Fallas": "Fault Diagnosis",
  "Detección y corrección técnica en el área industrial": "Technical detection and correction in the industrial area",
  "Competencias": "Competencies",
  "Resolución de Problemas": "Problem Solving",
  "Pensamiento lógico y analítico": "Logical and analytical thinking",
  "Trabajo en Equipo": "Teamwork",
  "Adaptabilidad en entornos industriales": "Adaptability in industrial environments",
  "Idiomas": "Languages",
  "Español (Nativo) · Inglés (B2)": "Spanish (Native) · English (B2)",
  "Laboral": "Work",
  "Técnico en Automatización e Integración Industrial": "Automation and Industrial Integration Technician",
  "Durol Sistemas y Servicios, S.A. de C.V. · Ciudad Juárez, Chihuahua": "Durol Sistemas y Servicios, S.A. de C.V. · Juarez City, Chihuahua",
  "7 meses · Actualidad": "7 months · Present",
  "1 año": "1 year",
  "Activo": "Active",
  "Concluido": "Completed",
  "Participación activa en el diseño y fabricación de maquinaria y líneas de producción para la industria maquiladora de la región.": "Active participation in the design and manufacture of machinery and production lines for the regional manufacturing industry.",
  "Construcción, armado y cableado de gabinetes eléctricos": "Construction, assembly, and wiring of electrical cabinets",
  "Interpretación y análisis de diagramas eléctricos": "Interpretation and analysis of electrical diagrams",
  "Ensamblaje de sistemas eléctricos y neumáticos": "Assembly of electrical and pneumatic systems",
  "Fabricación de maquinaria para industria maquiladora": "Manufacture of machinery for the manufacturing industry",
  "Diagnóstico, detección y corrección de fallas técnicas": "Diagnosis, detection, and correction of technical faults",
  "Uso de herramientas especializadas en automatización industrial": "Use of specialized tools for industrial automation",
  "Programación de PLC básico": "Basic PLC programming",
  "Portafolio": "Portfolio",
  "Realizados": "Completed",
  "Todos": "All",
  "Software": "Software",
  "Hardware / Electrónica": "Hardware / Electronics",
  "IA & ML": "AI & ML",
  "Portafolio Web Interactivo": "Interactive Web Portfolio",
  "Desarrollo de un portafolio web interactivo con diseño responsivo, modo oscuro y soporte bilingüe (Español/Inglés).": "Development of an interactive web portfolio with responsive design, dark mode, and bilingual support (Spanish/English).",
  "Académico · Personal": "Academic · Personal",
  "Candado Electrónico": "Electronic Padlock",
  "Sistema de simulación de candado electrónico implementado con microcontrolador. Gestión de contraseñas y acceso controlado mediante lógica embebida en C++.": "Electronic padlock simulation system implemented with a microcontroller. Password management and controlled access via embedded C++ logic.",
  "Académico": "Academic",
  "Gestor de Contraseñas": "Password Manager",
  "Sistema de almacenamiento seguro de contraseñas en C++. Implementa estructuras de datos para la gestión eficiente de credenciales.": "Secure password storage system in C++. Implements data structures for efficient credential management.",
  "Electrónica": "Electronics",
  "Diodos": "Diodes",
  "Pedal de Distorsión": "Distortion Pedal",
  "Diseño y construcción de un pedal de distorsión para guitarra utilizando diodos. Proyecto de electrónica analógica con aplicación musical.": "Design and construction of a guitar distortion pedal using diodes. Analog electronics project with musical application.",
  "FPGA": "FPGA",
  "Basys3": "Basys3",
  "Lógica Digital en VHDL": "Digital Logic in VHDL",
  "Desarrollo de programas de lógica digital con uso de tarjeta FPGA modelo Basys3. Diseño de circuitos combinacionales y secuenciales para la demostración práctica y comprensión.": "Development of digital logic programs using a Basys3 model FPGA board. Design of combinational and sequential circuits for practical demonstration and understanding.",
  "Diseño de programas con ESP32 y electrónica analógica": "Design of programs with ESP32 and analog electronics",
  "Programas de lógica matemática implementados sobre microprocesadores empleando MicroPython para control, procesamiento numérico con uso de interfaces programadas vía HTML y uso de bibliotecas como FLASK y similares.": "Mathematical logic programs implemented on microprocessors using MicroPython for control, numerical processing using interfaces programmed via HTML, and the use of libraries like FLASK and similar.",
  "Ensamblador": "Assembly",
  "Hardware": "Hardware",
  "Programas en Ensamblador": "Assembly Programs",
  "Desarrollo de programas básicos en lenguaje ensamblador para control y comprensión profunda del hardware a bajo nivel para la demostración práctica y de comprensión básica del lenguaje.": "Development of basic programs in assembly language for control and deep understanding of the hardware at a low level for practical demonstration and basic understanding of the language.",
  "Python": "Python",
  "Modelos de ML": "ML Models",
  "Implementación de clasificadores y modelos predictivos de datos usando Python. Aplicación de técnicas de Machine Learning para análisis y predicción.": "Implementation of data classifiers and predictive models using Python. Application of Machine Learning techniques for analysis and prediction.",
  "¿Trabajamos juntos?": "Work together?",
  "Hoy": "Today",
  "Estoy abierto a oportunidades laborales y colaboraciones. Contáctame y te responderé lo más pronto posible.": "I am open to job opportunities and collaborations. Contact me and I will respond as soon as possible.",
  "Ubicación": "Location",
  "Ciudad Juárez, Chihuahua, México": "Juarez City, Chihuahua, Mexico",
  "Universidad": "University",
  "UACJ – Ingeniería en SEI": "UACJ - IES Engineering",
  "Empresa Actual": "Current Company",
  "Durol Systems": "Durol Systems",
  "Correo Personal": "Personal Email",
  "Correo Universitario": "University Email",
  "Teléfono": "Phone",
  "Nombre completo *": "Full name *",
  "Correo electrónico *": "Email *",
  "Asunto *": "Subject *",
  "Mensaje *": "Message *",
  "Enviar Mensaje": "Send Message",
  "Tu nombre": "Your name",
  "tu@correo.com": "you@email.com",
  "¿En qué puedo ayudarte?": "How can I help you?",
  "Escribe tu mensaje aquí...": "Write your message here...",
  "© 2025 Aram Isai Orozco Soto · Todos los derechos reservados.": "© 2025 Aram Isai Orozco Soto · All rights reserved.",
  "Descargar CV": "Download Resume",
  "Ver CV Web": "View Web CV",
  "Ver CV": "View Resume",
  "¿Quieres ver mi perfil completo?": "Want to see my full profile?",
  "Descarga mi currículum vitae en formato PDF para conocer más detalles sobre mi trayectoria y habilidades.": "Download my resume in PDF format to learn more about my background and skills.",
  "Puedes consultar mi currículum interactivo en versión web o descargarlo en formato PDF.": "You can view my interactive web resume or download it as a PDF.",
  "Puedes consultar mi currículum interactivo en versión web y exportarlo a PDF desde allí.": "You can view my interactive web resume and export it to PDF from there.",
  "Descargar CV (PDF)": "Download Resume (PDF)",
  "Perfil de LinkedIn": "LinkedIn Profile",
  "Repositorio de GitHub": "GitHub Repository",
  "Perfil de Indeed": "Indeed Profile"
};

// Preparar los nodos de texto una sola vez
const textNodes = [];
const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
let n;
while(n = walk.nextNode()) {
  const t = n.nodeValue.replace(/\s+/g, ' ').trim();
  if (t !== '' && t !== 'EN' && t !== 'ES' && t !== '<' && t !== '/>') {
    n._esText = n.nodeValue; // Guardamos el español original
    n._esTrimmed = t;
    textNodes.push(n);
  }
}

// Además, preparar placeholders de inputs/textareas
const inputs = document.querySelectorAll('input[placeholder], textarea[placeholder]');
inputs.forEach(input => {
  input._esPlaceholder = input.getAttribute('placeholder');
});

// Preparar aria-labels, titles y data-tooltips de enlaces/botones que requieran traducción
const translatables = document.querySelectorAll('[aria-label], [title], [data-tooltip]');
translatables.forEach(el => {
  const aria = el.getAttribute('aria-label');
  const title = el.getAttribute('title');
  const tooltip = el.getAttribute('data-tooltip');
  if (aria) el._esAriaLabel = aria;
  if (title) el._esTitle = title;
  if (tooltip) el._esTooltip = tooltip;
});

// Guardar los dataset de typewriter (si existen)
const typewritersLang = document.querySelectorAll('.typewriter');
typewritersLang.forEach(el => {
  if (el.dataset.originalHtml) {
     el._esHtml = el.dataset.originalHtml;
  }
});

let currentLang = localStorage.getItem('lang') || 'es';
if (currentLang === 'en') applyLang('en');

langToggle?.addEventListener('click', () => {
  currentLang = currentLang === 'es' ? 'en' : 'es';
  applyLang(currentLang);
  localStorage.setItem('lang', currentLang);
});

function applyLang(lang) {
  if (!langToggle) return;
  langText.textContent = lang === 'es' ? 'EN' : 'ES'; 
  
  // Traducir text nodes
  textNodes.forEach(node => {
    if (lang === 'en' && enDict[node._esTrimmed]) {
      node.nodeValue = enDict[node._esTrimmed];
    } else if (lang === 'es') {
      node.nodeValue = node._esText;
    }
  });

  // Traducir placeholders
  inputs.forEach(input => {
    if (lang === 'en' && enDict[input._esPlaceholder]) {
      input.setAttribute('placeholder', enDict[input._esPlaceholder]);
    } else if (lang === 'es') {
      input.setAttribute('placeholder', input._esPlaceholder);
    }
  });

  // Traducir aria-labels, titles y data-tooltips
  translatables.forEach(el => {
    if (lang === 'en') {
      if (el._esAriaLabel && enDict[el._esAriaLabel]) {
        el.setAttribute('aria-label', enDict[el._esAriaLabel]);
      }
      if (el._esTitle && enDict[el._esTitle]) {
        el.setAttribute('title', enDict[el._esTitle]);
      }
      if (el._esTooltip && enDict[el._esTooltip]) {
        el.setAttribute('data-tooltip', enDict[el._esTooltip]);
      }
    } else if (lang === 'es') {
      if (el._esAriaLabel) el.setAttribute('aria-label', el._esAriaLabel);
      if (el._esTitle) el.setAttribute('title', el._esTitle);
      if (el._esTooltip) el.setAttribute('data-tooltip', el._esTooltip);
    }
  });
  
  // Re-aplicar typewriter translations
  typewritersLang.forEach(el => {
     let currentHtml = lang === 'es' ? el._esHtml : null;
     if (lang === 'en') {
       if (el.dataset.en) {
         currentHtml = el.dataset.en;
       } else {
         const tempDiv = document.createElement('div');
         tempDiv.innerHTML = el._esHtml;
         const twWalk = document.createTreeWalker(tempDiv, NodeFilter.SHOW_TEXT, null, false);
         let twN;
         while(twN = twWalk.nextNode()) {
           const t = twN.nodeValue.replace(/\s+/g, ' ').trim();
           if (enDict[t]) {
             // Mantenemos los espacios si los había
             twN.nodeValue = twN.nodeValue.replace(t, enDict[t]);
           }
         }
         currentHtml = tempDiv.innerHTML;
       }
     }
     if (currentHtml) {
       el.dataset.originalHtml = currentHtml;
       // Si el efecto ya pasó y está visible, actualizar el HTML actual
       if (el.style.visibility === 'visible') {
         el.innerHTML = currentHtml;
       }
     }
  });
}
