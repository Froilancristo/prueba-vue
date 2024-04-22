<template>
  <div class="row" style="padding-top: 50px;">
    <div class="col-lg-8 offset-lg-2">
      <div class="table-responsive">
        <table class="table table-bordered table-hover">
          <thead>
            <tr style="text-align: center;">
              <th>#</th>
              <th>ID</th>
              <th>Foto</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Edad</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody class="table-group-divider" id="contenido">
            <tr v-if="this.cargando" style="text-align: center;">
              <td colspan="8" class="align-middle">
                <h3>Cargando...</h3>
              </td>
            </tr>
            <tr v-else v-for="est,i in this.estudiantes" :key="est.id" style="text-align: center;">
              <td class="align-middle">{{ i + 1 }}</td>
              <td class="align-middle">{{ est.id }}</td>
              <td class="align-middle" style="text-align: center;">
                <img v-if="est.foto" style="width: 40px !important;" :src="base_url+est.foto" class="img-thumbnail" alt="">
                <img v-else height="50" src="https://i.pinimg.com/736x/c9/79/0e/c9790e9f9740b3114e9fa3c56e05d980.jpg" alt="">
              </td>
              <td class="align-middle">{{ est.nombre }}</td>
              <td class="align-middle">{{ est.apellido }}</td>
              <td class="align-middle">{{ $filters.edad(est.fecha) }}</td>

              <td class="align-middle" style="text-align: center;">
                <router-link :to="{path:'viewE/'+est.id}" class="btn btn-info">
                  <i class="fa-solid fa-eye"></i>
                </router-link>
                &nbsp;
                <router-link :to="{path:'editE/'+est.id}" class="btn btn-warning">
                  <i class="fa-solid fa-edit"></i>
                </router-link>
                &nbsp;
                <button class="btn btn-danger" v-on:click="$event => eliminar(est.id,est.nombre)">
                  <i class="fa-solid fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { confirmar } from '../funciones';
import axios from 'axios';

  export default{
    data(){
      return {
        estudiantes:null,
        cargando:false,
        base_url:'http://127.0.0.1:8000'
      }
    },
    mounted(){
      this.getEstudiantes();
    },

    methods:{
      getEstudiantes(){
        this.cargando = true
        axios.get('http://127.0.0.1:8000/api/estudiantes').then(
          res =>{
            this.estudiantes = res.data;
            this.cargando = false;
          }
        );
      },
      eliminar(id, nombre) {
          confirmar('http://127.0.0.1:8000/api/estudiantes/',id,'Eliminar registro','Realmente desea eliminar a ' +nombre+'?');
          this.cargando = false;
      }
    }
  }
</script>
