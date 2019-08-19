# -*- coding: iso-8859-1 -*-

# os for traversing files and folderstructures
import os
# json for json, much wow
import json
# regex
import re
counter = 0
confidence_counter = 0.0

with open('C:/Analysing/konfidenz/machinedata.json') as f:
	input = json.load(f)
	for elements in input:
		#print elements['confidence']
		confidence_counter += elements['confidence']
		counter += 1

confidence_mean = confidence_counter / counter
print('Die durchschnittliche konfidenz beträgt: ', confidence_mean)
print(counter)