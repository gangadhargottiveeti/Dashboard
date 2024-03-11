import React from 'react'
import { useNavigate } from 'react-router-dom'

const Section = ({no,name,l_go,l_out,time,videos,tutorials}) => {
    const navigate = useNavigate()
    const button = "<- Back"
  return (
    <div className='container bg-white rounded d-flex flex-column p-2' style={{height:'90vh', overflowY:'scroll'}}>
      <div className='mb-2'>
        <button onClick={()=> navigate('/dashboard/courses/course_phase/')} className='btn text-warning'>{button}</button>
      </div>

      <div className='mt-4 ms-4'>

        <div className='d-flex justify-content-between me-4 mb-2'>
          <h5>Section {no}: {name}</h5>
        </div>

        <div style={{width:'60%'}}>
          <p> <strong>Goal : <br/></strong> {l_go}</p>
          <p> <strong>Learning Outcome :</strong> <br/> {l_out}</p>
        </div>
        <div>
          <h5>Videos</h5>
          <p>click the link to see the videos</p>
          <a href={videos} target='#' className='link-underline-light'>Video</a> <br/>
          <a href={tutorials} target='#' className='link-underline-light'>Tutorial</a>
        </div>
      </div>

      {/* <div className='mb-2 ms-4 mt-4'>
        <button className='btn btn-warning me-4 '>Prev</button>
        <button className='btn btn-warning'>Next</button>
      </div> */}
    </div>
  )
}

export default Section
