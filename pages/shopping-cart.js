import styles from "../styles/Cart.module.css";
import Store from "../components/Store";

export default function Cart() {

  const products = [
    {
      name: "Harry Potter",
      alternate_names: [""],
      species: "human",
      gender: "male",
      house: "Gryffindor",
      dateOfBirth: "31-07-1980",
      yearOfBirth: 1980,
      wizard: true,
      ancestry: "half-blood",
      eyeColour: "green",
      hairColour: "black",
      wand: {
        wood: "holly",
        core: "phoenix feather",
        length: 11,
      },
      patronus: "stag",
      hogwartsStudent: true,
      hogwartsStaff: false,
      actor: "Daniel Radcliffe",
      alternate_actors: [""],
      alive: true,
      image: "http://hp-api.herokuapp.com/images/harry.jpg",
      price: 200,
    },
    {
      name: "Hermione Granger",
      alternate_names: [""],
      species: "human",
      gender: "female",
      house: "Gryffindor",
      dateOfBirth: "19-09-1979",
      yearOfBirth: 1979,
      wizard: true,
      ancestry: "muggleborn",
      eyeColour: "brown",
      hairColour: "brown",
      wand: {
        wood: "vine",
        core: "dragon heartstring",
        length: "",
      },
      patronus: "otter",
      hogwartsStudent: true,
      hogwartsStaff: false,
      actor: "Emma Watson",
      alternate_actors: [""],
      alive: true,
      image: "http://hp-api.herokuapp.com/images/hermione.jpeg",
      price: 179,
    },
  ];

  return (
    <div className={styles.container}>
      <Store items={products} />
    </div>
  );
}
