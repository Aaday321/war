
let tieCounter = 0
let roundWinText = document.getElementById("winner")
let playNextCardButton = document.getElementById("playNextCard")
let automateButton = document.getElementById("auto")
let newGameButton = document.getElementById("new_game")
let oppCurrentCard = document.getElementById("oppCardImg")
let yourCurrentCard = document.getElementById("yourCardImg")

let h1 = document.getElementById("name")
let name = window.prompt("Enter your name")
let cardDeckCatcher = []

let isDup = false

let deckSize = 0

const cardList = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
const suitList = ["Diamonds", "Hearts", "Spades", "Clubs"]



function wait(ms) {
    var start = Date.now(),
        now = start;
    while (now - start < ms) {
      now = Date.now();
    }
}




/*                                  THE PLAYER OBJECT                                   */



class Player {
    constructor(name) {
        this.name = name
        this.cardsInHand = []
        this.currentCard = {}
        this.lastIDcW_index = 0
        this.cardsInPlay = []
    }
    pullCard() {
        this.currentCard = this.cardsInHand[0]
    }
    removeCard(index) {
        this.cardsInHand.splice(index, 1)
    }
    addCard(card) {
        this.cardsInHand.push(card)
    }
    resetPlayer() {
        this.cardsInHand = []
        this.currentCard = {}
        roundWinText.innerText = "Let's play another round!"
        yourCurrentCard.innerText = ""
        oppCurrentCard.innerText = ""
    }
}









/*                                  THE CARD OBJECT                                 */




class Card {
    constructor(value, suit) {
        this.value = value
        this.suit = suit
    }

    initCard() {

        //SetColo
        switch (this.suit) {
            case "Diamonds": this.color = "Red"; break;
            case "Hearts": this.color = "Red"; break;
            case "Spades": this.color = "Black"; break;
            case "Clubs": this.color = "Black"; break;
            default: this.color = "";
        }

        //initFace
        switch (this.value) {
            case 14: {
                this.isFace = true;
                this.face = 'ace';
                this.display = this.face;
                break;
            }
            case 11: {
                this.isFace = true;
                this.face = 'jack';
                this.display = this.face;
                break;
            }
            case 12: {
                this.isFace = true;
                this.face = 'queen';
                this.display = this.face;
                break;
            }
            case 13: {
                this.isFace = true;
                this.face = 'king';
                this.display = this.face;
                break;
            }
            default: {
                this.isFace = false;
                this.display = this.value;
                break;
            }
        }
        this.res = `./assets/SVG/${this.display}_of_${this.suit}.svg`
    }
}





/*                                  THE DECK OBJECT                                 */


class Deck {
    constructor() {
        this.cardsInDeck = []
        this.usedIndexes = []
        this.isEmpty = true
    }
}







//DECK init
let MyDeck = new Deck()
//PLAYER inits
const You = new Player(name)
const Opp = new Player("Opp")
//Display name
h1.innerText = "Your name: " + name



/*                                      MAKE DECK                                       */

const makeCardDeck = (deck, cards, suits) => {
    for (let i = 0; i < cards.length; i++) {
        for (let ii = 0; ii < suits.length; ii++) {
            const NewCard = new Card(cardList[i], suitList[ii])
            NewCard.initCard()
            deck.cardsInDeck.push(NewCard)
        }
    }

}



//Create new deck of Cards
makeCardDeck(MyDeck, cardList, suitList)
deckSize = MyDeck.length



const splitTheDeck = (deck) => {
    for (let i = 0; i < 52; i++) {

        let randomCardIndex = getRandomIndex(deck)

        if (i % 2 === 0) {
            You.cardsInHand.push(deck.cardsInDeck[randomCardIndex])
        } else {
            Opp.cardsInHand.push(deck.cardsInDeck[randomCardIndex])
        }
        deck.cardsInDeck.splice(randomCardIndex, 1)
    }
}


const getRandomIndex = (deck) => {
    return Math.floor(Math.random() * deck.cardsInDeck.length)
}

console.log(MyDeck.cardsInDeck)
splitTheDeck(MyDeck)
console.log(You.cardsInHand)
console.log(Opp.cardsInHand)
console.log(MyDeck.cardsInDeck)


const playNextCard = () => {

    if (You.cardsInHand.length > 0 && Opp.cardsInHand.length > 0) {
        You.pullCard()
        Opp.pullCard()

        yourCurrentCard.src = You.currentCard.res
        oppCurrentCard.src = Opp.currentCard.res

        console.log(`YOU:\n${You.currentCard.value}`);
        console.log(`OPP:\n${Opp.currentCard.value}`);

        compare(You.currentCard, Opp.currentCard)

        console.log(`You: ${You.cardsInHand.length} Opp: ${Opp.cardsInHand.length}`)
    } else if (You.cardsInHand.length === 0) {
        window.alert("YOU LOSE!")
    } else if (Opp.cardsInHand.length === 0) {
        window.alert("YOU WIN!")
    }

}







/*                                         I DECLARE WAR FUNCTIONS START                            */
//First Call - 1
const iDeclareWar_V3 = () => {
    drawWarCards(You)
    console.log(You.cardsInPlay);
    drawWarCards(Opp)
    console.log(Opp.cardsInPlay);
    compareTie()
}

