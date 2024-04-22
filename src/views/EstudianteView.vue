<template>
  <div class="row mt-3">
    <div class="col-md-6 offset-md-3">
      <div class="card">
        <div class="card-header bg-dark text-white text-center">
          Editar estudiante
        </div>
        <div class="card-body">
            <div class="d-grid col-6 mx-auto mb-3">
              <router-link :to="{path:'/'}" class="btn btn-info">
                <i class="fa-solid fa-arrow-left"></i>Regresar a la lista
              </router-link>
            </div>
            <div class="d-grid col-6 mx-auto mb-3">
              <img :src="base_url+foto || 'https://i.pinimg.com/736x/c9/79/0e/c9790e9f9740b3114e9fa3c56e05d980.jpg'" height="100" id="fotoimg" class="img-thumbnail" alt="">
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text">
                <i class="fa-solid fa-user"></i>
              </span>
              <label type="text" class="form-control" v-text="nombre" id="nombre"></label>
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text">
                <i class="fa-solid fa-user"></i>
              </span>
              <label type="text" class="form-control" v-text="apellido" id="apellido"></label></div>

              <div class="input-group mb-3">
                                <span class="input-group-text">
                                <i class="fa-solid fa-calendar"></i>
                                </span>
                                <label type="text" class="form-control" id="fecha">{{ $filters.edad(fecha) }}</label>
                              </div>
                  
                              <div class="input-group mb-3">
                                <span class="input-group-text">
                                  <i class="fa-solid fa-user"></i>
                                </span>
                                <label type="text" class="form-control" v-text="domicilio1" id="domicilio1"></label>
                              </div>
                  
                              <div class="input-group mb-3">
                                <span class="input-group-text">
                                  <i class="fa-solid fa-user"></i>
                                </span>
                                <label type="text" class="form-control" v-text="domicilio2" id="domicilio2"></label>
                              </div>
                  
                              <div class="input-group mb-3">
                                <span class="input-group-text">
                                  <i class="fa-solid fa-user"></i>
                                </span>
                                <label type="text" class="form-control" v-text="domicilio3" id="domicilio3"></label>
                              </div>

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
      url: 'http://127.0.0.1:8000/api/estudiantes',
      cargando: false,
      base_url:'http://127.0.0.1:8000',
      cargando: false
    }
  },
  mounted() {
    const route = useRoute();
    this.id = route.params.id;
    this.url += '/'+this.id;
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
          this.domicilio2 = res.data.data.domicilio2;
          this.domicilio3 = res.data.data.domicilio3;
        }
      );
    },
  }
}
</script>
