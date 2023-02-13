import { Router } from "express";     
import { getUsers, getOrdenesUser, getOrdenes, postOrden, getOrden, postLogin, validateToken, crearOrden, soapMensaje } from "../controller/taskcontroller.js";

const router = Router();


router.post('/auth', postLogin)

router.get('/users', validateToken, getUsers)

router.get('/ordenes',validateToken ,getOrdenes )

router.get('/ordenes/:id', validateToken, getOrdenesUser)

router.get('/orden/:id', validateToken, getOrden)

router.post('/orden', postOrden)

router.patch('/orden/:id',validateToken, crearOrden)

router.post('/soapReq', soapMensaje)

export default router;
