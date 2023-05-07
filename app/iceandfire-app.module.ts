import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { CollapseModule } from 'ng2-bootstrap'
import { HousePageComponent } from "./components/house-page/house-page.component";
import { CharacterPageComponent } from "./components/character-page/character-page.component";
import { BookPageComponent } from "./components/book-page/book-page.component";
import { MainPageComponent } from "./components/main-page/main-page.component";
import { HouseService } from "./services/house.service";
import { CharacterService } from "./services/character.service";
import { BookService } from "./services/book.service";
import { MainService } from "./services/main.service";

let routes: Route[] = [
    { path: "houses", component: HousePageComponent },
    { path: "characters", component: CharacterPageComponent },
    { path: "books", component: BookPageComponent },
    { path: "main", component: MainPageComponent },
];

@NgModule({
    imports: [BrowserModule, RouterModule.forRoot(routes), FormsModule, HttpModule, CollapseModule.forRoot()],
    declarations: [MainPageComponent, HousePageComponent, CharacterPageComponent, BookPageComponent],
    exports: [],
    providers: [MainService, HouseService, CharacterService, BookService],
    bootstrap: [MainPageComponent]
})
export class IceAndFireAppModule { }
