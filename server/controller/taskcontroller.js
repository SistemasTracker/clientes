import { pool } from "../db.js";
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const jwt = require('jsonwebtoken');
require('dotenv').config();

export const getUsers = async (req, res) => {
    try {
        const [result] = await pool.query("Select * from usuariosOrden");
        console.log(result);
        res.send(result);  
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

export const postLogin = async (req,res) => {
    try {
        const{name,password} = req.body;
        const [result] = await pool.query('Select * from usuariosOrden where name = ? and password = ?',
        [name,password]
        );
        if(result[0].name === name && result[0].password === password){
            const user = {name:name, password:password};
            const accessToken = generateAccessToken(user);
            const datos={
                "user": name,
                "mensaje": "USER AUTENTICADO",
                "admin": result[0].admin,
                "id" : result[0].idusuariosOrden  
            };
            let ndatos = {...datos,accessToken};
            res.status(200).json(ndatos);

         }else{
             return "NO SE ENCUENTRA EL USUARIO";
        }
    
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}


function generateAccessToken(user){
    return jwt.sign(user,'trackerX', {expiresIn: '2h'})
}

export function validateToken(req,res,next){
    const accessToken = req.headers['authorization'];
    if(!accessToken) res.send('Acceso Denegado');
    jwt.verify(accessToken, 'trackerX', (err, user)=>{
        if(err){
            res.send('Acceso denegado, token expired or incorrect');
        }else{
            next();
        }
    })
}
export const getOrdenes = async(req, res) => {
    try {
        const [result] = await pool.query("(Select idordenTrabajo, DATE_FORMAT(fecha,'%d-%m-%Y') as fecha,nombreCliente,vendedor,direccion,telefono1,email,nombreEmergencia,telefono2,correoEmergencia,chasis,motor,marca,modelo,placa,color,idusuario,plan,financiera,estado,anio,local,valor,facturaNombre,ruc from ordenTrabajo ORDER BY idordenTrabajo DESC)");
        //console.log(result);
        res.send(result); 
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
  
}

export const getOrden = async (req, res) => {
    try {
        const [result] = await pool.query("(Select idordenTrabajo, DATE_FORMAT(fecha,'%d-%m-%Y') as fecha,nombreCliente,vendedor,direccion,telefono1,email,nombreEmergencia,telefono2,correoEmergencia,chasis,motor,marca,modelo,placa,color,idusuario,plan,financiera,estado,anio,local,valor,facturaNombre,ruc from ordenTrabajo where idordenTrabajo=?)", 
        [req.params.id]);
        if(result.length === 0 ) {
            return res.status(404).json({message: "ORDEN DE TRABAJO NO ENCONTRADA"});
        }
        res.send(result[0]); 
    } catch (error) {
        return res.status(500).json({message: error.message});
    }

}

export const postOrden = async (req, res) => {

    try {
        console.log(req.body);
        const {fecha,nombreCliente,vendedor,direccion,telefono1,email,nombreEmergencia,telefono2,correoEmergencia,chasis,motor,marca,modelo,placa,color,idusuario,plan,financiera,anio,local,valor,facturaNombre,ruc} = req.body;
        const result = await pool.query("INSERT INTO ordenTrabajo(fecha,nombreCliente,vendedor,direccion,telefono1,email,nombreEmergencia,telefono2,correoEmergencia,chasis,motor,marca,modelo,placa,color,idusuario,plan,financiera,anio,local,valor,facturaNombre,ruc) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [
            fecha,nombreCliente,vendedor,direccion,telefono1,email,nombreEmergencia,telefono2,correoEmergencia,chasis,motor,marca,modelo,placa,color,idusuario,plan,financiera,anio,local,valor,facturaNombre,ruc
    ]);
        console.log(result);
        res.send("insertando orden"); 
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
  
    
}

export const crearOrden = async (req, res) => {
    try {
        const {estado} = req.body;
        const [result] = await pool.query("Update ordenTrabajo set estado=? where idordenTrabajo=?", 
    [estado, req.params.id]);
    if(result.length === 0 ) {
        return res.status(404).json({message: "ORDEN NO CREADA"});
    }
    res.send(result); 
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

export const getOrdenesUser = async (req, res) => {

    try {
        const [result] = await pool.query("(Select idordenTrabajo, DATE_FORMAT(fecha,'%d-%m-%Y') as fecha,nombreCliente,vendedor,direccion,telefono1,email,nombreEmergencia,telefono2,correoEmergencia,chasis,motor,marca,modelo,placa,color,idusuario,plan,financiera,estado from ordenTrabajo where idusuario=?)", 
    [req.params.id]);
    if(result.length === 0 ) {
        return res.status(404).json({message: "ORDEN DE TRABAJO NO ENCONTRADA"});
    }
    res.send(result); 
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
    
}
