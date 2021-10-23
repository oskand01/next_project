
import styles from '../styles/Home.module.css'
import CharacterComp from '../components/characterComp';
import { useEffect, useState } from 'react';
import arrayShuffle from 'array-shuffle';


export default function Home() {
  const [characters, setCharacters] = useState(); 
  const [loading, setLoading] = useState(false);

  async function getData(){
    setLoading(true);
    const res = await fetch("http://hp-api.herokuapp.com/api/characters");
    const data = await res.json();
    for (let i = 0;i<data.length;i++){
      Object.assign(data[i], {id: i});
      Object.assign(data[i], {price: generatePrice()});
    }
    const shuffledData = arrayShuffle(data)
    setCharacters(shuffledData);
    setLoading(false)
    
  }

  useEffect(() => {
    
    getData()
  },[])

  if (loading) return <div>loading..</div>;
  if (typeof(characters) === 'undefined') return <div>error!</div>

  return (
    
      <div className ={styles.characterWindow}>{
        characters.map((character) =>(
          
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


