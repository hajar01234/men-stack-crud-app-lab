// imports
const express = require("express") //importing express package
const app = express() // creates a express application
const dotenv = require("dotenv").config() //this allows me to use my .env values in this file
const mongoose = require("mongoose")
const methodOverride = require('method-override')
const morgan = require('morgan')
const Makeup = require("./models/Makeup")






// Middleware
app.use(express.static('public')); //all static files are in the public folder
app.use(express.urlencoded({ extended: false })); // this will allow us to see the data being sent in the POST or PUT
app.use(methodOverride('_method'))
app.use(morgan('dev'))


async function conntectToDB(){ //connection to the database
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected to Database")
    }
    catch(error){
        console.log("Error Occured",error)
    }
}


conntectToDB()

// Routes go here
app.get("/",(req,res)=>{
    res.render("homepage.ejs")
})

//CREATE 
app.get('/makeup/new',(req,res)=>{
    res.render('create-makeup.ejs')
})

app.post('/makeup', async(req,res)=>{
    req.body.isAvailable=req.body.isAvailable==='on'
    console.log(req.body)
    const createMakeup= await Makeup.create({
        name:req.body.name,
        isAvailable: req.body.isAvailable,


    });
    res.redirect("/");
})

//READ

app.get('/makeup', async(req,res)=>{
    const allMakeup = await Makeup.find()
    console.log(allMakeup)
    res.render('makeup-list.ejs',{makeup: allMakeup})
})


app.get('/makeup/:makeupId',async(req,res)=>{
    console.log(req.params.makeupId)
    const fountMakeup= await Makeup.findById(req.params.makeupId)
    res.render('makeup-details.ejs',{makeup: fountMakeup})
})

app.delete('/makeup/:makeupId/delete', async (req,res)=>{
    console.log('DELETE MAKEUP')
    const deleteMakeup= await Makeup.findByIdAndDelete(req.params.makeupId)
    res.redirect('/makeup')

})


app.get('/makeup/:makeupId/edit',async(req,res)=>{
    const fountMakeup= await Makeup.findById(req.params.makeupId)
    res.render('edit-details.ejs',{makeup: fountMakeup})
})

app.put('/makeup/:makeupId',async(req,res)=>{
    req.body.isAvailable=req.body.isAvailable==='on'
    const updatedMakeup= await Makeup.findByIdAndUpdate(req.params.makeupId, req.body)
    res.redirect('/makeup')
})



app.listen(3000,()=>{
    console.log("Listening on port " + 3000)
}) // Listen on port 3000
