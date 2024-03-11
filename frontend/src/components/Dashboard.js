import React, { useEffect, useState } from 'react'
import {Link, Outlet, useLocation, useNavigate} from 'react-router-dom'
import '../styling/Dashboard.css'
import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import logo from '../images/logo.png'
import user from '../styling/user.png'

const Dashboard = () => {

    const location = useLocation();
    let components = JSON.parse(localStorage.getItem('components'))
    const [isActive,setIsActive] = useState(false)
    const activeclassname = isActive ? 'text-active' : 'text-dark'
    const icon = 'bi-grid'
    
    useEffect(()=>{
        setIsActive(location.pathname === '/dashboard/courses')
    },[location.pathname])

    const handleLogout = ()=>{
        localStorage.removeItem('studentId')
        localStorage.removeItem('components')
        localStorage.removeItem('Path')
        localStorage.removeItem('phase_id')
        localStorage.removeItem('course_id')
        localStorage.setItem('currentComponent','Dashboard')
    }

  return (
    <div className='container-fluid '>
        <div className='row flex-nowrap'>
            <div className='col-auto col-md-4 col-xl-2 pl-sm-2 px-0 shadow'>
                <div className='d-flex flex-column align-items-center  align-items-sm-start px-3 pt-2 min-vh-100 '>
                    <div className='d-flex  align-items-center justify-content-center mb-4'>
                        <img src={logo} alt="goCosmic" className='img-fluid' style={{width:'40%'}}/>
                    </div>
                    
                    <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start mt-4" id="menu" style={{fontSize:'20px'}}>
                        
                        {
                            components.map(component => {
                                return (
                                    <Link key={component.Component_Name} to={component.Path} className="nav-link text-dark px-0" onClick={()=> {localStorage.setItem('currentComponent',component.Component_Name)}}>
                                        <li className="w-100 mb-4 ms-2 hover">
                                        <i className={`fs-4  ms-2 ${component.Logo_Name}`}></i>
                                            <span className="ms-4 d-none d-sm-inline" style={{fontWeight:'500'}}>{component.Component_Name}</span>
                                        </li>
                                    </Link>
                                )
                            })
                        }

                        <Link to='/' className="nav-link text-dark px-0" onClick={handleLogout}>
                            <li className="w-100 mb-4 ms-2 hover">
                                <i className="fs-4 bi-box-arrow-left ms-2"></i>
                                <span className="ms-4 d-none d-sm-inline" style={{fontWeight:'500'}}>Logout</span>
                            </li>
                        </Link>

                        {/* <li className="w-100 mb-2 ms-2 hover">
                            <i className="fs-4 bi-file-earmark-code ms-2"></i>
                            <span className="ms-2 d-none d-sm-inline"><strong>Projects</strong></span>
                        </li>
                        <li className="w-100 mb-2 ms-2 hover">
                            <i className="fs-4 bi-question-circle ms-2"></i>
                            <span className="ms-2 d-none d-sm-inline"><strong>Questions</strong></span>
                        </li>
                        <li className="w-100 mb-2 ms-2 hover">
                            <i className="fs-4 bi-briefcase ms-2"></i>
                            <span className="ms-2 d-none d-sm-inline"><strong>Job Copilot</strong></span>
                        </li>
                        <li className="w-100 mb-2 ms-2 hover">
                            <i className="fs-4 bi-trophy ms-2"></i>
                            <span className="ms-2 d-none d-sm-inline"><strong>Challenges</strong></span>
                        </li> */}
                        
                        {/* <li className="w-100 mb-2 ms-2 hover">
                            <i className="fs-4 bi-discord ms-2"></i>
                            <span className="ms-2 d-none d-sm-inline"><strong>Discord</strong></span>
                        </li>
                        <li className="w-100 mb-2 ms-2 hover">
                            <i className="fs-4 bi-compass ms-2"></i>
                            <span className="ms-2 d-none d-sm-inline"><strong>Explore</strong></span>
                        </li> */}
                        
                    </ul>

                </div>
            </div>
            <div className='col p-0 m-0 ' style={{backgroundColor:'#e5e4e2'}}>
                <div className='p-3 d-flex shadow-sm align-items-center justify-content-between bg-white' style={{height:'8vh'}}>
                    {/* <h5 className='me-4'>Gangadhar</h5> */}
                    <span className='mb-0 h4'><strong>{localStorage.getItem('currentComponent')}</strong></span>
                    <input type="search" placeholder='Search here..' className='m-2'/>
                    <img src={user}  style={{width:'3%',marginRight:'3%'}}/>
                </div>
                {/* <nav className='navbar navbar-light bg-white'>
                    
                </nav> */}
                <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default Dashboard
