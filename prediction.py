from datetime import datetime, date, time

activeFilename = 'active.json'
averagesFilename = 'averages.json'
predActiveFilename = 'predictionsNow.json'
predFutureFilename = 'predictionsLater.json'


try:
    with open( activeFilename ) as activefile:        
        activeAreas = json.load( activefile )
        activeAreas[0] = datetime.strptime( activeAreas[0], '%M-%H-%d-%m-%Y' )
except IOError:
    activeAreas = [ datetime( 1970, 1, 1), {} ]

try:
    with open( averagesFilename ) as averagesfile:
        averageAreas = json.load(averagesfile)
except IOError:
    averageAreas = {}
