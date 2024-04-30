import React, { useContext }from 'react'
import './FoodItem.css'
import { assets, food_list } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext';



const FoodItem = ({id,name,price,image,description}) => {
 
  const {cartItems, addToCart, removeFromCart} = useContext(StoreContext)

  return (
    <div className='food-item'>
        <div className="food-item-image-container">
            <img src={image} alt="" className="food-item-image" />
            {!cartItems[id]
              ? <img src={assets.add_icon_white} onClick={()=>addToCart(id)} alt="" className="add" />
              : <div className="food-item-counter">
                  <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt="" />
                  <p>{cartItems[id]} </p>
                  <img onClick={()=>addToCart(id)} src={assets.add_icon_green} alt="" />
                </div> 

            }
        </div>
        <div className="food-item-info">
            <div className="food-item-name-rating">
                <p>{name}</p>
                <img src={assets.rating_starts} alt="" />
            </div>
            <p className="food-item-desc">{description}</p>
            <p className="food-item-price">€{price}</p>
        </div>

    </div>
  )
}

export default FoodItem