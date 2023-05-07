export interface Character {
    url : string;
    name : string; 
    culture : string; 
    born : string;
    died : string;
    titles : string[];
    aliases : string[];
    father : string; //character
    mother : string; //character
    spouse : string; //character
    allegiances : string[]; //house
    books : string[]; //book
    povBooks : string[]; //book
    tvSeries : string[];
    playedBy : string[];
}