import React, { useEffect } from 'react'
import '../scss/modal.scss'

const ProgramModal = props => {
  const channel = props.data[0]
  const episode = props.data[1]
  const { tagline, color, image } = channel
  const { title, subtitle, description, imageurl } = episode

  const style = {
    backgroundColor: `#${color}`,
  }

  let mod = document.getElementById('exampleModal')

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    mod = document.getElementById('exampleModal')
  }, [])

  const hideMod = () => {
    mod.style.display = 'none'
    props.handleClearData()
  }

  return (
    <div
      className="modal"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content" style={style}>
          <div className="modal-header">
            <img src={image} alt="Radio station logo" />
            <button
              onClick={hideMod}
              type="button"
              className="btn-close white"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {tagline}
            <div className="now">
              <div>
                <img src={imageurl} alt="Program Episode" />
              </div>
              <div>
                <h4>
                  {title} {subtitle}
                </h4>
                {description}
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button onClick={hideMod} type="button" className="btn btn-light">
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProgramModal
