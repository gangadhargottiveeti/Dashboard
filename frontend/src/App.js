import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Courses from './components/Courses';
import CoursePhases from './components/CoursePhases';
import CourseSections from './components/CourseSections';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}>
          <Route path = '/dashboard/courses' element={<Courses/>}></Route>
          <Route path='/dashboard/courses/course_phase' element={<CoursePhases/>}></Route>
          <Route path='/dashboard/courses/course_phase/course_section' element={<CourseSections/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
