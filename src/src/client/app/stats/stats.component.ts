import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

declare var moment: any;
/**
 * This class represents the lazy loaded StatsComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-stats',
  templateUrl: 'stats.component.html',
  styleUrls: ['stats.component.css'],
})

export class StatsComponent implements OnInit {

    timesDetailMain: Object = {
      "Morning" : [moment("5:30AM", "HH:mmA"), moment("12:00PM", "HH:mmA")],
      "Afternoon" : [moment("12:00PM", "HH:mmA"),moment("5:00PM", "HH:mmA")],
      "Evening" : [moment("5:00PM", "HH:mmA"),moment("9:00PM", "HH:mmA")],
      "Night" : [moment("9:00PM", "HH:mmA"),moment("11:59PM", "HH:mmA")]
    };


	statsAreas: Array<string> = [];
	selectedArea: string = this.statsAreas[0];

	statsRanges: Array<string> = ["Today", "Month"];
	selectedRange: string = this.statsRanges[0];

	statsDays: Array<string> = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday', 'Sunday'];
	selectedDay: string = this.statsDays[0];

	statsTimes: Array<string> = ["Morning", "Afternoon", "Evening", "Night"];
	selectedTime: string = this.statsTimes[0];
    
	crcJson: Object = {};
	todayJson: Object = {};
	monthJson: Object = {};
    predLaterJson: Object = {};
    averageJson: Object = {};

	chartTitle: string = "";
    lineChart: any = null;

    getData(fileName: string): Promise<any> {
        return this.http.get(fileName)
                   .toPromise()
                   .then(response => response.json())
                   .catch(this.handleError);
    }
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

	constructor(private http: Http){

	}

	ngOnInit() {
 		this.getData("crcJson.json").then(data => {
            this.crcJson = data;

            for (var item in this.crcJson){
            	this.statsAreas.push(item);
            	this.selectedArea = this.statsAreas[0];
            }

     		this.getData("today.json").then(data => {
            	this.todayJson = data;

	     		this.getData("month.json").then(data => {
	            	this.monthJson = data;
	                
                    this.getData("predictionsLater.json").then(data => {
                        this.predLaterJson = data;
                        this.getData("averages.json").then(data => {
                            this.averageJson = data;
                            this.createTodayChart();
                            this.lineChart.resize();
                        }
                    }
				}
			}
		}
	}

    chartOnChange(event: any, type: any) {
        if (type == "Area"){
            this.selectedArea = event;
        } else if (type == "Day") {
            this.selectedDay = event;
        } else if (type == "Time") {
            this.selectedTime = event;
        } else if (type == "Range") {
            this.selectedRange = event;
        } else {
            console.log("Type not recognized");
        }

        this.lineChart.destroy();
        if (this.selectedRange == "Today"){
        	this.createTodayChart();
        } else if (this.selectedRange == "Month"){
			this.createMonthChart();
        }
	}

	createTodayChart(){
		var graphInputData: Array<Object> = [];
        var graphPredData: Array<Object> = [];
        var graphSugMax: Number = 10;

		if (this.selectedArea in this.todayJson){
			if (this.selectedTime in this.todayJson[this.selectedArea]){
				for (var point in this.todayJson[this.selectedArea][this.selectedTime]) {
					var dataPoint = this.todayJson[this.selectedArea][this.selectedTime][point];
					graphInputData.push({x: moment(moment(dataPoint[0], "YYYY-MM-DD HH-mm").format("HH:mmA"), "HH:mmA"), y: dataPoint[1]});
				}
			}
		}
		graphInputData.sort(this.compareTimes);

        if (this.selectedArea in this.predLaterJson){
            if (this.selectedTime in this.predLaterJson[this.selectedArea]){
                for (var point in this.predLaterJson[this.selectedArea][this.selectedTime]) {
                    var dataPoint = this.predLaterJson[this.selectedArea][this.selectedTime][point];

                    graphPredData.push({x: moment(moment(dataPoint[0], "YYYY-MM-DD HH-mm").format("HH:mmA"), "HH:mmA"), y: dataPoint[1]});
                }
            }
        }
        graphPredData.sort(this.compareTimes);

        var tempMax = 0
        if (graphInputData.length != 0){
            graphSugMax = 1.5 * Math.max.apply(Math,graphInputData.map(function(o){return o.y;}));
        }
        if (graphPredData.length != 0){
            tempMax = 1.5 * Math.max.apply(Math,graphPredData.map(function(o){return o.y;}));
        }
        if (graphSugMax < tempMax){
            graphSugMax = tempMax;
        }

        console.log(graphInputData);
        console.log(graphPredData);

		var ctx = document.getElementById("myChart");
        this.lineChart = new Chart(ctx, {
        type: 'line',
        animation: false,
            data: {
                datasets: [
                    {
                        label: "Current",
                        data: graphInputData,
                        backgroundColor: 'rgba(93,165,218, 0.25)',
                        borderColor: 'rgba(93,165,218, 1)',
                        borderWidth: 3,
                        pointBackgroundColor: 'rgba(93,165,218, 1)',
                        pointRadius: 3,
                        fill: true,
                    },
                    {
                        label: "Predicted",
                        data: graphPredData,
                        backgroundColor: 'rgba(93,165,218, 0.1)',
                        borderColor: 'rgba(93,165,218, .8)',
                        borderWidth: 3,
                        pointBackgroundColor: 'rgba(93,165,218, .8)',
                        pointRadius: 3,
                        borderDash: [5,5],
                        fill: true,
                    }


                ]
          },
          options: {
                responsive: true,
                maintainAspectRatio: false,
                title: {
                    display: true,
                    text: this.chartTitle

                },

                scales: {
                    xAxes: [{
                        type: 'time',
                        time: {
                            unit: "hour",
                            displayFormats: {
                                'hour': 'hA'
                            },
                            max: this.timesDetailMain[this.selectedTime][1],
                            min: this.timesDetailMain[this.selectedTime][0]

                        },
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            min: 0,
                            suggestedMax: graphSugMax
                        }
                    }]
                },
         
                legend: {
                    onClick: (e) => e.stopPropagation(),
                    position: "bottom"
                }
          }
      });
	}

	createMonthChart(){
		var graphInputData = {};
		var graphInputArr = {
			"firstDay" : [],
			"secondDay" : [],
			"thirdDay" : [],
			"fourthDay" : [],
			"fifthDay" : []
		};
        var graphSugMax = 10;

		if (this.selectedArea in this.monthJson){
			if (this.selectedDay in this.monthJson[this.selectedArea]){
				if (this.selectedTime in this.monthJson[this.selectedArea][this.selectedDay]){
					// if no series?
					for (var series in this.monthJson[this.selectedArea][this.selectedDay][this.selectedTime]) {
						var dataSeries = this.monthJson[this.selectedArea][this.selectedDay][this.selectedTime][series];
						// if no datapoint?
						var newStr = this.selectedDay + String(series);
						graphInputData[newStr] = []
						for (var dataPoint in dataSeries){

							graphInputData[newStr].push(dataSeries[dataPoint]);
						}
					}
				}
			}
		}

        console.log(graphInputData);

		var counter = 0;
		var graphInputArrKeys = Object.keys(graphInputArr);
		for (var item in graphInputData){
			if (graphInputData[item].length != 0){
				// delete graphInputData[item];
                var dataPoint = {};
				for (var point in graphInputData[item]){
					dataPoint = graphInputData[item][point]
                    if (graphInputArrKeys[counter] != undefined){
                        graphInputArr[graphInputArrKeys[counter]].push({x: moment(moment(dataPoint[0], "YYYY-MM-DD HH-mm").format("HH:mmA"), "HH:mmA"), y: dataPoint[1]});

                    }

                    console.log(5);

				}
				counter = counter + 1;

			}
		}

        var tempGraphSugMax = 0;
        for(var item in graphInputArr){
            graphInputArr[item].sort(this.compareTimes);
            var tempMax = Math.max.apply(Math,graphInputArr[item].map(function(o){return o.y;}));
            if (tempMax > tempGraphSugMax){
                tempGraphSugMax = tempMax;
            }
        }
        if (tempGraphSugMax != 0){
            graphSugMax = 1.5 * tempGraphSugMax;
        }

        console.log(graphSugMax);

		var ctx = document.getElementById("myChart");
        this.lineChart = new Chart(ctx, {
        type: 'line',
            data: {
                // labels: this.randomData1,
                datasets: [
	                {
	                    label: "First " + this.selectedDay,
	                    data: graphInputArr["firstDay"],
	                    backgroundColor: 'rgba(93,165,218, 0.2)',
	                    borderColor: 'rgba(93,165,218, 1)',
	                    borderWidth: 3,
	                    pointBackgroundColor: 'rgba(93,165,218, 1)',
	                    pointRadius: 3,
	                    fill: false,
	                },
                    {
                        label: "Second " + this.selectedDay,
                        data: graphInputArr["secondDay"],
                        backgroundColor: 'rgba(165,218, 93, 0.2)',
                        borderColor: 'rgba(165,218, 93, 1)',
                        borderWidth: 3,
                        pointBackgroundColor: 'rgba(165,218, 93, 1)',
                        pointRadius: 3,
                        fill: false,
                    },
                    {
                        label: "Third " + this.selectedDay,
                        data: graphInputArr["thirdDay"],
                        backgroundColor: 'rgba(93,218, 165, 0.2)',
                        borderColor: 'rgba(93,218, 165, 1)',
                        borderWidth: 3,
                        pointBackgroundColor: 'rgba(93,218, 165, 1)',
                        pointRadius: 3,
                        fill: false,
                    },
                    {
                        label: "Forth" + this.selectedDay,
                        data: graphInputArr["fourthDay"],
                        backgroundColor: 'rgba(218, 165, 93, 0.2)',
                        borderColor: 'rgba(218, 165, 93, 1)',
                        borderWidth: 3,
                        pointBackgroundColor: 'rgba(218, 165, 93, 1)',
                        pointRadius: 3,
                        fill: false,
                    },
                    {
                        label: "Fifth "+ this.selectedDay,
                        data: graphInputArr["fifthDay"],
                        backgroundColor: 'rgba(165, 93, 218, 0.2)',
                        borderColor: 'rgba(165, 93, 218, 1)',
                        borderWidth: 3,
                        pointBackgroundColor: 'rgba(165, 93, 218, 1)',
                        pointRadius: 3,
                        fill: false,
                    },

                ]
          },
          options: {
                responsive: true,
                maintainAspectRatio: false,
                title: {
                    display: true,
                    text: this.chartTitle

                },

                scales: {
                    xAxes: [{
                        type: 'time',
                        time: {
                            unit: "hour",
                            displayFormats: {
                                'hour': 'hA'
                            },
                            max: this.timesDetailMain[this.selectedTime][1],
                            min: this.timesDetailMain[this.selectedTime][0]

                        },
                    }],
                    yAxes: [{
                        type: "linear",
                        ticks: {
                            beginAtZero: true,
                           
                            suggestedMax: graphSugMax
                        },
                        
                    }]
                },
         
                legend: {
                    onClick: (e) => e.stopPropagation(),
                    position: "bottom"
                }
          }
      });
	}
	private compareTimes(a,b){
		if (a.x.isAfter(b.x)){return 1};
		if (a.x.isBefore(b.x)){return -1};
		return 0;
	}
}
