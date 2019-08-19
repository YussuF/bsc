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

cats = '{"Cat1":"Prosagedicht","Cat2":"Langzeiler","Cat3":"Reihungsstil","Cat4":"Kadenz","Cat5":"Litanei","Cat6":"Loops","Cat7":"Parlando","Cat8":"Variabler Versfuß","Cat9":"Stanze", "Cat10": "Sprungrhythmus", "Cat11": "Synkopen", "Cat12":  "Flows", "Cat13": "Freie Assoziation" , "Cat14" : "Hakenstil", "Cat15" : "Gestischer Rhythmus" , "Cat16" : "Montagen" , "Cat17" : "Cut-ups" , "Cat18" : "Ellipsen", "Cat19" : "Stakkato" , "Cat20" : "Permutation", "Cat21" : "Rubato", "Cat22" : "Syllabische Dekomposition", "Cat23" : "Lettristische Dekomposition","Cat24":"Trochaeus","Cat25":"Jambus","Cat26":"Prolepse","Cat27":"Sapphische Strophe","Cat28":"D","Cat29":"Freie Dissoziation","Cat30":"Hypotaxen","Cat31":"Dialektgedicht","Cat32":"Listengedicht","Cat33":"Mittelachsenlyrik","Cat34":"Anaphora","Cat35":"Daktylus"}'


counter = 0

categorydict = json.loads(cats)


with open ('C:/Damage/new/newer/output2.json') as f:
	input = json.load(f)
	with open('C:/Damage/converting/machinedata.json') as g:
		machinedata = json.load(g)
		for elements in input:
			#print(type(input[counter]['output']['cat']))
			# changing the id from bad numbers to actual titles
			temp_poem_id = elements['output']['poem_id']
			#print(temp_poem_id)
			input[counter]['output']['poem_id'] = machinedata[temp_poem_id]['id']
			
			# checking the cat field. if it starts with cat, change it to the real catname
			#print(input[counter]['output']['cat'])
			#print(input[counter]['output']['cat'].find("Cat"))
			if input[counter]['output']['cat'].find("Cat") == 0 :
				#print(input[counter]['output']['cat'])
				temp_cat = input[counter]['output']['cat']
				#print(temp_cat)
				input[counter]['output']['cat'] = categorydict[input[counter]['output']['cat']]
				if "Variabler" in input[counter]['output']['cat']:
					input[counter]['output']['cat'] = "Variabler Versfuss"

				#print('now its nice:')
				#print(input[counter]['output']['cat'])
				print(input[counter]['output']['cat'])
			# now for the machinecat, this is a new field
			
			input[counter]['output']['machinecat'] = machinedata[temp_poem_id]['class']
			#input[counter]['output']['machinecat'].encode('utf-8')
			#print(input[counter]['output']['machinecat'])

			# last new field, confidence
			input[counter]['output']['conf'] = machinedata[temp_poem_id]['confidence']
			#print(input[counter]['output']['conf'])
			
			# now to remove all the bad weight from the cat-array

			input[counter]['output'].pop("categories")

			#print(input[counter]['output'])
			counter +=1
			#break

print(input)
		#	data = '{"output":'
		#	temp = [machinedata[926]['id'],machinedata[926]['class'],elements['output']['cat'], str(machinedata[926]['confidence'])]
		#	print(elements['output']['poem_id'])
		#	print(elements['output']['cat'])
		#	print(machinedata[926]['id'])
		#	print(machinedata[926]['confidence'])
		#	print(machinedata[926]['class'])
		#	print('result')
		#	print(type(temp))
		#	print(json.dumps(temp))
		#	data+=('')
		#	data.join(temp)
		#	data.join("},")
			

with open('newoutput.json', 'w') as outfile:  
  try:
    json.dump(input, outfile)
    print('Operation successful')
  except TypeError:
    print('Something wrong')