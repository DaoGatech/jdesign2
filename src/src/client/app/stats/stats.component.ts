import { Component, OnInit } from '@angular/core';
declare var moment: any;
/**
 * This class represents the lazy loaded StatsComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-stats',
  templateUrl: 'stats.component.html',
  styleUrls: ['stats.component.css']
})

export class StatsComponent implements OnInit {

    // default times
    timesDetailMain: Object = {
      "Morning" : [moment("5:30AM", "HH:mmA"), moment("10:00AM", "HH:mmA")],
      "Midday" : [moment("10:00AM", "HH:mmA"),moment("3:00PM", "HH:mmA")],
      "Afternoon" : [moment("3:00PM", "HH:mmA"),moment("8:00PM", "HH:mmA")],
      "Night" : [moment("8:00PM", "HH:mmA"),moment("11:59PM", "HH:mmA")]
    };
    timesMain: Array<String> = ["Morning", "Midday", "Afternoon", "Night"];


    // "stats" bound to html select values
    statsAreas: Array<String> = ["Indoor Pool", "Basketball Court", "Outdoor Pool"];
    // statsMonths: Array<String> = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    statsRange: Array<String> = ["24 hours", "Week", "Month"]
    statsDays: Array<String> = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    
    // statsTimes affects what will show up in statsTimesDetail
    // set statsTimes and statsTimesDetail default values here
    statsTimes: Array<String> = this.timesMain;
    statsTimesDetail: Object = this.timesDetailMain;

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
        moment("10:43AM", "HH:mmA"), 
    ];

    randomData2: Array<number> = [10, 20, 25, 30, 27, 12, 3];

    chartTitle: String = "THE FUCKING TITLE";
    title1: String = "Current";
    title2: String = "Predicted";

    // default to monday morning
    minTime = moment("5:30AM", "HH:mmA");
    maxTime = moment("9:00AM", "HH:mmA");

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
            var copy: any = null;
            // sat and sun dont have morning values, so remove
            // morning from dropdown
            if (this.selectedDays === "Saturday" || this.selectedDays === "Sunday" ) {
              // must create a DEEP copy
              copy = Object.assign({}, this.timesMain);
              copy = Object.keys(copy).map(function (key) { return copy[key]; });
              var index = copy.indexOf("Morning");
              copy.splice(index, 1);
              this.statsTimes = copy;

            // else any other day has morning value
            } else {
              this.statsTimes = this.timesMain;
              this.statsTimesDetail = this.timesDetailMain;
            }
            // reset time to first value in array
            this.selectedTimes = this.statsTimes[0];
        } else if (type == "Times") {
            this.selectedTimes = event;
            // hours are diff for each day
            var copy = null;
            if (this.selectedDays === "Friday") {
                copy = Object.assign({}, this.timesDetailMain);
                copy["Night"] = [moment("8:00PM", "HH:mmA"),moment("10:00PM", "HH:mmA")];
            } else if (this.selectedDays === "Saturday") {
                copy = Object.assign({}, this.timesDetailMain);
                delete copy["Morning"];
                copy["Night"] = [moment("8:00PM", "HH:mmA"),moment("10:00PM", "HH:mmA")];
            } else if (this.selectedDays === "Sunday") {
                copy = Object.assign({}, this.timesDetailMain);
                delete copy["Morning"];
                copy["Night"] = [moment("8:00PM", "HH:mmA"),moment("10:00PM", "HH:mmA")];
                copy["Midday"] = [moment("12:00PM", "HH:mmA"),moment("2:00PM", "HH:mmA")];
            } else {
                copy = this.timesDetailMain;
            }

            this.statsTimesDetail = copy;

        } else if (type == "Range") {
            this.selectedRange = event;
        } else {
            console.log("Type not recognized");
        }

        this.minTime = this.statsTimesDetail[this.selectedTimes][0];
        this.maxTime = this.statsTimesDetail[this.selectedTimes][1];
        this.createChart();


    }

    createChart(){

      // reset tick to match the selected time
      this.minTime = this.statsTimesDetail[this.selectedTimes][0]
      this.maxTime = this.statsTimesDetail[this.selectedTimes][1]
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
