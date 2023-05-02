const mongoose=require("mongoose")
function connectDB(){
    mongoose.connect("mongodb+srv://ajUser:ajaydeepak@atlascluster.p9aj3ar.mongodb.net/vehi",{useUnifiedTopology: true,useNewUrlParser: true})
    const connection=mongoose.connection
    connection.on('connected',()=>{
        console.log("Connection Successful")
    })
    connection.on('error',()=>{
        console.log("Connection Failed")
    })
}
connectDB()
module.exports=mongoose
