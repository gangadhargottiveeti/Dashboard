import React, { useEffect, useState } from 'react'
import Phase from './Phase'
import axios from 'axios'

const CoursePhases = () => {

  const [phases,setphases] = useState([])
  const student_id = localStorage.getItem('studentId')
  const pathName = localStorage.getItem('Path')
  useEffect(()=>{
    axios.get('http://localhost:3001/fetch_phases/',{params : {
      studentId : student_id,
      pathName : pathName
    }})
    .then(result =>{
      if(result.data.Status){
        setphases(result.data.Result)
      } else{
        console.log("Error : "+result.data.Error)
      }
    }).catch(err => console.log("Error fetching the data"))
  },[])
  return (
    <div>
        <div className='ms-4 bg-white mt-4 p-1 rounded' style={{width:'95%'}}>
            <h3 className='p-2'>Personalised Path for you</h3>
        </div>

        {
          phases.map(phase => {
            return <Phase key={phase.id} id={phase.id} course_id={phase.course_id} phase={phase.id_phase} title={phase.phase_name} desc={phase.phase_desc}/>
          })
        }

    </div>
  )
}

export default CoursePhases
