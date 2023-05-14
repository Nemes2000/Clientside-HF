import { Component, OnInit } from "@angular/core"
import { CharacterService } from "../../services/character.service"
import { Character } from "../../models/character.type"

@Component({
    selector: "characters-page",
    templateUrl: "./characters-page.component.html"
})
export class CharactersPageComponent implements OnInit {
    constructor(private characterService: CharacterService) { }

    /**
    * On page init it runs to setup the page content
    */
    ngOnInit() {
        this.getCharacter()
    }

    /**
    * Get one page of data from service, which are contains the searchterm
    */
    getCharacter() {
        if (this.searchTerm !== "")
            this.searched = true

        if (this.searchTerm != this.prevSearchTerm) {
            this.currentPage = 0
            this.prevSearchTerm = this.searchTerm
        }

        this.characterService.getCharacter({
            searchTerm: this.searchTerm,
            page: this.currentPage,
            pageSize: this.pageSize,
        }).subscribe(r => {
            this.maxPages = Math.ceil(r.allResults / this.pageSize)
            this.currentPage = r.page
            this.characters = r.results
        })
    }

    /**
    * Get all data
    */
    getAll() {
        this.currentPage = 0
        this.searchTerm = ""
        this.getCharacter()
        this.searched = false
    }

    pageSize: number = 10
    currentPage: number = 0;
    maxPages: number = 0;
    searched: boolean = false
    characters: Character[] = []
    firstCharacters: Character[]
    searchTerm: string = ""
    prevSearchTerm: string = ""
    selectedCharacter: Character
}