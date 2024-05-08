import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import {toast} from "react-toastify"


const List = ({url}) => {
  
  const [list, setList] = useState ([])

  const fetchList = async () =>{
    // api call
    const response = await axios.get(`${url}/api/food/list`);
    // console.log(response.data);
    if (response.data.success){
      setList(response.data.data)
    } else {
      toast.error("Error")
    }
  }
  
const delFood = async (foodId)=>{
  // console.log(foodId);

  // api call
  const response =await axios.post(`${url}/api/food/delete`, {id:foodId})

  // to display updated page
  await fetchList();
  if(response.data.success) {
    toast.success("Item deleted successfully")
  } else {
    toast.error("Error")
  }
}

  useEffect(()=>{
    fetchList();
  }, [])
  
  return (
    <div className="list add flex-col">
      <p>All Food List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Price</b>
          <b>Category</b>
          <b>Action</b>
        </div>
        {list.map((item, index)=>{
          return(
            <div key={index} className="list-table-format">
              <img src={`${url}/images/`+item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.price} €</p>
              <p>{item.category} </p>
              <p onClick={()=>delFood(item._id)} className='cursor'>X</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List