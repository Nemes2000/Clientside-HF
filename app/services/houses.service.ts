import { Injectable } from "@angular/core";
import { Observable } from "rxjs/rx";
import { House } from "../models/house.type"
import { Http } from "@angular/http";
import { SearchResult } from "../models/search-result.type";

@Injectable()
export class HousesService {
    private houses: House[] = []
    constructor(private http: Http) {
        this.load()
    }

    /**
     * Get those datas which are contains the searchTerm
     * @param options -
     *  {string} seachTerm - the string by we want the datas
     *  {number} page - which page content we want
     *  {number} pageSize - how much data the page will contain
     * @returns one page of specific data, which are not yet fetched from the API
     */
    getHouse(options: { searchTerm: string, page: number, pageSize: number }): Observable<SearchResult<House>> {
        let result: House[]
        let pageSize = (options && options.pageSize) || 10
        let page = (options && options.page) || 0
        let searchTerm = (options && options.searchTerm) || ''
        if (searchTerm) {
            result = this.houses.filter(c => [c.name].find(e => e && e.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) !== undefined)
        }
        else {
            result = this.houses
        }

        let indexes: number[] = []
        for (let i = pageSize * page; i < pageSize * (page + 1); i++)
            indexes.push(i)
        let send = <SearchResult<House>>{ results: result.filter((e, index) => indexes.indexOf(index) !== -1), allResults: result.length, page, pageSize, searchTerm }
        return Observable.of(send)
    }

    /**
     * Get data by url from API
     * @param {string} url - contains the url we want from the API 
     * @returns an observable which contains the http request result
     */
    getSpecificHouse(url: string) {
        return this.http.get(url)
    }

    /**
     * Get datas by url from API
     * @param {string[]} housesUrl - contains the urls we want from the API 
     * @returns an observable which contains the http request results
     */
    getSpecificHouses(housesUrl: string[]) {
        let answers: Observable<any>[] = []
        for(let i = 0; i < housesUrl.length; i++){
            answers.push(this.http.get(housesUrl[i]))
        }
        return answers
    }

    /**
     * Get the house, from the stored datas
     * @param {string} name -give us which house we want by name 
     * @returns the searched house
     */
    getHouseByName(name: string){
        return this.houses.filter(c => c.name == name )
    }

    /**
     * Load all the character resources from the API
     */
    load() {
        for (let i = 1; i < 10; i++) {
            this.http.get(`https://www.anapioficeandfire.com/api/houses?page=${i}&pageSize=50`)
                .subscribe(res => {
                    var char: House[] = res.json()
                    char.forEach(c => {
                        if (c.name != "")
                            this.houses.push(c)
                    })
                    this.houses.sort((a, b) => a.name.localeCompare(b.name))
                    this.save()
                })
        }
    }

    /**
     * Save the fetched datas from API to the local storage
     */
    save() {
        localStorage.setItem('houses', JSON.stringify(this.houses))
    }
}