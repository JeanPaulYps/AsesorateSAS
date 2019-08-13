var del = []
var mod = []
var categorias = []

async function categoriaNivel() {
    await fetch('https://fathomless-mesa-60059.herokuapp.com/api/buscarCategorias', {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json, text-plain, */*"
            },
            method: 'get',
            credentials: "same-origin"
        })
        .then((data) => data.json())
        .then(res => {
            categorias = res.categorias
        })
        .catch(function (error) {
            console.log(error);
        });

}

async function dibujarTablaCategorias() {
    dom = ``
    categorias.map(
        (categoria) => {
            dom = dom + `
            <tr>
            <td>${categoria.id}</td>
            <td>${categoria.nombre_categoria}</td>
            <td>${categoria.valor}</td>
            <td>
                <a href="#editCategoriaNivel" onclick="CategoriaSeleccionada(this,'edit')" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Editar">&#xE254;</i></a>
                <a href="#deleteCategoriaNivel" onclick="CategoriaSeleccionada(this,'delete')" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Borrar">&#xE872;</i></a>
            </td>
            </tr>
            `
        }
    )
    document.getElementById("tbody2").innerHTML = dom
}

async function renovarTabla() {
    await categoriaNivel();
    dibujarTablaCategorias()
    del = document.getElementsByClassName("delete")
    mod = document.getElementsByClassName("edit")
}

window.onload = async () => {
    renovarTabla();
}

function CategoriaSeleccionada(obj, opc) {
    var pos = 0
    if (opc == 'delete') {
        pos = indexInClass(obj, del)
        rellenarCamposCategorias(categorias[pos])
    } else {
        pos = indexInClass(obj, mod)
        rellenarCamposCategorias(categorias[pos])
    }
}

function rellenarCamposCategorias(categoria) {
    jQuery("[name=ma_codigo]").val(categoria.id)
    jQuery("[name=ma_nombre]").val(categoria.nombre_categoria)
}

$("#bform2").submit(async function (event) {
    event.preventDefault();
    var codigo = jQuery("[name=ma_codigo]").val();
    fetch('https://fathomless-mesa-60059.herokuapp.com/api/eliminarCategoria', {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json, text-plain, */*"
            },
            method: 'post',
            credentials: "same-origin",
            body: JSON.stringify({
                id: codigo
            })
        })
        .then((data) => data.json())
        .then(res => {
            alert(res.message)
            renovarTabla()
        })
        .catch(function (error) {
            console.log(error);
        });
})

$("#mform2").submit(function (event) {
    event.preventDefault();
    var codigo = jQuery("[name=ma_codigo]").val();
    var nombre = jQuery("[name=ma_nombre]").val();
    var valor = jQuery("[name=ma_valor]").val();

    var mensaje = document.querySelector("#mmensaje")
    var mensaje2 = document.querySelector("#mmensaje2");

    fetch('https://fathomless-mesa-60059.herokuapp.com/api/modificarCategoria', {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json, text-plain, */*"
            },
            method: 'post',
            credentials: "same-origin",
            body: JSON.stringify({
                id: codigo,
                nombre: nombre,
                valor: valor
            })
        })
        .then((data) => data.json())
        .then(res => {
            if (res.message == "exitoso") {
                document.getElementById("mform2").reset();
                mensaje.style.visibility = 'visible'
                mensaje2.style.visibility = 'hidden'
                renovarTabla()
            } else {
                throw res.message;
            }
        })
        .catch(function (error) {
            mensaje.style.visibility = 'hidden'
            mensaje2.style.visibility = 'visible'
            console.log(error);
        });
});

function indexInClass(node, myClass) {
    var className = node.className;
    var num = 0;
    for (var i = 0; i < myClass.length; i++) {
        if (myClass[i] === node) {
            return num;
        }
        num++;
    }
    return -1;
}