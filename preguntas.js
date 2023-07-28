
const tipoDePrueba1 = [
// const bancoDePreguntas = [
    // Estructura de datos similar a los ejemplos anteriores
    // {
    //     id: 1,
    //     enunciado: "¿Cuál es la capital de Francia?",
    //     area_interes: "C",
    //     aptitud: "no",
    //   },
    //   {
    //     id: 2,
    //     enunciado: "¿Quién escribió 'Cien años de soledad'?",
    //     area_interes: "H",
    //     aptitud: "no",
    //   },
    //   {
    //     id: 3,
    //     enunciado: "¿Cuál es el resultado de 2 + 2?",
    //     area_interes: "A",
    //     aptitud: "si",
    //   },
    //   {
    //     id: 4,
    //     enunciado: "¿En qué año llegó el hombre a la Luna?",
    //     area_interes: "C",
    //     aptitud: "no",
    //   },
    //   {
    //     id: 5,
    //     enunciado: "¿Qué instrumento mide la temperatura?",
    //     area_interes: "S",
    //     aptitud: "no",
    //   },


        {
        nombre: "Intereses",
        areas: [
            {
                nombre: "Administrativo",
                preguntas: [
                    {
                        id: 1,
                        enunciado: "¿Aceptarías trabajar escribiendo artículos en la sección económica de un diario?"
                    },
                    {
                        id: 12,
                        enunciado: "¿Te gustaría conocer la diferencia entre macroeconomía y microeconomía?"
                    },
                    {
                        id:20,
                        enunciado: "¿Si te convocara tu club preferido para planificar, organizar y dirigir un campo de deportes, aceptarías?"
                    },
                    {
                        id:53,
                        enunciado: "¿Si una gran empresa solicita un profesional como gerente de comercialización, te sentirías a gusto desempeñando ese rol?"
                    },
                    {
                        id:64,
                        enunciado: "¿Te gustaría realizar una investigación que contribuyera a hacer más justa la distribución de la riqueza?"
                    },
                    {
                        id: 71,
                        enunciado: "¿En un equipo de trabajo, preferís el rol de coordinador?"
                    },
                    {
                        id:78,
                        enunciado: "¿Dirigirías el área de importación y exportación de una empresa?"
                    },
                    {
                        id:85,
                        enunciado: "¿Te costearías tus estudios trabajando en una auditoría / revisión de las cuentas?"
                    },
                    {
                        id:91,
                        enunciado: "¿Te resultaría gratificante ser asesor contable en una empresa reconocida?"
                    },
                    {
                        id: 98,
                        enunciado: "¿Sabes qué es el PIB? Se trata de un concepto económico. ¿Te gusta este tipo de tema?"
                    }
                    
                ]
            },
            {
                nombre: "Humanidades",
                preguntas: [
                    {
                        id: 9,
                        enunciado: "¿Te ofrecerías para explicar a tus compañeros un determinado tema que ellos no entendieron?"
                    },
                    {
                        id: 25,
                        enunciado: "¿Pasarías varias horas leyendo algún libro de tu interés?"
                    },
                    {
                        id: 34,
                        enunciado: "¿Te interesan los temas relacionados al pasado y a la evolución del hombre?"
                    },
                    {
                        id: 41,
                        enunciado: "¿Participarías de una investigación sobre la violencia en el fútbol?"
                    }, 
                    {
                        id: 56,
                        enunciado: "¿Descubriste algún filósofo o escritor que haya expresado tus mismas ideas con antelación?"
                    }, 
                    {
                        id: 67,
                        enunciado: "¿La libertad y la justicia son valores fundamentales en tu vida?"
                    },
                    {
                        id: 74,
                        enunciado: "¿Lucharías por una causa justa hasta las últimas consecuencias?"
                    },
                    {
                        id: 80,
                        enunciado: "¿Te gratificaría el trabajar con niños?"
                    },
                    {
                        id: 89,
                        enunciado: "¿Elegirías una carrera cuyo instrumento de trabajo fuere la utilización de un idioma extranjero?"
                    }, 
                    {
                        id: 95,
                        enunciado: "¿Dedicarías parte de tu tiempo a ayudar a personas con carencias o necesitadas?"
                    }
                    
                ]
            },
            {
                nombre: "Artística",
                preguntas: [
                    {
                        id: 3,
                        enunciado: "¿Te gustaría dirigir/crear un proyecto de urbanización en tu provincia?"
                    },
                    {
                        id: 11,
                        enunciado: " ¿Te atrae armar rompecabezas o puzzles?"
                    }, 
                    {
                        id: 21,
                        enunciado: "¿Eres el que pone un toque de alegría en las fiestas?"
                    },
                    {
                        id: 28,
                        enunciado: "¿Disfrutas modelando con arcilla?"
                    },
                    {
                        id: 36,
                        enunciado: "¿Fuera de los horarios escolares, dedicas algún día de la semana a la realización de actividades corporales?"
                    }, 
                    {
                        id: 45,
                        enunciado: "¿Tolerarías empezar tantas veces como fuere necesario hasta obtener el logro deseado?"
                    },
                    {
                        id: 50,
                        enunciado: "¿Cuando estás en un grupo trabajando, te entusiasma producir ideas originales y que sean tenidas en cuenta?"
                    },
                    {
                        id: 57,
                        enunciado: "¿Desearías que te regalen algún instrumento musical para tu cumpleaños?"
                    },
                    {
                        id: 81,
                        enunciado: "¿Harías el diseño de un cartel o afiche para una campaña contra el sida? "
                    },
                    {
                        id: 96,
                        enunciado: "¿Cuando eliges tu ropa o decoras un ambiente, tienes en cuenta la combinación de los colores, las telas o el estilo de los muebles?"
                    },
                ]
            } 
        ]
    },
    {
        nombre: "Aptitudes",
        areas: [
            {
                nombre: "Administrativo",
                preguntas: [
                    {
                        id: 2,
                        enunciado: "¿Los seres vivos necesitan agua para sobrevivir?"
                    },
                    {
                        id: 15,
                        enunciado: "¿Las plantas realizan la fotosíntesis?"
                    },
                    {
                        id: 46,
                        enunciado: " ¿Distribuyes tu horarios del día adecuadamente para poder hacer todo lo planeado?"
                    },
                    {
                        id: 51,
                        enunciado: "¿Te resulta fácil coordinar un grupo de trabajo?"
                    }
                ]
            },
            {
                nombre: "Física",
                preguntas: [
                    {
                        id: 7,
                        enunciado: "¿La gravedad es una fuerza atractiva?"
                    },
                    {
                        id: 8,
                        enunciado: "¿El sonido se propaga a través de ondas?"
                    },
                ]
            }
        ]
    }
 ];