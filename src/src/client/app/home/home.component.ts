import { Component, OnInit,  } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

declare var moment: any;
/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
})

export class HomeComponent implements OnInit {

  height: number;
  breakdownAreas: Array<String> = [];
  predNowJson: Object;
  maxJson: Object;
  totalOccupancy: Number = 0;
  dateJson: Object;
  lastUpdatedMinutes: Number;
  lastUpdatedHours: Number;
  lastUpdatedDays: Number;
/*
  newName: string = '';
  errorMessage: string;
  names: any[] = [];
*/

  /**
   * Creates an instance of the HomeComponent with the injected
   * NameListService.
   *
   * @param {NameListService} nameListService - The injected NameListService.
   */
  //constructor(public nameListService: NameListService) {}

  /**
   * Get the names OnInit
   */
    constructor(private http: Http){


        
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
    this.height = 0;
        this.getData("active.json").then(data => {
            this.maxJson = data[1];
            this.getData("predictionsNow.json").then(data => {
                this.predNowJson = data;
                for (var item in data){
                    this.breakdownAreas.push(item);
                    this.totalOccupancy = this.totalOccupancy + data[item];
                }
                this.breakdownAreas.sort();
                this.getData("date.json").then(data => {
                    this.dateJson = data;
                    
                    var lastUpdateDate = moment(this.dateJson, "YYYY-MM-DD HH-mm");

                    var duration = moment.duration(moment().diff(lastUpdateDate));
                    var days = parseInt(duration.asDays());
                    var hours = parseInt(duration.asHours()) - days * 24;
                    var minutes = parseInt(duration.asMinutes()) - (days * 24 * 60) - (hours*60) ;
                    this.lastUpdatedDays = days;
                    this.lastUpdatedHours = hours;
                    this.lastUpdatedMinutes = minutes;
                });
            });
        });
  }

  scrollDown() {
    var div = document.getElementById('el');
    if (div.style.display == 'none') {
        div.style.display = 'block';
    } else {
        div.style.display = 'none';
    }
    // if (this.height == 0) {
    //   this.height = document.getElementById("el").scrollHeight;
    // } else {
    //   this.height = 0;
    // }
    document.getElementById('breakdown').scrollIntoView({behavior: 'smooth'});
    //this.height = this.height ? 0 : document.getElementById("el").scrollHeight;
  }

  /**
   * Handle the nameListService observable
   */
 // getNames() {
   // this.nameListService.get()
     // .subscribe(
       // names => this.names = names,
       // error =>  this.errorMessage = <any>error
      //);
 // }

  /**
   * Pushes a new name onto the names array
   * @return {boolean} false to prevent default form submit behavior to refresh the page.
   */
  //addName(): boolean {
    // TODO: implement nameListService.post
   // this.names.push(this.newName);
   // this.newName = '';
   // return false;
 // }
}
