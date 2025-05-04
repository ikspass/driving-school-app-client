import React from 'react'

export default function EventItem({event}) {
  return (
    <div className="event-item">
      {event.map((row, rowIndex) => 
        <p key={rowIndex}>{row}</p>
      )}
    </div>
  )
}
