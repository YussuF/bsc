# -*- encoding: utf-8 -*-

# Usage :
#         first param is the folder you want to have a json for

# os for traversing files and folderstructures
import os
# json for json, much wow
import json
# regex
import re
# this is for the xml to give us all info about the poems we got
import xml.etree.ElementTree as ET
# to pass arguments we need this
from sys import argv
# Our input arguments are in an array called test. much naming.
test = argv
# so you know what you said, wow.
print('Scanning ' + test[1] + ' for Poem-Folders to extract text and infos')
# Our Array for all the folders we want to traverse to get to our json of poem-meta-info
dirs = []
# the argument we passed aka the folder to traverse, now as a variable. 
rootdir = test[1]
# Our temporary data aggregator, an array. Such Surprise.
data = {}
# Now we're getting somewehere. We're iterating over all subdirectories of the folder we gave as an input argument.
for subdir in os.listdir(rootdir):
# We're opening the txt.lab in those dirs to get the timings
  subfolderpath = os.path.join(rootdir, subdir)
  txtfile = os.path.join(subfolderpath, 'txt.lab')
  print(txtfile)
  if os.path.isfile(txtfile):
    with open(txtfile) as f:
      # Initializing new arrays for the data we're about to get
       data[subdir] = {} 
       data[subdir]['lines'] = [] 
       # checking every line of those timing files singularily in this loop
       for line in f:
        # We gotta split, because the poem-timing-files (lab.txts) are of the structure:
        # timestart timeend poemline        aka
        # 1.0005553 1.92333 Dieser Tage
         temp =line.split(' ')
         linetemp = line.partition(' ')
         # after the next line linetemp[2] will be the line of the poem, while temp is filled with the timings.
         # .partition splits into 3 parts : before the seperator, the seperator and after the seperator. So temp[0] and temp[1] (line 35) give us the timings and linetemp[2] gives us the line itself
         linetemp = linetemp[2].partition(' ')
         # We take all this and put it in our data-aggregating structure, creatively named data. We put it there nested with the subdir as the key, so every single poem got its own json inside the big json. 
         data[subdir]['lines'].append({
          'start': temp[0],
          'end': temp[1],
          'line': linetemp[2]
          })
  else:
    print('Missing lab.txt in ' + subfolderpath)
  # Now we gotta parse the xml to get some metadata of the poem
  # We're still in that for subdir loop so we do this for all the subdirs aka poems
  swcpath = os.path.join(subfolderpath, 'swc')
  if os.path.isfile(swcpath):
    tree = ET.parse(swcpath)

  # Tree's gotta have roots, bro.
    root = tree.getroot()

# getting our data-var ready for the data from the xml
    data[subdir]['xml'] = []
# Now, meaty again, we iterate all the fields given in the xml to get the raw data from there. The input was complex, so the code is more complex than it should be too, don't ask me.
    for field in root:
      for line in field:
        # In the end, we just take all the key-value-pairs from the xml and put them into our json (the latter later though). 
        if line.attrib['key'] == "DC.source":
          link = line.attrib['value'].encode('utf-8')
          newlink = re.sub("/lyrikline/gedichtSeiten", "", link)
          data[subdir]['xml'].append({line.attrib['key'].encode('utf-8'): newlink.encode('utf-8')
            })
        else:
          data[subdir]['xml'].append({
            line.attrib['key'].encode('utf-8'): line.attrib['value'].encode('utf-8')
            })
  else:
    print('Missing SWC in ' + subfolderpath)
      #print line.attrib['value']
  #print('-------------------------------------')

#print data['lines']

with open('data.json', 'w') as outfile:  
  try:
    json.dump(data, outfile, ensure_ascii=False)
    print('Operation successful')
  except TypeError:
    print('Something wrong')

