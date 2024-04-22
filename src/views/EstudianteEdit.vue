<template>
  <div class="row mt-3">
    <div class="col-md-6 offset-md-3">
      <div class="card">
        <div class="card-header bg-dark text-white text-center">
          Editar estudiante
        </div>
        <div class="card-body">
          <form v-on:submit.prevent="actualizar">
            <div class="d-grid col-6 mx-auto mb-3">
              <img :src="fotosrc||base_url+foto || 'https://i.pinimg.com/736x/c9/79/0e/c9790e9f9740b3114e9fa3c56e05d980.jpg'" height="100" id="fotoimg" class="img-thumbnail" alt="">
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
              <input @change="previsualizarFoto" type="file" accept="image/png, image/jpeg, image/gif" class="form-control">
            </div>
            <div class="d-grid col-6 mx-auto mb-3">
              <button class="btn btn-warning"><i class="fa-solid fa-refresh"></i> Actualizar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mostrarAlerta, enviarSolicitud } from '../funciones';
import { useRoute } from 'vue-router';
import axios from 'axios';

export default {
  data() {
    return {
      id:0,
      nombre: '',
      apellido: '',
      foto: '',
      fotosrc: '',
      fecha: '',
      domicilio1:'',
      domicilio2:'',
      domicilio3:'',
      fotosrc: '',
      base_url:'http://127.0.0.1:8000',
      url: 'http://127.0.0.1:8000/api/estudiantes',
      urlUpdate: 'http://127.0.0.1:8000/api/estudiantes-actualizar',
      cargando: false
    }
  },
  mounted() {
    const route = useRoute();
    this.id = route.params.id;
    this.url += '/'+this.id;
    this.urlUpdate += '/'+this.id;
    this.getEstudiante();
  },

  methods: {
    getEstudiante(){
      axios.get(this.url).then(
        res=>{
          this.nombre = res.data.data.nombre;
          this.apellido = res.data.data.apellido;
          this.foto = res.data.data.foto;
          this.fecha = res.data.data.fecha;
          this.domicilio1 = res.data.data.domicilio1;
          this.domicilio2 = res.data.data.domicilio2 ? res.data.data.domicilio2 : '';
          this.domicilio3 = res.data.data.domicilio3 ? res.data.data.domicilio3 : '';
        }
      );
    },
    actualizar(event) {
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
        domicilio2: this.domicilio2,
        domicilio3: this.domicilio3
      }
      
      // Enviar solicitud
      enviarSolicitud('POST', parametros, this.urlUpdate, 'Actualizado con exito');

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
