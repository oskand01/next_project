
import styles from '../styles/Home.module.css'
import CharacterComp from '../components/CharacterComp';
import { useEffect, useState } from 'react';
import arrayShuffle from 'array-shuffle';
import {useContext} from "react";
import{ThemeContext} from "../components/context/ThemeProvider";

let cartItemSize = 0

export default function Home({charProducts}) {
const themeContext = useContext(ThemeContext);
console.log(themeContext);
console.log("test")
//themeContext.setProducts(charProducts);
const [cartItems, setCartItems] = useState();

//console.log(allCharacterProducts.charProducts);


function addToCart (id) {
  
  const selectedChar = charProducts.find(char => char.id === id);
  themeContext.shoppingCartDispatch(selectedChar);
  
}

function routeToCharacterInfo(id){
  console.log(id)
}


  return (
    
      <div className ={styles.characterWindow}>
       
        {
        
        charProducts.map((character) =>(
          
          <CharacterComp
           name = {character.name}
           charImage = {character.image}
           price = {character.price}
           id = {character.id}
           key = {character.id}
           openCharInfo = {routeToCharacterInfo}
           addToCart = {addToCart}
          />
        ))
        }
      </div>
     
   
  );
}


export async function getStaticProps(){
  const res = await fetch("http://hp-api.herokuapp.com/api/characters");
  const data = await res.json();
  for (let i = 0;i<data.length;i++){
    Object.assign(data[i], {id: i});+ 
    Object.assign(data[i], {price: generatePrice()});
  }
  const shuffledData = arrayShuffle(data);
  return{props: {charProducts: shuffledData}};
}

function generatePrice (){
  const maxPrice = 10000;
  
  return Math.floor(Math.random() * maxPrice);
  
}




