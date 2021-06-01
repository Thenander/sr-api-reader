import React from 'react'

const AudioPlayer = props => {
  const { url, color } = props

  const style = {
    border: `5px solid #${color}`,
  }

  return (
    <audio style={style} controls id="audioPlayer" preload="none">
      <source src={url} type="audio/mpeg" />
      Your browser does not support the <code>audio</code> element.
    </audio>
  )
}

export default AudioPlayer
