import React, { useEffect, useState } from 'react'
import Section from './Section'
import axios from 'axios'
import '../styling/Dashboard.css'

const CourseSections = () => {

    const [showComponent, setShowComponent] = useState(1)
    const [activeButton, setActiveButton] = useState(1)

    const [content,setContent] = useState([])
    const [sections,setSections] = useState([])

    const phase_id = localStorage.getItem('phase_id')
    // const course_id = localStorage.getItem('course_id')

    useEffect(()=>{
      const fetchData = async ()=>{
        await axios.get('http://localhost:3001/fetch_sections/'+phase_id)
        .then(res => {
          if(res.data.Status){
            // console.log(res.data.Result)
            setSections(res.data.Result)
          }else{
            console.log(res.data.Error)
          }
        }).catch(err => console.log(err))
        
        await axios.get('http://localhost:3001/fetch_section_content/'+phase_id)
        .then(res => {
          if(res.data.Status){
            console.log(res.data.Result)
            setContent(res.data.Result)
          }else{
            console.log(res.data.Error)
          }
        }).catch(err => console.log(err))

      }
      fetchData()
      
    },[])
  return (
    <div style={{position:'relative'}}>

      <div className='d-flex flex-column p-4 m-2 rounded' style={{position:'absolute',top:'5vh', right:'13vh ',backgroundColor:'#fff', boxShadow:'0 0 8px 4px rgba(0,0,0,0.3'}}>
        <strong className='mb-2 text-center'>Sections</strong>
        {
          sections.map((section,index) => {
            return <button key={section.id} onClick={()=> {setShowComponent(index+1); setActiveButton(index+1 === activeButton ? null : index+1)}} className={`mb-2 ${activeButton === index+1 ? 'sectionButton' : 'btn'}`}>{section.section_name}</button>
          })
        }
      </div>

      <div className='m-2'>
        {
            showComponent && <Section 
            no={showComponent} name={sections[showComponent - 1]?.section_name} l_go={content[showComponent - 1]?.l_go} 
            l_out={content[showComponent - 1]?.l_out} time={content[showComponent - 1]?.time_required} videos={content[showComponent - 1]?.videos} 
            tutorials={content[showComponent - 1]?.tutorials}/>
        }
      </div>
    </div>
  )
}

export default CourseSections
