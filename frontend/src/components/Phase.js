import React from 'react'
import { useNavigate } from 'react-router-dom'
import TruncatedText from './TruncatedText'

const Phase = ({id,course_id,phase,title,desc}) => {

  const navigate = useNavigate()
  const maxWords = 50

  const handlePhaseClick = ()=>{
    localStorage.setItem('phase_id',id)
    localStorage.setItem('course_id',course_id)
    navigate('/dashboard/courses/course_phase/course_section')
  }

  return (
    <div className='ms-4 bg-white mt-4 mb-4 p-4 rounded d-flex flex-column' style={{width:'95%'}}>
        <h4>{title}</h4>
        <div className='w-50'>
          <TruncatedText text={desc} maxWords={maxWords} />
        </div>
        <button type="submit" className='btn btn-warning rounded' style={{width:'15%'}} onClick={handlePhaseClick}>Phase {phase}</button>
    </div>
  )
}

export default Phase
