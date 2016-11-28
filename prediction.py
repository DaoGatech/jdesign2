from datetime import datetime, date, time, timedelta
import json, math

activeFilename = 'src/src/client/active.json'
averagesFilename = 'src/src/client/averages.json'
predActiveFilename = 'src/src/client/predictionsNow.json'
predFutureFilename = 'src/src/client/predictionsLater.json'

MINUTESBEFOREPREDICT = 30
MINUTESAFTERNOCURRENT = 150
IGNOREHISTHOURS = 2

curTime = datetime.now()

predActiveDict = {}
predFutureDict = {}

def refresh():
	curTime = activeAreas[0] + timedelta(seconds = 60 * (MINUTESBEFOREPREDICT + 50))
	if (curTime > (activeAreas[0] + timedelta(seconds = 60*MINUTESBEFOREPREDICT))):
		for area in activeAreas[1].keys():
			predActiveDict[area] = predict(area, (curTime - activeAreas[0]), curTime)
	else:
		for area in activeAreas[1].keys():
			predActiveDict[area] = activeAreas[1][area]
	with open(predActiveFilename, 'w') as PAF:
		json.dump(predActiveDict, PAF)

def predict(area, updateLag, predictTime):
	updateLagMin = updateLag.total_seconds()/60 - MINUTESBEFOREPREDICT
	MINUTEWEIGHTINGDIFF = MINUTESAFTERNOCURRENT - MINUTESBEFOREPREDICT
	dayOfWeek = parsedate(predictTime)
	histPred = ceil(histAvg(averageAreas[area][dayOfWeek], predictTime))
	if (updateLagMin > MINUTESAFTERNOCURRENT):
		return histPred
	recentDataWeight = (MINUTEWEIGHTINGDIFF - updateLagMin)/MINUTEWEIGHTINGDIFF
	return math.ceil(activeAreas[1][area] * recentDataWeight + histPred * (1 - recentDataWeight))


def histAvg(avgDict, predictTime):
	leftPtr = 0
	rightPtr = 24
	leftVal = 0
	rightVal = 0
	predTimeOfDay = int(predictTime.strftime("%H")) + float(predictTime.strftime("%M"))/60

	for time in avgDict.keys():
		formTime = strToTime(time)
		if (formTime < predTimeOfDay and formTime > leftPtr):
			leftPtr = formTime
			leftVal = avgDict[time]
		if (formTime > predTimeOfDay and formTime < rightPtr):
			rightPtr = formTime
			rightVal = avgDict[time]

	if (leftPtr == 0 or (leftPtr + IGNOREHISTHOURS) < predTimeOfDay):
		leftVal = 0
	if (rightPtr == 24 or (rightPtr - IGNOREHISTHOURS) > predTimeOfDay):
		rightVal = 0

	leftDiff = predTimeOfDay - leftPtr
	rightDiff = rightPtr - predTimeOfDay
	totalDiff = leftDiff + rightDiff

	return (rightDiff*leftVal/totalDiff + leftDiff*rightVal/totalDiff)

def parsedate( date ):
    return date.strftime( '%A' )

def strToTime(timeString):
    time = timeString.split( ':' )
    hours = int( time[0] )
    
    if ( time[1][-2] == 'p' ):
      hours += 12
    
    mins = time[1][0:2]
    return (hours + float( mins )/60)

try:
    with open( activeFilename ) as activefile:        
        activeAreas = json.load( activefile )
        activeAreas[0] = datetime.strptime( activeAreas[0], '%Y-%m-%d %H-%M' )
except IOError:
    activeAreas = [ datetime( 1970, 1, 1), {} ]

try:
    with open( averagesFilename ) as averagesfile:
        averageAreas = json.load(averagesfile)
except IOError:
    averageAreas = {}


refresh()