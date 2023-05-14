import { Injectable } from "@angular/core";
import { Observable } from "rxjs/rx";
import { Http } from '@angular/http';
import { Book } from "../models/book.type"
import { SearchResult } from "../models/search-result.type";

@Injectable()
export class BookService {
    books: Book[] = [];
    constructor(private http: Http) {
        this.load();
    }

    /**
     * Get those datas which are contains the searchTerm
     * @param options -
     *  {string} seachTerm - the string by we want the datas
     *  {number} page - which page content we want
     *  {number} pageSize - how much data the page will contain
     * @returns one page of specific data, which are not yet fetched from the API
     */
    getBooks(options: { searchTerm: string, page: number, pageSize: number }): Observable<SearchResult<Book>> {
        let allResult: Book[]
        let pageSize = (options && options.pageSize) || 10;
        let page = (options && options.page) || 0;
        let searchTerm = (options && options.searchTerm) || ''
        if (searchTerm) {
            allResult = this.books.filter(c => [c.name].find(e => e && e.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) !== undefined)
        }
        else {
            allResult = this.books
        }

        let indexes: number[] = []
        for (let i = pageSize * page; i < pageSize * (page + 1); i++)
            indexes.push(i)

        return Observable.of(allResult.filter((elem, index) => indexes.indexOf(index) !== -1))
            .map(results => <SearchResult<Book>>{
                allResults: allResult.length, results, page, pageSize, searchTerm
            })

    }

    /**
     * Get datas by url from API
     * @param {string[]} booksUrl - contains the urls we want from the API 
     * @returns an observable which contains the http request results
     */
    getSpecificBooks(booksUrl: string[]) {
        let answers: Observable<any>[] = []
        for (let i = 0; i < booksUrl.length; i++) {
            answers.push(this.http.get(booksUrl[i]))
        }
        return answers
    }

    /**
     * Get the book, from the stored datas
     * @param {string} name -give us which book we want by name 
     * @returns the searched book
     */
    getBookByName(name: string) {
        return this.books.filter(c => c.name == name)
    }

    /**
     * Load all the book resources from the API
     */
    load() {
        this.http.get('https://www.anapioficeandfire.com/api/books?page=1&pageSize=50')
            .subscribe(res => {
                var b: Book[] = res.json();
                b.forEach(c => this.books.push(c))
                this.books.sort((a, b) => a.name.localeCompare(b.name))
                this.save();
            });
    }

    /**
     * Save the fetched datas from API to the local storage
     */
    save() {
        localStorage.setItem('books', JSON.stringify(this.books));
    }
}