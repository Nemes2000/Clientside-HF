import { Component, OnInit } from "@angular/core";
import { Router, NavigationEnd } from '@angular/router';
import { Observable } from "rxjs/rx";
import { MainService } from "../../services/main.service";
import * as _ from "lodash";

@Component({
    selector: "iceandfire-app",
    templateUrl: "./main-page.component.html"
})
export class MainPageComponent implements OnInit {
    constructor(private router: Router) { }
    ngOnInit() {
        this.currentPageTitle = this.router.events
            .filter(e => e instanceof NavigationEnd)
            .map((() => _.find(["Houses", "Characters", "Books"], t => this.router.isActive('/' + t.toLowerCase(), false))).bind(this))
    }

    title = "Ice and Fire";
    isNavbarCollapsed = false;
    currentPageTitle: Observable<string>;
}