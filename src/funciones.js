import Swal from "sweetalert2";
import axios from "axios";
import router from "@/router";
 // Reemplaza 'ruta-del-archivo-enviarSolicitud' con la ruta correcta a tu archivo enviarSolicitud.js

export function mostrarAlerta(titulo, icono, foco = '') {
    const input = document.getElementById(foco);

    if (foco && input) {
        input.focus();
    }

    Swal.fire({
        title: titulo,
        icon: icono,
        customClass: { confirmButton: 'btn btn-primary', popup: 'animated zoonIn' },
        buttonsStyling: false
    });
}

export function confirmar(urlConSlash, id, titulo, mensaje) {
    var url = urlConSlash + id;

    const swalWithBoostrapButton = Swal.mixin({
        customClass: { confirmButton: 'btn btn-success me-3', popup: 'animated zoomIn', cancelButton: 'btn btn-danger' },
    });

    swalWithBoostrapButton.fire({
        title: titulo,
        text: mensaje,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: '<i class="fa-solid fa-check"></i> Si, eliminar',
        cancelButtonText: '<i class="fa-solid fa-ban"></i> Cancelar'
    }).then((res) => {
        if (res.isConfirmed) {
            enviarSolicitud('DELETE', { id: id }, url, 'Eliminado con éxito');
        } else {
            mostrarAlerta('Operación cancelada', 'info');
        }
    });
}

// Aquí debes definir la función enviarSolicitud
export function enviarSolicitud(metodo, parametros, url, mensaje) {
    axios({
        method: metodo,
        url: url,
        data: parametros,
        headers:{
            'Content-Type': 'multipart/form-data'
        }
    })
    .then(function(res){
        var estado = res.status;
        if(estado == 200){
            mostrarAlerta(mensaje,'success');
            window.setTimeout(function () {
                router.push('/') 
            },1000)
        } else {
            mostrarAlerta('No se pudo recuperar la respuesta','error');
        }
    })
    .catch(function (error){
        mostrarAlerta('Servidor no disponible','error');
    });
}
