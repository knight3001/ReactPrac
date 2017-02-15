const BoysNames = ['Oliver', 'William', 'Jack', 'Noah', 'James', 'Thomas', 'Lucas', 'Isaac', 'Ethan', 'Alexander', 'Jacob', 'Lachlan', 'Samuel', 'Harrison', 'Joshua', 'Henry', 'Liam', 'Cooper', 'Benjamin', 'Charlie', 'Mason', 'Ryan', 'Max', 'Leo', 'Oscar', 'Harry', 'Levi', 'Daniel', 'Xavier', 'Logan', 'Hunter', 'Jackson', 'Archie', 'Sebastian', 'Hudson', 'Jayden', 'George', 'Elijah', 'Joseph', 'Adam', 'Riley', 'Edward', 'Hugo', 'Ashton', 'Flynn', 'Zachary', 'Archer', 'Tyler', 'Matthew', 'Nate', 'Lincoln', 'Luca', 'Nicholas', 'Jaxon', 'Theodore', 'Eli', 'Patrick', 'Beau', 'Christian', 'Harvey', 'Jake', 'Finn', 'Austin', 'Luke', 'Dylan', 'Charles', 'Connor', 'Jordan', 'Gabriel', 'Kai', 'Muhammad', 'Blake', 'Dominic', 'Chase', 'Ali', 'Braxton', 'Louis', 'Nathan', 'Felix', 'John', 'Carter', 'Angus', 'Caleb', 'Marcus', 'Toby', 'Anthony', 'Nathaniel', 'Hayden', 'Jasper', 'Arlo', 'Andrew', 'Jonathan', 'Owen', 'Harley', 'Ryder', 'Hamish', 'Jesse', 'Maxwell']

const GirlsNames = ['Charlotte','Olivia','Mia','Amelia','Ava','Chloe','Emily','Zoe','Grace','Sophia','Sophie','Isabella','Isla','Ruby','Ivy','Ella','Evie','Sienna','Matilda','Scarlett','Harper','Evelyn','Lily','Emma','Georgia','Eva','Lucy','Hannah','Zara','Isabelle','Willow','Abigail','Audrey','Aria','Sofia','Annabelle','Layla','Violet','Mila','Imogen','Sarah','Stella','Piper','Savannah','Elizabeth','Alice','Ellie','Jessica','Maddison','Ariana','Victoria','Mackenzie','Jasmine','Maya','Claire','Eleanor','Madison','Alexis','Phoebe','Indiana','Chelsea','Alyssa','Summer','Eden','Anna','Lara','Hazel','Addison','Madeleine','Penelope','Elsie','Isabel','Poppy','Frankie','Molly','Aisha','Bella','Emilia','Aurora','Lilly','Rose','Ayla','Eloise','Harriet','Leah','Lola','Alexandra','Daisy','Olive','Eliza','Aaliyah','Holly','Lillian','Maryam','Eve','Charlie','Gabriella','Paige','Billie','Madeline']

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomName(gender){
    if (gender === 1){
        let n = BoysNames.length;
        let index = getRandomIntInclusive(0,n-1);
        return BoysNames[index];
    }
    else{
        let n = GirlsNames.length;
        let index = getRandomIntInclusive(0,n-1);
        return GirlsNames[index];
    }
}
