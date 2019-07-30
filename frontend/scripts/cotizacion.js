$("form").submit(function(event) {
    event.preventDefault();
    var horas = jQuery("[name=horas]").val();
    if(horas > 0){
        var subject = jQuery("[name=subject]").val();
        var precio = 0;
        var identificador = localStorage.getItem("cedula");

        fetch('https://fathomless-mesa-60059.herokuapp.com/api/registroCotizacion', {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json, text-plain, */*"
            },
            method: 'post',
            credentials: "same-origin",
            body: JSON.stringify({
                id_estudiante: identificador,
                horas: horas,
                nivel: subject,
                precio:precio

            })
        })
            .then((data) => data.json())
            .then(res =>{
                document.getElementById("cotizacion").style.visibility = "visible";
                document.getElementById("mensaje").innerHTML=res.precio;

            })
            .catch(function(error) {
                console.log(error);
            });
    }else{alert("Horas de asesoria debe ser una cantidad positiva")}

});
//function notneg(event){
//    if(document.getElementById("horas").value >= 0){
//        event.preventDefault();
//        var horas = jQuery("[name=horas]").val();
//        var subject = jQuery("[name=subject]").val();
//        var precio = 0;
//        var identificador = localStorage.getItem("cedula");
//
//        fetch('https://fathomless-mesa-60059.herokuapp.com/api/registroCotizacion', {
//            headers: {
//                "Content-Type": "application/json",
//                "Accept": "application/json, text-plain, */*"
//            },
//            method: 'post',
//            credentials: "same-origin",
//            body: JSON.stringify({
//                id_estudiante: identificador,
//                horas: horas,
//                nivel: subject,
//                precio:precio
//
//            })
//        })
//            .then((data) => data.json())
//            .then(res =>{
//                document.getElementById("cotizacion").style.visibility = "visible";
//                document.getElementById("mensaje").innerHTML=res.precio;
//
//            })
//            .catch(function(error) {
//                console.log(error);
//            });
//    }else{
//        alert("No puede ingresar una cantidad negativa de horas");
//    }
//}



