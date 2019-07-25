$("form").submit(function(event) {
    event.preventDefault();
    var hs = jQuery("[name=horas]").val();
    var ar = jQuery("[name=area]").val();
    var nv = jQuery("[name=nivel]").val();
    var ct = jQuery("[name=cedula_tutor]").val();
    var ce = localStorage.getItem("cedula");
    
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
            nivel:nv,
            area:ar,
            horas:hs
            
        })
    })
        .then((data) => data.json())
        .then(res =>{
        
           // document.getElementById("cotizacion").style.visibility = "visible";
			//document.getElementById("mensaje").innerHTML=res.precio;
           
        })
        .catch(function(error) {
            console.log(error);
        });
});

