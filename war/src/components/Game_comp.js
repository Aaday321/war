import React from 'react'

export function GAME_UI(){
    return(
        <div>
             <h1>WAR</h1> 
            <h3 id="name">YOUR NAME HERE</h3>
            <button id="playNextCard">Play Next Card</button>
            <button id="auto">Automate To End</button>
            <button id="new_game">New Game</button>
            <h3>Your Card:</h3>
            <h2 id="yourCard"></h2>
            <h3>Opponent's Card:</h3>
            <h2 id="oppCard"></h2>
            <h2 id="winner"></h2>
        </div>
    )
}