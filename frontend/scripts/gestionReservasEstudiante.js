var cedula_estudiante = localStorage.getItem('cedula');
var reservas = [];

window.onload = async() =>{
    renovarTabla();
}


async function dibujarTabla(){
    dom = ``;
    reservas.map(
        (reserva) =>{

            dom = dom + `
            <tr>
                <td>${reserva.cedula_tutor}</td>
                <td>${reserva.nombre}</td>
                <td>${reserva.area}</td>
                <td>${reserva.dia}</td>
                <td>${reserva.hora_inicio}</td>
                <td>${reserva.hora_fin}</td>
                <td>
                <div class="col-sm-6">
                    <a href= "" data-id=${reserva.cedula_tutor} class="btn btn-info parano" data-toggle="modal">Comprobar</a>
                </div>
                </td>
            </tr>
            `;
        }
    )
    document.getElementById("tbody").innerHTML = dom;
}

async function listarReservas() {
    await fetch("https://fathomless-mesa-60059.herokuapp.com/api/verReservasEstudiante",{
        headers:{
            "Content-Type":"application/json",
            "Accept":"application/json, text-plain, */*"
        },
        method:'post',
        credentials:"same-origin",
        body:JSON.stringify({
            cedula_estudiante: cedula_estudiante
        })
    })
        .then((data) => data.json())
        .then(res => {
            console.log(res);
            reservas = res.reservas;
        }).catch(function(error) {
            console.log(error);
        });
}

async  function renovarTabla(){
    await listarReservas();
    dibujarTabla()
}

$(document).on("click", ".parano", function(){
    var cedula_estudiante = $(this).attr('data-id');
    verificarAsesoria(cedula_estudiante);
})


async function verificarAsesoria(cedula_tutor){
    await fetch("https://fathomless-mesa-60059.herokuapp.com/api/verificarAsesoria",{
        headers:{
            "Content-Type":"application/json",
            "Accept":"application/json, text-plain, */*"
        },
        method:'post',
        credentials:"same-origin",
        body:JSON.stringify({
                cedula_tutor : cedula_tutor,
                cedula_estudiante:cedula_estudiante
        })
    })
        .then((data) => data.json())
        .then(res => {
            console.log(res.message);
            if(res.message == "exitoso"){
                localStorage.setItem('cedula_tutor',cedula_tutor);
                location.replace("http://www.asesorate.tk/frontend/calificar_tutor.html");
            }
            else{
                console.log(res.message);
            }
        }).catch(function(error) {
            console.log(error);
        });
}
