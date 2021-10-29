import {createContext, useReducer, useState} from "react";

export const ThemeContext = createContext();


export const THEME_ACTIONS = {
    REMOVE_FROM_CART: 'removeItem',
    ADD_TO_CART: 'addItem',
}
export function cartReducer (state, action){
    console.log("in themeprovider");
    switch (action.type){
        case 'removeItem':
        {
            console.log("removing item");
            console.log(action.testy);
           return(action.testy);
        }
    }
    let tmpArray = [];
    if(state.shoppingCart == false){
        console.log("in false")
        
        tmpArray.push(action);
        console.log(tmpArray);
        return tmpArray;
    }
    
    tmpArray = Object.values(state);
    console.log(tmpArray);
    tmpArray.push(action);
    return (tmpArray);
         
}
const Themeprovider = ({ children }) =>{
    const [shoppingCart, shoppingCartDispatch] = useReducer(cartReducer, {shoppingCart: false});
    const [allChars, setAllChars] = useState(false);
    return(
        <ThemeContext.Provider value ={{shoppingCart:{shoppingCart, shoppingCartDispatch}, allChars:{allChars, setAllChars}}}>
            {children}
        </ThemeContext.Provider>
    )
   
};

export default Themeprovider

//https://dev.to/elisealcala/react-context-with-usereducer-and-typescript-4obm