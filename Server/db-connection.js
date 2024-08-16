const mongoose = require('mongoose')
mongoose.connect("mongodb://127.0.0.1:27017/Management")
const db=mongoose.connection
db.on('err',console.error.bind(console,"connection error"))
db.once('open',()=>{
    console.log("Connection Sucessfull");
})
module.exports=db