import { Injectable } from "@angular/core";
import { Observable } from "rxjs/rx";
import { Http } from '@angular/http';
import { Book } from "../models/book.type"

@Injectable()
export class BookService {
    private books: Observable<Book[]>;
    constructor(private http: Http) {

    }

    getBooks(): Observable<any> {
        return this.http.get('https://www.anapioficeandfire.com/api/books');
    }
}