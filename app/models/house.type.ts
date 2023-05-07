export interface House {
    url : string;      
    name : string;
    region : string;
    coatOfArms : string;
    words : string;
    titles : string[];
    seats : string[]
    currentLord : string; //character
    heir : string; //character
    overlord : string; //character
    founded : string;
    founder : string; //character
    diedOut : string;
    ancestralWeapons : string[]; 
    cadetBranches : string[]; //character
    swornMembers : string[]; //character
}