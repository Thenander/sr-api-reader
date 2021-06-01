const monophonicPlayer = body => {
  body.addEventListener(
    'play',
    e => {
      const audio_elements = body.getElementsByTagName('audio')
      for (let i = 0; i < audio_elements.length; i += 1) {
        const audio_element = audio_elements[i]
        if (audio_element !== e.target) {
          audio_element.pause()
        }
      }
    },
    true
  )
}

export default monophonicPlayer
