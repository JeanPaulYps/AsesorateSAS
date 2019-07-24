var preguntas = []
var del = []
var mod = []


async function verPreguntas(){
    await fetch('https://fathomless-mesa-60059.herokuapp.com/api/verPreguntas', {
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
    preguntas.map(
        (pregunta)=>{
            dom = dom + `
            <tr>
            <td>${pregunta.pregunta}</td>
            <td>${pregunta.opcion1}</td>
            <td>${pregunta.opcion2}</td>
            <td>${pregunta.opcion3}</td>
            <td>${pregunta.opcion4}</td>
            <td>${pregunta.opcion_correcta}</td>
            <td>
                <a href="#editEmployeeModal" onclick="preguntaSeleccionada(this,'edit')" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Editar">&#xE254;</i></a>
                <a href="#deleteEmployeeModal" onclick="preguntaSeleccionada(this,'delete')" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Borrar">&#xE872;</i></a>
            </td>
            </tr>
            ` 
        }
    )
    document.getElementById("tbody").innerHTML = dom
}

async function renovarTabla(){
    await verPreguntas()
    dibujarTabla()
    del = document.getElementsByClassName("delete")
    mod = document.getElementsByClassName("edit")
}

window.onload = async ()=>{
    renovarTabla();
}

function preguntaSeleccionada(obj,opc){
    var pos = 0
    if (opc == 'delete'){
        pos = indexInClass(obj,del)
        rellenarCampos(preguntas[pos])
    }else{
        pos = indexInClass(obj,mod)
        rellenarCampos(preguntas[pos])
    }
}

function rellenarCampos(pregunta){
    jQuery("[name=mid_pregunta]").val(pregunta.id_pregunta)
    jQuery("[name=mpregunta]").val(pregunta.pregunta)
    jQuery("[name=mopcion1]").val(pregunta.opcion1)
    jQuery("[name=mopcion2]").val(pregunta.opcion2)
    jQuery("[name=mopcion3]").val(pregunta.opcion3)
    jQuery("[name=mopcion4]").val(pregunta.opcion4)
    jQuery("[name=mopcion_correcta]").val(pregunta.opcion_correcta)
}

$("#bform").submit(async function(event) {
    event.preventDefault();
    var id_pregunta = jQuery("[name=mid_pregunta]").val();
    fetch('https://fathomless-mesa-60059.herokuapp.com/api/eliminarPregunta', {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json, text-plain, */*"
        },
        method: 'post',
        credentials: "same-origin",
        body: JSON.stringify({
            id_pregunta: id_pregunta
        })
    })
        .then((data) => data.json())
        .then(res =>{
            if (res.message == "exitoso"){
                document.getElementById("mform").reset();
                alert("Pregunta eliminada correctamente")
                renovarTabla()
            }else{
                throw res.message;
            }
        })
        .catch(function(error) {
            alert("Error al eliminar pregunta. Recuerde que no deben haber menos de 40 preguntas.")
        });
})

$("#aform").submit(function(event) {
    event.preventDefault();
    var pregunta = jQuery("[name=apregunta]").val();
    var opcion1 = jQuery("[name=aopcion1]").val();
    var opcion2 = jQuery("[name=aopcion2]").val();
    var opcion3 = jQuery("[name=aopcion3]").val();
    var opcion4= jQuery("[name=aopcion4]").val();
    var opcion_correcta= jQuery("[name=aopcion_correcta]").val();


    var mensaje= document.querySelector("#amensaje")
    var mensaje2= document.querySelector("#amensaje2");
    fetch('https://fathomless-mesa-60059.herokuapp.com/api/crearPregunta', {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json, text-plain, */*"
        },
        method: 'post',
        credentials: "same-origin",
        body: JSON.stringify({
            pregunta: pregunta,
            opcion1: opcion1,
            opcion2: opcion2,
            opcion3 :opcion3,
            opcion4 :opcion4,
            opcion_correcta :opcion_correcta
        })
    })
        .then((data) => data.json())
        .then(res =>{
            if (res.message == "exitoso"){
                document.getElementById("aform").reset();
                mensaje.style.visibility = 'visible'
                mensaje2.style.visibility = 'hidden'
                renovarTabla()
            }else{
                throw res.message;
            }
        })
        .catch(function(error) {
            mensaje.style.visibility = 'hidden'
            mensaje2.style.visibility = 'visible'
            console.log(error);
        });
});

$("#mform").submit(function(event) {
    event.preventDefault();
    var id_pregunta = jQuery("[name=mid_pregunta]").val();
    var pregunta = jQuery("[name=mpregunta]").val();
    var opcion1 = jQuery("[name=mopcion1]").val();
    var opcion2 = jQuery("[name=mopcion2]").val();
    var opcion3 = jQuery("[name=mopcion3]").val();
    var opcion4= jQuery("[name=mopcion4]").val();
    var opcion_correcta= jQuery("[name=mopcion_correcta]").val();


    var mensaje= document.querySelector("#mmensaje")
    var mensaje2= document.querySelector("#mmensaje2");
    fetch('https://fathomless-mesa-60059.herokuapp.com/api/modificarPregunta', {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json, text-plain, */*"
        },
        method: 'post',
        credentials: "same-origin",
        body: JSON.stringify({
            id_pregunta: id_pregunta,
            pregunta: pregunta,
            opcion1: opcion1,
            opcion2: opcion2,
            opcion3 :opcion3,
            opcion4 :opcion4,
            opcion_correcta :opcion_correcta
        })
    })
        .then((data) => data.json())
        .then(res =>{
            if (res.message == "exitoso"){
                document.getElementById("mform").reset();
                mensaje.style.visibility = 'visible'
                mensaje2.style.visibility = 'hidden'
                renovarTabla()
            }else{
                throw res.message;
            }
        })
        .catch(function(error) {
            mensaje.style.visibility = 'hidden'
            mensaje2.style.visibility = 'visible'
            console.log(error);
        });
});


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


$("#fform").submit(async function(event) {
    event.preventDefault();
    var fechainicio = jQuery("[name=fechainicio]").val().replace("/","-");
    var fechafin = jQuery("[name=fechafin]").val().replace("/","-");

    var mensaje= document.querySelector("#fmensaje")
    var mensaje2= document.querySelector("#fmensaje2");
    fetch('https://fathomless-mesa-60059.herokuapp.com/api/crearConvocatoria', {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json, text-plain, */*"
        },
        method: 'post',
        credentials: "same-origin",
        body: JSON.stringify({
            fechainicio: fechainicio,
            fechafin: fechafin
        })
    })
        .then((data) => data.json())
        .then(res =>{
            if (res.message == "exitoso"){
                document.getElementById("fform").reset();
                mensaje.style.visibility = 'visible'
                mensaje2.style.visibility = 'hidden'
                renovarTabla()
            }else{
                throw res.message;
            }
        })
        .catch(function(error) {
            mensaje.style.visibility = 'hidden'
            mensaje2.style.visibility = 'visible'
            console.log(error);
        });
});