import pandas as pd, json
from datetime import datetime

Areas = {}
jsonFilename = 'crcJson.json'

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
        try:
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
        except:
          pass
    with open(jsonFilename, 'w') as fp:
      json.dump(Areas, fp)


#get usable date from excel format
def parsedate( date ):
    #date.split(' ')
    return date.strftime('%A')

#get phase of day via time of day
def getLight( light ):
    time = light.split(':')
    hours = int(time[0])
    if (time[1][-2] == 'p'):
      hours += 12
    mins = time[1][0:2]
    hours += float(mins)/60
    if hours < 12:
      return 'Morning'
    elif hours < 17:
      return 'Afternoon'
    elif hours < 20:
      return 'Evening'
    else:
      return 'Night'

pull()
