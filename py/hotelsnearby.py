import requests, json
import csv
from fi11 import get_the_key
api_key = get_the_key
url = "https://maps.googleapis.com/maps/api/place/textsearch/json?"

l=[
'Stonehenge',
'Tower of London',
'The Roman Baths',
'Lake District National Park',
'Canterbury Cathedral',
'Eden Project',
'The Cotswolds',
'Eiffel Tower',
'Louvre Museum',
'Palace of Versailles',
'Mont Saint Michel',
'Provence',
'Chamonix-Mont-Blanc',
'Alsace Villages',
'Suomenlinna Fortress',
'Rovaniemi',
'Northern Lights',
'Turku Castle',
'Porvoo',
'Castle Olavinlinna',
'Hameenlinna',
'Colosseum',
'Venice Canals',
'Pompeii',
'Leaning Tower of Pisa',
'Lake Como',
'Vatican City',
'Capri',
'The Matterhorn',
'Jungfraujoch: The Top of Europe',
'Interlaken',
'Lucerne',
'Lake Geneva',
'Chillon Castle',
'St. Moritz'

]

for i in l:
    city = input("Enter city")
    touristspot= i
    data=[]
    data.append(city)
    data.append(touristspot)
    query = "Hotels near "+ touristspot +" " + city
    r = requests.get(url + 'query=' + query +
                 '&key=' + api_key)
    x = r.json()
    y = x['results']
    l1=[]
    count=0
    for i in range(len(y)):
        count+=1
        print(y[i]['name'])
        if count==6:
            break
        else:
            l1.append(y[i]['name'])
    data.append(l1)

    for i in data:
        print(i)

    with open('tourists1.csv', mode='a', newline='') as csv_file:
        fieldnames = ['CityName', 'TouristSpot', 'Hotels']
        writer = csv.DictWriter(csv_file, fieldnames=fieldnames)
        #writer.writeheader()
        writer.writerow({'CityName': data[0], 'TouristSpot': data[1], 'Hotels':data[2]})

