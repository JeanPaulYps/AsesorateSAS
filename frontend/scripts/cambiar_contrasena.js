function validarContrasenas_actual(){
    var contrasena_actual = jQuery("[name=contrasena_actual]").val();
    var contrasena_nueva = jQuery("[name=contrasena_nueva]").val();
    var validador1 = jQuery("[name=validador1]");
    var btnGuardar= document.querySelector("#guardar")

    if(contrasena_actual!=""){

        if (contrasena_actual==contrasena_nueva){
            validador1.css('position','relative')
            validador1.css('visibility','visible')
            btnGuardar.disabled = true
            return false;
        }else{
            validador1.css('visibility','hidden')
            validador1.css('position','absolute')
            btnGuardar.disabled = false
            return true;
        }
    }
}

function validarContrasenas_nueva(){
    var contrasena_nueva = jQuery("[name=contrasena_nueva]").val();
    var vcontrasena_nueva = jQuery("[name=vcontrasena_nueva]").val();
    var validador = jQuery("[name=validador]");
    var btnGuardar= document.querySelector("#guardar")

    if(vcontrasena_nueva!=""){

        if (contrasena_nueva==vcontrasena_nueva){
            validador.css('visibility','hidden')
            validador.css('position','absolute')
            btnGuardar.disabled = false
            return true;
        }else{
            validador.css('position','relative')
            validador.css('visibility','visible')
            btnGuardar.disabled = true
            return false;
        }
    
    }

}