// Second call - 2
const drawWarCards = (PLAYER) => {
    let endPoint = 0
    if (tieCounter > 0) {
        endPoint = PLAYER.lastIDcW_index + 4
    } else {
        endPoint = PLAYER.lastIDcW_index + 5
    }

    //Get up to 5 cards from both playexrs, starting from where we left off in double tie situation
    //The reason we use cardsinhand.lengeth is becaus we may run this less than 5 times
    for (let i = PLAYER.lastIDcW_index; i < PLAYER.cardsInHand.length; i++) {

        //This conditional makes sure that we don't run this loop more than 5 times
        if (i === endPoint) {
            return
            //This conditional is defualt
        } else if (PLAYER.cardsInHand.length > 0) {
            PLAYER.cardsInPlay.push(PLAYER.cardsInHand[i])
            PLAYER.lastIDcW_index++
            //This conditional is for when the player is out of cards
        } else if (PLAYER.cardsInHand.length === 0) {
            console.log(`${PLAYER} is out of cards`);
            return
        }
    }
}

//Compare - 4
const compareTie = () => {
    if (You.cardsInPlay[You.cardsInPlay.length - 1].value > Opp.cardsInPlay[Opp.cardsInPlay.length - 1].value) {
        takeCards(You, Opp)
        clearPLAYER(You)
        clearPLAYER(Opp)
    } else if (You.cardsInPlay[You.cardsInPlay.length - 1].value < Opp.cardsInPlay[Opp.cardsInPlay.length - 1].value) {
        takeCards(Opp, You)
        clearPLAYER(You)
        clearPLAYER(Opp)
    } else if (You.cardsInPlay[You.cardsInPlay.length - 1].value === Opp.cardsInPlay[Opp.cardsInPlay.length - 1].value) {
        if (You.cardsInPlay.length === 1 || Opp.cardsInPlay.length === 1) {
            console.log(`WOULD BE AN UNBEATABLE SITUATION, LETS SHUFFLE`)
            //debugger
            shuffleCards(You)
            shuffleCards(Opp)
        }
        tieCounter++
        iDeclareWar_V3()
    }
}

//take cards once your win and remove the other cards - 3
const takeCards = (WINNER, LOSER) => {
    for (let i = 0; i < LOSER.cardsInPlay.length; i++) {
        WINNER.addCard(LOSER.cardsInPlay[i])
        LOSER.removeCard(LOSER.cardsInHand.indexOf(LOSER.cardsInPlay[i]))
    }
}

//Clear PLAYER variables in IDcW
const clearPLAYER = (PLAYER) => {
    PLAYER.lastIDcW_index = 0
    PLAYER.cardsInPlay = []
    tieCounter = 0
}


//Shuffle hand if we have too many ties
const shuffleCardsInPlay = (PLAYER) => {
    if (PLAYER.cardsInPlay.length === 1) {
        return
    }
    console.log("Deck was shuffled!")
    let reorder = []
    for (i = 0; i < cardsInPlay; i++) {
        rando = Math.floor(Math.random() * cardsInPlay.length)
        if (reorder.includes(cardsInPlay[rando]) === true) {
            i--
        } else {
            reorder.push(cardsInPlay[rando])
        }
    }
    PLAYER.cardsInPlay = reorder
}

/*                                 I DECLARE WAR FUNCTIONS END                              */








const compare = (yourCard, oppCard) => {

    roundWinText.innerText = "I Declare War"

    let winner = []

    if (yourCard.value === oppCard.value) {
        iDeclareWar_V3()
        return
    } else if (yourCard.value > oppCard.value) {
        winner = ["You", "win this round"]

        //Take Opps' card
        You.addCard(oppCard)
        Opp.removeCard(Opp.cardsInHand.indexOf(oppCard))

        //Move your card to back
        You.removeCard(You.cardsInHand.indexOf(yourCard))
        You.addCard(yourCard)

    } else {
        winner = ["Your opponent", "wins this round"]

        //Opp takes your card
        Opp.addCard(yourCard)
        You.removeCard(You.cardsInHand.indexOf(yourCard))

        //Move Opps' card to back
        Opp.removeCard(Opp.cardsInHand.indexOf(oppCard))
        Opp.addCard(oppCard)

    }
    roundWinText.innerText = `${winner[0]} ${winner[1]}`
}



const AUTOMATE = () => {
    var counter =0
    while (Opp.cardsInHand.length > 0 && You.cardsInHand.length > 0) {
        setTimeout(playNextCard,10)
    }
    playNextCard()
}

const newGame = () => {
    You.resetPlayer()
    Opp.resetPlayer()
    makeCardDeck(MyDeck, cardList, suitList)
    deckSize = MyDeck.length
    splitTheDeck(MyDeck)
    console.clear();
    setTimeout(() => { console.log("New Game!"); }, 1500)
}


playNextCardButton.addEventListener("click", playNextCard)
automateButton.addEventListener("click", AUTOMATE)
newGameButton.addEventListener("click", newGame)
//lines of code
console.log("+3")