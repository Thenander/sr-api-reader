import React, { useState } from 'react'
import RadioCard from './RadioCard'
import ProgramModal from './ProgramModal'
import '../scss/radiocard.scss'

const RadioCards = props => {
  const { channels } = props

  const [data, setData] = useState()

  const channelHandler = (channel, rightNow) => {
    const data = [channel, rightNow]
    setData(data)
  }

  const clearDataHandler = () => {
    setData(null)
  }

  return (
    <>
      {data && <ProgramModal data={data} handleClearData={clearDataHandler} />}
      <div className="cards">
        {channels.map(channel => {
          return (
            <RadioCard
              channel={channel}
              key={channel.id}
              handleChannel={(e, f) => channelHandler(e, f)}
            />
          )
        })}
      </div>
    </>
  )
}

export default RadioCards
