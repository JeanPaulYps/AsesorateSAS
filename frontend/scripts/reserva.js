$("form").submit(function(event) {
    event.preventDefault();
    var horas = jQuery("[name=horas]").val();
    var area = jQuery("[name=area]").val();
    var nivel = jQuery("[name=nivel]").val();
    var cedula_tutor = jQuery("[name=cedula_tutor]").val();
    var cedula_estudiante = localStorage.getItem("cedula");
    
    fetch('https://fathomless-mesa-60059.herokuapp.com/api/CrearReserva', {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json, text-plain, */*"
        },
        method: 'post',
        credentials: "same-origin",
        body: JSON.stringify({
            cedula_estudiante:cedula_estudiante,
            cedula_tutor:cedula_tutor,
            nivel:nivel,
            area:area,
            horas:horas
            
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
});

