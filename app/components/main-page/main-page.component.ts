import { Component } from "@angular/core"
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router'
import { Observable } from "rxjs/rx"
import { CharacterService } from "../../services/character.service"
import { HousesService } from "../../services/houses.service"
import { BookService } from "../../services/book.service"
import { MainService } from "../../services/main.service"
import { Character } from "../../models/character.type"
import { House } from "../../models/house.type"
import { Book } from "../../models/book.type"


@Component({
    selector: "iceandfire-app",
    templateUrl: "./main-page.component.html"
})
export class MainPageComponent {
    constructor(public router: Router, private route: ActivatedRoute, private characterService: CharacterService, private housesService: HousesService, private bookService: BookService, private mainService: MainService) { }

    /**
     * By the searchterch gets those datas, which names are match
     */
    getByName() {
        if(this.searchTerm != this.prevSearchTerm){
            this.character = []
            this.book = []
            this.house = []
        }
        if (this.searchTerm.trim() != "") {
            this.mainService.getHouseByName(this.searchTerm.trim()).subscribe(r => this.house = r.json())
            this.mainService.getCharacterByName(this.searchTerm.trim()).subscribe(r => this.character = r.json())
            this.mainService.getBookByName(this.searchTerm.trim()).subscribe(r => this.book = r.json())
        }
    }

    /**
     * Checks the route whether we are in the root page
     * @returns true if the route is the root
     */
    isRootSite(): boolean {
        return this.router.url === '/'
    }

    character: Character[] = []
    house: House[] = []
    book: Book[] = []
    searchTerm: string = ""
    prevSearchTerm: string = ""
    title = "Ice and Fire"
    currentPageTitle: Observable<string>
}