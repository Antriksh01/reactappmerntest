const mongoose = require('mongoose');

const DB = process.env.Database;


mongoose.connect(DB).then(()=>{
    console.log('connection successfull');
}).catch((err)=>
    console.log('error caught')
)