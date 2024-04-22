<template>
  <div class="row mt-3">
    <div class="col-md-6 offset-md-3">
      <div class="card">
        <div class="card-header bg-dark text-white text-center">
          Registrar estudiante
        </div>
        <div class="card-body">
          <form v-on:submit.prevent="guardar">
            <div class="d-grid col-6 mx-auto mb-3">
              <img :src="fotosrc || 'https://i.pinimg.com/736x/c9/79/0e/c9790e9f9740b3114e9fa3c56e05d980.jpg'" height="100" id="fotoimg" class="img-thumbnail" alt="">
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text">
                <i class="fa-solid fa-user"></i>
              </span>
              <input type="text" class="form-control" v-model="nombre" id="nombre" placeholder="Ingrese su nombre" required maxlength="50">
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text">
                <i class="fa-solid fa-user"></i>
              </span>
              <input type="text" class="form-control" v-model="apellido" id="apellido" placeholder="Ingrese su apellido" required maxlength="50">
            </div>
            
            <div class="input-group mb-3">
              <span class="input-group-text">
              <i class="fa-solid fa-calendar"></i>
              </span>
              <input type="date" class="form-control" v-model="fecha" id="fecha">
            </div>

            <div class="input-group mb-3">
              <span class="input-group-text">
                <i class="fa-solid fa-user"></i>
              </span>
              <input type="text" class="form-control" v-model="domicilio1" id="domicilio1" placeholder="Ingrese su domicilio" required maxlength="50">
            </div>

            <div class="input-group mb-3">
              <span class="input-group-text">
                <i class="fa-solid fa-user"></i>
              </span>
              <input type="text" class="form-control" v-model="domicilio2" id="domicilio2" placeholder="Ingrese su domicilio"  maxlength="50">
            </div>

            <div class="input-group mb-3">
              <span class="input-group-text">
                <i class="fa-solid fa-user"></i>
              </span>
              <input type="text" class="form-control" v-model="domicilio3" id="domicilio3" placeholder="Ingrese su domicilio"  maxlength="50">
            </div>

            <div class="input-group mb-3">
              <span class="input-group-text">
                <i class="fa-solid fa-gift"></i>
              </span>
              <input @change="previsualizarFoto" type="file" accept="image/png, image/jpeg, image/gif" class="form-control" maxlength="20M">
            </div>
            <div class="d-grid col-6 mx-auto mb-3">
              <button class="btn btn-success"><i class="fa-solid fa-floppy-disk"></i> Registrar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mostrarAlerta, enviarSolicitud } from '../funciones';

export default {
  data() {
    return {
      nombre: '',
      apellido: '',
      foto: '',
      fotosrc: '',
      fecha: '',
      domicilio1:'',
      domicilio2:'',
      domicilio3:'',
      url: 'http://127.0.0.1:8000/api/estudiantes',
      cargando: false
    }
  },
  methods: {
    guardar(event) {
      event.preventDefault();

      // Verificar si la imagen ha sido cargada
      if (!this.foto) {
        mostrarAlerta('Por favor, selecciona una imagen', 'warning');
        return;
      }

      // Validar campos nombre y apellido
      if (!this.nombre.trim()) {
        mostrarAlerta('Ingresa un nombre', 'warning', 'nombre');
        return;
      }

      if (!this.apellido.trim()) {
        mostrarAlerta('Ingresa un apellido', 'warning', 'apellido');
        return;
      }

      // Preparar parámetros para enviar
      var parametros = {
        nombre: this.nombre.trim(),
        apellido: this.apellido.trim(),
        foto: this.foto,
        fecha: this.fecha,
        domicilio1: this.domicilio1.trim(),
        domicilio2: this.domicilio2.trim(),
        domicilio3: this.domicilio3.trim(),
      }

      // Enviar solicitud
      enviarSolicitud('POST', parametros, this.url, 'Estudiante registrado');

      this.cargando = true;
    },
    previsualizarFoto(event) {
      const file = event.target.files[0];
      this.foto = file;
      if (file) { 
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
          this.fotosrc = event.target.result;
          
        };
      }
    }
  }
}
</script>
