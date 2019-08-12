var del = []
var mod = []
var areas = []

async function areasConocimiento(){
    await fetch('https://fathomless-mesa-60059.herokuapp.com/api/buscarAreas', {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json, text-plain, */*"
        },
        method: 'get',
        credentials: "same-origin"
    })
        .then((data) => data.json())
        .then(res =>{
            areas = res.areas
        })
        .catch(function(error) {
            console.log(error);
        });

}

async function dibujarTablaAreas(){
    dom = ``
    areas.map(
        (area)=>{
            dom = dom + `
            <tr>
            <td>${area.id}</td>
            <td>${area.nombre}</td>
            <td>
                <a href="#editAreaConocimiento" onclick="AreaSeleccionada(this,'edit')" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Editar">&#xE254;</i></a>
                <a href="#deleteAreaConocimiento" onclick="AreaSeleccionada(this,'delete')" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Borrar">&#xE872;</i></a>
            </td>
            </tr>
            ` 
        }
    )
    document.getElementById("tbody2").innerHTML = dom
}

async function renovarTabla(){
    await areasConocimiento();
    dibujarTablaAreas() 
    del = document.getElementsByClassName("delete")
    mod = document.getElementsByClassName("edit")
}

window.onload = async ()=>{
    renovarTabla();
}

function AreaSeleccionada(obj,opc){
    var pos = 0
    if (opc == 'delete'){
        pos = indexInClass(obj,del)
        rellenarCamposAreas(areas[pos])
    }else{
        pos = indexInClass(obj,mod)
        rellenarCamposAreas(areas[pos])
    }
}

function rellenarCamposAreas(area){
    jQuery("[name=ma_codigo]").val(area.id)
    jQuery("[name=ma_nombre]").val(area.nombre)
}

$("#bform2").submit(async function(event) {
    event.preventDefault();
    var codigo = jQuery("[name=ma_codigo]").val();
    fetch('https://fathomless-mesa-60059.herokuapp.com/api/eliminarArea', {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json, text-plain, */*"
        },
        method: 'post',
        credentials: "same-origin",
        body: JSON.stringify({
            id: codigo
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

$("#aform2").submit(function(event) {
    event.preventDefault();
    var nombre = jQuery("[name=aa_nombre]").val();

    var mensaje= document.querySelector("#amensaje")
    var mensaje2= document.querySelector("#amensaje2");
    fetch('https://fathomless-mesa-60059.herokuapp.com/api/crearArea', { //Se debe crear la petieción (NO EXISTE)
        headers: {                                                      
            "Content-Type": "application/json",
            "Accept": "application/json, text-plain, */*"
        },
        method: 'post',
        credentials: "same-origin",
        body: JSON.stringify({
            nombre: nombre
        })
    })
        .then((data) => data.json())
        .then(res =>{
            if (res.message == "exitoso"){
                document.getElementById("aform2").reset();
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

$("#mform2").submit(function(event) {
    event.preventDefault();
    var codigo = jQuery("[name=ma_codigo]").val();
    var nombre = jQuery("[name=ma_nombre]").val();

    var mensaje= document.querySelector("#mmensaje")
    var mensaje2= document.querySelector("#mmensaje2");
    
    fetch('https://fathomless-mesa-60059.herokuapp.com/api/modificarArea', {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json, text-plain, */*"
        },
        method: 'post',
        credentials: "same-origin",
        body: JSON.stringify({
            id: codigo,
            nombre: nombre,
        })
    })
        .then((data) => data.json())
        .then(res =>{
            if (res.message == "exitoso"){
                document.getElementById("mform2").reset();
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
