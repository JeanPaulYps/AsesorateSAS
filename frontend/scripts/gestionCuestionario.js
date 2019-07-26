var preguntas = []
var preguntas_respondidas = []
var opcA = []
var opcB = []
var opcC = []
var opcD = []
permitido = false

async function aspirante_permitido(){
    var aspirante_cedula = localStorage.getItem("cedula")
    await fetch('https://fathomless-mesa-60059.herokuapp.com/api/ultimoCuestionario', {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json, text-plain, */*"
        },
        method: 'post',
        credentials: "same-origin",
        body: JSON.stringify({
            aspirante_cedula: aspirante_cedula
        })
        })  
        .then((data) => data.json())
        .then(res =>{
            permitido = res.message
        })
        .catch(function(error) {
            permitido = false
        });
}


async function verPreguntas(){
    await fetch('https://fathomless-mesa-60059.herokuapp.com/api/preguntasCuestionario', {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json, text-plain, */*"
        },
        method: 'get',
        credentials: "same-origin"
    })
        .then((data) => data.json())
        .then(res =>{
            preguntas = res.preguntas;
        })
        .catch(function(error) {
            console.log(error);
        });
}


async function dibujarTabla(){
    dom = ``
    i = 1
    preguntas.map(
        (pregunta)=>{
            dom = dom + `
           <div class="registro">
            <br>
            <h3>Pregunta ${i}</h3>
            <br>
            <p>${pregunta.pregunta}</p>
            <div class="opciones">
            <form>
                <input type="radio" value="A" name="181" onclick="preguntaSeleccionada(this,'opcA')" class="opcA">        
                <span>A) </span>
                <span>${pregunta.opcion1}</span>
                <br>
                <br>
                <input type="radio" value="B" name="181" onclick="preguntaSeleccionada(this,'opcB')" class="opcB">        
                <span>B) </span>
                <span>${pregunta.opcion2}</span>
                <br>
                <br>
                <input type="radio" value="C" name="181" onclick="preguntaSeleccionada(this,'opcC')" class="opcC">        
                <span>C) </span>
                <span>${pregunta.opcion3}</span>
                <br>
                <br>
                <input type="radio" value="D" name="181" onclick="preguntaSeleccionada(this,'opcD')" class="opcD">        
                <span>D) </span>
                <span>${pregunta.opcion4}</span>
                <br>
                <br>
            </form>
            </div>
            </div>`
            i = i+1
            preguntas_respondidas.push({id_pregunta:pregunta.id_pregunta, respuesta: ""})
        }
    )
    document.getElementById("preguntas").innerHTML = dom
}

async function renovarTabla(){
    await aspirante_permitido()
    if(permitido){
        await verPreguntas()
        dibujarTabla()
        opcA = document.getElementsByClassName("opcA")
        opcB = document.getElementsByClassName("opcB")
        opcC = document.getElementsByClassName("opcC")
        opcD = document.getElementsByClassName("opcD")
    }else{
        location.replace('http://www.asesorate.tk/frontend/estudiante.html');
    }

    countdown();
}

window.onload = async ()=>{
    renovarTabla();
}

function preguntaSeleccionada(obj,opc){
    var pos = 0
    if (opc == 'opcA'){
        pos = indexInClass(obj,opcA)
        preguntas_respondidas[pos].respuesta = "A"
    }else if(opc == 'opcB'){
        pos = indexInClass(obj,opcB)
        preguntas_respondidas[pos].respuesta = "B"
    }else if(opc == 'opcC'){
        pos = indexInClass(obj,opcC)
        preguntas_respondidas[pos].respuesta = "C"
    }else if(opc == 'opcD'){
        pos = indexInClass(obj,opcD)
        preguntas_respondidas[pos].respuesta = "D"
    }
}

function verificarCampos(){
    valido = true
    preguntas_respondidas.map(pregunta=>{
        if(pregunta.respuesta==""){
            valido = false
        }
    })
    return valido
}

function indexInClass(node,myClass) {
    var className = node.className;
    var num = 0;
    for (var i = 0; i < myClass.length; i++) {
      if (myClass[i] === node) {
        return num;
      }
      num++;
    }
    return -1;
}


function enviarCuestionario(timer = true){
    if(!verificarCampos() && timer){
        alert("Debe responder todas las preguntas")
        return 1
    }
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    var fecha_presentacion = `${yyyy}-${mm}-${dd}`
    var fechaenvio = fecha_presentacion
    var aspirante_cedula = localStorage.getItem("cedula")
    var convocatoria_id = localStorage.getItem("convocatoria_id")

    fetch('https://fathomless-mesa-60059.herokuapp.com/api/calificarCuestionario', {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json, text-plain, */*"
        },
        method: 'post',
        credentials: "same-origin",
        body: JSON.stringify({
            preguntas: preguntas_respondidas,
            fecha_presentacion: fecha_presentacion,
            fechaenvio: fechaenvio,
            aspirante_cedula:aspirante_cedula,
            convocatoria_id:convocatoria_id
        })
    })
        .then((data) => data.json())
        .then(res =>{
            if(res.message=="exitoso"){
                alert(`Su resultado es: ${res.resultado} y se considera le ${res.nivel}.`)
                disponible = true
            }else{
                throw res.message;
            }
        })
        .catch(function(error) {
            alert(`Solo puede responder el cuestinario una vez cada 2 meses.`)
        });
}


//TIMER/////////////////////////////////////////////////////////////////

var mins = 60; 

//calculate the seconds 
var secs = mins * 60; 
//countdown function is evoked when page is loaded 
function countdown() { 
    setTimeout('Decrement()', 60); 
} 
//Decrement function decrement the value. 
function Decrement() { 
    if (document.getElementById) { 
        minutes = document.getElementById("minutes"); 
        seconds = document.getElementById("seconds"); 
        //if less than a minute remaining 
        //Display only seconds value. 
        if (seconds < 59) { 
            seconds.value = secs; 
        } 
        //Display both minutes and seconds 
        //getminutes and getseconds is used to 
        //get minutes and seconds 
        else { 
            minutes.value = getminutes(); 
            seconds.value = getseconds(); 
        } 
        //when less than a minute remaining 
        //colour of the minutes and seconds 
        //changes to red 
        if (mins < 10) { 
            minutes.style.color = "red"; 
            seconds.style.color = "red"; 
        } 
        //if seconds becomes zero, 
        //then page alert time up 
        if (mins < 0) { 
            enviarCuestionario(false) 
            minutes.value = 0; 
            seconds.value = 0; 
        } 
        //if seconds > 0 then seconds is decremented 
        else { 
            secs--; 
            setTimeout('Decrement()', 1000); 
        } 
    } 
} 
function getminutes() { 
    //minutes is seconds divided by 60, rounded down 
    mins = Math.floor(secs / 60); 
    return mins; 
} 
function getseconds() { 
    //take minutes remaining (as seconds) away  
    //from total seconds remaining 
    return secs - Math.round(mins * 60); 
} 