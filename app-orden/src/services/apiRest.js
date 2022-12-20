import axios from 'axios'; 
const url = "https://tracker-clientes.onrender.com/";


export const getOrden = async(token)=> 
    await axios.get(url+'ordenes',{headers:{'Authorization': `${token}`}})
    

export const authLogin = async (login) =>   
   await axios.post(url+'auth', login)


export const crearOrden = async (orden) =>
    await axios.post(url+'orden', orden)


export const getOrdenId = async (id,token) =>
    await axios.get(url+`orden/${id}`, {headers:{'Authorization': `${token}`}})


export const getOrdenUserId = async (id,token) =>
    await axios.get(url+`ordenes/${id}`, {headers:{'Authorization': `${token}`}})


export const getUsuarios = async (token) =>
    await axios.get(url+'users', {headers:{'Authorization': `${token}`}})


export const updateEstado = async (estado,id,token) =>
    await axios.patch(url+`orden/${id}`,{estado:estado},{ headers:{'Authorization':`${token}`}})