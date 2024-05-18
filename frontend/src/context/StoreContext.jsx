import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

  const [cartItems, setCartItems] = useState({});
  const url = "http://localhost:4000";
  const [token, setToken] = useState("")
  const [food_list, setFood_list] = useState([])
  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if(token) {
      await axios.post(`${url}/api/cart/add`,{itemId}, {headers:{token}})
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    await axios.post(`${url}/api/cart/del`,{itemId}, {headers:{token}})
  };
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };
  const fetchFoodList = async () => {
    // api call
    const response = await axios.get(`${url}/api/food/list`)
    setFood_list(response.data.data)
  }//to run this page whenever this page is loaded

const loadCartData = async (token)=> {
  const response = await axios.post(`${url}/api/cart/get`, {}, {headers:{token}});
  setCartItems(response.data.cartData)
}
  // to avoid siging out on reloading of page,
  //  we chk local storage if it has a token then we store it in tokenState
  useEffect(()=>{    
    async function loadData() {
      await fetchFoodList();
      if(localStorage.getItem("token")){
        setToken(localStorage.getItem("token"))

        // to update cartState every time when page reloads we will call loadCartData()
        await loadCartData(localStorage.getItem("token"))
      }
    }
    loadData();
  },[])

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
