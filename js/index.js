// cuando se carga la ventana 
window.onload = function () {
  base_preguntas = readText("baseDatos.json");// se carga el archivo jason en la variable base_preguntas
  interprete_bp = JSON.parse(base_preguntas); // se convierte el json a un arreglo
  escogerPreguntaAleatoria(); //se escoge la praguenta
}
// se definen variables de las respuestas
let pregunta
let posibles_respuestas
btn_correspondiente = [
  select_id("btn1"), select_id("btn2"),
  select_id("btn3"), select_id("btn4")
]
// arreglo para las preguntas
npreguntas = []

let preguntas_hechas = 0 // variables preguntas hechas
let preguntas_correctas = 0 // variables preguntas correctas

function escogerPreguntaAleatoria() {
  // En el caso de desear que las preguntras sean en forma aleatoria
  //let n = Math.floor(Math.random() * interprete_bp.length) 

  // Preguntas en forma secuencial
  n = 0
// ciclo en las preguntas
  while (npreguntas.includes(n)) {
    n++
    if (n >= interprete_bp.length) {
      n = 0
    }
    if (npreguntas.length == interprete_bp.length) {
      npreguntas = []
    }
  }
  npreguntas.push(n)
  preguntas_hechas++

  escogerPregunta(n)// se escoge la pregunta
}
// funcion escoger pregunta de acuerdo al numero del arreglo
function escogerPregunta(n) {
  pregunta = interprete_bp[n] // toma la posicion delarreglo donde esta la pregunta
  select_id("categoria").innerHTML = pregunta.categoria //se coloca en el html la categoria
  select_id("pregunta").innerHTML = pregunta.pregunta// se coloca en el html la pregunta
  select_id("numero").innerHTML = n // se coloca en el html el numero de la pregunta
  let pc = preguntas_correctas // se declara la variable pc se le asigna el numero de preguntas correctas
  //se muestran lois aciertos vs las preguntas 
  if (preguntas_hechas > 1) {
    select_id("puntaje").innerHTML = pc + "/" + (preguntas_hechas - 1)
  } else {
    select_id("puntaje").innerHTML = ""
  }
//monta la imagen
  style("imagen").objectFit = pregunta.objectFit;
  desordenarRespuestas(pregunta) // desordena las respuestas para que las respuestas no vayan en un mismo orden
  if (pregunta.imagen) {
    select_id("imagen").setAttribute("src", pregunta.imagen)
    style("imagen").height = "350px"
    style("imagen").width = "100%"
  } else {
    style("imagen").height = "0px"
    style("imagen").width = "0px"
    setTimeout(() => {
      select_id("imagen").setAttribute("src", "")
    }, 500);
  }
}
// funcion que desordena las respuestas
function desordenarRespuestas(pregunta) {
  posibles_respuestas = [
    pregunta.respuesta,
    pregunta.incorrecta1,
    pregunta.incorrecta2,
    pregunta.incorrecta3
  ]
  posibles_respuestas.sort(() => Math.random() - 0.5)

  select_id("btn1").innerHTML = posibles_respuestas[0]
  select_id("btn2").innerHTML = posibles_respuestas[1]
  select_id("btn3").innerHTML = posibles_respuestas[2]
  select_id("btn4").innerHTML = posibles_respuestas[3]
}

let suspender_botones = false //  que se la haga click a los botones solo una vez

function oprimir_btn(i) {
  if (suspender_botones) {
    return
  }
  suspender_botones = true
  // aca pregunta si acerto la respuesta
  if (posibles_respuestas[i] == pregunta.respuesta) {
    preguntas_correctas++ // incrementa las respuestas correctas
    btn_correspondiente[i].style.background = "lightgreen" // pinta de verde claro

    // Division exacta al dividir por 5, es decir cada 5 respuestas correctas, consultar si el jugador desea contnuar
    if ((preguntas_correctas % 5) == 0) { //modulo 5
      var resp = confirm('Usted ha ganado hasta el momento: ' + preguntas_correctas * 200000 + ' $. ACEPTAR: para continuar, CANCELAR: para finalizar el juego.'); // muestra mensaje de confirmacion por sin quiere seguir o salir
      if (!resp) { // verifica si el usuario haya pulsado cancelar para sacarlo del juego
        window.location = 'http://localhost/GanaUnMillon/ingresarganador.php'; 
      }
    }

  } else { // si no acerta la respuesta se pinta el color de pink y lo devuelve con un mensaje de que ha fallado
    btn_correspondiente[i].style.background = "pink"

    alert('Usted ha fallado en las respuestas. Fin del Juego !');
    window.location = 'http://localhost/GanaUnMillon/ingresarperdedor.php';

  }
  // si no acierta le pinta la correcta para mostrarle cual era la verdadera
  for (let j = 0; j < 4; j++) {
    if (posibles_respuestas[j] == pregunta.respuesta) {
      btn_correspondiente[j].style.background = "lightgreen"
      break
    }
  }
  setTimeout(() => { // espera 3 segundos para cambiar de pregunta
    reiniciar()
    suspender_botones = false
  }, 3000);
}


// para quitarle las cajas pintadas anteriormente
function reiniciar() {
  for (const btn of btn_correspondiente) {
    btn.style.background = "white"
  }
  escogerPreguntaAleatoria()
}

function select_id(id) {
  return document.getElementById(id)
}

function style(id) {
  return select_id(id).style
}
// leer la base de datos json
function readText(ruta_local) {
  var texto = null;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", ruta_local, false);
  xmlhttp.send();
  if (xmlhttp.status == 200) {
    texto = xmlhttp.responseText;
  }
  return texto;
}