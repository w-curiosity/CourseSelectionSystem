import axios from 'axios'
import Vue from 'vue'

const http = axios.create({
  baseURL: 'http://localhost:3000/'
})

//  request拦截器
http.interceptors.request.use(
  config => {
    console.log(config)
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
//  reponse拦截器
http.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return Promise.resolve(response)
    }
  },
  error => {
    Vue.prototype.$message({
      type:'error',
      message: error.response.data.message})
    return Promise.reject(error)
  }
)

export default http
