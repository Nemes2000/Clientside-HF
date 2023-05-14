import { Component, OnInit } from "@angular/core"
import { Observable } from "rxjs/rx"
import { HousesService } from "../../services/houses.service"
import { House } from "../../models/house.type"
import { SearchResult } from "../../models/search-result.type"

@Component({
    selector: "houses-page",
    templateUrl: "./houses.component.html"
})
export class HousesPageComponent implements OnInit {
    constructor(private houseService: HousesService) { }

    /**
    * On page init it runs to setup the page content
    */
    ngOnInit() {
        this.getHouse()
    }

    /**
    * Get one page of data from service, which are contains the searchterm
    */
    getHouse(){
        if (this.searchTerm !== "")
            this.searched = true

        if(this.searchTerm != this.prevSearchTerm){
            this.currentPage = 0
            this.prevSearchTerm = this.searchTerm
        }

        this.houses = this.houseService.getHouse({
            searchTerm: this.searchTerm,
            page: this.currentPage,
            pageSize: this.pageSize,
        })
        this.houses.subscribe(r => {
            this.maxPages = Math.ceil(r.allResults / this.pageSize)
            this.currentPage = r.page
        })
    }

    /**
    * Get all data
    */
    getAll() {
        this.currentPage = 0
        this.searchTerm = ""
        this.getHouse()
        this.searched = false
    }

    pageSize: number = 10
    currentPage: number = 0;
    maxPages: number = 0;
    searched: boolean = false
    houses: Observable<SearchResult<House>>
    searchTerm: string = ""
    prevSearchTerm: string = ""
    selectedHouse: House
}