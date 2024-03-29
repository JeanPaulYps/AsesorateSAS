baneado = false;

$("form").submit(async function(event) {
    event.preventDefault();
    var correo = jQuery("[name=correo]").val();
    var password = jQuery("[name=password]").val();

    await verificarBaneo(correo)
    if(baneado){
        alert('Usted esta baneado')
        return 1;
    }
    
    fetch('https://fathomless-mesa-60059.herokuapp.com/api/logged', {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json, text-plain, */*"
        },
        method: 'post',
        credentials: "same-origin",
        body: JSON.stringify({
            correo: correo,
            password: password
        })
    })
        .then((data) => data.json())
        .then(res =>{
            var responseText = document.getElementById('response');
            message = res['message'];
            console.log(res);
            if(message != 'ingresado'){
                responseText.innerHTML = message;
            }else{
                localStorage.setItem("cedula",res['cedula']);
                localStorage.setItem("pass", res['pass']);
                if(res['rol'][0]['rol'] == 'Estudiante'){
                    location.replace('http://www.asesorate.tk/frontend/estudiante.html');
                }
                else if(res['rol'][0]['rol'] == 'Administrador'){
                    location.replace('http://www.asesorate.tk/frontend/administrador.html');
                }
                else if(res['rol'][0]['rol'] == 'Aspirante'){
                    location.replace('http://www.asesorate.tk/frontend/aspirante.html');
                }
                else if(res.rol == 'tutor'){
                    location.replace('http://www.asesorate.tk/frontend/tutor.html');
                }
            }
        })
        .catch(function(error){
            console.log(error);
        });
});


async function verificarBaneo(correo){
    await fetch('https://fathomless-mesa-60059.herokuapp.com/api/verificarBaneo',{
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json, text-plain, */*"
        },
        method: 'post',
        credentials: "same-origin",
        body: JSON.stringify({
            correo: correo
        })
    }).then(data=>data.json())
    .then(res=>{
        baneado = res.message
    })
}