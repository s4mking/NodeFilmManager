import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '@/router'
import eventService from '../eventService'
Vue.use(Vuex)


export default new Vuex.Store({
  state:{
    status: '',
    token: localStorage.getItem('token') || '',
    user : {},
    films:{},
    me:{},
    users:[],
  },
  mutations: {
    auth_request(state){
      state.status = 'loading'
    },
    auth_success(state, token ){
      state.status = 'success'
      state.token = token
    },
    auth_error(state){
      state.status = 'error'
    },
    logout(state){
      state.status = ''
      state.token = ''
    },
    listfilms(state,films){
      state.films = films
    },
    me(state,me){
      state.me = me
    },
    users(state,users){
      state.me = users
    }
},
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    },
  actions: {
    login({commit},input){
      return new Promise((resolve, reject) => {
        commit('auth_request')
        eventService.auth.userLogin({
          username:input.username,
           password:input.password
        })
        .then(resp => {
          const token = resp.data.token
          localStorage.setItem('token', token)
          console.log(token)
          axios.defaults.headers.common['Authorization'] = 'Bearer '+token
          console.log(eventService)
          commit('auth_success', token)
          resolve(resp)
        })
        .catch(err => {
          console.log(err)

          commit('auth_error')
          localStorage.removeItem('token')
          reject(err)
        })
      })
      
  },
  logout({commit}){
    return new Promise((resolve, reject) => {
      commit('logout')
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization']
      resolve()
      console.log(reject)
    })
  },
  getFilms({commit},input){
    return new Promise((resolve, reject) => {
     eventService.auth.getFilms({offset:input})
      .then(resp => {
        const films = resp.data 
        commit('listfilms', films)
        resolve(resp)
      })
      .catch(err => {
        reject(err)
      })
    })
  },
  getFilm(){
    return new Promise((resolve, reject) => {
     eventService.auth.getFilm({
       currentRoute:router.currentRoute.params.id
     })
      .then(resp => {
        console.log(resp)
        resolve(resp.data)
      })
      .catch(err => {
        reject(err)
      })
    })
  },
  removeFilm({commit},requestedId){
    console.log(commit)
    return new Promise((resolve, reject) => {
     eventService.auth.removeFilm({
      requestedId:requestedId
     })
      .then(resp => {
        console.log(resp)
        resolve(resp.data)
      })
      .catch(err => {
        reject(err)
      })
    })
  },
  putFilm({commit},body){
    console.log(commit)
    console.log(body)
    return new Promise((resolve, reject) => {
     eventService.auth.putFilm({
      idfilm:body.id_film,
      titre:body.titre,
      resum:body.resum,
     })
      .then(resp => {
        console.log(resp)
        resolve(resp.data)
      })
      .catch(err => {
        reject(err)
      })
    })
  },
  getDistributeurs({commit},input){
    console.log(commit)
    return new Promise((resolve, reject) => {
     eventService.auth.getDistributeurs({offset:input})
      .then(resp => {
        resolve(resp)
      })
      .catch(err => {
        reject(err)
      })
    })
  },
  getDistributeur(){
    return new Promise((resolve, reject) => {
     eventService.auth.getDistributeur({
       currentRoute:router.currentRoute.params.id
     })
      .then(resp => {
        resolve(resp.data)
      })
      .catch(err => {
        reject(err)
      })
    })
  },
  removeDistributeur({commit},requestedId){
    console.log(commit)
    return new Promise((resolve, reject) => {
     eventService.auth.removeDistributeur({
      requestedId:requestedId
     })
      .then(resp => {
        console.log(resp)
        resolve(resp.data)
      })
      .catch(err => {
        reject(err)
      })
    })
  },
  putDistributeur({commit},body){
    console.log(commit)
    console.log(body)
    return new Promise((resolve, reject) => {
     eventService.auth.putDistributeur({
      iddistributeur:body.id_distributeur,
      nom:body.nom,
      telephone:body.telephone,
     })
      .then(resp => {
        console.log(resp)
        resolve(resp.data)
      })
      .catch(err => {
        reject(err)
      })
    })
  }
},
})