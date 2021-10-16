var selectedLevel = 1;
var levelMap = {
    1: 10,
    2: 20,
    3: 30,
    4: 40,
    5: 50,
    6: 60,
}
var gameContainerId = 'game-container';
var levelSelectId = 'level';
var partialCardId = 'card_';
var imageLoc = `./images/`;

var cardMap = [];
/*
    {
        id: 1,
        imgPath,
        match: 2,
        isFlipped: false,
        correctlyMapped: false,
    }
*/
 

setCards = () => {
    console.log('Setting Cards');
    initVars();
    setCardMap();
    var gameEl = document.getElementById(gameContainerId);
    var toAdd = document.createDocumentFragment();
    for (var i = 1; i <= (selectedLevel * 10); i++) {
        var newDiv = document.createElement('img');
        newDiv.id = `${partialCardId}${i}`;
        newDiv.className = `card card_size_${selectedLevel}`;
        newDiv.src = `${imageLoc}back.png`;
        const originalString = JSON.stringify({ number: i });
        const cloned = JSON.parse(originalString);
        newDiv.onclick = () => flipCard(cloned.number);
        toAdd.appendChild(newDiv);
    }
    gameEl.appendChild(toAdd);
}

setCardMap = () => {
    for (var i = 1; i <= (selectedLevel * 10 / 2); i++) {
        cardMap.push(i);
        cardMap.push(i);
    }
    shuffle(cardMap);
}

var shuffle = (array) => {
    let currentIndex = array.length,  randomIndex;
  
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
}

var flipCard = (cardNumber) => {
    console.log(`Flipping card ${cardNumber}`)
    var cardEl = document.getElementById(`${partialCardId}${cardNumber}`);
    cardEl.src = `${imageLoc}${cardMap[cardNumber - 1]}.jpeg`;
}

var initVars = () => {
    cardMap = [];
    var gameEl = document.getElementById(gameContainerId);
    gameEl.innerHTML = '';
}

var onLevelChange = () => {
    selectedLevel = document.getElementById(levelSelectId).value;
    setCards();
}