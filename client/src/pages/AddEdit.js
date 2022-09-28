 import React, {useState,useEffect} from "react";
 import { useNavigate, useParams, Link } from "react-router-dom";
 import "./AddEdit.css";
 import axios from "axios";
 import { toast } from "react-toastify";

const initialState = {
    fname: "",
    lname: "",
    location: "",
    email: "",
    dob: "",
    education: "",
    about: "",

};

 const AddEdit = () => {
     const [state, setState ] = useState(initialState);

     const  { fname, lname, location, email, dob, education, about} = state;

     const navigate = useNavigate();

    const {id} = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/get/${id}`)
        .then((resp) => setState({...resp.data[0] }));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
    
        if(!fname || !lname || !location || !email || !dob || !education || !about) {
            toast.error("Please provide value into each input field");
        } 
            else {
             if (!id) {
            axios.post("http://localhost:5000/api/post", {
                fname,
                lname,
                location,
                email,
                dob,
                education,
                about
            }).then(() => {
                setState({fname: "", lname: "", location: "", email: "", dob: "", education: "", about: ""})
            })
            .catch((err) => toast.error(err.response.data));
             toast.success("Student Details Added Successfully");
        } else {
            axios
            .put(`http://localhost:5000/api/update/${id}`, {
                fname,
                lname,
                location,
                email,
                dob,
                education,
                about
            }).then(() => {
                setState({fname: "", lname: "", location: "", email: "", dob: "", education: "", about: ""});
            })
            .catch((err) => toast.error(err.response.data));
            toast.success("Student Details Updated Successfully");
        }
             setTimeout(() => navigate.push("/"), 500);
        }
     };
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setState({...state, [name]: value})
     }
    return(
         <div>
                 <form 
                
                 onSubmit={handleSubmit}
                >
                    <table 
                    style={{width: "100%" , padding: "15px"}}> 
                    <tr >
                    <th>
                    <label ><b><h2>Student Details</h2></b></label><br/> 
                    </th></tr>
                    <tr><td >
                      <label htmlFor="fname" style={{fontSize:"20px"}}>First Name</label></td>
                     <td style={{width: "35%" }}>
                     <input
                     type="text"
                     id="fname"
                     name="fname"
                     placeholder="Enter Your First Name"
                    value={fname || ""}
                     onChange={handleInputChange}
                     />
                    </td>
                    <td>
                    <label htmlFor="lname" style={{fontSize:"20px"}}>Last Name</label></td>
                    <td style={{width: "35%"}}>
                    <input
                    type="text"
                    id="lname"
                    name="lname"
                    placeholder="Enter Your Last Name"
                    value={lname || ""}
                    onChange={handleInputChange}
                    />
                     </td></tr>
                    <tr><td>
                    <label htmlFor="location" style={{fontSize:"20px"}}>Location</label></td>
                    <td style={{width: "30%"}}>
                    <input
                    type="text"
                    id="location"
                    name="location"
                    placeholder="Enter Your Location"
                    value={location || ""}
                    onChange={handleInputChange}
                    />
                   </td>
                    <td>
                    <label htmlFor="email" style={{fontSize:"20px"}}>Email</label>
                    </td>
                    <td style={{width: "30%"}}>
                    <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter Your EmailID"
                    value={email || ""}
                    onChange={handleInputChange}
                    />
                    </td>
                    </tr>
                    <tr>
                    <td>
                    <label htmlFor="dob" style={{fontSize:"20px"}}>Date Of Birth</label></td>
                    <td style={{width: "30%"}}>
                    <input
                    type="date"
                    id="dob"
                    name="dob"
                    placeholder="Enter Your DOB"
                    value={dob || ""}
                    onChange={handleInputChange}
                    />
                     </td>
                     <td>
                     <label htmlFor="education" style={{fontSize:"20px"}}>Education</label></td>
                     <td style={{width: "30%"}}>
                    <input
                    type="text"
                    id="education"
                    name="education"
                    placeholder="Enter Your Education"
                    value={education || ""}
                    onChange={handleInputChange}
                    />
                     </td></tr>
                     <tr>
                     <td>
                     <label htmlFor="about" style={{fontSize:"20px"}}>About</label>
                     </td>
                     <td>
                    <textarea style={{ fontSize: "18px"}}
                    width="60%"
                    type="text"
                    id="about"
                    name="about"
                    placeholder="Enter About You"
                    value={about || ""}
                    onChange={handleInputChange}
                    rows="8"
                    cols="55"/>
                     </td></tr>
                     <tr><td>
                    
                     <input type="submit" value={id ? "Update" : "save" }/>
                    <Link to="/">
                        <input type="button" value="Back"/>
                    </Link>
                    
                 </td>
                 </tr>
                 </table>
                 </form>
        </div>
     );
};
export default AddEdit;