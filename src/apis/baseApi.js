import axios from "axios";
const BASE_API = process.env.REACT_APP_BACKEND_ENDPOINT;
const WWW_BASE_API = process.env.REACT_APP_WWW_BACKEND_ENDPOINT;
const PUBLIC_API = process.env.REACT_APP_BACKEND_ENDPOINT_STATIC;

const getRequest = function (
  url,
  headers1 = {
    // withCredentials: true
  }
) {
  if(localStorage.getItem('token')){
    headers1.Authorization = `Bearer ${localStorage.getItem('token')}`
  }
  return axios.get(`${BASE_API}${url}`, {headers: headers1});
};

const getWWWRequest = function (
  url,
  headers1 = {
    // withCredentials: true
  }
) {
  if(localStorage.getItem('token')){
    headers1.Authorization = `Bearer ${localStorage.getItem('token')}`
  }
  return axios.get(`${WWW_BASE_API}${url}`, {headers: headers1});
};

const postRequest = function (
  url,
  data,
  headers1 = {
    // withCredentials: true,
  }
) {
  if(localStorage.getItem('token')){
    headers1.Authorization = `Bearer ${localStorage.getItem('token')}`
  }
  return axios.post(`${BASE_API}${url}`, data, {headers: headers1});
};

const postWWWRequest = function (
  url,
  data,
  headers1 = {
    // withCredentials: true,
  }
) {
  if(localStorage.getItem('token')){
    headers1.Authorization = `Bearer ${localStorage.getItem('token')}`
  }
  return axios.post(`${WWW_BASE_API}${url}`, data, {headers: headers1});
};

const patchRequest = function (
  url,
  data,
  headers1 = {
    // withCredentials: true
  }
) {
  if(localStorage.getItem('token')){
    headers1.Authorization = `Bearer ${localStorage.getItem('token')}`
  }
  return axios.patch(`${BASE_API}${url}`, data, {headers: headers1});
};

const putRequest = function (
  url,
  data,
  headers1 = {
    // withCredentials: true
  }
) {
  if(localStorage.getItem('token')){
    headers1.Authorization = `Bearer ${localStorage.getItem('token')}`
  }
  return axios.put(`${BASE_API}${url}`, data, {headers: headers1});
};

const putWWWRequest = function (
  url,
  data,
  headers1 = {
    // withCredentials: true
  }
) {
  if(localStorage.getItem('token')){
    headers1.Authorization = `Bearer ${localStorage.getItem('token')}`
  }
  return axios.put(`${WWW_BASE_API}${url}`, data, {headers: headers1});
};

const deleteRequest = function (
  url,
  headers1 = {
    // withCredentials: true,
  }
) {
  if(localStorage.getItem('token')){
    headers1.Authorization = `Bearer ${localStorage.getItem('token')}`
  }
  
  return axios.delete(`${BASE_API}${url}`, {headers: headers1});
};

const deleteWWWRequest = function (
  url,
  headers1 = {
    // withCredentials: true,
  }
) {
  if(localStorage.getItem('token')){
    headers1.Authorization = `Bearer ${localStorage.getItem('token')}`
  }
  
  return axios.delete(`${WWW_BASE_API}${url}`, {headers: headers1});
};

const getStaticPageRequest = function (
  url,
  headers1 = {
    // withCredentials: true
  }
) {
  if(localStorage.getItem('user_token')){
    headers1.Authorization = `Bearer ${localStorage.getItem('user_token')}`
  }
  return axios.get(`${PUBLIC_API}${url}`, {headers: headers1});
};

export {
    getRequest,
    postRequest,
    patchRequest,
    putRequest,
    deleteRequest,
    getStaticPageRequest,
    getWWWRequest,
    putWWWRequest,
    deleteWWWRequest,
    postWWWRequest
};
