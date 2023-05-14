import { Component, OnInit } from "@angular/core"
import { House } from "../../models/house.type"
import { CharacterService } from "../../services/character.service"
import { HousesService } from "../../services/houses.service"
import { ActivatedRoute, Router } from '@angular/router'

@Component({
    selector: "house-page",
    templateUrl: "./house-page.component.html"
})
export class HousePageComponent implements OnInit {
    currentHouse: House
    currentLord: string
    overlord: string
    heir: string
    founder: string
    swornMembers: string[] = []
    cadetBranches: string[] = []
    loadingSwornMembers: boolean = true
    loadingCadetBranches: boolean = true
    loadingHeir: boolean = true
    loadingCurrentLord: boolean = true
    loadingOverLord: boolean = true
    loadingFounder: boolean = true

    constructor(private characterService: CharacterService, private houseService: HousesService, private route: ActivatedRoute, private router: Router) { }

    /**
    * On page init it runs to setup the page content
    */
    ngOnInit() {
        this.route.params.subscribe(params => {
            let name: string = params['name']
            name = name.replace('%20', ' ')
            this.clearDatas()
            this.currentHouse = this.houseService.getHouseByName(name)[0]
            this.load()
        });
    }

    /**
     * Clear the datas for in case if we navigate to this site again, there should be no invalid data
     */
    clearDatas() {
        this.currentLord = ''
        this.overlord = ''
        this.heir = ''
        this.founder = ''
        this.cadetBranches = []
        this.swornMembers = []
        this.loadingSwornMembers = true
        this.loadingCadetBranches = true
        this.loadingHeir = true
        this.loadingCurrentLord = true
        this.loadingOverLord = true
        this.loadingFounder = true
    }

    /**
     * Load datas for page content
     */
    load() {
        this.loadCurrentLord()
        this.loadCadetBranches()
        this.loadOverLord()
        this.loadHeir()
        this.loadFounder()
        this.loadSwornMembers()
    }

    /**
     * Navigating to the desired page
     * @param {string} name - the given subputh, which is the data's name
     * @param {string} main - the given main path, which is the data's type
     */
    navigateTo(name: string, main: string) {
        this.router.navigate([`${main}/${name}`])
    }

    /**
     * Get a specific data from service
     */
    loadCurrentLord() {
        if (this.currentHouse.currentLord != "") {
            this.characterService.getSpecificCharacter(this.currentHouse.currentLord).subscribe(r => {
                let h = r.json()
                this.currentLord = h.name
                this.loadingCurrentLord = false
            })
        }
    }

    /**
     * Get a specific data from service
     */
    loadOverLord() {
        if (this.currentHouse.overlord != "") {
            this.houseService.getSpecificHouse(this.currentHouse.overlord).subscribe(r => {
                let h = r.json()
                this.overlord = h.name
                this.loadingOverLord = false
            })
        }
    }

    /**
     * Get a specific data from service
     */
    loadCadetBranches() {
        if (this.currentHouse.cadetBranches.length != 0) {
            let response = this.houseService.getSpecificHouses(this.currentHouse.cadetBranches)
            response.forEach(element => {
                element.subscribe(r => {
                    this.cadetBranches.push(r.json().name)
                    this.loadingCadetBranches = false
                })
            })
        }
    }

    /**
     * Get a specific data from service
     */
    loadHeir() {
        if (this.currentHouse.heir != "") {
            this.characterService.getSpecificCharacter(this.currentHouse.heir).subscribe(r => {
                let h = r.json()
                this.heir = h.name
                this.loadingHeir = false
            })
        }
    }

    /**
     * Get a specific data from service
     */
    loadFounder() {
        if (this.currentHouse.founder != "") {
            this.characterService.getSpecificCharacter(this.currentHouse.founder).subscribe(r => {
                let h = r.json()
                this.founder = h.name
                this.loadingFounder = false
            })
        }
    }

    /**
     * Get a specific data from service
     */
    loadSwornMembers() {
        if (this.currentHouse.swornMembers.length != 0) {
            let response = this.characterService.getSpecificCharacters(this.currentHouse.swornMembers)
            response.forEach(element => {
                element.subscribe(r => {
                    this.swornMembers.push(r.json().name)
                    this.loadingSwornMembers = false
                })
            })

        }
    }
}