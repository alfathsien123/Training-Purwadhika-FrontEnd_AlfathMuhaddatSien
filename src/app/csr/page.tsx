// USESTATE
// - Mirip seperti variabel, digunakan untuk menyimpan data atau logic component/page
// - Setiap terjadi perubahan data, component/page akan dirender ulang

'use client'
import {useState, useEffect} from "react"
import axios from "axios"
import { IPost } from "../ssr/page"


export default function CSRPage(){
    const [number,setNumber] = useState(0)
    const [products, setProducts] = useState([
        {price: 10000, fruit: "Apel"},
        {price: 15000, fruit: "Anggur"},
    ])
    const [post,setPost] = useState([])
    
    const incrementNumber = ()=>{ setNumber(number+1)}
    const changeProduct = ()=>{
        const currProducts = [...products]
        
        const findIndex = currProducts.findIndex(item => item.fruit === "Anggur")
        currProducts[findIndex].price = 100000;
        
        setProducts(currProducts)
    }

    const fetchPost = async()=>{
        try{
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
            setPost(response?.data)
            // console.log(post);
        } catch (error) {
            console.log(error);
            
        }
        
    }

    // Mirip componentDidMount (OnInitialize (?))
    useEffect(()=>{
        fetchPost()
    }, [])
    
    // Mirip componentDidUpdate (OnChange)
    useEffect(()=>{
        console.log("DidUpdate");
    }, [number])

    // Mirip componentWillUnmount (OnDestroy (saat perpindahan halaman))
    useEffect(()=>{
        return()=>{
        console.log("Will Unmount");
        
        }
    },[])
    
    return(
        <>
            {console.log("Render")}
            <h1>
                {number}
            </h1>
            <button onClick={incrementNumber}>+</button>
            <h1>
                {products.map((product, index)=>{
                    return (
                        <div key={index}>
                            {product?.fruit}
                            {" : "} 
                            {product?.price}
                        </div>
                    )
                })}
            </h1>
            <button onClick={changeProduct}>Change Product</button>
            {
                !post.length?
                    <h1>Loading...</h1>
                :
                post?.map((post: IPost,i: number)=>{
                    return(
                        <h1 key={i}>
                            {post?.title}
                        </h1>
                    )
                })
            }
        </>
    )
}