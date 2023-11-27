/*
Proyecto por programación orientada a objetos

Construirás un programa en JavaScript que permita a los usuarios crear encuestas, votar y ver los resultados en tiempo real. El programa debe cumplir con los siguientes requisitos:
- Permitir a los usuarios crear encuestas con opciones de respuesta.
- Permitir a los usuarios votar en las encuestas.
- Mostrar los resultados de las encuestas en tiempo real.
- Almacenar los datos de las encuestas y los votos en una variable.
Requisitos:
Permitir a los usuarios crear encuestas con opciones de respuesta
- [ ] Permitir a los usuarios votar en las encuestas
- [ ] Mostrar los resultados de las encuestas
- [ ] Almacenar los datos de las encuestas y los votos en una variable
- [ ] Almacenar los datos de las encuestas y los votos en una estructura de datos
- [ ] Las encuestas deben contener al menos 8 preguntas con opciones de respuesta.
*/

/////////////////////////// Variables y Clases ///////////////////////////
const Cuestionario = [
    {
        Pregunta: "¿Cuál es la película más taquillera de todos los tiempos?",
        Opciones: ["1: Avengers: Endgame", "2: Titanic", "3: Avatar"],
        Respuestas: ["Avengers: Endgame", 1]
    },
    {
        Pregunta: "¿Quién dirigió la trilogía de El Señor de los Anillos?",
        Opciones: ["1: Steven Spielberg", "2: Christopher Nolan", "3: Peter Jackson"],
        Respuestas: ["Peter Jackson", 3]
    },
    {
        Pregunta: "¿Cuál es la película ganadora del Oscar a Mejor Película en 2020?",
        Opciones: ["1: Joker", "2: Parasite", "3: 1917"],
        Respuestas: ["Parasite", 2]
    },
    {
        Pregunta: "¿Cuál es la película animada más taquillera de la historia?",
        Opciones: ["1: Toy Story 4", "2: The Lion King", "3: Frozen II"],
        Respuestas: ["Frozen II", 3]
    },
    {
        Pregunta: "¿Quién interpreta a Iron Man en el Universo Cinematográfico de Marvel?",
        Opciones: ["1: Chris Hemsworth", "2: Chris Evans", "3: Robert Downey Jr."],
        Respuestas: ["Robert Downey Jr.", 3]
    },
    {
        Pregunta: "¿Cuál es la película más larga de la historia?",
        Opciones: ["1: Gone with the Wind", "2: The Irishman", "3: Lawrence of Arabia"],
        Respuestas: ["The Irishman", 2]
    },
    {
        Pregunta: "¿Quién interpretó a Neo en la trilogía de Matrix?",
        Opciones: ["1: Tom Cruise", "2: Brad Pitt", "3: Keanu Reeves"],
        Respuestas: ["Keanu Reeves", 3]
    },
    {
        Pregunta: "¿Cuál es la película de Disney con mayor recaudación en la historia?",
        Opciones: ["1: Beauty and the Beast", "2: Frozen II", "3: The Lion King"],
        Respuestas: ["Frozen II", 2]
    },
    {
        Pregunta: "¿Quién interpretó a Jack Sparrow en la saga de Pirates of the Caribbean?",
        Opciones: ["1: Leonardo DiCaprio", "2: Tom Hanks", "3: Johnny Depp"],
        Respuestas: ["Johnny Depp", 3]
    },          
    {
        Pregunta: "¿Cuál es la película más larga de la saga de Harry Potter?",
        Opciones: ["1: Harry Potter and the Deathly Hallows: Part 2", "2: Harry Potter and the Goblet of Fire", "3: Harry Potter and the Order of the Phoenix"],
        Respuestas: ["Harry Potter and the Deathly Hallows: Part 2", 1]
    }
];

class Encuesta {
    constructor(usuario, consecutivo) {
        this.usuario = usuario;
        this.consecutivo = consecutivo;
        this.estatus = "No contestado aún";
        this.Respuestas = [];
        this.resultados = [];
        this.score = 0;
        this.fechahora = new Date();
    }

