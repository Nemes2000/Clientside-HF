import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { CollapseModule } from 'ng2-bootstrap'
import { HousesPageComponent } from "./components/houses-page/houses-page.component";
import { CharactersPageComponent } from "./components/characters-page/characters-page.component";
import { BooksPageComponent } from "./components/books-page/books-page.component";
import { MainPageComponent } from "./components/main-page/main-page.component";
import { HousesService } from "./services/houses.service";
import { CharacterService } from "./services/character.service";
import { BookService } from "./services/book.service";
import { HousePageComponent } from './components/house-page/house-page.component';
import { CharacterPageComponent } from './components/character-page/character-page.component';
import { BookPageComponent } from './components/book-page/book-page.component';
import { MainService } from './services/main.service';

let routes: Route[] = [
    { path: "houses", component: HousesPageComponent },
    { path: "characters", component: CharactersPageComponent },
    { path: "books", component: BooksPageComponent },
    { path: "main", component: MainPageComponent },
    { path: `houses/:name`, component: HousePageComponent},
    { path: `characters/:name`, component: CharacterPageComponent},
    { path: `books/:name`, component: BookPageComponent}
];

@NgModule({
    imports: [BrowserModule, RouterModule.forRoot(routes), FormsModule, HttpModule, CollapseModule.forRoot()],
    declarations: [MainPageComponent, HousesPageComponent, CharactersPageComponent, BooksPageComponent, HousePageComponent, CharacterPageComponent, BookPageComponent],
    exports: [RouterModule],
    providers: [HousesService, CharacterService, BookService, MainService],
    bootstrap: [MainPageComponent]
})
export class IceAndFireAppModule { }
