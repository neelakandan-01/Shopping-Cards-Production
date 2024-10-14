import React, { useEffect, useState } from 'react'
import './products.css';

const Products = () => {
    const[products,setProducts]=useState([])
    const[isLoading,setIsLoading]=useState(true)
    const[error,setError]=useState(null)
    const [searchTerm, setSearchTerm] = useState(''); // State for search term

    const API= "https://dummyjson.com/carts";
    var featchdata=async()=>{
   try{

        const response=await fetch(API);
        if(!response.ok){
            throw new Error("Data Not Found")
        }
        const data=await response.json();
        let myproducts= data.carts;
        myproducts= myproducts.flatMap(m => m.products)
        console.log(myproducts)
        setProducts(myproducts)
        setIsLoading(false)
    
   }catch(error){
        setError(error)
        setIsLoading(false)
   }
} 
   useEffect(()=>{
    featchdata();
   },[])

   const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase()); // Update the search term
};

const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLocaleLowerCase()) // Case-insensitive search
);

 

    if(error) return <div>Error : {error}</div>
    if(isLoading) return <div className='.loader-container'><div className='loader'></div></div>

  return (
    <div >
        <div style={{textAlign:'center'}}>
        <h1>Welcome to Shopping Mart</h1>
        <input 
                type="text" 
                placeholder="Search products..." 
                onChange={handleSearchChange} 
                className='search-box'
            />
        </div>
            <div className='container'>
            
                {filteredProducts.map((product)=>(
                    <div key={`${product.title}-${product.price}-${product.id}`} className='card'> 
                            <img src={product.thumbnail} alt={product.id} className='card-img' />
                            <div className='card-body'>
                            <h5>{product.title}</h5>
                            <p className='card-price'>${product.price}</p>
                            <p>Quantity : {product.quantity}</p>
                            </div>
                    </div>
                ))}
            </div>     
    </div>
  )
}

export default Products