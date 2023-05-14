import { Component, OnChanges, OnInit } from "@angular/core"
import { Book } from "../../models/book.type"
import { BookService } from "../../services/book.service"
import { Observable } from "rxjs/rx"
import { SearchResult } from "../../models/search-result.type"

@Component({
    selector: "books-page",
    templateUrl: "./books-page.component.html"
})
export class BooksPageComponent implements OnInit {
    constructor(private bookService: BookService) { }

    /**
    * On page init it runs to setup the page content
    */
    ngOnInit() {
        this.getBooks()
    }

    /**
    * Get one page of data from service, which are contains the searchterm
    */
    getBooks() {
        if (this.searchTerm !== "")
            this.searched = true

        if (this.searchTerm != this.prevSearchTerm) {
            this.currentPage = 0
            this.prevSearchTerm = this.searchTerm
        }

        this.books = this.bookService
            .getBooks({
                searchTerm: this.searchTerm,
                page: this.currentPage,
                pageSize: this.pageSize,
            })

        this.books.subscribe(r => {
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
        this.getBooks()
        this.searched = false
    }

    pageSize: number = 10
    currentPage: number = 0;
    maxPages: number = 0;
    searched: boolean = false
    books: Observable<SearchResult<Book>>
    selectedBook: Book
    searchTerm: string = ""
    prevSearchTerm: string = ""
}