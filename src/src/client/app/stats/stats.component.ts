import { Component, OnInit } from '@angular/core';
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

    // DEFAULT time periods and days (important later on)
    timesDetailMain: Object = {
      "Morning" : [moment("5:30AM", "HH:mmA"), moment("12:00PM", "HH:mmA")],
      "Afternoon" : [moment("12:00PM", "HH:mmA"),moment("5:00PM", "HH:mmA")],
      "Evening" : [moment("5:00PM", "HH:mmA"),moment("9:00PM", "HH:mmA")],
      "Night" : [moment("9:00PM", "HH:mmA"),moment("11:59PM", "HH:mmA")]
    };
    timesMain: Array<String> = ["Morning", "Afternoon", "Evening", "Night"];



    // "stats" bound to html values
    statsAreas: Array<String> = ["Indoor Pool", "Basketball Court", "Outdoor Pool"];
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


    // data for everyday of the week
    // x: time, y : population
    // Real data imported from json will need to be in this format
    // must also be in chronological order
    dataArr24: Object = {
        "Monday" : {
            "Morning" : [
                {x : moment("5:30AM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 }, 
                {x : moment("6:00AM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
                {x : moment("9:35AM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
            ],
            "Afternoon" : [
                {x : moment("1:30PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 }, 
                {x : moment("2:00PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
                {x : moment("4:35PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
            ],
            "Evening" : [
                {x : moment("6:00PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
                {x : moment("8:35PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
            ],
            "Night" : [
                {x : moment("11:30PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 }, 
                {x : moment("9:00PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
                {x : moment("10:35PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
            ]

        },
        "Tuesday" : {
            "Morning" : [
                {x : moment("10:30AM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 }, 
                {x : moment("6:00AM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
                {x : moment("12:00PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
            ],
            "Afternoon" : [
                {x : moment("1:30PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 }, 
                {x : moment("2:00PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
                {x : moment("4:35PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
            ],
            "Evening" : [
                {x : moment("6:00PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
                {x : moment("8:35PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
            ],
            "Night" : [
                {x : moment("11:30PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 }, 
                {x : moment("9:00PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
                {x : moment("10:35PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
            ]

        },
        "Wednesday" : {
            "Morning" : [
                {x : moment("5:30AM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 }, 
                {x : moment("6:00AM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
                {x : moment("9:35AM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
            ],
            "Afternoon" : [
                {x : moment("1:30PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 }, 
                {x : moment("2:00PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
                {x : moment("4:35PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
            ],
            "Evening" : [
                {x : moment("6:00PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
                {x : moment("8:35PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
            ],
            "Night" : [
                {x : moment("11:30PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 }, 
                {x : moment("9:00PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
                {x : moment("10:35PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
            ]

        },
        "Thursday" : {
            "Morning" : [
                {x : moment("5:30AM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 }, 
                {x : moment("6:00AM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
                {x : moment("9:35AM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
            ],
            "Afternoon" : [
                {x : moment("1:30PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 }, 
                {x : moment("2:00PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
                {x : moment("4:35PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
            ],
            "Evening" : [
                {x : moment("6:00PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
                {x : moment("8:35PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
            ],
            "Night" : [
                {x : moment("11:30PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 }, 
                {x : moment("9:00PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
                {x : moment("10:35PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
            ]

        },
        "Friday" : {
            "Morning" : [
                {x : moment("5:30AM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 }, 
                {x : moment("6:00AM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
                {x : moment("9:35AM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
            ],
            "Afternoon" : [
                {x : moment("1:30PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 }, 
                {x : moment("2:00PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
                {x : moment("4:35PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
            ],
            "Evening" : [
                {x : moment("6:00PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
                {x : moment("8:35PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
            ],
            "Night" : [
                {x : moment("11:30PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 }, 
                {x : moment("9:00PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
                {x : moment("10:35PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
            ]

        },
        "Saturday" : {
            "Morning" : [
                {x : moment("5:30AM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 }, 
                {x : moment("6:00AM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
                {x : moment("9:35AM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
            ],
            "Afternoon" : [
                {x : moment("1:30PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 }, 
                {x : moment("2:00PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
                {x : moment("4:35PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
            ],
            "Evening" : [
                {x : moment("6:00PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
                {x : moment("8:35PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
            ],
            "Night" : [
                {x : moment("11:30PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 }, 
                {x : moment("9:00PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
                {x : moment("10:35PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
            ]

        },
        "Sunday" : {
            "Morning" : [
                {x : moment("5:30AM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 }, 
                {x : moment("6:00AM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
                {x : moment("9:35AM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
            ],
            "Afternoon" : [
                {x : moment("1:30PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 }, 
                {x : moment("2:00PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
                {x : moment("4:35PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
            ],
            "Evening" : [
                {x : moment("6:00PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
                {x : moment("8:35PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
            ],
            "Night" : [
                {x : moment("11:30PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 }, 
                {x : moment("9:00PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
                {x : moment("10:35PM", "HH:mmA"), y : Math.floor(Math.random() * 50) + 1 },
            ]

        },
    }

    // graph only displays monday morning data as default
    graphDataArr: Array<any> = [
        this.dataArr24["Monday"]["Morning"],
        [],
        [],
        [],
        [],
        [],
        [],
    ];

    chartTitle: String = "THE FUCKING TITLE";
    title1: String = "Current";
    title2: String = "Predicted";

    // default to monday morning
    minTime = moment("5:30AM", "HH:mmA");
    maxTime = moment("11:59AM", "HH:mmA");



    ngOnInit() {
        this.createChart();
    }

    onChange(newValue: any) {
        this.selectedDevice = newValue;
    }

    // on dropdown change
    chartOnChange(event: any, type: any) {
        if (type == "Days") {
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
        var counter = 0;
        for (var key in this.statsDays){
            if (this.statsDays[key] == true){
                this.graphDataArr[counter] = this.dataArr24[key][this.selectedTimes];
            } else {
                this.graphDataArr[counter] = [];

            }
            counter = counter + 1;
        }

        // must redraw chart after any change in dropdown options
        this.createChart();


    }

    createChart(){

        var ctx = document.getElementById("myChart");
        var myChart = new Chart(ctx, {
        type: 'line',
            data: {
                // labels: this.randomData1,
                datasets: [{
                    label: "Monday",
                    data: this.graphDataArr[0],
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
                    data: this.graphDataArr[1],
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
                    data: this.graphDataArr[2],
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
                    data: this.graphDataArr[3],
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
                    data: this.graphDataArr[4],
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
                    data: this.graphDataArr[5],
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
                    data: this.graphDataArr[6],
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

                },
         
                legend: {
                    onClick: (e) => e.stopPropagation(),
                    position: "bottom"
                }
          }
      });
    }


}
