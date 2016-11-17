import pandas as pd, json
from datetime import datetime, date, time

jsonFilename = 'crcJson.json'
dateFilename = 'date.json'
activeFilename = 'active.json'

try:
    with open( jsonFilename ) as areasfile:        
        Areas = json.load( areasfile )
except IOError:
    Areas = {}

try:
    with open( activeFilename ) as activefile:        
        activeAreas = json.load( activefile )
except IOError:
    activeAreas = {}



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
    rows.next()                                           #skip 1st row, names of columns aren't necessary
    
    for row in rows:
        columns = row[1].iteritems()                      #useful info happens to be in [1] index
        rowDate = columns.next()
        skip = False
        time = columns.next()
        
        if isRowValid( rowDate[1], time[1], lastCheck ):       
          for cell in columns:
          	#add crc area or append to it
            if cell[0] not in Areas.keys():
                Areas[cell[0]] = {}
            else:
                weekday = parsedate( rowDate[1] )
                daydict = Areas[cell[0]]
                
                #add day or append to it
                if weekday not in daydict.keys():
                    daydict[weekday] = {}
                else:
                    lightdict = daydict[weekday]
                    light = getLight( time[1] )
                    
                    #add time of day or append to it based on time
                    if light not in lightdict.keys():
                        lightdict[light] = []
                    else:
                        time_and_occs = lightdict[light]
                        time_and_occs.append( ( time[1], cell[1] ) )


    with open( dateFilename, 'w' ) as fp:
        json.dump(addStringToDT( rowDate[1], time[1]).strftime( "%M-%H-%d-%m-%Y" ), fp )
    
    with open( jsonFilename, 'w' ) as fp:
      json.dump( Areas, fp )


#get usable date from excel format
def parsedate( date ):
    return date.strftime( '%A' )

#get phase of day via time of day
def getLight( light ):
    time = light.split( ':' )
    hours = int( time[0] )
    
    if ( time[1][-2] == 'p' ):
      hours += 12
    
    mins = time[1][0:2]
    hours += float( mins )/60
    
    if hours < 12:
      return 'Morning'
    elif hours < 17:
      return 'Afternoon'
    elif hours < 20:
      return 'Evening'
    else:
      return 'Night'

#determine if row in excel file is not from the future, has already been checked, or using bad data types
def isRowValid( rowdate, timestring, lastcheck ):
    return  (   isinstance( timestring, unicode ) and 
                isinstance( rowdate, datetime ) and
                ( addStringToDT( rowdate, timestring ) - lastcheck ).total_seconds() > 0 and
                ( addStringToDT( rowdate, timestring ) - datetime.now() ).total_seconds() <= 0 )

#return a datetime with time data given a datetime object without it and a time formatted as a string
def addStringToDT( rowdate, timestring ):
    splitTime = timestring.split(':')
    hours = int(splitTime[0])
    mins = int(splitTime[1][0:2])
    
    if hours == 12:
        hours = 0
    
    if (splitTime[1][-2] == 'p'):
        hours += 12

    return datetime.combine( rowdate, time( hours, mins ) )

pull()

