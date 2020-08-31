var express = require('express');
var router = express.Router();

const csv = require('csv-parser');
const fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ejs' });
});

router.get('/about', function (req, res) {
  res.render('about', { title: 'ejs' })
});

router.get('/destination', function (req, res) {
  res.render('destinput', { title: 'ejs' })
});

router.post('/destination', function(req, res) {
	var input = req.body.ipcity.toLowerCase();
	console.log(input);
	var spot;
 fs.createReadStream('data.csv')
  .pipe(csv())
  .on('data', (row) => {
    spot = row['TouristSpot'];
    if(spot == input){
    	var city = row['CityName'];
    var dscrp = row['Description'];
    var img = row ['Images'].split(',');
    for (i in img){
    	img[i] = img[i].substr(2, img[i].length-3);
    	console.log(img[i]);
    }
    img[img.length-1] = img[img.length-1].substr(0, img[i].length-1);
    console.log(spot);
    res.render('destination', { city: city, spot: spot, description: dscrp , img: img})
    }
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
    res.render('error', { title: 'ejs' });
  })
});


module.exports = router;
