export interface Book {
    url : string;
    name : string;
    isbn : string;
    authors : string[];
    numberOfPages : number;
    publisher : string;
    country : string;
    mediaType : string;
    released : string; //special format data time   
    characters : string[];  //character
    povCharacters : string[]; //character
}