    IniciarEncuesta() {
        // por cada pregunta en Cuestionario, preguntar y guardar respuesta en this.resultados        
        Cuestionario.forEach(pregunta => {
            const respuesta = prompt(pregunta.Pregunta + "\n" + pregunta.Opciones.join("\n"));
            this.Respuestas.push(respuesta);
            if (respuesta == pregunta.Respuestas[0] || respuesta == pregunta.Respuestas[1]) {
                this.resultados.push(true);
            }
            else
            {
                this.resultados.push(false);
            }            
        });        
    }

    obtenerscore() {
        this.score = this.resultados.filter(x => x == true).length;
        console.log(`Su score es de ${this.score} de ${Cuestionario.length} preguntas`);
        for (let i = 0; i < Cuestionario.length; i++) {
            console.log(Cuestionario[i].Pregunta+ "\n" + Cuestionario[i].Opciones.join("\n")+ "\n" + `Tu Respuesta: ${this.Respuestas[i]} - ${Cuestionario[i].Opciones[this.Respuestas[i]-1]} \n Respuesta correcta : ${Cuestionario[i].Respuestas[0]}`);
        };
    }        

    conlcuirEncuesta() {
        this.estatus = "Contestado";
        numeroencuesta++;
    }
}   

class Respuesta extends Encuesta {
    constructor(usuario,consecutivo,pregunta,respuesta) 
    {
        if (respuesta == null || respuesta == undefined || respuesta == "") {
            throw new Error("La respuesta no puede estar vacía");
        }
        this.usuario = super(usuario);
        this.consecutivo = super(consecutivo);
        this.pregunta = pregunta;
        this.respuesta = respuesta;
    }
}

/////////////////////////// Funciones ///////////////////////////

function contestarEncuesta()
{        
    var usuario = prompt("Ingrese su nombre");
    if (usuario == null || usuario == undefined || usuario == "") {
        throw new Error("El nombre no puede estar vacío");
    }
    else
    {
        console.log(`Iniciando cuestionario de:, ${usuario}`);
        let encuesta = new Encuesta(usuario, numeroencuesta);
        encuesta.IniciarEncuesta();
        encuesta.obtenerscore();
        encuesta.conlcuirEncuesta();
        Encuestas.push(encuesta);
    }
}

function obtenerUltimosCuestionario()
{
    var usuario = prompt("Ingrese su nombre");
        if (usuario == null || usuario == undefined || usuario == "") {
            throw new Error("El nombre no puede estar vacío");
        }
        else
        {
        if (Encuestas.length > 0) {
            let encuestasUsuario = Encuestas.filter(encuesta => encuesta.usuario == usuario && encuesta.estatus == "Contestado");
            if (encuestasUsuario != null) {
                console.log(`Se encontraron las siguientes encuestas para el usuario ${usuario}: `);
                encuestasUsuario.forEach(encuesta => {
                    console.log(encuesta.consecutivo + " - " + encuesta.fechahora + " - " + encuesta.score + " de " + Cuestionario.length + " preguntas");
                });
            }
        }
        else
        {
            console.log("No hay encuestas contestadas");
            return null;
        }
    }
}

function verResultadosTotales()
{
    if (Encuestas.length > 0) {
        console.log("Se encontraron las siguientes encuestas contestadas: ");
        Encuestas.forEach(encuesta => {
            console.log(encuesta.consecutivo + " - " + encuesta.fechahora + ": Usuario:" + encuesta.usuario + " SCORE: "+ encuesta.score + " de " + Cuestionario.length + " preguntas");
        });
    }
    else
    {
        console.log("No hay encuestas contestadas");
        return null;
    }
}

/////////////////////////// Main ///////////////////////////


let numeroencuesta = 1;
let Encuestas = [];
main();

function main()
{
    const accion = prompt("¿Qué desea hacer? \n 1 - Contestar encuesta \n 2 - Ver resultados de los últimos cuestionarios \n 3 - Ver resultados totales");

    switch (accion) {
        case "1":    
            contestarEncuesta();
            break;
        case "2":
            obtenerUltimosCuestionario();
            break;
        case "3":
            verResultadosTotales();
            break;
        default:
            alert("Opción no válida");
            break;
    }
    main();
}