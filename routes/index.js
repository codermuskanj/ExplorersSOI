var express = require('express');
var router = express.Router();

const csv = require('csv-parser');
const fs = require('fs');

function capital_letter(str){
    str = str.split(" ");
    for (var i = 0, x = str.length; i < x; i++){
        str[i] = str[i][0].toUpperCase() + str[i].substr(1);
    }
    return str.join(" ");
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ejs' });
});

router.get('/about', function (req, res) {
  res.render('about', { title: 'ejs' })
});

router.get('/destinput', function (req, res) {
  res.render('INDIA', { title: 'ejs' })
});

router.get('/city/:id', function (req, res) {
	var city = req.params.id.toUpperCase();
	console.log(city);
  res.render(city, { title: 'ejs' })
});

router.get('/destination/:id', function(req, res) {
	//code for search
	/*var input = req.body.ipcity.toLowerCase();*/ 
	var input = capital_letter(req.params.id);
	var spot;
	fs.createReadStream('data.csv')
	  .pipe(csv())
	  .on('data', (row) => {
	    spot = row['TouristSpot'];
	    if(spot == input){
	    	var city = capital_letter(row['CityName']);
	    var dscrp = row['Description'];
	    var img = row ['Images'].split(',');
	    for (i in img){
	    	img[i] = img[i].substr(2, img[i].length-3);
	    }
	    img[img.length-1] = img[img.length-1].substr(0, img[i].length-1);
	    console.log(spot);
	    res.render('destination', { city: city, spot: spot, description: dscrp , img: img})
	    return;
	    }
	  })
  
});


module.exports = router;

