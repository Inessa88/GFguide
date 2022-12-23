import {useState, useEffect, useContext} from 'react';
import {AppContext} from '../App'
import { useNavigate } from 'react-router-dom';
import React from 'react';
import FileUploader from './FileUploader'
import axios from 'axios';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {toast} from 'react-toastify'


const AddProductForm = (props) =>{
    const [name, setName] = useState("");
    const [category, setCategory] = useState("1");
    const [selectedFile, setSelectedFile] = useState(null);
    // const [categoryList, setCategoryList] = useState([]);

    const {categoryList, setCategoryList} = useContext(AppContext);
    
    const navigate = useNavigate();

        useEffect(()=>{
            fetch('/categories')
            .then(res => {
                if (res.status===200){
                    return res.json()
                }else{
                    throw new Error ("failed status")
                    // navigate('/login')
                }
            })
            .then(data =>{
                setCategoryList(data)
            })
            .catch(e=>{
                console.log(e);
            },[])
        })

    const submitForm = (e) => {
        // e.preventDefault();
        // let data = {
        //     "name": name,
        //     "category": category,
        //     "filename": selectedFile.name,
        // }
        const data = new FormData();
        data.append("name", name);
        data.append("category", category);
        data.append('file', selectedFile);
        axios({
            method: "post",
            url: "/upload",
            data: data,
          })
          .then((res) => {
            toast.success('Upload Success');
        })
          .catch((err) => toast.error('Upload Error'));
      };

    return(
        <>
        <form encType="multipart/form-data">
            Product Name: <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
            <h4>Select category of the product</h4>


            {/* <select name='categoryId' value={category} onChange={(e)=>setCategory(e.target.value)}>
                <option value='6'>Pasta</option>
                <option value='7'>Cookies</option>
                
            </select> */}



             <select name='categoryId' value={category} onChange={(e)=>setCategory(e.target.value)}>
            {
                
                categoryList ? categoryList.map(item=>{
                        return(
                            <option value={item.id}>{item.name}</option>)
                        
                    }) : ''
            }
                
            </select>
            <FileUploader 
                Success={({ file }) => setSelectedFile(file)}
                Error={({ error }) => alert(error)}
            />
            <ToastContainer/>
            
            <button onClick={submitForm}>Submit</button>
        </form>


        </>
    )
}

export default AddProductForm