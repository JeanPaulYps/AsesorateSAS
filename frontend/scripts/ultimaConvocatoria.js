permitido = false
async function convocatoriaDisponible(){
    await aspirante_permitido()
    await fetch('https://fathomless-mesa-60059.herokuapp.com/api/convocatoriaDisponible', {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json, text-plain, */*"
        },
        method: 'post',
        credentials: "same-origin"
        })  
        .then((data) => data.json())
        .then(res =>{
            console.log(permitido)
            if(res.message=="exitoso" && permitido){
                    localStorage.setItem("convocatoria_id",res.convocatoria[0].id)
                    dibujarNav(true)
            }else{
                throw res.message;
            }
        })
        .catch(function(error) {
            
        });
}

async function aspirante_permitido(){
    var aspirante_cedula = await localStorage.getItem("cedula")
    await fetch('https://fathomless-mesa-60059.herokuapp.com/api/ultimoCuestionario', {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json, text-plain, */*"
        },
        method: 'post',
        credentials: "same-origin",
        body: JSON.stringify({
            aspirante_cedula: aspirante_cedula
        })
        })  
        .then((data) => data.json())
        .then(res =>{
            permitido = res.message
        })
        .catch(function(error) {
            permitido = false
        });
}

function dibujarNav(disponible){
    nav = document.getElementById("nav")
    if(disponible){
        nav.innerHTML = `
        <li><a href="cuestionario.html">Presentar Cuestionario</a></li>
        <li><a href="reservar.html">Reservar</a></li>
        <li><a href="cotizaciones.html">Realizar cotización</a></li>
        <li><button onclick="cerrarSesion();">Salir</button></li>
        `
    }
}
