require('./models/User');
const express =require("express");
const mongoose=require("mongoose");
const bodyParser =require("body-parser");

const authRoutes= require('./routes/authRoutes');
const requireAuth =require('./middlewares/requireAuth');

const app=express();

app.use(bodyParser.json());
app.use(authRoutes);

const mongoUri=
"mongodb+srv://Harry:asdfghjkl@cluster0.qcbai.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose.connect(mongoUri);
mongoose.connection.on("connected",()=>{
    console.log("connect to mongoose");
});
mongoose.connection.on('error',(err)=>{
    console.error("error connecting to mongoes",err);
});
app.get("/", requireAuth,(req, res)=>{
    res.send(` ${req.user.email}`);
});
app.listen(3000,()=>{
    console.log("listening to post 3000");
});