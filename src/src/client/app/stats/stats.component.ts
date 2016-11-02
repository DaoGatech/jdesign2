import { Component } from '@angular/core';

/**
 * This class represents the lazy loaded StatsComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-stats',
  templateUrl: 'stats.component.html',
  styleUrls: ['stats.component.css']
})

export class StatsComponent {
    statsAreas: Array<String> = ["Indoor Pool", "Basketball Court", "Outdoor Pool"];
    // statsMonths: Array<String> = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    statsRange: Array<String> = ["24 hours", "Week", "Month"]
    statsDays: Array<String> = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    statsTimes: Array<String> = ["Morning", "Afternoon", "Evening", "Late Night"];


  	selectedDevice = 'Indoor Pool';
  	onChange(newValue: any) {
    	console.log(newValue);

    	this.selectedDevice = newValue;
	}
}
