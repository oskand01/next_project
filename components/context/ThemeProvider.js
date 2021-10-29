import {createContext, useReducer, useState} from "react";

export const ThemeContext = createContext();

export function cartReducer (state, action){
    
    let tmpArray = [];
    if(state.shoppingCart == false){
        tmpArray.push(action);
        return tmpArray;
    }
    tmpArray = Object.values(state);
    tmpArray.push(action);
    return (tmpArray);
         
}
const Themeprovider = ({ children }) =>{
    const [shoppingCart, shoppingCartDispatch] = useReducer(cartReducer, {shoppingCart: false});
    return(
        <ThemeContext.Provider value ={{shoppingCart, shoppingCartDispatch}}>
            {children}
        </ThemeContext.Provider>
    )
   
};

export default Themeprovider

//https://dev.to/elisealcala/react-context-with-usereducer-and-typescript-4obm