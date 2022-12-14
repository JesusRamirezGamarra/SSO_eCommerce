//////////////////////////////////////////////////////////////////////////////////
////         REQUIRE'S 
//////////////////////////////////////////////////////////////////////////////////
// const express = require('express')
// const productRouter = require('./src/Routes/products')
// const cartRouter = require('./src/Routes/cart')

import express from 'express';
import mainRouter from './routes/main.router.js';
import productRouter from './routes/products.router.js';
import cartRouter from './routes/carts.router.js'
import {__dirname,___dirname} from './utils.js';


//////////////////////////////////////////////////////////////////////////////////
////         EXPRESS()
//////////////////////////////////////////////////////////////////////////////////
const app = express()

//////////////////////////////////////////////////////////////////////////////////
////         MIDDLEWARES
//////////////////////////////////////////////////////////////////////////////////
app.use(express.static(__dirname+'/public'));
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//////////////////////////////////////////////////////////////////////////////////
////         ROUTES
//////////////////////////////////////////////////////////////////////////////////

app.use('/api', mainRouter)
app.use('/api/carts', cartRouter)
app.use('/api/products', productRouter)


app.all('*', (req, res) => {
   // { error : -2, descripcion: ruta 'x' método 'y' no implementada}
    res.status(400).json({ error : -2, descripcion: `Route '${req.originalUrl}' method '${req.method}' not implemented.`})
    //res.status(404).json({class:`server`,description: `Route '${req.originalUrl}' method '${req.method}' not implemented.`})
})

//////////////////////////////////////////////////////////////////////////////////
////         SERVER ON PORT
//////////////////////////////////////////////////////////////////////////////////
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
    console.log(`Server running on: http://localhost:${server.address().port}/`)
})
server.on('error', (error) => console.error(`Server error: ${error}`))
//////////////////////////////////////////////////////////////////////////////////