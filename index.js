let nombreUsuario;
let pruebaActual;
let preguntaActual;
let preguntaActualIndex = 0;
let preguntaActualId = 1;

function regresarAlInicio() {
    location.reload(); // Recargar la página para volver al inicio
}

function mostrarPruebas() {
    nombreUsuario = document.getElementById("nombre").value;
    if (nombreUsuario.trim() !== "") {
        document.getElementById("inicio").style.display = "none";
        document.getElementById("pruebas").style.display = "block";
    } else {
        alert("Ingresa tu nombre antes de seleccionar una prueba.");
    }
    document.getElementById("nombreUser").textContent = nombreUsuario;
}


const checkbox = document.getElementById('checkboxDataPersonal');
const btn = document.getElementById('btnCheckbox');

checkbox.addEventListener('change', function() {
    if (checkbox.checked) {
        btn.removeAttribute('disabled');
    }else{
        btn.setAttribute('disabled', 'true');
    }
});


function comenzarPrueba(pruebaIndex) {
    pruebaActual = pruebaIndex;
    preguntaActual = 0;
    respuestas = [];
    // mostrarModalInstrucciones();
    mostrarPregunta();
    document.getElementById("pruebas").style.display = "none";
    document.getElementById("prueba").style.display = "block";
}

function mostrarPregunta() {
    //Ordenamos las preguntas en el banco por Id
    // pruebas.sort((a, b) => a.id - b.id)
    const pregunta = pruebas[pruebaActual].preguntas[preguntaActual];
    const totalPreguntas = pruebas[pruebaActual].preguntas.length;

    document.getElementById("enunciado1").textContent = `Pregunta ${pregunta.id}`;
    document.getElementById("enunciado2").textContent = `${pregunta.id}/${totalPreguntas}`;
    document.getElementById("enunciado").textContent = pregunta.enunciado;
    document.getElementById("btnAnterior").disabled = preguntaActual === 0;
    document.getElementById("btnSiguiente").textContent = preguntaActual === pruebas[pruebaActual].preguntas.length - 1 ? "Finalizar" : "Siguiente";

    // Obtener la respuesta almacenada (si existe) y marcar el radio correspondiente
    const radioSi = document.getElementById("radioSi");
    const radioNo = document.getElementById("radioNo");
    limpiarRespuestas();
}

function actualizarBarraProgreso() {
    const pregunta = pruebas[pruebaActual].preguntas[preguntaActual];
    const totalPreguntas = pruebas[pruebaActual].preguntas.length;

    const progreso = (pregunta.id / totalPreguntas) * 100;
    const barraProgreso = document.getElementById("barraProgreso");
    barraProgreso.style.width = `${progreso}%`;
    barraProgreso.setAttribute("aria-valuenow", progreso);
}

function responder() {
    const radios = document.querySelectorAll('input[name="respuesta"]');
    let respuesta = undefined;
    for (const radio of radios) {
        if (radio.checked) {
            respuesta = parseInt(radio.value);
            break;
        }
    }

    if (respuesta === undefined) {
        // alert("Selecciona una opción de respuesta antes de continuar.");
        return;
    }

    respuestas[preguntaActual] = respuesta;
    const btnSiguiente = document.getElementById("btnSiguiente");
    const todasRespondidas = respuestas.every(respuesta => respuesta !== undefined);
    btnSiguiente.disabled = !todasRespondidas;
}

function anteriorPregunta() {
    preguntaActual--;
    mostrarPregunta();
    actualizarBarraProgreso();
}

function siguientePregunta() {
    responder();

    if (preguntaActual === pruebas[pruebaActual].preguntas.length - 1) {
        if (respuestas.some(respuesta => respuesta === undefined)) {
            alert("Completa todas las preguntas antes de continuar.");
            return;
        }
        mostrarResultados();
        document.getElementById("prueba").style.display = "none";
        document.getElementById("resultados").style.display = "block";
    } else {
        if (respuestas[preguntaActual] === undefined) {
            alert("Debes seleccionar una opción de respuesta antes de continuar.");
            return;
        }
        preguntaActual++;
        mostrarPregunta();
        actualizarBarraProgreso();
    }
}

function limpiarRespuestas() {
    const radios = document.querySelectorAll('input[name="respuesta"]');
    radios.forEach(radio => radio.checked = false);
}

