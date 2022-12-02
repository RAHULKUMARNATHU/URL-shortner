const express = require('express');
const path = require('path');

const app = express();
const port = 8000;

const db = require('./config/mongoose');
const ShortUrl = require('./models/shortUrl');

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended:false}))

app.get('/', async(req,res)=>{
    const shortUrls = await ShortUrl.find();
    res.render('index',{shortUrls:shortUrls})
})

app.get('/deleteUrl' ,(req,res)=>{
    // console.log(req.query.url)
    // res.end("<p>Just Checking</p>")
    let id = req.query.id;
    ShortUrl.findByIdAndDelete(id,function(err){
        if(err){
            console.log('error in deleting an object from database');
            return;
        }
        return res.redirect('back')
    });

})


app.post('/shortUrls',async(req,res)=>{
    console.log("shortUrl",ShortUrl)
    await ShortUrl.create({
        full:req.body.fullURL
    })
    res.redirect('/');
})

app.get('/:shortUrl' , async(req,res)=>{
    const shortUrl = await ShortUrl.findOne({short : req.params.shortUrl})
    if(shortUrl == null){
        return res.sendStatus(404);

    }
    shortUrl.clicks++;
    shortUrl.save();
    res.redirect(shortUrl.full)
});



app.listen(port , function(err){
    if(err){
        console.log('Error in Running the server' ,err)
    }
    console.log('Yup! My Express Server is running on Port ' , port )
});