import { Component } from '@angular/core';

/**
 * This class represents the navigation bar component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css'],
})

export class NavbarComponent {

	test: string = "testing";
	isActive: boolean = false;
	navItems: Array = ["events","stats","contacts"];
	navItemsActive: Array;


	constructor(){
		
	}

}
