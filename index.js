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
}

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
    // Calcular el área de interés con mayor puntaje y aptitudes
    let areaInteresAptitudes = "";
    for (const pregunta of pruebas[pruebaActual].preguntas) {
        const respuesta = respuestas[pregunta.id - 1];
        if (respuesta === 1 && pregunta.aptitudes && pregunta.areaInteres !== areaInteresAptitudes) {
            areaInteresAptitudes = pregunta.areaInteres;
            break;
        }
    }
    document.getElementById("areaInteresAptitudes").textContent = areaInteresAptitudes;

    // Agregar un texto específico según el área de interés con mayor puntaje y aptitudes
    let textoEspecifico = "";
    switch (areaInteresAptitudes) {
        case "Administrativo":
            textoEspecifico = "Texto específico para el área de interés 1 y aptitudes.";
            break;
        case "Humanidades":
            textoEspecifico = "Texto específico para el área de interés 2 y aptitudes.";
            break;
        // Agregar más casos según las áreas de interés...
        default:
            textoEspecifico = "No se encontró texto específico para esta área de interés y aptitudes.";
    }
    document.getElementById("textoEspecifico").textContent = textoEspecifico;
}

function regresar() {
    document.getElementById("nombre").value = "";
    document.getElementById("resultados").style.display = "none";
    document.getElementById("inicio").style.display = "block";
}