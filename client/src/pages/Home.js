import React , {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import "./Home.css";
import {toast} from "react-toastify";
import axios from "axios";

const Home = () => {
const [data, setData] = useState([]);

const loadData = async (id) => {
if(id){
    const response = await axios.get(`http://localhost:5000/api/get/${id}`);
    setData(response.data);  
}else{
    const response = await axios.get("http://localhost:5000/api/get");
    setData(response.data);
}
};

useEffect(() => {
loadData();
searchloadData();
}, []);

    const deleteContact = (id) => {
        if(
            window.confirm("Are you sure that you wanted to delete that contact ?")
        ) {
            axios.delete(`http://localhost:5000/api/remove/${id}`);
            toast.success("Contact Deleted Successfully");
            setTimeout(() => loadData(), 500);
          }
    };

    const searchloadData = async(id) => {
        const response = await axios.get(`http://localhost:5000/api/${id}`);
        setData(response.data);
        };
        
        const handleSubmit = (e) => {
            loadData(e);
        }
            
  return(
          <div >
                <form onSubmit= {handleSubmit} >
                 <table style={{marginTop:"20px",margin:"auto", width:"1200px"}}>
                     <tr style={{margin:"100px", textAlign:"left"}}>
                         <h2><b>Student Management System</b></h2>
                     </tr>
                <tr><td >
                
                <div class="col-md-4">
                <input style={{fontSize:"17px"}}type="text" id="search" name="search"
                placeholder= "Search ID"
                onChange= {(e) => handleSubmit(e.target.value)}
                />
                </div>
                </td>

                  <td style={{marginLeft:"0px"}}>
                    <Link to="/addContact">
                    <button className="btn btn-contact">Add</button>
                  </Link>
                 </td>
                 </tr>
                  </table>
                      
            
             <table className="styled-table" >
                 <thead>
                     <tr height="70px">
                         <th style={{textAlign: "center"}}>ID</th>
                         <th style={{textAlign: "center"}}>First Name</th>
                         <th style={{textAlign: "center"}}>Last Name</th>
                         <th style={{textAlign: "center"}}>Location</th>
                         <th style={{textAlign: "center"}}>Email</th>
                         <th style={{textAlign: "center"}}>DOB</th>
                         <th style={{textAlign: "center"}}>Education</th>
                         <th style={{textAlign: "center"}}>Action</th>
                         <th style={{textAlign: "center"}}>Delete</th>
                     </tr>
                 </thead>
                 <tbody>
                     {data.map((item, index) => {
                         return (
                             <tr style={{height: "80px",width:"100%"}} key={item.id}>
                                 <th scope="row">{item.id}</th>
                                 <td>{item.fname}</td>
                                 <td>{item.lname}</td>
                                 <td>{item.location}</td>
                                 <td>{item.email}</td>
                                 <td>{item.dob}</td>
                                 <td>{item.education}</td>
                                 <td>
                                     <Link to={`/update/${item.id}`}>
                                    <button className="btn btn-edit">Edit</button>
                                     </Link>
                                     
                                     </td>
                                     <td>
                                    <button 
                                    className="btn btn-delete" 
                                     onClick={() => deleteContact(item.id)}
                                     >
                                         Delete
                                     </button>
                                     
                                 </td>
                             </tr>
                         );
                     })}
                 </tbody>
            </table>
            
            </form>
      </div>
  );
 };

 export default Home;