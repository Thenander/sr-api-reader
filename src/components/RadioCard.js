import React, { useEffect, useState } from 'react'
import AudioPlayer from './AudioPlayer'
import '../scss/radiocard.scss'

const RadioCard = props => {
  const { handleChannel } = props
  const { name, color, image, liveaudio, scheduleurl } = props.channel
  const { url } = liveaudio
  const locl = 'P4'
  const filter = 'P4 Stockholm'
  const sizeAndFormat = '&pagination=false&format=json'

  const [scheduleEpisodes, setScheduleEpisodes] = useState()
  const [rightNow, setRightNow] = useState()

  useEffect(() => {
    if (scheduleurl) {
      const channelUrl = scheduleurl + sizeAndFormat
      try {
        const fetchChannel = async () => {
          const response = await fetch(channelUrl)
          if (response.status !== 404) {
            const data = await response.json()
            setScheduleEpisodes(data.schedule)
          }
        }
        fetchChannel()
      } catch (error) {
        console.log(error)
      }
    }
  }, [scheduleurl])

  useEffect(() => {
    const playingRightNow = () => {
      const regex = /\d/g
      const now = new Date()
      try {
        const found = scheduleEpisodes.find(e => {
          const numDate = e.endtimeutc.match(regex).join('')
          return now < numDate
        })
        setRightNow(found)
      } catch (error) {
        console.log(error)
      }
    }
    scheduleEpisodes && playingRightNow()
  }, [scheduleEpisodes])

  if ((name.startsWith(locl) && name !== filter) || !name.startsWith('P')) {
    return null
  }

  const style = {
    borderTop: `0.5em solid #${color}`,
  }

  const h2Style = {
    margin: '0 0 0 1rem',
    color: `#${color}`,
  }

  const getTime = n => {
    const time = new Date(n)
    const hh = ('0' + time.getHours()).slice(-2)
    const mm = ('0' + time.getMinutes()).slice(-2)
    return `${hh}:${mm}`
  }

  const setTime = time => {
    const regex = /\d/g
    const ms = parseInt(time.match(regex).join(''))
    return getTime(ms)
  }

  return (
    <div className="singleCard" style={style}>
      <div>
        <div className="headline">
          {rightNow && (
            <img
              onClick={() => handleChannel(props.channel, rightNow)}
              className="radioLink"
              src={image}
              alt="Radio channel logo"
            />
          )}

          <h2 style={h2Style}>{name}</h2>
        </div>
      </div>
      <div className="media">
        <hr />
        {rightNow && (
          <div className="info">
            {rightNow.imageurl ? (
              <img src={rightNow.imageurl} alt="Radio program logo" />
            ) : (
              <div className="fallbackImg"></div>
            )}
            <div className="rightNow">
              <p>
                {rightNow.title} {rightNow.subtitle}
              </p>
              <small>
                {setTime(rightNow.starttimeutc)} -{' '}
                {setTime(rightNow.endtimeutc)}
              </small>
            </div>
          </div>
        )}
        <AudioPlayer url={url} color={color} />
      </div>
    </div>
  )
}

export default RadioCard
