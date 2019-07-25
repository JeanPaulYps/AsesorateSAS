var cedula = localStorage.getItem('cedula');
var pass = localStorage.getItem('pass');

if (!(cedula && pass)){
    location.replace('http://www.asesorate.tk/frontend/index.html');
}

function sesion(rol){
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
    })
    .catch(function(error) {
        console.log(error);
    });
    
}

function cerrarSesion(){
    localStorage.clear()
    location.replace('http://www.asesorate.tk/frontend/index.html');
}
