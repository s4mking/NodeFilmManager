import axios from 'axios'


const apiClient = axios.create({
    baseURL: 'http://localhost:3000/api/',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.token
      }
})


export default {
    auth: {
        userLogin(payload) {
            return apiClient.post('/users/login',payload)
        },
        getFilms(payload) {
            return apiClient.get('/films?offset='+payload.offset,payload)
        },
        removeFilm(payload) {
            console.log(payload)
            return apiClient.delete('/films/'+payload.requestedId, payload)
        },
        getFilm(payload) {
            return apiClient.get('/films/'+payload.currentRoute,payload)
        },
        putFilm(payload) {
            console.log(payload)
            return apiClient.put('/films/'+payload.idfilm,payload)
        },
        getDistributeurs(payload) {
            return apiClient.get('/distributeurs?offset='+payload.offset,payload)
        },
        removeDistributeur(payload) {
            console.log(payload)
            return apiClient.delete('/distributeurs/'+payload.requestedId, payload)
        },
        getDistributeur(payload) {
            return apiClient.get('/distributeurs/'+payload.currentRoute,payload)
        },
        putDistributeur(payload) {
            console.log(payload)
            return apiClient.put('/distributeurs/'+payload.iddistributeur,payload)
        },
    }
}