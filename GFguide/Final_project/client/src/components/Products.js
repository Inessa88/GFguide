import {useState, useEffect, useContext} from 'react';
import {AppContext} from '../App'
import { useNavigate } from 'react-router-dom';
import React from 'react';
import axios from 'axios';



const Products = (props) =>{
    const[products, setProducts] = useState([]);
    const [searchProduct, setSearchProduct] = useState([]);
    const [productName, setProductName] = useState('');
    const [category, setCategory] = useState('');
    const [searchCategory, setSearchCategory] = useState([]);

    const {categoryList, setCategoryList} = useContext(AppContext);
    // const [selectedFile, setSelectedFile] = useState(null);


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

    // useEffect(()=>{
    //     fetch('/categories')
    //     .then(res => {
    //         if (res.status===200){
    //             return res.json()
    //         }else{
    //             throw new Error ("failed status")
    //             // navigate('/login')
    //         }
    //     })
    //     .then(data =>{
    //         setCategoryList(data)
    //     })
    //     .catch(e=>{
    //         console.log(e);
    //     },[])
    // })



    const handleSearch = (e) => {
        setProductName(e.target.value);
        console.log(productName);
      }
    
    const searchGFProduct = (e) => {
        e.preventDefault()
        fetch(`/search?q=${productName}`)
          .then(res => res.json())
          .then(data => {
            setSearchProduct(data)
            console.log(searchProduct);
          })
          .catch(e=>{
            console.log(e);
          })
      }

      const searchGFCategory = (e) => {
        e.preventDefault()
        fetch(`/search/category?q=${category}`)
          .then(res => res.json())
          .then(data => {
            setSearchCategory(data)
            console.log(searchCategory);
          })
          .catch(e=>{
            console.log(e);
          })
      }



    if(products.length === 0) return null

    return(
        <>
        <div>
            Search: <input type='text' name='search' onChange={handleSearch}/>
            <button onClick={searchGFProduct}>Search</button>
        </div>
        <div>
            Search by category: <select name='categoryId' value={category} onChange={(e)=>setCategory(e.target.value)}>
            {
                
                categoryList ? categoryList.map(item=>{
                        return(
                            <option value={item.id}>{item.name}</option>)
                        
                    }) : ''
            }
                
            </select>
            <button onClick={searchGFCategory}>Search</button>
        </div>


        


        <div>
            <div>
                {
                searchProduct ? searchProduct.map(item=>{
                    return(
                        <div key ={item.id}>
                            <p>{item.name}</p>
                            <img src= {item.url} alt="gf product" style={{width:'200px'}}/>
                            

                        </div>
                )
            }) : ''

            }
            </div>

            <div className="list">
            {
            searchCategory ? searchCategory.map(item=>{
                return(
                    <div key ={item.id}>
                        <p>{item.name}</p>
                        <img src= {item.url} alt="gf product" style={{width:'200px'}}/>
                    </div>
                )
            }) : ''

            }
            </div>
            <div className="list">

                {
            (searchProduct.length ===0 && searchCategory.length ===0 && products) ? products.map(item=>{
                return(
                    <div key ={item.id}>
                        <p>{item.name}</p>
                        <img src= {item.url} alt="product photo" style={{width:'200px'}}/>
                        

                    </div>
                )
            }) : ''

            }
            </div>
            

        </div>



        </>
    )
}

export default Products