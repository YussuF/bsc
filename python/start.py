# -*- encoding: utf-8 -*-

# Usage :
#         first param is the folder you want to have a json for
# os for traversing files and folderstructures
import os
# json for json, much wow
import json
# this is for the xml to give us all info about the poems we got
import xml.etree.ElementTree as ET
# to pass arguments we need this
from sys import argv
# Our input arguments are in an array called test. much naming.
test = argv
# so you know what you said, wow.
print(test)
# Our Array for all the folders we want to traverse to get to our json of poem-meta-info
dirs = []
# the argument we passed aka the folder to traverse, now as a variable. 
rootdir = test[1]
# Our temporary data aggregator, an array. Such Surprise.
data = {}
# Now we're getting somewehere. We're iterating over all subdirectories of the folder we gave as an input argument.
for subdir in os.listdir(rootdir):
# We're opening the txt.lab in those dirs to get the timings
  with open(rootdir + '/' + subdir + '/txt.lab') as f:
    # Making new arrays for the data we're about to get
     data[subdir] = {} 
     data[subdir]['lines'] = [] 
     
     for line in f:
       temp =line.split(' ')
       linetemp = line.partition(' ')
       linetemp = linetemp[2].partition(' ')
       data[subdir]['lines'].append({
        'start': temp[0],
        'end': temp[1],
        'line': linetemp[2]
        })

  tree = ET.parse('swc')
  root = tree.getroot()

  #print('-------------------------------------')
  #print('fields:')
  data[subdir]['xml'] = []
  for field in root:
    for line in field:
      data[subdir]['xml'].append({
        line.attrib['key'].encode('utf-8'): line.attrib['value'].encode('utf-8')
        })
      #print line.attrib['value']
  #print('-------------------------------------')

#print data['lines']

with open('data.json', 'w') as outfile:  
  try:
    json.dump(data, outfile, ensure_ascii=False)
    print('Operation successful')
  except TypeError:
    print('Something wrong')