        // Arreglo con las categorías y preguntas por categoría y área de interés para cada tipo de prueba

        const tipoDePrueba2 = [
            // Estructura de datos similar a los ejemplos anteriores, con preguntas diferentes
        ];

        let usuario = "";
        let tipoPruebaActual = -1;
        let categoriaActual = 0;
        let areaInteresActual = 0; 
        let preguntaActual = 0;
        let preguntasActuales = [];
        let puntajesAreas = {}; // Objeto para almacenar los puntajes por área de interés

        function regresarAlInicio() {
            location.reload(); // Recargar la página para volver al inicio
        }

        // Función para mostrar la vista previa y seleccionar el tipo de prueba
        function mostrarVistaPrevia() {
            usuario = document.getElementById("nombreUsuario").value;
            document.getElementById("inicioContainer").style.display = "none";
            document.getElementById("vistaPreviaContainer").style.display = "block";
        }

        // Función para iniciar el cuestionario con el tipo de prueba seleccionado
        function iniciarCuestionario(tipoPrueba) {
            tipoPruebaActual = tipoPrueba;
            document.getElementById("vistaPreviaContainer").style.display = "none";
            preguntasActuales = tipoPrueba === 0 ? tipoDePrueba1 : tipoDePrueba2;
            mostrarPregunta();
        }

        // Función para combinar todas las preguntas del banco en un solo arreglo
        function combinarPreguntas(bancoDePreguntas) {
            const preguntasCombinadas = [];
            bancoDePreguntas.forEach(categoria => {
                categoria.areas.forEach(area => {
                    preguntasCombinadas.push(...area.preguntas);
                });
            });
            return preguntasCombinadas;
        }

        // Función para ordenar todas las preguntas del banco por ID
        function ordenarPreguntasPorId(preguntas) {
            preguntas.sort((a, b) => a.id - b.id);
        }

        // Función para mostrar la pregunta actual y actualizar el indicador de progreso
        function mostrarPregunta() {
            const categoria = preguntasActuales[categoriaActual];
            const areaInteres = categoria.areas[areaInteresActual];
            const pregunta = areaInteres.preguntas[0];

            // Calculo para tener el progreso de las preguntas
            // const cant_pregunta = preguntasActuales[preguntaActual];
            // const totalPregntas = pregunt.length;
            // const progreso = preguntaActual + 1;

            document.getElementById("preguntaContainer").style.display = "block";
            document.getElementById("categoria").textContent = `Categoría: ${categoria.nombre} - Área de Interés: ${areaInteres.nombre}`;
            document.getElementById("enunciado").textContent = pregunta.enunciado;
            document.getElementById("progreso").textContent = `Pregunta ${preguntasActuales.length}`;
        }
        // Función para validar la respuesta seleccionada por el usuario
        function validarRespuesta(respuesta) {
            const categoria = preguntasActuales[categoriaActual];
            const areaInteres = categoria.areas[areaInteresActual];
            const pregunta = areaInteres.preguntas[0];

            // Guardar la respuesta seleccionada en una variable para validar al presionar "Siguiente"
            pregunta.respuestaSeleccionada = respuesta;

            // Deshabilitar los botones de respuesta para evitar cambios después de seleccionar
            const btnRespuestaNo = document.getElementById("btnRespuestaNo");
            const btnRespuestaSi = document.getElementById("btnRespuestaSi");
            btnRespuestaNo.disabled = true;
            btnRespuestaSi.disabled = true;
        }

        // Función para avanzar a la siguiente pregunta
        function preguntaSiguiente() {
            // Validar que el usuario haya seleccionado una respuesta antes de avanzar
            const pregunta = preguntasActuales[categoriaActual].areas[areaInteresActual].preguntas[0];
            if (pregunta.respuestaSeleccionada !== undefined) {
                const categoria = preguntasActuales[categoriaActual];
                const areaInteres = categoria.areas[areaInteresActual];
                const pregunta = areaInteres.preguntas[0];

                if (!puntajesAreas[areaInteres.nombre]) puntajesAreas[areaInteres.nombre] = 0;
                if (pregunta.respuestaSeleccionada === 1) {
                    // Respuesta Sí
                    puntajesAreas[areaInteres.nombre]++;
                }

                areaInteres.preguntas.shift(); // Eliminar la pregunta actual

                if (areaInteres.preguntas.length > 0) {
                    // Quedan preguntas en el área de interés actual
                    mostrarPregunta();
                } else {
                    // Avanzar a la siguiente área de interés o categoría
                    areaInteresActual++;
                    if (areaInteresActual < categoria.areas.length) {
                        mostrarPregunta();
                    } else {
                        areaInteresActual = 0;
                        categoriaActual++;
                        if (categoriaActual < preguntasActuales.length) {
                            mostrarPregunta();
                        } else {
                            // Ya se respondieron todas las preguntas
                            mostrarResultado();
                        }
                    }
                }

                

                // Habilitar los botones de respuesta para la siguiente pregunta
                const btnRespuestaNo = document.getElementById("btnRespuestaNo");
                const btnRespuestaSi = document.getElementById("btnRespuestaSi");
                btnRespuestaNo.disabled = false;
                btnRespuestaSi.disabled = false;
            } else {
                alert("Por favor, selecciona una respuesta antes de avanzar.");
            }
        }

        // Función para regresar a la pregunta anterior
        function preguntaAnterior() {
            if (preguntaActual > 0) {
                preguntaActual--;
                mostrarPregunta();
            }
        }

        // Función para responder la pregunta y avanzar a la siguiente
        function responderPregunta(respuesta) {
            const categoria = preguntasActuales[categoriaActual];
            const areaInteres = categoria.areas[areaInteresActual];
            const pregunta = areaInteres.preguntas[0];

            if (!puntajesAreas[areaInteres.nombre]) puntajesAreas[areaInteres.nombre] = 0;
            if (respuesta === 1) {
                // Respuesta Sí
                puntajesAreas[areaInteres.nombre]++;
            }

            areaInteres.preguntas.shift(); // Eliminar la pregunta actual

            if (areaInteres.preguntas.length > 0) {
                // Quedan preguntas en el área de interés actual
                mostrarPregunta();
            } else {
                // Avanzar a la siguiente área de interés o categoría
                areaInteresActual++;
                if (areaInteresActual < categoria.areas.length) {
                    mostrarPregunta();
                } else {
                    areaInteresActual = 0;
                    categoriaActual++;
                    if (categoriaActual < preguntasActuales.length) {
                        mostrarPregunta();
                    } else {
                        // Ya se respondieron todas las preguntas
                        mostrarResultado();
                    }
                }
            }
        }

        // Función para mostrar los resultados
        function mostrarResultado() {
            document.getElementById("preguntaContainer").style.display = "none";
            document.getElementById("resultadosContainer").style.display = "block";

            // Encontrar el área de interés con el puntaje más alto
            let areaMasAlta = "";
            let puntajeMasAlto = 0;

            for (const areaInteres in puntajesAreas) {
                if (puntajesAreas[areaInteres] > puntajeMasAlto) {
                    puntajeMasAlto = puntajesAreas[areaInteres];
                    areaMasAlta = areaInteres;
                }
            }

            // Mostrar el resultado del área de interés más alta
            document.getElementById("resultadoAreaInteres").textContent = `Una vez realizada la prueba ${usuario} presenta un alto porcentaje de interés en el área ${areaMasAlta}.`;

            // Mostrar texto adicional específico según el área de interés
            let textoAdicional = "";
            switch (areaMasAlta) {
                case "Administrativo":
                    textoAdicional = "Las profesiones relacionadas con estas aptitudes son: Administración de Empresas, Administración Hotelera y Turismo, Ciencias de la Comunicación, Relaciones Industriales, Derecho y Ciencias Políticas.";
                    break;
                case "Humanidades":
                    textoAdicional = "Las profesiones relacionadas con estas aptitudes son: Psicología, Sociología, Terapia del Lenguaje, Trabajo Social, Educación Inicial, Primaria y Secundaria, Ciencias de la Educación y carreras afines.";
                    break;
                case "Biología":
                    textoAdicional = "Texto para el área de Biología.";
                    break;
                case "Física":
                    textoAdicional = "Texto para el área de Física.";
                    break;
                // Agregar más casos según las áreas de interés
                default:
                    textoAdicional = "No hay texto adicional para esta área.";
            }

            // Mostrar el nombre del usuario, el tipo de prueba y el texto adicional según el área de interés más alta
            let tipoPruebaTexto = tipoPruebaActual === 0 ? "Prueba 1" : "Prueba 2";
            document.getElementById("textoAdicional").textContent = `${usuario}, has realizado la ${tipoPruebaTexto}. ${textoAdicional}`;
        }

        function regresarASeleccionarPruebas() {
            document.getElementById("resultadosContainer").style.display = "none";
            document.getElementById("vistaPreviaContainer").style.display = "block";
            reiniciarCuestionario(); // Opcional: Reiniciar variables y puntajes para una nueva ejecución del cuestionario
        }
