aspirantes = []

function retirarse(){
    cedula = localStorage.getItem("cedula")
    $('#confirmar').prop("disabled", true)
    fetch('https://fathomless-mesa-60059.herokuapp.com/api/retirarConvocatoria',{
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json, text-plain, */*"
        },
        method: 'post',
        credentials: "same-origin",
        body: JSON.stringify({
            cedula : cedula
        })
    }).then((data)=>data.json())
        .then(res=>{
            document.getElementById('contenedor').innerHTML=`
            <h2 style='color:green;margin:auto'>Usted se ha retirado de la convocatoria.</h2>`
        })
}

function buscarCedula(cedula = localStorage.getItem('cedula')){
    esta = false
    aspirantes.map(
        (aspirante)=>{
            if (aspirante.estudiante_cedula == cedula ){
                esta = true
                return 1;
            }
        }
    )
    return esta
}

async function listarAspirantes(){
    await fetch("https://fathomless-mesa-60059.herokuapp.com/api/verAspirantes",{
        headers:{
            "Content-Type":"application/json",
            "Accept":"application/json, text-plain, */*"
        },
        method:'get',
        credentials:"same-origin"
    }).then((data) => data.json())
    .then(res =>{
        aspirantes = res.aspirantes;
    })
    .catch(function(error){
        console.log(error);
    })
}

async function botonRetirar(){
    await listarAspirantes();
    esta = buscarCedula();
    if(esta){
        document.getElementById("retirarse").style.visibility = 'visible'
    }
}