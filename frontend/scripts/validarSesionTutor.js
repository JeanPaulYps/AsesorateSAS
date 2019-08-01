var cedula  = localStorage.getItem('cedula');
var pass = localStorage.getItem('pass');

if (!(cedula && pass)){
    location.replace('http://www.asesorate.tk/frontend/index.html');
}

function sesion(){
    fetch("http://127.0.0.1:8000/api/validarTutor",{
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json, text-plain, */*"
        },
        method: 'post',
        credentials: "same-origin",
        body:JSON.stringify({
            cedula:cedula,
            contrasena : pass
        })
    })
        .then((data) => data.json())
        .then(res => {
            if(!res.verif){
                localStorage.clear();
                location.replace('http://www.asesorate.tk/frontend/index.html');
            }
        }).catch(function(error) {
            console.log(error);
        })
}

function cerrarSesion(){
    localStorage.clear()
    location.replace('http://www.asesorate.tk/frontend/index.html');
}