import os
# json for json, much wow
import json
# regex
import re
# this is for the xml to give us all info about the poems we got
import xml.etree.ElementTree as ET
# to pass arguments we need this
from sys import argv
print ('Scanning  for results')

length = 38

data = {}
counter = 0
index = 0
data[index] = []
with open('C:/Damage/savedstdout.txt') as f:
	for line in f:
		if 'receiving data' in line:
			if counter < length:
				data[index].append(line)
				print(line)
				counter+= 1
		counter = 0
