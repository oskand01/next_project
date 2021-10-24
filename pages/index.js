
import styles from '../styles/Home.module.css'
import CharacterComp from '../components/characterComp';
import { useEffect, useState } from 'react';
import arrayShuffle from 'array-shuffle';


export default function Home({charProducts}) {

  return (
    
      <div className ={styles.characterWindow}>{
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

function routeToCharacterInfo(id){
  console.log(id)
}

function addToCart (id) {

  console.log(id)
}


