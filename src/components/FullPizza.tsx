import axios from "axios";
import { useParams } from "react-router-dom";
import React from "react";
import { useState } from "react";

 const FullPizza: React.FC = () => {
  const [pizza, setPizza] = useState<{
    imageUrl : string,
    title: string, 
    price: number  
  }>();  
  const { id } = useParams();
  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          "https://640a2f9d81d8a32198c303be.mockapi.io/items/" + id
        );
        console.log(data);
        setPizza(data);
      } catch (error) {
        console.log(error);
      }
    }
  fetchPizza();
  }, [id]);

  if (!pizza) {
    return <>Loading...</>
  }
  return (
    <div className="container">
      <img src={pizza.imageUrl} />
      <h2>{pizza.title}</h2>
      <h3>{pizza.price}₽</h3>
    </div>
  );
};

export default FullPizza;
