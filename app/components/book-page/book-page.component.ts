import { Component, OnChanges, OnInit } from "@angular/core";
import { Book } from "../../models/book.type";
import { BookService } from "../../services/book.service";
import { Observable } from "rxjs/rx";
import * as _ from "lodash";
import { elementAt } from "rxjs/operator/elementAt";
import { bindCallback } from "rxjs/observable/bindCallback";

@Component({
    selector: "book-page",
    templateUrl: "./book-page.component.html"
})
export class BookPageComponent implements OnInit {
    constructor(private bookService: BookService) { }
    ngOnInit() {
        this.getBooks();
    }

    getBooks() {
       this.bookService.getBooks().delay(300).subscribe(
            e => {
                this.books = e.json()
                this.isLoading = false;
            }
       );
    }

    isLoading: boolean = true;
    books: Book[];
    selectedBook: Book;
    currentPage: number = 0;
    searchTerm: string = "";
}