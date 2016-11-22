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
  moduleId: module.id
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


    // "stats" bound to html select values
    statsAreas: Array<String> = ["Indoor Pool", "Basketball Court", "Outdoor Pool"];
    // statsMonths: Array<String> = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    statsRange: Array<String> = ["24 hours", "Week", "Month"]
    statsDays: Array<String> = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    
    // statsTimes affects what will show up in graphTimesDetail
    // set statsTimes and graphTimesDetail default values here
    statsTimes: Array<String> = this.timesMain;
    graphTimesDetail: Object = this.timesDetailMain;

    // "selected" bound to the dropdowns
    selectedRange: String = this.statsRange[0];
    selectedDays: String = this.statsDays[0];
    selectedTimes: String = this.statsTimes[0];
    selectedDevice = 'Indoor Pool';


    randomData: Array<any> = [
        moment("4:30AM", "HH:mmA"), 
        moment("5:00AM", "HH:mmA"),
        moment("6:35AM", "HH:mmA"), 
        moment("7:07AM", "HH:mmA"), 
        moment("8:03AM", "HH:mmA"), 
        moment("9:33AM", "HH:mmA"), 
        moment("12:00PM", "HH:mmA"), 
    ];

    randomData2: Array<number> = [10, 20, 25, 30, 27, 12, 3];

    chartTitle: String = "THE FUCKING TITLE";
    title1: String = "Current";
    title2: String = "Predicted";

    // default to monday morning
    minTime = moment("5:30AM", "HH:mmA");
    maxTime = moment("11:59AM", "HH:mmA");



    // checkboxes
      options = [
        {name:'OptionA', value:'1', checked:true},
        {name:'OptionB', value:'2', checked:false},
        {name:'OptionC', value:'3', checked:true}
      ]

      get selectedOptions() { // right now: ['1','3']
        return this.options
                  .filter(opt => opt.checked)
                  .map(opt => opt.value)
      }
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

            // used to set the time period and day at the end of this function
            var copy: any = null;
            var copy2: any = null;

            // sat and sun dont have morning values, so remove
            // morning from dropdown
            if (this.selectedDays === "Sunday" ) {
                // remove morning option
                copy = Object.assign({}, this.timesMain);
                copy = Object.keys(copy).map(function (key) { return copy[key]; });
                var index = copy.indexOf("Morning");
                copy.splice(index, 1);
                
                // remove morning time period
                copy2 = Object.assign({}, this.timesDetailMain);
                delete copy2["Morning"];
                // modify time periods
                copy2["Night"] = [moment("9:00PM", "HH:mmA"),moment("10:00PM", "HH:mmA")];
                copy2["Afternoon"] = [moment("12:30PM", "HH:mmA"),moment("5:00PM", "HH:mmA")];
                
            } else if (this.selectedDays === "Saturday" ){
                // set time period options to default
                copy = this.timesMain;

                // modify time periods
                copy2 = Object.assign({}, this.timesDetailMain);
                copy2["Morning"] = [moment("9:00AM", "HH:mmA"),moment("12:00PM", "HH:mmA")];
                copy2["Night"] = [moment("9:00PM", "HH:mmA"),moment("10:00PM", "HH:mmA")];


            } else if (this.selectedDays === "Friday" ){
                // set time period options to default
                copy = this.timesMain;

                // modify time periods
                copy2 = Object.assign({}, this.timesDetailMain);
                copy2["Night"] = [moment("8:00PM", "HH:mmA"),moment("10:00PM", "HH:mmA")];

            } else {
                // else set time period and days to default
                copy = this.timesMain;
                copy2 = this.timesDetailMain;
            }

            // statsTimes is bound to html select time periods "morning, afternoon, etc.."
            this.statsTimes = copy;
            // graphTimesDetail bound to the chart x axis
            this.graphTimesDetail = copy2;

            // reset time to first value in html select time periods
            this.selectedTimes = this.statsTimes[0];
        } else if (type == "Times") {
            this.selectedTimes = event;
        } else if (type == "Range") {
            this.selectedRange = event;
        } else {
            console.log("Type not recognized");
        }

        this.minTime = this.graphTimesDetail[this.selectedTimes][0];
        this.maxTime = this.graphTimesDetail[this.selectedTimes][1];
        // must redraw chart after any change in dropdown options
        this.createChart();


    }

    createChart(){

      // reset tick to match the selected time
      this.minTime = this.graphTimesDetail[this.selectedTimes][0]
      this.maxTime = this.graphTimesDetail[this.selectedTimes][1]
      var ctx = document.getElementById("myChart");
      var myChart = new Chart(ctx, {
          type: 'line',
          data: {
              labels: this.randomData,
              datasets: [{
                    label: "DATA WTf",
                    data: this.randomData2,
                    backgroundColor: [
                        'rgba(0, 0, 255, 0.2)',
                        ],
                    borderColor: [
                        'rgba(0, 0, 255, 1)',
                        ],
                    borderWidth: 3,
              }
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

                    }
                  }],
                },
         
              legend: {
                position: "bottom"
              }
          }
      });
    }


}
