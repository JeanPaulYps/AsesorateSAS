        $("form").submit(function(event) {
            event.preventDefault();
            var nombre = jQuery("[name=nombre]").val();
            var cedula = jQuery("[name=cedula]").val();
            var email = jQuery("[name=email]").val();
            var contrasena = jQuery("[name=contrasena]").val();
            var telefono= jQuery("[name=telefono]").val();
            var mensaje= document.querySelector("#mensaje")
            var mensaje2= document.querySelector("#mensaje2")


            fetch('https://fathomless-mesa-60059.herokuapp.com/api/registroEstudiante', {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json, text-plain, */*"
                },
                method: 'post',
                credentials: "same-origin",
                body: JSON.stringify({
                    nombre: nombre,
                    cedula: cedula,
                    correo: email,
                    contrasena: contrasena,
                    telefono : telefono
                })
            })
                .then((data) => data.json())
                .then(res =>{
                    document.getElementById("form").reset();
                    mensaje.style.visibility = 'visible'
                })
                .catch(function(error) {
                    document.getElementById("form").reset();
                    mensaje2.style.visibility = 'visible'
                    console.log(error);
                });
        });


function validarContrasenas(){
    var contrasena = jQuery("[name=contrasena]").val();
    var vcontrasena = jQuery("[name=vcontrasena]").val();
    var validador = jQuery("[name=validador]");
    var btnConfirmar= document.querySelector("#confirmar")


    if (contrasena==vcontrasena){
        validador.css('visibility','hidden')
        validador.css('position','absolute')
        btnConfirmar.disabled = false
        return true;
    }else{
        validador.css('position','relative')
        validador.css('visibility','visible')
        btnConfirmar.disabled = true
        return false;
    }

}

function validarCorreo(){
    var email = jQuery("[name=email]").val();
    var validador = jQuery("[name=cvalidador]");
    var btnConfirmar= document.querySelector("#confirmar")
    btnConfirmar.disabled = true

    fetch('https://fathomless-mesa-60059.herokuapp.com/api/verificarCorreo', {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json, text-plain, */*"
        },
        method: 'post',
        credentials: "same-origin",
        body: JSON.stringify({
            correo: email
        })
    })
        .then((data) => data.json())
        .then(res =>{
            if (res.message){
                validador.css('visibility','hidden')
                validador.css('position','absolute')
                btnConfirmar.disabled = false
                return true;
            }else{
                validador.css('position','relative')
                validador.css('visibility','visible')
                btnConfirmar.disabled = true
                return false;
            }
        })
        .catch(function(error) {
            console.log(error);
        });



}

