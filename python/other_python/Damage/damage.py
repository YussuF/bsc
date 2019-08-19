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

file = argv

print ('Scanning  for confidence values')

data = {}

counter = 0

confidencesum = 0

lostcounter = 0

with open('C:/Damage/machinedata.json') as f:
	input = json.load(f)
	for elements in input:
		if 'confidence' in elements:
			#print(type(elements['confidence']))
			confidencesum += elements['confidence']
			counter += 1
			#data.append(elements['confidence'])
			#print(elements['confidence'])
			if elements['confidence'] > 0.44836059212 and elements['confidence'] < 0.4491904675960541:
				lostcounter += 1

print('mean confidence:')
print(confidencesum / counter)
print('lost corrections:')
print(lostcounter)