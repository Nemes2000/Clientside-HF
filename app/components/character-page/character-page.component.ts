import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs/rx";
import { CharacterService } from "../../services/character.service";
import * as _ from "lodash";

@Component({
    selector: "character-page",
    templateUrl: "./character-page.component.html"
})
export class CharacterPageComponent implements OnInit {
    constructor(characterService: CharacterService) { }
    ngOnInit() {
        
    }

    title = "Characters";
    isNavbarCollapsed = false;
    currentPageTitle: Observable<string>;
}