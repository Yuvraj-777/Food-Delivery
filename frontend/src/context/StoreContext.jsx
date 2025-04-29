import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";
export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});
    const [isPromoApplied, setIsPromoApplied] = useState(false);
    const [activePromo, setActivePromo] = useState(null);
    const [foodList, setFoodList] = useState(food_list);
    const url = import.meta.env.VITE_API_URL;
    const [token,setToken] = useState("")

    // Valid promo codes and their discount percentages
    const validPromoCodes = {
        'WELCOME10': 10,
        'SAVE20': 20,
        'SPECIAL30': 30
    };

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
        if (token){
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if (token) {
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) 
        {
            if (cartItems[item] > 0) {
                let itemInfo = foodList.find((product) => product._id === item)
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    }

    const applyPromoCode = (code) => {
        if (validPromoCodes[code]) {
            setIsPromoApplied(true);
            setActivePromo(code);
            return true;
        }
        return false;
    };

    const getDiscountedAmount = () => {
        const total = getTotalCartAmount();
        if (!isPromoApplied || !activePromo) return total;
        
        const discountPercentage = validPromoCodes[activePromo];
        const discount = (total * discountPercentage) / 100;
        return total - discount;
    };

    const fetchFoodList = async () => {
        try {
            const response = await axios.get(url+"/api/food/list");
            if (response.data.success) {
                setFoodList(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching food list:", error);
            // Fallback to local food list if API fails
            setFoodList(food_list);
        }
    }

    const loadCartData = async (token) => {
        try {
            const response = await axios.post(url+"/api/cart/get",{},{headers:{token}});
            if (response.data.success) {
                setCartItems(response.data.cartData);
            }
        } catch (error) {
            console.error("Error loading cart data:", error);
        }
    }

    useEffect(()=>{
        async function loadData() {
            await fetchFoodList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData();
    },[])

    const contextValue = {
        food_list: foodList,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
        applyPromoCode,
        isPromoApplied,
        getDiscountedAmount,
        activePromo
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;