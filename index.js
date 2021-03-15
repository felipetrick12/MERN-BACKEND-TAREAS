const express = require('express');
const {dbConection} = require('./database/config')


//creando el servidor 
const app = express();

//conectar a la abse de datos 
dbConection();


//se define el puerto, sino encuentra la variable de entorno entonces el puerto 4000
const PORT = process.env.PORT || 4000;

//Definir la pagina principal del
app.get('/',(req, res) => {
    res.send('Hola Mundo')
})

//es para ejecutar la funcion para que escuche los json y los cargue
app.use( express.json() ); 

//importar rutas
app.use( '/api/usuarios',require('./routes/auth')); 


//crear puerto
app.listen(PORT,()=> {
    console.log(`servidor corriendo en el puerto ${PORT}`)
})


