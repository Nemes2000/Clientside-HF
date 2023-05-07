import { Injectable } from "@angular/core";
import { Observable } from "rxjs/rx";
import { Character } from "../models/character.type"

@Injectable()
export class CharacterService {
    private characters: Character[];
    constructor() {
        this.load();
    }

    private load() {
        this.characters = JSON.parse(localStorage.getItem('characters')) || [
            {  url : "base",
                name : "base", 
                culture : "base", 
                born : "base",
                died : "base",
                titles : [],
                aliases : [],
                father : "base",
                mother : "base",
                spouse : "base",
                allegiances : [],
                books : [],
                povBooks : [],
                tvSeries : [],
                playedBy : [],
            },
        ];
        this.save();
    }

    private save() {
        localStorage.setItem('characters', JSON.stringify(this.characters));
        return Observable.timer(200);
    }
}