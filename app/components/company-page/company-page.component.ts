import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs/rx";
import { Company } from "../../models/company.type";
import { CardService } from "../../services/card.service";
import { CompanyService } from "../../services/company.service";
import { ActivatedRoute } from "@angular/router";
import { SearchResult } from "../../models/search-result.type";
import { Card } from "../../models/card.type";
import * as _ from "lodash";

@Component({
    selector: "company-page",
    templateUrl: "./company-page.component.html"
})
export class CompanyPageComponent implements OnInit {
    constructor(private companyService: CompanyService,
        private cardService: CardService,
        private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            let companyId = +params['id'];
            
        });
        this.getCompanies();
    }

    getCompanies() {
        this.companies = this.companyService.getCompanies();
    }

    editCompany() {
        this.editing = true;
        this.originalCompany = this.selectedCompany;
        this.selectedCompany = { ...this.originalCompany };
    }

    saveCompany(company: Company) {
        this.companyService.addOrUpdateCompany(company)
            .subscribe(() => {
                this.editing = false;
                this.getCompanies();
                this.selectedCompany = undefined;
                this.originalCompany = undefined;
            });
    }

    createCompany() {
        this.creating = true;
        this.selectedCompany = null;
    }
 
    selectedCompany: Company;
    originalCompany: Company;
    cards: Card[];
    editing: boolean = false;
    creating: boolean = false;
    companies: Observable<Company[]>;
   
}