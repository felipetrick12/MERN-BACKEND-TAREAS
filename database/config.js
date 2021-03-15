const mongoose = require ('mongoose');
require('dotenv').config({path:'variables.env'});

const dbConection = async ()=> {

    try {
    
      await mongoose.connect(process.env.DB_MONGO, {
            
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex : true,
            useFindAndModify: false
        
        });

        console.log('DB online')


    } catch (error) {
        console.log('error al inicializar base de datos ');
        process.exit(1);
       
    }
}

module.exports = {
    dbConection
}