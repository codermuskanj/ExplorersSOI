from bs4 import BeautifulSoup as soup
from urllib.request import urlopen
from urllib.request import urlopen as uReq
import pandas as pd
import csv
import re
city= input("Enter the city")
touristspot= input("Enter tourist spot")
data=[]
data.append(city)
data.append(touristspot)
place = [item for item in input().split()]
if(len(place)>1):
    q = place[0].capitalize()+"_"+place[1]
else:
    q=place[0].capitalize()

html = urlopen('https://en.wikipedia.org/wiki/'+q)
bs = soup(html, 'html.parser')
images = bs.find_all('img', {'src':re.compile('.jpg')})
list1=[]
for image in images:
    list1.append(image['src'])
if(len(touristspot.strip().split())>1):
    tourist='-'.join(map(lambda x:x.lower(),touristspot.strip().split()))
else:
    tourist=touristspot.lower()
try:
    my_url= 'https://www.incredibleindia.org/content/incredible-india-v2/en/destinations/'+city.lower()+'/'+tourist+".html"
    uClient = uReq(my_url)
    page_html=uClient.read()
    page_soup=soup(page_html,"html.parser")
    description=page_soup.find("div",{"class":"col-12 paragraph text-center read-more-hide"})
    dsp = '.'.join(description.text.split('.')[:-1])+'.'
except:
    print("Invalid Input Provied")
else:
    #print(dsp)
    data.append(dsp)
    data.append(list1)
    print(data[1])
    #####
with open('data_australia.csv', mode='a', encoding="utf-8", newline='') as csv_file:
    fieldnames = ['CityName', 'TouristSpot', 'Description', 'Images']
    writer = csv.DictWriter(csv_file, fieldnames=fieldnames)
    # writer.writeheader()
    writer.writerow({'CityName': data[0], 'TouristSpot': data[1], 'Description': data[2], 'Images': data[3]})
