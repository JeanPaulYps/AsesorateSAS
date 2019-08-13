$("#aform").submit(function(event) {
    event.preventDefault();
    var aspirante = jQuery("[name=acontenido]").val();
    var quienes_somos = ""
    var servicios = ""

    var mensaje= document.querySelector("#amensaje")
    var mensaje2= document.querySelector("#amensaje2");
    fetch('https://fathomless-mesa-60059.herokuapp.com/api/modificarContenido', {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json, text-plain, */*"
        },
        method: 'post',
        credentials: "same-origin",
        body: JSON.stringify({
            aspirante : aspirante,
            quienes_somos : quienes_somos,
            servicios: servicios
        })
    })
        .then((data) => data.json())
        .then(res =>{
            if (res.message == "exitoso"){
                document.getElementById("aform").reset();
                mensaje.style.visibility = 'visible'
                mensaje2.style.visibility = 'hidden'
                $("#aconfirmacion").modal('hide')
                mostrarContenidoMod();
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

$("#qform").submit(function(event) {
    event.preventDefault();
    var aspirante = ""
    var quienes_somos = jQuery("[name=qcontenido]").val();
    var servicios = ""

    var mensaje= document.querySelector("#qmensaje")
    var mensaje2= document.querySelector("#qmensaje2");
    fetch('https://fathomless-mesa-60059.herokuapp.com/api/modificarContenido', {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json, text-plain, */*"
        },
        method: 'post',
        credentials: "same-origin",
        body: JSON.stringify({
            aspirante : aspirante,
            quienes_somos : quienes_somos,
            servicios: servicios
        })
    })
        .then((data) => data.json())
        .then(res =>{
            if (res.message == "exitoso"){
                document.getElementById("qform").reset();
                mensaje.style.visibility = 'visible'
                mensaje2.style.visibility = 'hidden'
                $("#qconfirmacion").modal('hide')
                mostrarContenidoMod();
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

$("#sform").submit(function(event) {
    event.preventDefault();
    var aspirante = ""
    var quienes_somos = ""
    var servicios = jQuery("[name=scontenido]").val();

    var mensaje= document.querySelector("#smensaje")
    var mensaje2= document.querySelector("#smensaje2");
    fetch('https://fathomless-mesa-60059.herokuapp.com/api/modificarContenido', {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json, text-plain, */*"
        },
        method: 'post',
        credentials: "same-origin",
        body: JSON.stringify({
            aspirante : aspirante,
            quienes_somos : quienes_somos,
            servicios: servicios
        })
    })
        .then((data) => data.json())
        .then(res =>{
            if (res.message == "exitoso"){
                document.getElementById("sform").reset();
                mensaje.style.visibility = 'visible'
                mensaje2.style.visibility = 'hidden'
                $("#sconfirmacion").modal('hide')
                mostrarContenidoMod();
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

function mostrarContenido(vista){
    contenedor = document.getElementById("contenido")

    fetch('https://fathomless-mesa-60059.herokuapp.com/api/mostrarContenido', {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json, text-plain, */*"
        },
        method: 'get',
        credentials: "same-origin"
    })
        .then((data) => data.json())
        .then(res =>{
            if(vista == "q"){
                contenedor.innerHTML = res.contenido.quienes_somos
            }else if(vista=="s"){
                contenedor.innerHTML = res.contenido.servicios
            }else if (vista =="a"){
                contenedor.innerHTML = res.contenido.aspirante
            }
        })
        .catch(function(error) {
            console.log(error);
        });
}


function mostrarContenidoMod(){
    fetch('https://fathomless-mesa-60059.herokuapp.com/api/mostrarContenido', {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json, text-plain, */*"
        },
        method: 'get',
        credentials: "same-origin"
    })
        .then((data) => data.json())
        .then(res =>{
            jQuery("[name=qcontenido]").val(res.contenido.quienes_somos)
            jQuery("[name=scontenido]").val(res.contenido.servicios)
            jQuery("[name=acontenido]").val(res.contenido.aspirante)
        })
        .catch(function(error) {
            console.log(error);
        });
}

mostrarContenidoMod();

