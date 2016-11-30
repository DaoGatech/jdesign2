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
    respPredData: Object = {};
    dataArrToday: Object = {};
    days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

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
    statsRange: Array<String> = ["Today", "Week", "Month"];
    statsDays = {
        "Monday" : false,
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
    // predictions to display on graph
    graphPredArr = [];

    chartTitle: String = "";
    title1: String = "Current";
    title2: String = "Predicted";

    chartShowLegend: boolean = false;
    
    // default to monday morning
    minTime = moment("5:30AM", "HH:mmA");
    maxTime = moment("12:00PM", "HH:mmA");



    constructor(private http: Http){
        var fileName = "crcJson.json";
        this.getData(fileName).then(data => {
            this.respData = data;
            for (var area in data){
                this.statsAreas.push(area);

            }
            this.selectedDevice = this.statsAreas[0];

            // get 24 hr data
            this.setDatasetToday(this.statsAreas[0])
            
            // set graph datasets after data is received 
            this.setGraphDataSet(this.dataArrToday);
            this.setPredictions();

            // create chart after data is received 
            this.createChart();



        });
        var fileName = "predictionsLater.json";
        this.getData(fileName).then(data => {
            this.respPredData = data;
        }
    }
    
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


    ngOnInit() {
        var d = new Date();
        var n = d.getDay();
        this.statsDays[this.days[n]] = true;
    }


    // on dropdown change
    chartOnChange(event: any, type: any) {
        if (type == "Device"){
            this.selectedDevice = event;
            this.setDatasetToday(event);

        } else if (type == "Days") {
            this.selectedDays = event;
        } else if (type == "Times") {
            this.selectedTimes = event;
        } else if (type == "Range") {
            this.selectedRange = event;
            this.chartShowLegend = true;
            if(this.selectedRange == 'Today') {
                this.modifyStatsDays();
                this.chartShowLegend = false;
            }
            //console.log(this.selectedRange);
        } else {
            console.log("Type not recognized");
        }

        this.minTime = this.timesDetailMain[this.selectedTimes][0];
        this.maxTime = this.timesDetailMain[this.selectedTimes][1];

        // set graph datasets
        this.setGraphDataSet(this.dataArrToday);
        this.setPredictions();

        // console.log(this.graphDataArr);

        // must redraw chart after any change in dropdown options
        this.createChart();


    }
    
    private modifyStatsDays() {
        var d = new Date();
        var n = d.getDay();
        this.statsDays[this.days[n]] = true;                
        for (var day in this.statsDays){
            if (day != this.days[n]){
                this.statsDays[day] = false;
            }
        }
    }

    private setDatasetToday(area: string){
        for (var day in this.respData[area]){
            this.dataArrToday[day] = {};
            for (var timePeriod in this.respData[area][day]) {
                this.dataArrToday[day][timePeriod] = [];

                for (var point in this.respData[area][day][timePeriod]){
                    var d = this.respData[area][day][timePeriod][point];
                    var dataDate = moment(d[0],"YYYY-MM-DD HH-mm");
                    var currentDay = moment();
                    var yesterday = moment().subtract(1,"days");

                    if (dataDate.isSameOrBefore(currentDay, "day") && dataDate.isAfter(yesterday, "day")){
                        // console.log(moment(d[0],"YYYY-MM-DD HH-mm").format("YYYY-MM-DD HH-mm")); 
                        // console.log(this.respData[area][day][timePeriod][point], area, day, timePeriod, point);
                        this.dataArrToday[day][timePeriod].push({x: moment(moment(d[0],"YYYY-MM-DD HH-mm").format("hh:mmA"), "hh:mmA"), y: Math.round(parseFloat(d[1]))});

                    }


                }

            }
        }
        for (day in this.statsDaysKeys){
            if (this.dataArrToday[this.statsDaysKeys[day]] == undefined){
                this.dataArrToday[this.statsDaysKeys[day]] = [];
            }
        }
    }

    private setPredictions(){
        this.graphPredArr = [];
        if (this.selectedTimes in this.respPredData[this.selectedDevice]){

            var temp = this.respPredData[this.selectedDevice][this.selectedTimes]
            for (var item in temp) {
                // if the item is before the start of the selected time period
                // e.g. 4:30am should not be pushed to Morning, which starts at 5:30am
                if ( moment(temp[item][0],"YYYY-MM-DD HH-mm").isAfter(this.timesDetailMain[this.selectedTimes][0]) ){
                    this.graphPredArr.push({x: moment(moment(temp[item][0],"YYYY-MM-DD HH-mm").format("hh:mmA"), "hh:mmA"), y: Math.round(parseFloat(temp[item][1]))})
                }
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
                    backgroundColor: 'rgba(93,165,218, 0.2)',
                    borderColor: 'rgba(93,165,218, 1)',
                    borderWidth: 3,
                },
                {
                    label: "Tuesday",
                    data: this.graphDataArr["Tuesday"],
                    backgroundColor: 'rgba(250,164,58, 0.2)',
                    borderColor: 'rgba(250,164,58, 1)',
                    borderWidth: 3,
                },
                {
                    label: "Wednesday",
                    data: this.graphDataArr["Wednesday"],
                    backgroundColor: 'rgba(96,189,104, 0.2)',
                    borderColor: 'rgba(96,189,104, 1)',
                    borderWidth: 3,
                },
                {
                    label: "Thursday",
                    data: this.graphDataArr["Thursday"],
                    backgroundColor: 'rgba(241,124,176, 0.2)',
                    borderColor: 'rgba(241,124,176, 1)',
                    borderWidth: 3,
                },
                {
                    label: "Friday",
                    data: this.graphDataArr["Friday"],
                    backgroundColor: 'rgba(178,145,47, 0.2)',
                    borderColor: 'rgba(178,145,47, 1)',
                    borderWidth: 3,
                },
                {
                    label: "Saturday",
                    data: this.graphDataArr["Saturday"],
                    backgroundColor: 'rgba(178,118,178, 0.2)',
                    borderColor: 'rgba(178,118,178, 1)',
                    borderWidth: 3,
                },
                {
                    label: "Sunday",
                    data: this.graphDataArr["Sunday"],
                    backgroundColor: 'rgba(241,88,84, 0.2)',
                    borderColor: 'rgba(241,88,84, 1)',
                    borderWidth: 3,
                },
                {
                    label: "Predicted",
                    data: this.graphPredArr,
                    fill: true,
                    backgroundColor: 'rgba(241,88,84, 0.2)',
                    borderColor: 'rgba(241,88,84, 1)',
                    borderWidth: 3,
                    pointBackgroundColor: 'rgba(241,88,84, 1)',
                    pointRadius: 3
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
                    position: "bottom",
                    display: this.chartShowLegend,
                }
          }
      });
    console.log(myChart.generateLegend());
    }


}