function mostrarResultados() {
    document.getElementById("nombreResultado").textContent = nombreUsuario;

    // -------------------------------------------------------------------------------------------------------
    // Calcular el área de interés con mayor puntaje
    let areaInteresMayor = "";
    let maxPuntaje = 0;
    for (const pregunta of pruebas[pruebaActual].preguntas) {
        const respuesta = respuestas[pregunta.id - 1];
        if (respuesta === 1) {
            maxPuntaje++;
            if (pregunta.areaInteres !== areaInteresMayor) {
                areaInteresMayor = pregunta.areaInteres;
            }
        }
    }
    document.getElementById("areaInteresMayor").textContent = areaInteresMayor;

    // -----------------------------------------------------------------------------------------------------------
    // Calcular el área de interés con mayor puntaje y aptitudes
    // let areaInteresAptitudes = "";
    // for (const pregunta of pruebas[pruebaActual].preguntas) {
    //     const respuesta = respuestas[pregunta.id - 1];
    //     if (respuesta === 1 && pregunta.aptitudes && pregunta.areaInteres !== areaInteresAptitudes) {
    //         areaInteresAptitudes = pregunta.areaInteres;
    //         break;
    //     }
    // }
    // document.getElementById("areaInteresAptitudes").textContent = areaInteresAptitudes;
        // ----------------------------------------------------------------------------------------------------



    // Agregar texto específico donde define las aptitudes acordes al perfil
    let textoIntro = "";
    // Agregar un texto específico con las carreras relacionadas según el área de interés con mayor puntaje y aptitudes
    let textoEspecifico = "";
    switch (areaInteresMayor){
        case "Administrativas y Contables":
            textoIntro = "Tus intereses están relacionados con carreras que impliquen organización, supervisión, orden, análisis, síntesis, colaboración y cálculo. Asimismo, tus aptitudes más sobresalientes son: persuasión, objetividad, practicidad, tolerancia y responsabilidad.";
            textoEspecifico = "Administración de Empresas, Contaduría, Economía, Comercio Internacional, Administración Hotelera y Turismo, Negocios Internacionales, y afines.";
            break;
        case "Humanísticas y Sociales":
            textoIntro = "Tus intereses están relacionados con carreras que impliquen precisión verbal, organización, relación de hechos, lingüística, orden y justicia. Asimismo, tus aptitudes más destacadas son: responsabilidad, justicia, persuasión, sagacidad e imaginación.";
            textoEspecifico = "Sociología, Derecho, Filosofía, Historia, Turismo, Psicología, Recursos Humanos y Relaciones Laborales, Relaciones Públicas, Ciencias Políticas, Educación, Literatura, Idiomas y afines.";
            break;
        case "Artística":
            textoIntro = "Tus intereses están relacionados con carreras que impliquen: facilidad para las manualidades, ubicación en espacios interiores, fluidez y expresión verbal, comunicación visual, diseño, desarrollo auditivo, ambientes armónicos y estéticos. Con relación a tus aptitudes, indica habilidad para dejar volar tu imaginación, ser detallista, innovador, creativo e intuitivo.";
            textoEspecifico = "Periodismo, Arquitectura, Música, Diseño de modas, Diseño gráfico y afines.";
            break;
        case "Medicina y Ciencias de la Salud":
            textoIntro = "Tus intereses están relacionados con carreras que impliquen asistencia, ayuda, investigación, precisión, percepción y análisis. Con relación a sus aptitudes, indicas habilidad de comprensión, respeto, paciencia, altruismo, persuasión y solidaridad.";
            textoEspecifico = "Medicina, Veterinaria, Farmacia, Enfermería, Terapia Ocupacional, Nutrición, Odontología, Óptica y Optometría, Kinesiología, Psicología, entre otras.";
            break;
        case "Ingeniería y Computación":
            textoIntro = "Sus intereses están relacionados a lo científico, lo exacto, lo manual, la planificación y la exactitud. Asimismo, tus aptitudes más destacadas se refieren a lo analítico, preciso, práctico, crítico, metódico, innovador y a la resolución de problemas.";
            textoEspecifico = "Ingenierías en sus diversas áreas, tecnologías de la información y la comunicación, computación.";
            break;
        case "Defensa y Seguridad":
            textoIntro = "Tus intereses están relacionados con carreras que impliquen justicia, equidad, colaboración, espíritu de equipo y liderazgo. Con relación a tus aptitudes, indicas habilidad de valentía, solidaridad, persuasión y capacidad de asumir riesgos.";
            textoEspecifico = "Vigilante de seguridad, Bombero, Agente de Policía, Escolta, Detective Privado, Operador de Cámaras de Vigilancia, Oficial y Suboficial de las Fuerzas Armadas entre otras.";
            break;
        case "Ciencias Exactas y Agrarias":
            textoIntro = "Tus intereses están relacionados con carreras que impliquen organización, investigación, orden, análisis, síntesis y clasificación. Con relación a tus aptitudes, indicas las siguientes: metódico, analítico, observado, introvertido, paciente y seguro."; 
            textoEspecifico = "Física, Química, Farmacia, Matemática, Bioquímica, Ciencia y Tecnología de los Alimentos, Ciencias Geológicas, Ciencias de la Atmósfera, Ciencias de la Computación, entre otras.";
            break;
        // Agregar más casos según las áreas de interés...
        default:
            textoEspecifico = "No se encontró texto específico para esta área de interés y aptitudes.";
    }
    document.getElementById("textoEspecifico").textContent = textoEspecifico;
    document.getElementById("textoIntro").textContent = textoIntro
}

function regresar() {
    document.getElementById("nombre").value = "";
    document.getElementById("resultados").style.display = "none";
    document.getElementById("inicio").style.display = "block";
}