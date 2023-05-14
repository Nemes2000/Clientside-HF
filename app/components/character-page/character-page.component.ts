import { Component, OnChanges, OnInit } from "@angular/core"
import { Character } from "../../models/character.type"
import { CharacterService } from "../../services/character.service"
import { BookService } from "../../services/book.service"
import { HousesService } from "../../services/houses.service"
import { ActivatedRoute, Router } from '@angular/router'
import { result } from "lodash"

@Component({
    selector: "character-page",
    templateUrl: "./character-page.component.html"
})
export class CharacterPageComponent implements OnInit {
    currentCharacter: Character
    father: string
    mother: string
    spouse: string
    allegiances: string[] = []
    books: string[] = []
    povBooks: string[] = []
    loadingFather: boolean = true
    loadingMoter: boolean = true
    loadingSpouse: boolean = true
    loadingAllegiances: boolean = true
    loadingBooks: boolean = true
    loadingPovBooks: boolean = true


    constructor(private characterService: CharacterService, private bookService: BookService, private houseService: HousesService, private route: ActivatedRoute, private router: Router) { }

    /**
    * On page init it runs to setup the page content
    */
    ngOnInit() {
        this.route.params.subscribe(params => {
            let name: string = params['name'];
            name = name.replace('%20', ' ')
            this.currentCharacter = this.characterService.getCharacterByName(name)[0]
            this.clear()
            this.load()
        });
    }

    /**
     * Clear the datas for in case if we navigate to this site again, there should be no invalid data
     */
    clear() {
        this.father = ''
        this.mother = ''
        this.spouse = ''
        this.allegiances = []
        this.books = []
        this.povBooks = []
        this.loadingFather = true
        this.loadingMoter = true
        this.loadingSpouse = true
        this.loadingAllegiances = true
        this.loadingBooks = true
        this.loadingPovBooks = true

    }

    /**
     * Load datas for page content
     */
    load() {
        this.loadFather()
        this.loadMother()
        this.loadSpouse()
        this.loadAllegiances()
        this.loadBooks()
        this.loadPovBooks()
    }

    /**
     * Navigating to the desired page
     * @param {string} name - the given subputh, which is the data's name
     * @param {string} main - the given main path, which is the data's type
     */
    navigateTo(name: string, main: string) {
        this.router.navigate([`${main}/${name}`])
    }

    /**
     * Get a specific data from service
     */
    loadFather() {
        if (this.currentCharacter.father) {
            this.characterService.getSpecificCharacter(this.currentCharacter.father).subscribe(res => {
                this.father = res.json().name
                this.loadingFather = false
            })
        }
    }

    /**
     * Get a specific data from service
     */
    loadMother() {
        if (this.currentCharacter.mother) {
            this.characterService.getSpecificCharacter(this.currentCharacter.mother).subscribe(res => {
                this.mother = res.json().name
                this.loadingMoter = false
            })
        }
    }

    /**
     * Get a specific data from service
    */
    loadSpouse() {
        if (this.currentCharacter.spouse) {
            this.characterService.getSpecificCharacter(this.currentCharacter.spouse).subscribe(res => {
                this.spouse = res.json().name
                this.loadingSpouse = false
            })
        }
    }

    /**
    * Get a specific data from service
    */
    loadBooks() {
        if (this.currentCharacter.books.length != 0) {
            let result = this.bookService.getSpecificBooks(this.currentCharacter.books)
            result.forEach(res => {
                res.subscribe(r => {
                    this.books.push(r.json().name)
                    this.loadingBooks = false
                })
            })
        }
    }

    /**
    * Get a specific data from service
     */
    loadPovBooks() {
        if (this.currentCharacter.povBooks.length != 0) {
            let result = this.bookService.getSpecificBooks(this.currentCharacter.povBooks)
            result.forEach(res => {
                res.subscribe(r => {
                    this.povBooks.push(r.json().name)
                    this.loadingPovBooks = false
                })
            })
        }
    }

    /**
    * Get a specific data from service
    */
    loadAllegiances() {
        if (this.currentCharacter.allegiances.length != 0) {
            let result = this.houseService.getSpecificHouses(this.currentCharacter.allegiances)
            result.forEach(res => {
                res.subscribe(r => {
                    this.allegiances.push(r.json().name)
                    this.loadingAllegiances = false
                })
            })
        }
    }
}