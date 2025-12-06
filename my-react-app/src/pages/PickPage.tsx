import React from 'react'
import { cardFaces } from '../data/cards'
import backCard from '../image/Back_Card.jpg'

type Props = {
  deck: string[]
  onShuffleAgain: () => void
  onBackHome: () => void
}

/**
 * PickPage shows the deck as card-backs (compact, centered). The underlying `deck` contains faces
 * and will be used later when a card is selected/revealed. For now we render backs to allow selection.
 */
const PickPage: React.FC<Props> = ({ deck, onShuffleAgain, onBackHome }) => {
  const cardsToDisplay = deck.length ? deck : cardFaces

  return (
    <div className="pick-page">
      <div className="pick-container">
        <div className="cards-row">
          {cardsToDisplay.map((_, i) => (
            <button key={i} className="pick-card" aria-label={`Card ${i + 1}`}>
              <img src={backCard} alt="card back" />
            </button>
          ))}
        </div>
      </div>

      <div className="pick-actions">
        <button className="btn pink" onClick={onShuffleAgain}>Shuffle Again</button>
        <button className="btn pink" onClick={onBackHome}>Back to Home</button>
      </div>
    </div>
  )
}

export default PickPage
