var tutores = []
var del = []
var mod = []
var aspirantes = []

async function verTutores(){
    await fetch('https://fathomless-mesa-60059.herokuapp.com/api/verTutores', {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json, text-plain, */*"
        },
        method: 'get',
        credentials: "same-origin"
    })
        .then((data) => data.json())
        .then(res =>{
            tutores = res.tutores;
        })
        .catch(function(error) {
            console.log(error);
        });
}

async function listarAspirantes(){
    await fetch("https://fathomless-mesa-60059.herokuapp.com/api/verAspirantes",{
        headers:{
            "Content-Type":"application/json",
            "Accept":"application/json, text-plain, */*"
        },
        method:'get',
        credentials:"same-origin"
    }).then((data) => data.json())
    .then(res =>{
        aspirantes = res.aspirantes;
    })
    .catch(function(error){
        console.log(error);
    })
}

async function dibujarTabla(){
    dom = ``
    tutores.map(
        (tutor)=>{
            dom = dom + `
            <tr>
            <td>${tutor.telefono}</td>
            <td>${tutor.nombre}</td>
            <td>${tutor.cedula}</td>
            <td>${tutor.nivel}</td>
            <td>
            <div class="col-sm-6">
                <a href= "#addEmployeeModal" data-id=${tutor.cedula} class="btn btn-info parano" data-toggle="modal">Contratar</a>
            </div>
            </td>
            </tr>
            ` 
        }
    )
    document.getElementById("tbody").innerHTML = dom
}

async function dibujarTabla2(){
    dom = ``
    aspirantes.map(
        (aspirante)=>{
            dom = dom + `
            <tr>
            <td>1</td>
            <td>${aspirante.area}</td>
            <td>${aspirante.estudiante_cedula}</td>
            <td>${aspirante.nivel}</td>
            <td>
            <div class="col-sm-6">
                <a href= "#addEmployeeModal" data-id=${aspirante.estudiante_cedula} class="btn btn-info parano" data-toggle="modal">Contratar</a>
            </div>
            </td>
            </tr>
            ` 
        }
    )
    document.getElementById("tbody").innerHTML = dom
}
// para mantener la cedula del tutor
$(document).on("click", ".parano", function () {
    var cedula = $(this).attr("data-id");
    localStorage.setItem("cedula_tutor", cedula);
});

async function renovarTabla(){
    await listarAspirantes
    dibujarTabla()
    del = document.getElementsByClassName("delete")
    mod = document.getElementsByClassName("edit")
}

window.onload = async ()=>{
    renovarTabla();
}

function TutorSeleccionado(obj,opc){
    var pos = 0
    if (opc == 'delete'){
        pos = indexInClass(obj,del)
        rellenarCampos(tutores[pos])
    }else{
        pos = indexInClass(obj,mod)
        rellenarCampos(tutores[pos])
    }
}

function rellenarCampos(tutor){
    jQuery("[name=mnombre]").val(tutor.nombre)
    jQuery("[name=mcedula]").val(tutor.cedula)
    jQuery("[name=mcorreo]").val(tutor.correo)
    jQuery("[name=marea]").val(tutor.area)
    jQuery("[name=mnivel]").val(tutor.nivel)
    jQuery("[name=mporcentaje]").val(tutor.porcentaje)
    jQuery("[name=mbanco]").val(tutor.banco)
    jQuery("[name=mtipo_cuenta]").val(tutor.tipo_cuenta)
    jQuery("[name=mnumero_cuenta]").val(tutor.numero_cuenta)
    jQuery("[name=mtelefono]").val(tutor.telefono)
}

