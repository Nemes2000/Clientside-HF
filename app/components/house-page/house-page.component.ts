import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs/rx";
import { HouseService } from "../../services/house.service";
import * as _ from "lodash";

@Component({
    selector: "house-page",
    templateUrl: "./house.component.html"
})
export class HousePageComponent implements OnInit {
    constructor(houseService: HouseService) { }
    ngOnInit() {
        
    }

    title = "Houses";
    isNavbarCollapsed = false;
    currentPageTitle: Observable<string>;
}