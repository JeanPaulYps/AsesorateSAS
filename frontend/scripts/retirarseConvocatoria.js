function consultarPuntaje(){
    cedula = localStorage.getItem("cedula")
    fetch('https://fathomless-mesa-60059.herokuapp.com/api/consultarPuntaje',{
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
            if(res.puntaje){
                document.getElementById("tbody").innerHTML = `
                <tr>
                <td>${res.puntaje.resultado}</td>
                <td>${res.puntaje.nivel}</td>
                <td>
                <div id="retirarse">
                    <a class="btn btn-danger" style="color:#fff" href="cancelar_aspiracion.html">Retirarse de la convocatoria</a>
                </div>
                </td>
            </tr>
                `
            }else{
                document.getElementById('mensaje').innerHTML=`
                <h2 style="color:red;margin:auto">Debe presentar el cuestionario</h2>`
            }
        })
}


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
