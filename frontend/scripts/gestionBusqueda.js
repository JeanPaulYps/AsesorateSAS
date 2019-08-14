cedula_baneo = ""

$("#buscador").submit(function(event) {
    event.preventDefault();

    cedula = $("#cedula").val()

    fetch('https://fathomless-mesa-60059.herokuapp.com/api/buscarEstudiante',{
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json, text-plain, */*"
        },
        method: 'post',
        credentials: "same-origin",
        body: JSON.stringify({
            cedula: cedula
        })
    }).then(data=>data.json())
    .then(res=>{
        if(res.message){
            document.getElementById("mensaje").style.visibility = 'hidden'
            estudiante = res.estudiante[0]
            cedula_baneo = estudiante.cedula;
            document.getElementById("tbody").innerHTML = `
            <tr>
            <td>${estudiante.nombre}</td>
            <td>${estudiante.cedula}</td>
            <td>${estudiante.correo}</td>
            <td>
                <div class="col-sm-6">
                    <a href="#deleteEmployeeModal" data-id="10189087861" class="btn btn-info parano"
                        data-toggle="modal">Bloquear</a>
                </div>
            </td>
        </tr>
            `
        }else{
            document.getElementById("mensaje").style.visibility = 'visible'
        }
    })

})

$("#bform").submit(function(event) {
    event.preventDefault();

    fetch('https://fathomless-mesa-60059.herokuapp.com/api/banear',{
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json, text-plain, */*"
        },
        method: 'post',
        credentials: "same-origin",
        body: JSON.stringify({
            cedula: cedula_baneo
        })
    }).then(data=>data.json())
    .then(res=>{
        $("#deleteEmployeeModal").modal('hide')
        document.getElementById('container').innerHTML=`
            <h2 style='color:green;margin:auto'>Estudiante baneado correctamente</h2>`
    })

})