const RandomNameList = ['Oliver', 'William', 'Jack', 'Noah', 'James', 'Thomas', 'Lucas', 'Isaac', 'Ethan', 'Alexander', 'Jacob', 'Lachlan', 'Samuel', 'Harrison', 'Joshua', 'Henry', 'Liam', 'Cooper', 'Benjamin', 'Charlie', 'Mason', 'Ryan', 'Max', 'Leo', 'Oscar', 'Harry', 'Levi', 'Daniel', 'Xavier', 'Logan', 'Hunter', 'Jackson', 'Archie', 'Sebastian', 'Hudson', 'Jayden', 'George', 'Elijah', 'Joseph', 'Adam', 'Riley', 'Edward', 'Hugo', 'Ashton', 'Flynn', 'Zachary', 'Archer', 'Tyler', 'Matthew', 'Nate', 'Lincoln', 'Luca', 'Nicholas', 'Jaxon', 'Theodore', 'Eli', 'Patrick', 'Beau', 'Christian', 'Harvey', 'Jake', 'Finn', 'Austin', 'Luke', 'Dylan', 'Charles', 'Connor', 'Jordan', 'Gabriel', 'Kai', 'Muhammad', 'Blake', 'Dominic', 'Chase', 'Ali', 'Braxton', 'Louis', 'Nathan', 'Felix', 'John', 'Carter', 'Angus', 'Caleb', 'Marcus', 'Toby', 'Anthony', 'Nathaniel', 'Hayden', 'Jasper', 'Arlo', 'Andrew', 'Jonathan', 'Owen', 'Harley', 'Ryder', 'Hamish', 'Jesse', 'Maxwell']

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomName(){
    let n = RandomNameList.length;
    let index = getRandomIntInclusive(0,n-1);
    return RandomNameList[index];
}
