function changeFunc() {
    var selectBox = document.getElementById("area");
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;
    selected(selectedValue);
   }

function selected(area) {
    
    fetch('https://fathomless-mesa-60059.herokuapp.com/api/tutorPorArea', {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json, text-plain, */*"
        },
        method: 'post',
        credentials: "same-origin",
        body: JSON.stringify({
            area: area
        })
    })
        .then((data) => data.json())
        .then(res =>{
            dibujarTutores(res.tutores)
        })
        .catch(function(error) {
            console.log(error);
        });
}


function dibujarTutores(tutores){
    dom = '<option value="">Seleccione un tutor</option>'
    tutores.map(tutor=>{
        dom = dom + `<option value="${tutor.cedula}" >${tutor.nombre}</option>`
    })
    document.getElementById("tutor").innerHTML = dom
}


$("form").submit(function(event) {
    event.preventDefault();
    
    var ar = jQuery("[name=area]").val();
    var ct = jQuery("[name=cedula_tutor]").val();
    var fecha = jQuery("[name=fecha]").val().replace("/","-");
    var hf = jQuery("[name=hora_fin]").val();
    var hi = jQuery("[name=hora_inicio]").val();
    var hs = parseInt(hf) - parseInt(hi)
    var ce = localStorage.getItem("cedula");
    
    var mensaje= document.querySelector("#mensaje")
    var mensaje2= document.querySelector("#mensaje2");
    fetch('https://fathomless-mesa-60059.herokuapp.com/api/CrearReserva', {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json, text-plain, */*"
        },
        method: 'post',
        credentials: "same-origin",
        body: JSON.stringify({
            cedula_estudiante:ce,
            cedula_tutor:ct,
            area:ar,
            horas:hs,
            dia :fecha,
            hora_fin: hf,
            hora_inicio:hi 
        })
    })
        .then((data) => data.json())
        .then(res =>{
            mensaje.style.visibility = 'visible'
            mensaje2.style.visibility = 'hidden'
        })
        .catch(function(error) {
            mensaje.style.visibility = 'hidden'
            mensaje2.style.visibility = 'visible'
            console.log(error)
        });
});

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
            dibujarAreas(res.areas)
        })
        .catch(function(error) {
            console.log(error);
        });

}


function dibujarAreas(areas){
    dom = '<option value="">Seleccione un area de conocimiento</option>'
    areas.map(area=>{
        dom = dom + `<option value="${area.id}">${area.nombre}</option>`
    })
    document.getElementById("area").innerHTML = dom
}


