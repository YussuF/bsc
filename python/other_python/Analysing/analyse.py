# -*- coding: iso-8859-1 -*-

# os for traversing files and folderstructures
import os
# json for json, much wow
import json
# regex
import re
correct_counter = 0
confidence_sum = 0
incorrect_counter = 0
incorrect_conf_sum = 0
unknown_counter = 0
real_bad_counter = 0
with open('C:/Analysing/newoutput.json') as f:
	input = json.load(f)
	for elements in input:
		if elements['output']['cat'] == elements['output']['machinecat']:
			correct_counter += 1
			confidence_sum += elements['output']['conf']
		elif elements['output']['cat'] == 'Ellipsen' and elements['output']['machinecat'] == "Ellipsen_Anakoluthe":
			correct_counter += 1
			confidence_sum += elements['output']['conf']
		elif elements['output']['cat'] == 'unchanged':
			correct_counter += 1
			confidence_sum += elements['output']['conf']
		elif elements['output']['machinecat'] == 'UNKNOWN':
			unknown_counter += 1


		else:
			incorrect_counter += 1
			incorrect_conf_sum += elements['output']['conf']

		if elements['output']['cat'] == 'Ellipsen' and elements['output']['machinecat'] != 'Ellipsen_Anakoluthe' or elements['output']['cat'] == 'Ungelesene_Enjambements' and elements['output']['machinecat'] != 'Ungelesene_Enjambements' or elements['output']['cat'] == 'Variabler_Versfuss' and elements['output']['machinecat'] != 'Variabler Versfuß' and elements['output']['machinecat'] != 'Variabler Versfuss' or elements['output']['cat'] == 'Kadenz' and elements['output']['machinecat'] != 'Kadenz' or elements['output']['cat'] == 'Gelesene_Enjambements' and elements['output']['machinecat'] != 'Gelesene_Enjambements' or elements['output']['cat'] == 'Permutation' and elements['output']['machinecat'] != 'Permutation':
				print(elements['output'])
				real_bad_counter += 1
incorrect_conf_mean = incorrect_conf_sum / incorrect_counter
confidence_mean = confidence_sum / correct_counter
print('Anzahl korrekter Klassifikationen: ' , correct_counter)
print('Durchschnittliche Konfidenz korrekter Klassifikationen' , confidence_mean)
print('Anzahl falscher Klassifikationen: ' , incorrect_counter)
print('Durchschnittliche Konfidenz falscher Klassifikationen' , incorrect_conf_mean)
print('Anzahl von als UNKNOWN klassifizierter Gedichte' , unknown_counter)
print('Anzahl falsch klassifizierter Gedichte trotz vorhandener korrekter Klasse' , real_bad_counter)
