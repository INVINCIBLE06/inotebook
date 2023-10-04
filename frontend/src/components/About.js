import React, {useContext} from 'react'
import noteContext from '../context/notes/noteContext'

const About = () => {
    const a = useContext(noteContext)
  return (
    <div>This is About {a.name} and he is in the class 5B</div>
  )
}

export default About;