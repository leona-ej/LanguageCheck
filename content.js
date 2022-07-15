
const express= require('express');
const jsonData= require('./lang/hn.json');
const window= require('window');
const fetch=require("node-fetch");
const navigator= require('navigator');
const { appendFile } = require('fs');
const port= process.env.PORT || 5000;
const dropdown=express();
const dns = require('dns');
let langList=['en','hn','jap']
const hn = require("./lang/hn.json")
const en = require("./lang/en.json")
const jap = require("./lang/jap.json")


dropdown.set("view engine", "ejs")

dropdown.use(express.json());
dropdown.use(express.urlencoded());
dropdown.use(express.static('public'));

dropdown.get("/", (req, res) => {
    console.log(req.body);
    const {lang} = req.query
    const langMapper = {
        "en" :en,
        "hn" :hn,
        "jap": jap
    }
    const thisLang = langMapper[lang] || en
    res.render("index", {lang: thisLang});
})


dropdown.post('/form',(req,res)=>{
  console.log(req.body);
  let lang = req.body.dropdown;
  wrapper(lang);
})



dropdown.listen(port,()=>{
    console.log('server started at http://localhost:${port}')
});