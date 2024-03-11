import express,{query} from "express";
import cors from 'cors'
import con from "./db.js";
// import multer from "multer";
// import path from "path";

const app = express()
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))

app.use(express.json({limit:'50mb'}))
app.use(express.static("Public"))

app.post("/student_login", (req, res)=>{
    const {email, nim} = req.body;
    const sql = "SELECT * FROM mahasiswa where email = ? and nim = ?";
    con.query(sql, [email,nim], (err, result) => {
        if(err) return res.json({loginStatus : false, Error : "Query Error"});
        if(result.length > 0){
            return res.json({loginStatus: true, id : result[0].id_mahasiswa});
        } else{
            return res.json({loginStatus: false, Error: "Wrong email or password"});
        }
    })
})

app.get('/fetch_components/:studentId', (req, res) => {
  const studentId = req.params.studentId;
  // Step 1: Fetch component names with binary value 1 based on student ID
  const query1 = `
    SELECT *
    FROM dashboard
    WHERE student_id = ${studentId};
  `;
  con.query(query1, (err, results1) => {
    if (err) {
      res.json({ Status: false, error: 'Internal server error' });
      return;
    }

    // Extract component names with binary value 1
    const componentNames = [];
    if (results1.length > 0) {
      const components = results1[0];
      if (components.Dashboard === 1) componentNames.push('Dashboard');
      if (components.Craftedge === 1) componentNames.push('Craftedge');
      if (components.Profile === 1) componentNames.push('Profile');
      if (components.Projects === 1) componentNames.push('Projects');
      if (components.Questions === 1) componentNames.push('Questions');
      if (components.JobCopilot === 1) componentNames.push('JobCopilot');
      if (components.Challenges === 1) componentNames.push('Challenges');
      if (components.Discord === 1) componentNames.push('Discord');
      if (components.Explore === 1) componentNames.push('Explore');
    }

    // Step 2: Fetch logos and paths from the second table based on the fetched component names
    const query2 = `
      SELECT Component_Name, Logo_Name, Path
      FROM components
      WHERE Component_Name IN (?);
    `;

    con.query(query2, [componentNames], (err, results2) => {
      if (err) {
        res.json({ Status: false ,error: 'Internal server error' });
        return;
      }

      // Send the fetched logos and paths as a response
      res.json({Status : true, Result : results2});
    });
  });
});

app.get('/fetch_courses/:studentID', (req, res) => {
    const studentID = req.params.studentID;
    const sql = `SELECT overall_score from 6_pillers_score WHERE std_id = ${studentID}`;
    // console.log(studentID)
  
    con.query(sql, (err, result) => {
      if (err) {
        res.json({ Status: false, message: 'Error fetching overall score' });
        return;
      }
      if (result.length === 0) {
        res.json({ Status: false, message: 'Student ID not found' });
        return;
      }
  
      const overallScore = result[0].overall_score;
  
      // Fetch course names based on overall score where StatusCustom is 1
      const courseNamesSqlCustom = `SELECT course FROM paths WHERE from_range <= ${overallScore} AND to_range >= ${overallScore} AND status_custom = 1`;
  
      // Fetch course names where StatusSolve is 1
      const courseNamesSqlAll = `SELECT course FROM paths WHERE status_all = 1`;
  
      con.query(courseNamesSqlCustom, (err, resultCustom) => {
        if (err) {
          res.json({ Status: false, message: 'Error fetching path names (custom)' });
          return;
        }
        const courseNamesCustom = resultCustom.map(row => row.course);
  
        con.query(courseNamesSqlAll, (err, resultAll) => {
          if (err) {
            res.json({ Status: false, message: 'Error fetching path names (solve)' });
            return;
          }
          const courseNamesAll = resultAll.map(row => row.course);
  
          res.json({ Status: true, courseNamesCustom, courseNamesAll });
        });
      });
    });
});

app.get('/fetch_phases/', (req, res)=>{
  const {studentId,pathName} = req.query
  // console.log(studentId,pathName)
  const sql = `SELECT id from paths where course = ?`
  con.query(sql,[pathName],(err, result)=>{
    if(err) return res.json({Status : false, Error : "Query Error"})
    
    if(result.length === 0){
      return res.json({Status: false, Error: "Wrong path name"});
    }

    const path_id = result[0].id
    const sql2 = `SELECT course_id from mapping where mahasiswa_id = ? and path_id = ?`
    con.query(sql2,[studentId,path_id],(err,result2)=>{
      if(err) return res.json({Status : false, Error : "Query Error"})

      if(result2.length === 0){
        return res.json({Status: false, Error: "Wrong student"});
      }

      const course_id = result2[0].course_id
      const sql3 = `SELECT id, course_id, phase_name, id_phase, phase_desc from phase where course_id = ?`
      con.query(sql3,[course_id],(err, result3)=>{
        if(err) return res.json({Status : false, Error : "Query Error"})
    
        if(result3.length === 0){
          return res.json({Status: false, Error: "Wrong path name"});
        }
        return res.json({Status : true, Result : result3})
      })
    })
  })
})

app.get('/fetch_sections/:phase_id',(req,res)=>{
  const phase_id = req.params.phase_id
  const sql = `SELECT id,section_name from sections where phase_id = ?`
  con.query(sql,[phase_id],(err,result)=>{
    if(err) return res.json({Status : false, Error : "Query Error"})
    
    if(result.length === 0){
      return res.json({Status: false, Error: "Wrong phase id"});
    }
    res.json({Status: true, Result:result})
  })
})

app.get('/fetch_section_content/:phase_id',(req,res)=>{
  const phase_id = req.params.phase_id
  const sql = `SELECT * from content where phase_id = ?`
  con.query(sql,[phase_id],(err,result)=>{
    if(err) return res.json({Status : false, Error : "Query Error"})
    
    if(result.length === 0){
      return res.json({Status: false, Error: "Wrong section id"});
    }
    res.json({Status: true, Result:result})
  })
})

app.listen(3001, ()=>{
    console.log("Server is running");
})