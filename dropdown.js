
const express = require('express');
const jsonData = require('./lang/hn.json');
const window = require('window');
const fetch = require("node-fetch");
const navigator = require('navigator');
const { appendFile } = require('fs');
const port = process.env.PORT || 5000;
const dropdown = express();
const dns = require('dns');
let langList = ['en', 'hn', 'jap']
const hn = require("./lang/hn.json")
const en = require("./lang/en.json")
const jap = require("./lang/jap.json")


dropdown.set("view engine", "ejs")

dropdown.use(express.json());
dropdown.use(express.urlencoded());
dropdown.use(express.static('public'));

dropdown.get("/", (req, res) => {
    console.log(req.body);
    const { lang } = req.query
    const langMapper = {
        "en": en,
        "hn": hn,
        "jap": jap
    }

    fetch('https://api.bigdatacloud.net/data/reverse-geocode-client', {
        method: 'GET',
    }).then(res => res.json())
        .catch(error => {
            console.error('Error:', error);
        })
        .then(response => {
            var m = response.countryCode;
            console.log(m)
            const ss = {
                "IN": "hn",
                "JP": "jap",
                "US": "en",
                "GB": "en"
            }
            const thisLang = langMapper[lang] || langMapper[ss[m]]
            res.render("index", { lang: thisLang });

        })


})


dropdown.post('/main', (req, res) => {
    console.log(req.body);
    res.sendFile(__dirname + '/response.html')

})



dropdown.listen(port, () => {
    console.log('server started at http://localhost:${port}')
});