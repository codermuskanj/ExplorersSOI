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


function piechart1(place) {
	var spawn = require("child_process").spawn;
	var process = spawn('python',["py/sentiment_analysis.py",place]); 
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ejs' });
});

/* GET about page. */
router.get('/about', function (req, res) {
  res.render('about', { title: 'ejs' })
});

/* GET region page. */
router.get('/destinput/:id', function (req, res) {
	var region = req.params.id.toUpperCase();
  res.render(region, { title: 'ejs' })
});

/* GET city page. */
router.get('/city/:id', function (req, res) {
	var city = req.params.id.toUpperCase();
	console.log(city);
  res.render(city, { title: 'ejs' })
});



/* GET destination page. */
router.get('/destination/:id', function(req, res) {
	//code for search
	/*var input = req.body.ipcity.toLowerCase();*/ 
	var input = capital_letter(req.params.id);
	piechart1(input,200);
	var country = req.query.country.toLowerCase();
	//console.log(country);
	var spot;
	fs.createReadStream('data/data_'+country+'.csv')
	  .pipe(csv())
	  .on('data', (row) => {
	    spot = row['TouristSpot'];
	    if(spot == input){
	    	var city = capital_letter(row['CityName']);
	    var dscrp = row['Description'];
	    var map = row['Maps'];
	    var hotels = row['Hotels'].split(',');;
	    var attract = row['Attractions'].split(',');;
	    var meal = row['Meals'].split(',');;
	    var img = row ['Images'].split(',');
	    //convert img from str to array
	    for (i in img){
	    	img[i] = img[i].substr(2, img[i].length-3);
	    }
	    img[img.length-1] = img[img.length-1].substr(0, img[i].length-1);

	    //convert hotel from str to array
	    for (i in hotels){
	    	hotels[i] = hotels[i].substr(2, hotels[i].length-3);
	    }
	    hotels[hotels.length-1] = hotels[hotels.length-1].substr(0, hotels[i].length-1);

	    //convert attraction from str to array
	    for (i in attract){
	    	attract[i] = attract[i].substr(2, attract[i].length-3);
	    }
	    attract[attract.length-1] = attract[attract.length-1].substr(0, attract[i].length-1);

	    //convert meal from str to array
	    for (i in meal){
	    	meal[i] = meal[i].substr(2, meal[i].length-3);
	    }
	    meal[meal.length-1] = meal[meal.length-1].substr(0, meal[i].length-1);

	    console.log(spot);
	   res.render('spot', { city: city, spot: spot, description: dscrp , img: img, map: map, hotels: hotels, meal: meal, attract: attract})
	    return;
	    }
	  })
  
});


module.exports = router;

