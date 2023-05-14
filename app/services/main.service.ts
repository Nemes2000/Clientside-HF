import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { forkJoin } from "rxjs/observable/forkJoin";
import { Observable } from "rxjs/rx";
import { Book } from "../models/book.type";
import { Character } from "../models/character.type";
import { House } from "../models/house.type";

@Injectable()
export class MainService {
    result: any[]
    constructor(private http: Http) {
    }

    getHouseByName(name: string) {
        return this.http.get(`https://www.anapioficeandfire.com/api/houses?name=${name}`) 
    }

    getCharacterByName(name : string){
        return this.http.get(`https://www.anapioficeandfire.com/api/characters?name=${name}`) 
    }

    getBookByName(name: string){
        return this.http.get(`https://www.anapioficeandfire.com/api/books?name=${name}`) 
    }
}