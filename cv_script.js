document.addEventListener('DOMContentLoaded', () => {
  // ── 1. PRINT CV / SAVE PDF ──
  const printBtn = document.getElementById('print-btn');
  printBtn?.addEventListener('click', () => {
    window.print();
  });

  // ── 3. LANGUAGE TRANSLATION ENGINE ──
  const langBtn = document.getElementById('lang-btn');
  const langText = document.getElementById('lang-text');

  const enDict = {
    // Controls / UI
    "Volver al Portafolio": "Back to Portfolio",
    "Imprimir / PDF": "Print / PDF",

    // Sidebar Contact
    "Contacto": "Contact",
    "Ciudad Juárez, Chihuahua": "Juarez City, Chihuahua",
    "México": "Mexico",

    // Sidebar Skills
    "Habilidades Técnicas": "Technical Skills",
    "Ofimática": "Office Suite",

    // Sidebar Languages
    "Idiomas": "Languages",
    "Español": "Spanish",
    "Inglés": "English",

    // Main Header
    "23 años": "23 years old",
    "Ingeniero en Sistemas Electrónicos Inteligentes · Técnico en Automatización e Integración Industrial · Desarrollador": "Intelligent Electronic Systems Engineer · Industrial Automation and Integration Technician · Developer",

    // Profile Summary
    "Perfil Profesional": "Professional Profile",
    "Estudiante de Ingeniería en SEI en la UACJ, con sólida formación en electrónica inteligente, sistemas embebidos e integración de software. Cuento con experiencia práctica en proyectos de automatización industrial y programación de sistemas embebidos de interfaz. Con una mentalidad orientada a la resolución de problemas y entusiasmo por la innovación tecnológica, busco incorporarme al sector industrial para aplicar mis competencias técnicas, aportar valor en el área de ingeniería y continuar desarrollándome profesionalmente en entornos de alta exigencia.": "Intelligent Electronic Systems Engineering student at UACJ, with a solid background in smart electronics, embedded systems, and software integration. I have practical experience in industrial automation projects and interface embedded systems programming. With a problem-solving mindset and enthusiasm for technological innovation, I seek to join the industrial sector to apply my technical skills, add value in the engineering field, and continue developing professionally in high-demand environments.",

    // Work Experience
    "Experiencia Laboral": "Work Experience",
    "Técnico en Automatización e Integración Industrial": "Automation and Industrial Integration Technician",
    "1 año (Concluido)": "1 year (Completed)",
    "Durol Sistemas y Servicios S.A. de C.V. · Ciudad Juárez, Chihuahua": "Durol Sistemas y Servicios S.A. de C.V. · Juarez City, Chihuahua",
    "Ensamblaje, cableado y puesta en marcha de maquinaria y celdas automatizadas destinadas a líneas de producción de alta exigencia para clientes globales del sector maquilador (Marelli, Flex, Siemens).": "Assembly, wiring, and commissioning of machinery and automated cells for high-demand production lines for global manufacturing clients (Marelli, Flex, Siemens).",
    "Construcción, armado y cableado estructurado de gabinetes eléctricos de control.": "Construction, assembly, and structured wiring of electrical control cabinets.",
    "Ejecución integral del montaje de maquinaria, incluyendo el ensamblaje de estructuras de perfiles de aluminio y la instalación de sistemas neumáticos e hidroneumáticos.": "Comprehensive machinery assembly, including building aluminum profile structures and installing pneumatic and hydropneumatic systems.",
    "Detección, diagnóstico y corrección de fallas técnicas (fault-finding) durante las etapas de prueba y validación de los equipos antes de su entrega en planta.": "Detection, diagnosis, and correction of technical faults (fault-finding) during testing and validation stages before equipment delivery.",
    "Programación de PLC básico.": "Basic PLC programming.",

    // Education
    "Trayectoria Académica": "Academic Trajectory",
    "Ingeniería en Sistemas Electrónicos Inteligentes (SEI)": "Intelligent Electronic Systems Engineering (IES)",
    "Ago 2022 – Presente": "Aug 2022 – Present",
    "Universidad Autónoma de Ciudad Juárez · Ciudad Juárez, Chihuahua": "Autonomous University of Ciudad Juarez · Juarez City, Chihuahua",
    "Carrera enfocada en la implementación de sistemas electrónicos inteligentes para la solución a problemas complejos de la ingeniería, aplicando la electrónica, el diseño de semiconductores, el desarrollo de software, la inteligencia artificial, la electromovilidad, el Internet de las Cosas y tecnologías emergentes.": "Degree focused on the implementation of intelligent electronic systems for solving complex engineering problems, applying electronics, semiconductor design, software development, artificial intelligence, electromobility, Internet of Things, and emerging technologies.",

    // Key Competencies
    "Competencias Clave": "Key Competencies",
    "Resolución de problemas": "Problem solving",
    "Trabajo en equipo": "Teamwork",
    "Adaptabilidad a entornos industriales": "Adaptability to industrial environments",
    "Pensamiento lógico y analítico": "Logical and analytical thinking",

    // Technical Competencies
    "Competencias Técnicas": "Technical Competencies",
    "Desarrollo de software": "Software development",
    "Instrumentación y Diagnóstico": "Instrumentation and Diagnostics",
    "Lectura e Interpretación de planos": "Reading and Interpretation of schematics",
    "Armado de gabinetes de control": "Assembly of control cabinets",
    "Integración Industrial y Automatización": "Industrial Integration and Automation",
    "Sistemas Embebidos y Electrónica Inteligente": "Embedded Systems and Smart Electronics"
  };

  // Extract all text nodes in the page body once (excluding script blocks and controls)
  const textNodes = [];
  const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
  let n;
  while (n = walk.nextNode()) {
    const t = n.nodeValue.replace(/\s+/g, ' ').trim();
    if (t !== '' && t !== 'EN' && t !== 'ES' && t !== '<' && t !== '/>') {
      n._esText = n.nodeValue; // Save original Spanish value
      n._esTrimmed = t;
      textNodes.push(n);
    }
  }

  let currentLang = localStorage.getItem('lang') || 'es';

  function applyLang(lang) {
    if (langText) {
      langText.textContent = lang === 'es' ? 'EN' : 'ES';
    }
    
    // Translate text nodes
    textNodes.forEach(node => {
      if (lang === 'en' && enDict[node._esTrimmed]) {
        node.nodeValue = enDict[node._esTrimmed];
      } else if (lang === 'es') {
        node.nodeValue = node._esText;
      }
    });

    // Translate Page Title
    document.title = lang === 'es' 
      ? "Curriculum Vitae - Aram Isaí Orozco Soto" 
      : "Resume - Aram Isaí Orozco Soto";
  }

  // Initial language application
  if (currentLang === 'en') {
    applyLang('en');
  }

  // Toggle language on button click
  langBtn?.addEventListener('click', () => {
    currentLang = currentLang === 'es' ? 'en' : 'es';
    applyLang(currentLang);
    localStorage.setItem('lang', currentLang);
  });
});
