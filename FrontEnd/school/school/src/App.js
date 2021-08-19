import './App.css';
import axios from 'axios';
import React,{useState} from 'react';
import TextField from "@material-ui/core/TextField";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import SplitPane from 'react-split-pane';

function App() {

  const [name, setName] = useState("")
  const [getDate, setDate] = useState("2020-08-08")
  const [getGender, setGender] = useState("")
  const [getClass, setClass] = useState("i")
  const [getDiv, setDiv] = useState("A")
  const [getData, setData] = useState([])

  React.useEffect(() => {
    fetchData()
  },[]);

  function fetchData(){

    const axios = require('axios');
      axios.get('http://localhost:8080/student/getStudents')
       .then(function (response) {
         setData(response.data)
     })
      .catch(function (error) {
      console.log(error);
      alert("something error") 
    });  
  }
  
  function compareObjects(object1, object2, key) {

    const obj1 = object1[key].toUpperCase()
    const obj2 = object2[key].toUpperCase()
  
    if (obj1 < obj2) {
      return -1
    }
    if (obj1 > obj2) {
      return 1
    }
    return 0
  }

  function getRows() {

    let rows = [];
    getData.sort((item1, item2) => {
      return compareObjects(item1, item2, 'name')
    })
    console.log(getData)
    rows.push(<tr style={{border: '1px solid black'}}>
      <th style={{border: '1px solid black'}}>Id</th>
      <th style={{border: '1px solid black'}}>Name</th>
      <th style={{border: '1px solid black'}}>Class</th>
      <th style={{border: '1px solid black'}}>Division</th>
      <th style={{border: '1px solid black'}}>Gender</th>
      <th style={{border: '1px solid black'}}>Dob</th>
      </tr>)
      getData.map((element) => {
        rows.push(<tr style={{border: '1px solid black'}}>
             <td align='center' style={{border: '1px solid black'}}> {element.id} </td>
              <td align='center' style={{border: '1px solid black'}}>{element.name}</td>
              <td align='center' style={{border: '1px solid black'}}>{element.cls}</td>
              <td align='center' style={{border: '1px solid black'}}>{element.div}</td>
              <td align='center' style={{border: '1px solid black'}}>{element.gen}</td>
              <td align='center' style={{border: '1px solid black'}}>{element.dob}</td>
         </tr>);
      });
    return rows;
  }

  function dateChange(event){
    setDate(event.target.value);
  }

  function ClassChange(event){
    setClass(event.target.value)
  }

  function genderChange(event){
    setGender(event.target.value)
  }
  
  function divisionChange(event){
    setDiv(event.target.value)
  }

  function submitPressed() {

    if (!name.match(/^[a-zA-Z ]+$/) ){
      alert("Please enter a valid name")
      return
    }

    axios.post('http://localhost:8080/student/create', {
      name: name,
      cls: getClass,
      div: getDiv,
      dob: getDate,
      gen: getGender
    })
    .then(function (response) {
      if (response.data.status !== "success"){
        alert(response.data.status)
      }else{
        alert("data saved successfully")
        fetchData()
      }
    })
    .catch(function (error) {
      console.log(error);
      alert("something error")
    });
  }

  return (
    <SplitPane split="vertical" minSize={500}>

  <div style = {{
    marginLeft: 10,
    backgroundColor: 'lightgreen',
    border: '2px solid black'
  }}>
    <h1 align = 'center'> Student Details </h1>
    <div style ={{
    marginLeft:40
    }}>
    <TextField
        value = {name}
        label = "Enter your name"
        onChange={(e)=>{setName(e.target.value);}}
    />
    </div>
  <div  style ={{
    marginLeft:40
  }}>
    <br></br>
    <label for="dob">Dob: </label>
    <input type="date" id="dob" name="birthday" value={getDate} onChange={dateChange} />
    {/* {console.log(getDate)} */}
        <br></br>
        <br></br>
        </div> 
    <div style ={{
      marginLeft:40
    }}>
    <label>Class: </label>
    <select name='option' onChange={ClassChange}>
    <option value="i">i</option>
    <option value="ii">ii</option>
    <option value="iii">iii</option>
    <option value="iv">iv</option>
    <option value="v">v</option>
    <option value="vi">vi</option>
    <option value="vii">vii</option>
    <option value="viii">viii</option>
    <option value="ix">ix</option>
    <option value="x">x</option>
    <option value="xi">xi</option>
    <option value="xii">xii</option>
    </select>
    <br></br>
    <br></br>

    <label>Division: </label>
    <select name='option' onChange={divisionChange}>
    <option value="A">A</option>
    <option value="B">B</option>
    <option value="C">C</option>
    </select>
    <br></br>
    <br></br>
  </div>

  <div style ={{
    marginLeft:40
  }}>

  <FormControl component="fieldset">
  <label>Gender</label>
  <RadioGroup aria-label="gender" name="gender" value={getGender} onChange={genderChange}>
    <FormControlLabel value="female" control={<Radio />} label="Female" />
    <FormControlLabel value="male" control={<Radio />} label="Male" />
  </RadioGroup>
</FormControl>
  </div>

  <div>
  <button style={{margin: '0 auto', display: "flex", backgroundColor: 'lightblue'}} onClick={submitPressed}>Submit</button>
  </div>
</div>

<div style = {{
    marginLeft: 20,
    marginRight: 10,
    backgroundColor: 'lightgreen',
    border: '2px solid black'
  }}>

<h1 align = 'center'>Student Data</h1>
{console.log(getData)}


  <table align='center' style={{border: '1px solid black'}}>

    {getRows()}

  </table>

 </div>
</SplitPane>
  );
}

export default App;
