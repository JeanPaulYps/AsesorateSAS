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

$("#sform").submit(function(event) {
    event.preventDefault();
    var aspirante = ""
    var quienes_somos = ""
    var servicios = jQuery("[name=qcontenido]").val();

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