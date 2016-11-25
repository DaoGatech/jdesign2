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

    respData: Object = {};
    dataArr24: Object = {};


    // DEFAULT time periods and days (important later on)
    timesDetailMain: Object = {
      "Morning" : [moment("5:30AM", "HH:mmA"), moment("12:00PM", "HH:mmA")],
      "Afternoon" : [moment("12:00PM", "HH:mmA"),moment("5:00PM", "HH:mmA")],
      "Evening" : [moment("5:00PM", "HH:mmA"),moment("9:00PM", "HH:mmA")],
      "Night" : [moment("9:00PM", "HH:mmA"),moment("11:59PM", "HH:mmA")]
    };
    timesMain: Array<String> = ["Morning", "Afternoon", "Evening", "Night"];



    // "stats" bound to html values
    statsAreas: Array<String> = [];
    statsRange: Array<String> = ["24 hours", "Week", "Month"]
    statsDays = {
        "Monday" : true,
        "Tuesday": false, 
        "Wednesday": false, 
        "Thursday": false, 
        "Friday": false, 
        "Saturday": false, 
        "Sunday": false
    };
    statsDaysKeys = Object.keys(this.statsDays);
    statsTimes: Array<String> = this.timesMain;



    // "selected" bound to the dropdowns
    selectedRange: String = this.statsRange[0];
    selectedDays: String = this.statsDaysKeys[0];
    selectedTimes: String = this.statsTimes[0];
    selectedDevice: String = this.statsAreas[0];


    // data for everyday of the past 24 hrs
    // x: time, y : population
    // Real data imported from json will need to be in this format
    // must also be in chronological order
    // dataArr24: Object = {
    //     "Monday" : {
    //         "Morning" : [
    //             {x : moment("5:30AM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 }, 
    //             {x : moment("6:00AM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
    //             {x : moment("9:35AM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
    //         ],
    //         "Afternoon" : [
    //             {x : moment("1:30PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 }, 
    //             {x : moment("2:00PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
    //             {x : moment("4:35PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
    //         ],
    //         "Evening" : [
    //             {x : moment("6:00PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
    //             {x : moment("8:35PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
    //         ],
    //         "Night" : [
    //             {x : moment("11:30PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 }, 
    //             {x : moment("9:00PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
    //             {x : moment("10:35PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
    //         ]

    //     },
    //     "Tuesday" : {
    //         "Morning" : [
    //             {x : moment("10:30AM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 }, 
    //             {x : moment("6:00AM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
    //             {x : moment("12:00PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
    //         ],
    //         "Afternoon" : [
    //             {x : moment("1:30PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 }, 
    //             {x : moment("2:00PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
    //             {x : moment("4:35PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
    //         ],
    //         "Evening" : [
    //             {x : moment("6:00PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
    //             {x : moment("8:35PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
    //         ],
    //         "Night" : [
    //             {x : moment("11:30PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 }, 
    //             {x : moment("9:00PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
    //             {x : moment("10:35PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
    //         ]

    //     },
    //     "Wednesday" : {
    //         "Morning" : [
    //             {x : moment("5:30AM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 }, 
    //             {x : moment("6:00AM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
    //             {x : moment("9:35AM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
    //         ],
    //         "Afternoon" : [
    //             {x : moment("1:30PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 }, 
    //             {x : moment("2:00PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
    //             {x : moment("4:35PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
    //         ],
    //         "Evening" : [
    //             {x : moment("6:00PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
    //             {x : moment("8:35PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
    //         ],
    //         "Night" : [
    //             {x : moment("11:30PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 }, 
    //             {x : moment("9:00PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
    //             {x : moment("10:35PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
    //         ]

    //     },
    //     "Thursday" : {
    //         "Morning" : [
    //             {x : moment("5:30AM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 }, 
    //             {x : moment("6:00AM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
    //             {x : moment("9:35AM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
    //         ],
    //         "Afternoon" : [
    //             {x : moment("1:30PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 }, 
    //             {x : moment("2:00PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
    //             {x : moment("4:35PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
    //         ],
    //         "Evening" : [
    //             {x : moment("6:00PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
    //             {x : moment("8:35PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
    //         ],
    //         "Night" : [
    //             {x : moment("11:30PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 }, 
    //             {x : moment("9:00PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
    //             {x : moment("10:35PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
    //         ]

    //     },
    //     "Friday" : {
    //         "Morning" : [
    //             {x : moment("5:30AM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 }, 
    //             {x : moment("6:00AM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
    //             {x : moment("9:35AM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
    //         ],
    //         "Afternoon" : [
    //             {x : moment("1:30PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 }, 
    //             {x : moment("2:00PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
    //             {x : moment("4:35PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
    //         ],
    //         "Evening" : [
    //             {x : moment("6:00PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
    //             {x : moment("8:35PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
    //         ],
    //         "Night" : [
    //             {x : moment("11:30PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 }, 
    //             {x : moment("9:00PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
    //             {x : moment("10:35PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
    //         ]

    //     },
    //     "Saturday" : {
    //         "Morning" : [
    //             {x : moment("5:30AM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 }, 
    //             {x : moment("6:00AM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
    //             {x : moment("9:35AM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
    //         ],
    //         "Afternoon" : [
    //             {x : moment("1:30PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 }, 
    //             {x : moment("2:00PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
    //             {x : moment("4:35PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
    //         ],
    //         "Evening" : [
    //             {x : moment("6:00PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
    //             {x : moment("8:35PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
    //         ],
    //         "Night" : [
    //             {x : moment("11:30PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 }, 
    //             {x : moment("9:00PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
    //             {x : moment("10:35PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
    //         ]

    //     },
    //     "Sunday" : {
    //         "Morning" : [
    //             {x : moment("5:30AM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 }, 
    //             {x : moment("6:00AM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
    //             {x : moment("9:35AM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
    //         ],
    //         "Afternoon" : [
    //             {x : moment("1:30PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 }, 
    //             {x : moment("2:00PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
    //             {x : moment("4:35PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
    //         ],
    //         "Evening" : [
    //             {x : moment("6:00PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
    //             {x : moment("8:35PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
    //         ],
    //         "Night" : [
    //             {x : moment("11:30PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 }, 
    //             {x : moment("9:00PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
    //             {x : moment("10:35PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
    //         ]

    //     },
    // }

    // graph displays monday morning data as default
    graphDataArr: Object = {
        "Monday" : [],
        "Tuesday" :[],
        "Wednesday" :[],
        "Thursday" :[],
        "Friday" :[],
        "Saturday" :[],
        "Sunday" :[],
    };

    chartTitle: String = "THE FUCKING TITLE";
    title1: String = "Current";
    title2: String = "Predicted";

    // default to monday morning
    minTime = moment("5:30AM", "HH:mmA");
    maxTime = moment("11:59AM", "HH:mmA");



    constructor(private http: Http){

        this.getData().then(data => {

            this.respData = data;

            for (var area in data){
                this.statsAreas.push(area);

            }
            this.selectedDevice = this.statsAreas[0];
            this.dataArr24 = {};

            // get 24 hr data
            this.setDataSet24(this.statsAreas[0])
            
            // set graph datasets
            this.setGraphDataSet(this.dataArr24);

            // create chart after data is received 
            this.createChart();



        });

        
    }

    getData(): Promise<any> {
        return this.http.get('app/test.txt')
                   .toPromise()
                   .then(response => response.json())
                   .catch(this.handleError);
    }
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    ngOnInit() {


    }


    // on dropdown change
    chartOnChange(event: any, type: any) {
        if (type == "Device"){
            this.selectedDevice = event;
            console.log(event);
            console.log(this.respData);
            console.log(this.respData[event]);

            this.setDataSet24(event);

        } else if (type == "Days") {
            this.selectedDays = event;
        } else if (type == "Times") {
            this.selectedTimes = event;
        } else if (type == "Range") {
            this.selectedRange = event;
        } else {
            console.log("Type not recognized");
        }

        this.minTime = this.timesDetailMain[this.selectedTimes][0];
        this.maxTime = this.timesDetailMain[this.selectedTimes][1];


        // set graph datasets
        this.setGraphDataSet(this.dataArr24);

        // must redraw chart after any change in dropdown options
        this.createChart();


    }

    private setDataSet24(area: string){
        for (var day in this.respData[area]){
            this.dataArr24[day] = {};
            for (var timePeriod in this.respData[area][day]) {
                this.dataArr24[day][timePeriod] = [];

                for (var point in this.respData[area][day][timePeriod]){
                    var d = this.respData[area][day][timePeriod][point];
                    this.dataArr24[day][timePeriod].push({x: moment(d[0],"HH:mmA"), y: Math.round(parseFloat(d[1]))});


                }

            }
        }
        for (day in this.statsDaysKeys){
            if (this.dataArr24[this.statsDaysKeys[day]] == undefined){
                this.dataArr24[this.statsDaysKeys[day]] = [];
            }
        }
    }

    // set data on the graph based array passed in
    private setGraphDataSet(arr: any){
        var counter = 0;
        for (var key in this.statsDays){
            if (this.statsDays[key] == true){
                if (arr[key][this.selectedTimes] !== undefined) {
                    this.graphDataArr[ this.statsDaysKeys[counter] ] = arr[key][this.selectedTimes];
                } else {
                    this.graphDataArr[ this.statsDaysKeys[counter] ] = [];
                }
            } else {
                this.graphDataArr[this.statsDaysKeys [counter] ] = [];

            }
            counter = counter + 1;
        }
    }

    createChart(){

        var ctx = document.getElementById("myChart");
        var myChart = new Chart(ctx, {
        type: 'line',
            data: {
                // labels: this.randomData1,
                datasets: [{
                    label: "Monday",
                    data: this.graphDataArr["Monday"],
                    backgroundColor: [
                        'rgba(0, 0, 255, 0.2)',
                        ],
                    borderColor: [
                        'rgba(0, 0, 255, 1)',
                        ],
                    borderWidth: 3,
                },
                {
                    label: "Tuesday",
                    data: this.graphDataArr["Tuesday"],
                    backgroundColor: [
                        'rgba(0, 255, 0, 0.2)',
                        ],
                    borderColor: [
                        'rgba(0, 255, 0, 1)',
                        ],
                    borderWidth: 3,
                },
                {
                    label: "Wednesday",
                    data: this.graphDataArr["Wednesday"],
                    backgroundColor: [
                        'rgba(255, 0, 0, 0.2)',
                        ],
                    borderColor: [
                        'rgba(255, 0, 0, 1)',
                        ],
                    borderWidth: 3,
                },
                {
                    label: "Thursday",
                    data: this.graphDataArr["Thursday"],
                    backgroundColor: [
                        'rgba(255, 255, 0, 0.2)',
                        ],
                    borderColor: [
                        'rgba(255, 255, 0, 1)',
                        ],
                    borderWidth: 3,
                },
                {
                    label: "Friday",
                    data: this.graphDataArr["Friday"],
                    backgroundColor: [
                        'rgba(0, 255, 255, 0.2)',
                        ],
                    borderColor: [
                        'rgba(0, 255, 255, 1)',
                        ],
                    borderWidth: 3,
                },
                {
                    label: "Saturday",
                    data: this.graphDataArr["Saturday"],
                    backgroundColor: [
                        'rgba(255, 0, 255, 0.2)',
                        ],
                    borderColor: [
                        'rgba(255, 0, 255, 1)',
                        ],
                    borderWidth: 3,
                },
                {
                    label: "Sunday",
                    data: this.graphDataArr["Sunday"],
                    backgroundColor: [
                        'rgba(255, 165, 0, 0.2)',
                        ],
                    borderColor: [
                        'rgba(255, 165, 0, 1)',
                        ],
                    borderWidth: 3,
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
                            max: this.maxTime,
                            min: this.minTime

                        },
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
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


}
