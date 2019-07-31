$("form").submit(function(event) {

    event.preventDefault();
    var horas = jQuery("[name=horas]").val();
    if(horas > 0){
        var subject = jQuery("[name = subject]").val();
        var precio = 0;
        
        fetch("http://127.0.0.1:8000/api/cotizacionInicial",{
            headers:{
                "Content-Type" : "application/json",
                "Accept" : "application/json, text-plain, */*"
            },
            method:'post',
            credentials:"same-origin",
            body:JSON.stringify({
                horas : horas,
                nivel:subject
            })
        }).then((data) => data.json())
        .then(res =>{
            document.getElementById("cotizacion").style.visibility = "visible";
            document.getElementById("mensaje").innerHTML=res.precio;
        }).catch(function(error){
            console.log(error);
        });
    }
    else{
        alert("Horas de asesoria debe ser una cantidad positiva");
    }
});