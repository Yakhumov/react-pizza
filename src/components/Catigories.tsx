import React from "react";
  
 type CatigoriesProps  ={
  value: number,
  onClickCategory: (page: number) =>(void)    
 }

const   Catigories: React.FC <CatigoriesProps> = ({ value, onClickCategory }) =>{   
  const catigories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];
  return (
    <div className="categories">
      <ul>
        {catigories.map((catigori, i) => (
          <li key={i}   
            onClick={() => onClickCategory(i)}
            className={value === i ? "active" : ""}   
          >
            {catigori}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Catigories;
