import pandas as pd, json
from datetime import datetime, date, time

jsonFilename = 'crcJson.json'
dateFilename = 'date.json'
currentFilename = 'current.json'

try:
    with open( jsonFilename ) as thisd:        
        Areas = json.load( thisd )
except IOError:
    Areas = {}

try:
    with open( currentFilename ) as moms:        
        currAreas = json.load( moms )
except IOError:
    currAreas = {}

#read excel file and build data structure (starting with Areas)
def pull():
    xl = pd.ExcelFile( "crc.xlsx" )
    df = xl.parse( "Survey1" )
    lastCheck = datetime( 1970, 1, 1 )
    rowDate = datetime( 1970, 1, 1 )
    try:
        with open( dateFilename, 'r' ) as fp:
            lastCheck = fp.read()[1:-1]
            lastCheck = datetime.strptime( lastCheck, '%M-%H-%d-%m-%Y' )
    except IOError:
        lastCheck = datetime( 1970, 1, 1 )
    rows = df.iterrows()
    #skip headers, names of columns aren't necessary
    rows.next()
    for row in rows:
        columns = row[1].iteritems()
        rowDate = columns.next()
        fuckit = False
        time = columns.next()
        if not isinstance(time[1], unicode) or not isinstance(rowDate[1], datetime):
            fuckit = True
        if not fuckit and isRowValid( rowDate[1], time[1], lastCheck ):
        #add crc area or append to it
          for cell in columns:
            if cell[0] not in Areas.keys():
                Areas[cell[0]] = {}
            else:
                day = parsedate( rowDate[1] )
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


    with open(dateFilename, 'w') as fp:
        json.dump(addStringToDT(rowDate[1], time[1]).strftime("%M-%H-%d-%m-%Y"), fp)
    with open(jsonFilename, 'w') as fp:
      json.dump(Areas, fp)


#get usable date from excel format
def parsedate( date ):
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

def isRowValid( rowdate, timestring, lastcheck ):
    newRow = ( addStringToDT( rowdate, timestring ) - lastcheck ).total_seconds()
    notTooNewRow = ( addStringToDT( rowdate, timestring ) - datetime.now() ).total_seconds()

    return newRow > 0 and notTooNewRow <= 0

def addStringToDT( rowdate, timestring ):
    newTime = timestring.split(':')
    hours = int(newTime[0])
    if hours == 12:
        hours = 0
    if (newTime[1][-2] == 'p'):
        hours += 12
    mins = int(newTime[1][0:2])

    return datetime.combine( rowdate, time( hours, mins ) )

pull()

