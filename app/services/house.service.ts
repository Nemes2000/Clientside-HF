import { Injectable } from "@angular/core";
import { Observable } from "rxjs/rx";
import { House } from "../models/house.type"

@Injectable()
export class HouseService {
    private houses: House[];
    constructor() {
        this.load();
    }

    private load() {
        this.houses = JSON.parse(localStorage.getItem('houses')) || [
            {   url : "base"  ,   
                name : "base",
                region : "base",
                coatOfArms : "base",
                words : "base",
                titles : [],
                seats : [],
                currentLord : "base",
                heir : "base",
                overlord : "base",
                founded : "base",
                founder : "base",
                diedOut : "base",
                ancestralWeapons : [], 
                cadetBranches : [],
                swornMembers : [] 
            },
        ];
        this.save();
    }

    private save() {
        localStorage.setItem('houses', JSON.stringify(this.houses));
        return Observable.timer(200);
    }
}