$("#bform").submit(async function(event) {
    event.preventDefault();
    var cedula = jQuery("[name=mcedula]").val();
    fetch('https://fathomless-mesa-60059.herokuapp.com/api/eliminarTutor', {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json, text-plain, */*"
        },
        method: 'post',
        credentials: "same-origin",
        body: JSON.stringify({
            cedula: cedula
        })
    })
        .then((data) => data.json())
        .then(res =>{
            alert(res.message)
            renovarTabla()
        })
        .catch(function(error) {
            console.log(error);
        });
})

$("#aform").submit(function(event) {
    event.preventDefault();
    // var nombre = jQuery("[name=anombre]").val();
    console.log("Esto debe imprimir algo");
    var cedula = localStorage.getItem("cedula_tutor");
    // var email = jQuery("[name=acorreo]").val();
    // var area = jQuery("[name=aarea]").val();
    // var nivel= jQuery("[name=anivel]").val();
    var porcentaje= jQuery("[name=aporcentaje]").val();
    var banco= jQuery("[name=abanco]").val();
    var tipo_cuenta= jQuery("[name=atipo_cuenta]").val();
    var numero_cuenta= jQuery("[name=anumero_cuenta]").val();
    console.log(cedula);
    // var telefono= jQuery("[name=atelefono]").val();
    var mensaje= document.querySelector("#amensaje")
    var mensaje2= document.querySelector("#amensaje2");
    fetch('https://fathomless-mesa-60059.herokuapp.com/api/contratarAspirante', {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json, text-plain, */*"
        },
        method: 'post',
        credentials: "same-origin",
        body: JSON.stringify({
            cedula: cedula,
            porcentaje : porcentaje,
            numero_cuenta : numero_cuenta,
            tipo_cuenta : tipo_cuenta,
            banco : banco
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
    var nombre = jQuery("[name=mnombre]").val();
    var cedula = jQuery("[name=mcedula]").val();
    var email = jQuery("[name=mcorreo]").val();
    var area = jQuery("[name=marea]").val();
    var nivel= jQuery("[name=mnivel]").val();
    var porcentaje= jQuery("[name=mporcentaje]").val();
    var banco= jQuery("[name=mbanco]").val();
    var tipo_cuenta= jQuery("[name=mtipo_cuenta]").val();
    var numero_cuenta= jQuery("[name=mnumero_cuenta]").val();
    var telefono= jQuery("[name=mtelefono]").val();


    var mensaje= document.querySelector("#mmensaje")
    var mensaje2= document.querySelector("#mmensaje2");
    fetch('https://fathomless-mesa-60059.herokuapp.com/api/modificarTutor', {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json, text-plain, */*"
        },
        method: 'post',
        credentials: "same-origin",
        body: JSON.stringify({
            nombre: nombre,
            cedula: cedula,
            correo: email,
            telefono : telefono,
            area : area,
            nivel : nivel,
            porcentaje : porcentaje,
            banco : banco,
            tipo_cuenta : tipo_cuenta,
            numero_cuenta : numero_cuenta
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

function validarCorreo(){
    var correo = jQuery("[name=acorreo]").val();
    var validador = jQuery("[name=cvalidador]");
    var btnConfirmar= document.querySelector("#confirmar")
    btnConfirmar.disabled = true

    fetch('https://fathomless-mesa-60059.herokuapp.com/api/verificarCorreo', {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json, text-plain, */*"
        },
        method: 'post',
        credentials: "same-origin",
        body: JSON.stringify({
            correo: correo,
            modelo: 'Tutor'
        })
    })
        .then((data) => data.json())
        .then(res =>{
            if (res.message){
                validador.css('visibility','hidden')
                validador.css('position','absolute')
                btnConfirmar.disabled = false
                return true;
            }else{
                validador.css('position','relative')
                validador.css('visibility','visible')
                btnConfirmar.disabled = true
                return false;
            }
        })
        .catch(function(error) {
            console.log(error);
        });
}

function validarCorreoModificar(){
    var correo = jQuery("[name=mcorreo]").val();
    var cedula = jQuery("[name=mcedula]").val();
    var validador = jQuery("[name=mcvalidador]");
    var btnConfirmar= document.querySelector("#mconfirmar")
    btnConfirmar.disabled = true

    fetch('https://fathomless-mesa-60059.herokuapp.com/api/verificarCorreoModificar', {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json, text-plain, */*"
        },
        method: 'post',
        credentials: "same-origin",
        body: JSON.stringify({
            correo: correo,
            cedula: cedula
        })
    })
        .then((data) => data.json())
        .then(res =>{
            if (res.message){
                validador.css('visibility','hidden')
                validador.css('position','absolute')
                btnConfirmar.disabled = false
                return true;
            }else{
                validador.css('position','relative')
                validador.css('visibility','visible')
                btnConfirmar.disabled = true
                return false;
            }
        })
        .catch(function(error) {
            console.log(error);
        });
}

function validarCedula(){
    var cedula = jQuery("[name=acedula]").val();
    var validador = jQuery("[name=ccvalidador]");
    var btnConfirmar= document.querySelector("#confirmar")
    btnConfirmar.disabled = true

    fetch('https://fathomless-mesa-60059.herokuapp.com/api/verificarCedula', {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json, text-plain, */*"
        },
        method: 'post',
        credentials: "same-origin",
        body: JSON.stringify({
            cedula: cedula,
            modelo: 'Tutor'
        })
    })
        .then((data) => data.json())
        .then(res =>{
            if (res.message){
                validador.css('visibility','hidden')
                validador.css('position','absolute')
                btnConfirmar.disabled = false
                return true;
            }else{
                validador.css('position','relative')
                validador.css('visibility','visible')
                btnConfirmar.disabled = true
                return false;
            }
        })
        .catch(function(error) {
            console.log(error);
        });
}
