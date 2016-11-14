import pandas as pd, json

Areas = {}

#read excel file and build data structure (starting with Areas)
def pull():
	xl = pd.ExcelFile( "crc.xlsx" )
	df = xl.parse( "Survey1" )
	rows = df.iterrows()
	#skip headers, names of columns aren't necessary
	rows.next()
	for row in rows:
		columns = row[1].iteritems()
		date = columns.next()
		time = columns.next()
		#add crc area or append to it
		for cell in columns:
			if cell[0] not in Areas.keys():
				Areas[cell[0]] = {}
			else:
				day = parsedate( date[1] )
				daydict = Areas[cell[0]]
				#add day or append to it
				if day not in daydict.keys():
					daydict[day] = {}
				else:
					lightdict = daydict[day]
					light = getLight( time[1] )
					#add time of day or append to it based on time
					if light not in lightdict.keys():
						lightdict[light] = []
					else:
						time_and_occs = lightdict[light]
						time_and_occs.append( ( time[1], cell[1] ) )




		



#get usable date from excel format
def parsedate( date ):
	return "current date"

#get phase of day via time of day
def getLight( light ):
	return "current light"

pull()