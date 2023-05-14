import { Component, OnInit } from "@angular/core";
import { Book } from "../../models/book.type";
import { CharacterService } from "../../services/character.service";
import { ActivatedRoute, Router } from '@angular/router'
import { BookService } from "../../services/book.service"

@Component({
    selector: "book-page",
    templateUrl: "./book-page.component.html"
})
export class BookPageComponent implements OnInit {
    currentBook: Book;
    characters: string[] = []
    povCharacters: string[] = []
    loadingCharacters: boolean = true
    loadingPovCharacters: boolean = true

    constructor(private characterService: CharacterService, private route: ActivatedRoute, private bookService: BookService, private router: Router) { }

    /**
    * On page init it runs to setup the page content
    */
    ngOnInit(): void {
        this.route.params.subscribe(params => {
            let name: string = params['name']
            name = name.replace('%20', ' ')
            this.currentBook = this.bookService.getBookByName(name)[0]
            console.log(this.currentBook)
            console.log(this.currentBook.characters.length)
            this.clear()
            this.load()
        });
    }

    /**
     * Clear the datas for in case if we navigate to this site again, there should be no invalid data
     */
    clear() {
        this.characters = []
        this.povCharacters = []
        this.loadingCharacters = true
        this.loadingPovCharacters = true
    }

    /**
     * Load datas for page content
     */
    load() {
        if (this.currentBook.characters.length != 0) {
            let response = this.characterService.getSpecificCharacters(this.currentBook.characters)
            response.forEach(res => {
                res.subscribe(r => {
                    if (r.json().name != '') {
                        this.characters.push(r.json().name)
                        this.loadingCharacters = false
                    }
                })
            })
        }

        if (this.currentBook.characters.length != 0) {
            let response = this.characterService.getSpecificCharacters(this.currentBook.povCharacters)
            response.forEach(res => {
                res.subscribe(r => {
                    if (r.json().name != '') {
                        this.povCharacters.push(r.json().name)
                        this.loadingPovCharacters = false
                    }
                })
            })
        }
    }

    /**
     * Navigating to the desired page
     * @param {string} name - the given subputh, which is the data's name
     * @param {string} main - the given main path, which is the data's type
     */
    navigateTo(name: string, main: string) {
        this.router.navigate([`${main}/${name}`])
    }
}