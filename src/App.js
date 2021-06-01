import { useEffect, useState } from 'react'
import RadioCards from './components/RadioCards'
import './scss/main.scss'
import monophonicPlayer from './functions/monophonicPlayer'

function App() {
  const [channels, setChannels] = useState()

  useEffect(() => {
    const url = 'https://api.sr.se/api/v2/channels?format=json&pagination=false'
    const fetchData = async () => {
      const response = await fetch(url)
      const data = await response.json()
      setChannels(data.channels)
    }
    fetchData()
  }, [])

  // const monophonicPlayer = body => {
  //   body.addEventListener(
  //     'play',
  //     e => {
  //       const audio_elements = body.getElementsByTagName('audio')
  //       for (let i = 0; i < audio_elements.length; i += 1) {
  //         const audio_element = audio_elements[i]
  //         if (audio_element !== e.target) {
  //           audio_element.pause()
  //         }
  //       }
  //     },
  //     true
  //   )
  // }

  document.addEventListener('DOMContentLoaded', () => {
    monophonicPlayer(document.body)
  })

  return (
    <div className="container">
      <div className="top">
        <h1>RADIO SR</h1>
      </div>
      {channels && <RadioCards channels={channels} />}
    </div>
  )
}

export default App
