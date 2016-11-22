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
    title: String = '# of Fucks I Give';
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
                      'rgba(255, 99, 132, 0.2)',
                      ],
                  borderColor: [
                      'rgba(255,99,132,1)',
                      ],
                  borderWidth: 3
              }]
          },
          options: {
              scales: {
                  yAxes: [{
                      ticks: {
                          beginAtZero:true
                      }
                  }]
              }
          }
      });
    }

  	onChange(newValue: any) {
    	console.log(newValue);
    	this.selectedDevice = newValue;
	  }
}
