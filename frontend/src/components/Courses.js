import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'

const Courses = () => {

    const [customCourses,setCustomCourses] = useState([])
    const [allCourses,setAllCourses] = useState([])
    const [selectedCourses, setSelectedCourses] = useState('');
    const [isButton, setIsButton] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()

    const student_id = localStorage.getItem("studentId")


      useEffect(()=>{
        const fetchCourses = ()=>{
            axios.get("http://localhost:3001/fetch_courses/"+student_id)
            .then(result => {
                if(result.data.Status){
                    setCustomCourses(result.data.courseNamesCustom)
                    setAllCourses(result.data.courseNamesAll)
                }else{
                    alert(result.data.message)
                }
            }).catch(err => console.log("error"+err))
        }
        fetchCourses()
      },[])

  return (
    <div className='courses-container d-flex'>
        <div className='custom-courses bg-white mt-2 me-2 ms-2 w-50 d-flex flex-column'>
            <h4 className='text-center mt-4'> <strong>Tailored for You</strong> </h4>
            <div className='course-list d-flex flex-column'>
                <ul className='list-group m-2' >
                    {
                        customCourses.map((courseName, index)=>(
                            <li key={index} className='list-group-item list-group-item-action'>
                                <input type="checkbox" 
                                checked={selectedCourses.includes(courseName)}
                                onChange={() => {
                                    setSelectedCourses(courseName)
                                    setIsButton(true)}}/>
                                <span className='ms-4'>{courseName}</span>
                            </li>
                        ))
                    }
                    <div className='d-flex justify-content-center'  >
                        {
                            isButton ? <button type="submit" className='btn mt-4 w-25 btn-warning'  
                            onClick={()=> {
                                localStorage.setItem('Path', selectedCourses)
                                navigate('/dashboard/courses/course_phase')}}
                             >Submit</button>
                            : <button type="submit" className='btn mt-4 w-25 btn-warning'  disabled >Submit</button>
                        }
                    </div>
                </ul>
            </div>
        </div>
        <div className='all-courses bg-white mt-2 me-2 ms-2 w-50 d-flex flex-column'>
            <h4 className='text-center mt-4'><strong>Available Paths</strong></h4>
            <div className='course-list d-flex flex-column'>
                <ul className='list-group m-2'>
                    {
                        allCourses.map((courseName, index)=>(
                            <li key={index} className='list-group-item list-group-item-action'>
                                <input type="checkbox" 
                                checked={selectedCourses.includes(courseName)}
                                onChange={() => {setSelectedCourses(courseName)
                                                setIsButton(true)}}/>
                                <span className='ms-4'>{courseName}</span>
                            </li>
                        ))
                    }
                    <div className='d-flex justify-content-center'>
                    {
                        isButton ? <button type="submit" className='btn mt-4 w-25 btn-warning'  
                        onClick={()=> {
                            localStorage.setItem('Path', selectedCourses)
                            navigate('/dashboard/courses/course_phase')}} 
                        >Submit</button>
                        : <button type="submit" className='btn mt-4 w-25 btn-warning'  disabled >Submit</button>
                    }
                    </div>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Courses
