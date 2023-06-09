import { Injectable } from "@angular/core";
import { Observable } from "rxjs/rx";
import { Http } from '@angular/http';
import { Character } from "../models/character.type"
import { SearchResult } from "../models/search-result.type";

@Injectable()
export class CharacterService {
    private characters: Character[] = []
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
    getCharacter(options: { searchTerm: string, page: number, pageSize: number }): Observable<SearchResult<Character>> {
        let result: Character[]
        let pageSize = (options && options.pageSize) || 10
        let page = (options && options.page) || 0
        let searchTerm = (options && options.searchTerm) || ''
        if (searchTerm) {
            result = this.characters.filter(c => [c.name].find(e => e && e.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) !== undefined)
        }
        else {
            result = this.characters
        }

        let indexes: number[] = []
        for (let i = pageSize * page; i < pageSize * (page + 1); i++)
            indexes.push(i)

        let send = <SearchResult<Character>>{ 
            results: result.filter(char => indexes.indexOf(result.indexOf(char)) !== -1),
            allResults: result.length, page, pageSize, searchTerm }
            
        return Observable.of(send)
    }

    /**
     * Get data by url from API
     * @param {string} url - contains the url we want from the API 
     * @returns an observable which contains the http request result
     */
    getSpecificCharacter(url: string) {
        return this.http.get(url)
    }

    /**
     * Get datas by url from API
     * @param {string[]} charsUrl - contains the urls we want from the API 
     * @returns an observable which contains the http request results
     */
    getSpecificCharacters(charsUrl: string[]) {
        let answers: Observable<any>[] = []
        for(let i = 0; i < charsUrl.length; i++){
            answers.push(this.http.get(charsUrl[i]))
        }
        return answers
    }

    /**
     * Get the character, from the stored datas
     * @param {string} name -give us which character we want by name 
     * @returns the searched character
     */
    getCharacterByName(name: string){
        return this.characters.filter(c => c.name == name )
    }

    /**
     * Load all the character resources from the API
     */
    load() {
        for (let i = 1; i < 44; i++) {
            this.http.get(`https://www.anapioficeandfire.com/api/characters?page=${i}&pageSize=50`)
                .subscribe(res => {
                    var char: Character[] = res.json()
                    char.forEach(c => {
                        if (c.name != "")
                            this.characters.push(c)
                    })
                    this.characters.sort((a, b) => a.name.localeCompare(b.name))
                    if (i == 43)
                        this.save()
                })
        }
    }

    /**
     * Save the fetched datas from API to the local storage
     */
    save() {
        localStorage.setItem('characters', JSON.stringify(this.characters))
    }
}