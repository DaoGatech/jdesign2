import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
/**
 * This class represents the navigation bar component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css'],
})

/**
 * This class sets up the navbar at top of screen
 */
export class NavbarComponent {

	test: string = "testing";
	isActive: boolean = false;
	navItems: Array<String> = ["Events","Stats","Contacts"];
	navItemActive: number;

	//Sets up available paths
	constructor(private _router: Location){

		this.navItemActive = 0;
		if (_router.path() === "/Events"){
			this.navItemActive = 1;
		} else if (_router.path() === "/Stats"){
			this.navItemActive = 2;
		} else if (_router.path() === "/Contacts"){
			this.navItemActive = 3;
		}

		for(var i = 0; i < this.navItems.length; i++){
			console.log(this.navItems[i]);
		}
	}

	//Changes path
	changeActive(item:number){
		this.navItemActive = item;
	}

}
