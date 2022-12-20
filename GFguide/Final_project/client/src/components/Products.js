import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import React from 'react';
import FileUploader from './FileUploader'
import axios from 'axios';


const Products = (props) =>{
    const[products, setProducts] = useState([]);
    const [name, setName] = useState("");
    const [category, setCategory] = useState("1");
    const [selectedFile, setSelectedFile] = useState(null);


    const navigate = useNavigate()

    useEffect(()=>{
        fetch('/products')
        .then(res => {
            if (res.status===200){
                return res.json()
            }else{
                navigate('/login')
            }
        })
        .then(data =>{
            setProducts(data)
        })
        .catch(e=>{
            console.log(e);
        },[])
    })


    const submitForm = () => {
        // storeToPublicFolder(selectedFile);
        let data = {
            "name": name,
            "category": category,
            "filename": selectedFile.name,
        }
      
        axios({
            method: "post",
            url: "/products",
            data: data,
          })
          .then((res) => {
            alert("File Upload success");
          })
          .catch((err) => alert("File Upload Error"));
      };

    if(products.length === 0) return null

    return(
        <>
        <div>
            {
            products ? products.map(item=>{
                return(
                    <div key ={item.id}>
                        <p>{item.name}</p>
                        <img src= {item.url} alt="product photo" style={{width:'200px'}}/>
                        

                    </div>
                )
            }) : 'Unauthorized'

            }

        </div>

        <form>
            Product Name: <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
            <h4>Select category of the product</h4>


            <select name='categoryId' value={category} onChange={(e)=>setCategory(e.target.value)}>
                <option value='1'>Pasta</option>
                <option value='2'>Cookies</option>
                
            </select>
            <FileUploader test={'5'}
                Success={({ file }) => setSelectedFile(file)}
                Error={({ error }) => alert(error)}
            />
            {/* <FileUploader
                Success={(file) => setSelectedFile(file)}
                Error={({ error }) => alert(error)}
            /> */}
            <button onClick={submitForm}>Submit</button>
        </form>


        </>
    )
}

export default Products