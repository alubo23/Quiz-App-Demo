const bancoDePreguntas = [
    {
      id: 1,
      enunciado: "¿Cuál es la capital de Francia?",
      area_interes: "C",
      aptitud: "no",
    },
    {
      id: 3,
      enunciado: "¿Quién escribió 'Cien años de soledad'?",
      area_interes: "C",
      aptitud: "no",
    },
    {
      id: 5,
      enunciado: "¿Cuál es el resultado de 2 + 2?",
      area_interes: "H",
      aptitud: "si",
    },
    {
      id: 4,
      enunciado: "¿En qué año llegó el hombre a la Luna?",
      area_interes: "A",
      aptitud: "no",
    },
    {
      id: 2,
      enunciado: "¿Qué instrumento mide la temperatura?",
      area_interes: "S",
      aptitud: "no",
    },
    // Puedes agregar más preguntas aquí con sus respectivos atributos
  ];
  
  // Función para mostrar las preguntas una por una en orden por ID
  function mostrarPreguntasEnOrden() {
    bancoDePreguntas.sort((a, b) => a.id - b.id);
  
    for (const pregunta of bancoDePreguntas) {
      console.log(`Pregunta ${pregunta.id}: ${pregunta.enunciado}`);
    }
  }
  
  // Mostrar las preguntas en orden por ID
  mostrarPreguntasEnOrden();