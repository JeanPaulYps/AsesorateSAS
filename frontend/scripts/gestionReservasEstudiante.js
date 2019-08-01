var cedula_estudiante = localStorage.getItem('cedula');
var reservas = [];

window.onload() = async() =>{
    renovarTabla();
}


async function dibujarTabla(){
    dom = ``;
    reservas.map(
        (reserva) =>{
            dom = dom + `
            <tr>
                <td>${reserva.cedula_tutor}</td>
                <td>${reserva.tutores.nombre}</td>
                <td>${reserva.areas.nombre}</td>
                <td>fechas/td>
                <td>hora inicio </td>
                <td>hora fin </td>
                <td>
                <div class="col-sm-6">
                    <a href= "" data-id=${reserva.cedula_tutor} class="btn btn-info parano" data-toggle="modal">Realizada</a>
                </div>
                </td>
            </tr>
            `
        }
    )
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
            reservas = res.reservas;
        }).catch(function(error) {
            console.log(error);
        });
}

async  function renovarTabla(){
    await listarReservas();
    dibujarTabla()
}
