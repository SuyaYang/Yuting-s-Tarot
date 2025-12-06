import React, { useState, useRef, useEffect, CSSProperties } from 'react'
import backCard from '../image/Back_Card.jpg'
import cardFaces from '../data/cards'

type Props = {
  onBack: () => void
}

const VISIBLE_COUNT = 22 // 22 cards in the fan

// Generic Fisher–Yates shuffle
const shuffleDeck = <T,>(source: T[]): T[] => {
  const arr = source.slice()
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

const ShufflePage: React.FC<Props> = ({ onBack }) => {
  const [shuffling, setShuffling] = useState(false)
  const [spread, setSpread] = useState(false)
  const [spreadActive, setSpreadActive] = useState(false) // controls fan animation
  const [deck, setDeck] = useState<typeof cardFaces>([])
  const containerRef = useRef<HTMLDivElement | null>(null)

  // track timeouts so we can clear them on unmount
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([])

  // On first mount, prepare a default deck order (no spread)
  useEffect(() => {
    setDeck(cardFaces.slice())

    return () => {
      // cleanup: clear any pending timeouts
      timeoutsRef.current.forEach(clearTimeout)
      timeoutsRef.current = []
    }
  }, [])

  const triggerFanAnimation = () => {
    // start from stacked state, then fan out after a brief delay
    setSpreadActive(false)
    const t = setTimeout(() => setSpreadActive(true), 60)
    timeoutsRef.current.push(t)
  }

  const startShuffle = () => {
    if (shuffling) return
    setShuffling(true)

    const id = setTimeout(() => {
      const newDeck = shuffleDeck(cardFaces)
      setDeck(newDeck)
      setSpread(true)
      triggerFanAnimation()
      setShuffling(false)
    }, 1200)

    timeoutsRef.current.push(id)
  }

  const reshuffle = () => {
    if (shuffling) return
    setShuffling(true)
    setSpread(false) // briefly hide fan, show stack

    const id = setTimeout(() => {
      const newDeck = shuffleDeck(cardFaces)
      setDeck(newDeck)
      setSpread(true)
      triggerFanAnimation()
      setShuffling(false)
    }, 900)

    timeoutsRef.current.push(id)
  }

  const handleButton = () => {
    if (!spread) startShuffle()
    else reshuffle()
  }

  // compute visible cards (limit to VISIBLE_COUNT)
  const visible = deck.slice(0, VISIBLE_COUNT)

  return (
    <main className="shuffle-page">
      <header className="shuffle-top">
        <h2 className="shuffle-header">Positive Tarot</h2>
        <p className="shuffle-sub">Take a breath, and shuffle your cards gently</p>
      </header>

      <section className="shuffle-deck" ref={containerRef}>
        {/* stacked small set shown when not spread */}
        {!spread && (
          <div className={`back-stack ${shuffling ? 'shuffling' : ''}`}>
            <img src={backCard} alt="card back" className="stack-back back-a" />
            <img src={backCard} alt="card back" className="stack-back back-b" />
            <img src={backCard} alt="card back" className="stack-back back-c" />
          </div>
        )}

        {/* fan spread of selectable backs */}
        {spread && (
          <div className={`spread-area ${spreadActive ? 'spread-active' : ''} ${shuffling ? 'animating' : ''}`}>
            {visible.map((_, i) => {
              const total = visible.length
              const mid = (total - 1) / 2
              const offset = i - mid

              // fan parameters (you can tweak these to taste)
              const angle = offset * 5 // degrees between cards in the fan
              const xStep = 30 // px horizontally between cards
              const yLift = 10 // how much the center is raised

              const style = {
                '--offset': `${offset * xStep}px`,
                '--angle': `${angle}deg`,
                '--lift': `${yLift}px`,
                zIndex: i, // ensures consistent layering
              } as CSSProperties

              return (
                <button
                  key={i}
                  className="spread-card"
                  style={style}
                  aria-label={`Card ${i + 1}`}
                  disabled={shuffling}
                  // later: onClick={() => onPick(i)}
                >
                  <img src={backCard} alt="card back" />
                </button>
              )
            })}
          </div>
        )}
      </section>

      <footer className="shuffle-actions">
        <button
          className="btn pink"
          onClick={handleButton}
          aria-pressed={shuffling}
          disabled={shuffling}
        >
          {shuffling ? 'Shuffling...' : spread ? 'Reshuffle' : 'Shuffle'}
        </button>
        <button className="btn pink" onClick={onBack}>
          Back
        </button>
      </footer>
    </main>
  )
}

export default ShufflePage
