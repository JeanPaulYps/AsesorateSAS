var reservas = [];
var cedula_tutor = localStorage.getItem('cedula');

window.onload = async () =>{
    renovarTabla();
}

async function listarReservas() {
    await fetch("https://fathomless-mesa-60059.herokuapp.com/api/listarReservas",{
        headers:{
            "Content-Type":"application/json",
            "Accept":"application/json, text-plain, */*"
        },
        method:'post',
        credentials:"same-origin",
        body:JSON.stringify({
            cedula_tutor:cedula_tutor
        })
    })
        .then((data) => data.json())
        .then(res => {
            console.log(res.reservas);
            reservas = res.reservas;
        }).catch(function(error) {
            console.log(error);
        });
}

async function dibujarTabla(){
    dom = ``;
    reservas.map(
        (reserva) =>{
            dom = dom + `
            <tr>
                <td>${reserva.nombre}</td>
                <td>${reserva.correo}</td>
                <td>${reserva.dia}</td>
                <td>${reserva.hora_inicio}</td>
                <td>${reserva.hora_fin}</td>
                <td>
                <div class="col-sm-6">
                    <a href= "" data-id=${reserva.cedula_estudiante} class="btn btn-info parano" data-toggle="modal">Realizada</a>
                </div>
                </td>
            </tr>
            `
        }
    )
    document.getElementById("tbody").innerHTML = dom;
}

$(document).on("click", ".parano", function(){
    var cedula_estudiante = $(this).attr('data-id');
    realizarAsesoria(cedula_estudiante);
})

async function renovarTabla(){
    await listarReservas();
    dibujarTabla();
}

async function realizarAsesoria(cedula_estudiante){
    await fetch("https://fathomless-mesa-60059.herokuapp.com/api/realizarReserva",{
        headers:{
            "Content-Type":"application/json",
            "Accept":"application/json, text-plain, */*"
        },
        method:'post',
        credentials:"same-origin",
        body:JSON.stringify({
            cedula_estudiante:cedula_estudiante,
            cedula_tutor : cedula_tutor
        })
    })
        .then((data) => data.json())
        .then(res => {
            console.log(res.message);
        }).catch(function(error) {
            console.log(error);
        });
}