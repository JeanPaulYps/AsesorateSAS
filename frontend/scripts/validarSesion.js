var cedula = localStorage.getItem('cedula');
var pass = localStorage.getItem('pass');

if (!(cedula && pass)){
    location.replace('http://www.asesorate.tk/frontend/index.html');
}

function sesion(rol){
    disponible = false
    fetch('https://fathomless-mesa-60059.herokuapp.com/api/verificarSesion', {
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json, text-plain, */*"
    },
    method: 'post',
    credentials: "same-origin",
    body: JSON.stringify({
        cedula: cedula,
        contrasena: pass,
        rol: rol
    })
})
    .then((data) => data.json())
    .then(res =>{
        if(!res.verif){
            localStorage.clear()
            location.replace('http://www.asesorate.tk/frontend/index.html');
        }
        fetch('https://fathomless-mesa-60059.herokuapp.com/api/convocatoriaDisponible', {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json, text-plain, */*"
        },
        method: 'post',
        credentials: "same-origin"
        })  
        .then((data) => data.json())
        .then(res =>{
            if(res.message=="exitoso"){
                localStorage.setItem("convocatoria_id",res.convocatoria[0].id)
                disponible = true
            }else{
                throw res.message;
            }
        })
        .catch(function(error) {
            
        });
    })
    .catch(function(error) {
        console.log(error);
    });
    dibujarNav(disponible)
}



function cerrarSesion(){
    localStorage.clear()
    location.replace('http://www.asesorate.tk/frontend/index.html');
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
    }else{
        nav.innerHTML = `
        <li><a href="reservar.html">Reservar</a></li>
        <li><a href="cotizaciones.html">Realizar cotización</a></li>
        <li><button onclick="cerrarSesion();">Salir</button></li>
        `
    }

}