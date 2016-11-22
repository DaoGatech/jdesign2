import { Component, OnInit } from '@angular/core';

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
    statsAreas: Array<String> = ["Indoor Pool", "Basketball Court", "Outdoor Pool"];
    // statsMonths: Array<String> = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    statsRange: Array<String> = ["24 hours", "Week", "Month"]
    statsDays: Array<String> = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    statsTimes: Array<String> = ["Morning", "Afternoon", "Evening", "Late Night"];

  	selectedDevice = 'Indoor Pool';

    randomData: Array<number> = [12, 19, 3, 5, 2, 3];
    randomData2: Array<number> = [1, 9, 13, 15, 22, 3];
    randomData3: Array<number> = [5, 14, 25, 3, 17, 0];
    chartTitle: String = "THE FUCKING TITLE";
    title: String = "# of Fucks I Give";
    tickLabels: Array<String> = ["WHAT", "THE", "FUCK", "AM", "I", "DOING"];

    ngOnInit() {
      var ctx = document.getElementById("myChart");
      var myChart = new Chart(ctx, {
          type: 'line',
          data: {
              labels: this.tickLabels,
              datasets: [{
                    label: this.title,
                    data: this.randomData,
                    backgroundColor: [
                        'rgba(0, 0, 255, 0.2)',
                        ],
                    borderColor: [
                        'rgba(0, 0, 255, 1)',
                        ],
                    borderWidth: 3,
              }, {
                    label: this.title,
                    data: this.randomData2,
                    backgroundColor: [
                        'rgba(255, 0, 0, 0.2)',
                        ],
                    borderColor: [
                        'rgba(255, 0, 0, 1)',
                        ],
                    borderWidth: 3
              }, {
                    label: this.title,
                    data: this.randomData3,
                    backgroundColor: [
                        'rgba(0, 255, 0, 0.2)',
                        ],
                    borderColor: [
                        'rgba(0, 255, 0, 1)',
                        ],
                    borderWidth: 3
              }]
          },
          options: {
              title: {
                  display: true,
                  text: this.chartTitle
              },
              scales: {
                  yAxes: [{
                      ticks: {
                          beginAtZero:true
                      }
                  }]
              },
              legend: {
                position: "right"
              }
          }
      });
    }

  	onChange(newValue: any) {
    	console.log(newValue);
    	this.selectedDevice = newValue;
	  }
}
