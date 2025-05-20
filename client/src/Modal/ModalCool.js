import { useState, useEffect, useCallback } from 'react';
import VueCool from '../ironVueComponents/VueCool';
import "./modalCool.css"

const ModalCool = ({ active, setActive, isLoading, parentCallback }) => {

  const [check, setCheck] = useState(0);

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(300000);

  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  const getCoolingSystem = useCallback(async () => {
    
      const response = await fetch('http://localhost:8080/cooling_system', {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify({
          "Price": [Number(minPrice), Number(maxPrice)],
          "Cooling_system_type": selectedFilters.length !== 0 ? selectedFilters : ""
        })
      });
      const jsonData = await response.json();
      return jsonData.Page_data;
    }, [minPrice, maxPrice, selectedFilters]);

  const handleFilterButtonClick = (selectedCategory) => {
    setSelectedFilters(prev =>
      prev.includes(selectedCategory)
        ? prev.filter(el => el !== selectedCategory)
        : [...prev, selectedCategory]
    );
  };

 useEffect(() => {
      // Всередині цієї функціх ви можете викликати вашу асинхронну функцію
      if (check !== 7){
      async function fetchData() {
        try {
          const response123 = await getCoolingSystem();
          setFilteredItems(response123); // Встановлюємо отримані дані у стан 
        } catch (error) {
          console.error('Помилка при завантаженні даних:', error);
        }
      }
      fetchData();
      setCheck(c => c + 1)
      }
      // console.log(filteredItems)
    }, [check, getCoolingSystem]); 

    useEffect(() => {
      // filterItems();
      async function fetchData() {
        try {
          const response123 = await getCoolingSystem();
          setFilteredItems(response123); // Встановлюємо отримані дані у стан
        } catch (error) {
          console.error('Помилка при завантаженні даних:', error);
        }
      }
      fetchData();
    }, [getCoolingSystem, isLoading]);

  return (
    <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
      <div className={active ? "modal__content active" : "modal__content"} onClick={e => e.stopPropagation()}>
        <div className="buttons-container">
          <div>
            <p>Вартість</p>
            <input
              type="number"
              value={minPrice}
              onChange={e => setMinPrice(e.target.value)}
            />
            <input
              type="number"
              value={maxPrice}
              onChange={e => setMaxPrice(e.target.value)}
            />
          </div>
          <p>Тип системи охолодження:</p>
          <div>
            <input
              type="checkbox"
              id="water"
              name="water"
              onChange={() => handleFilterButtonClick("water cooling system")}
            />
            <label htmlFor="water">СРО</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="air"
              name="air"
              onChange={() => handleFilterButtonClick("Conventional cooling system")}
            />
            <label htmlFor="air">Кулер</label>
          </div>
        </div>
        <div className='scroll'>
          <VueCool items={filteredItems} parentCallback={parentCallback} itemType={"Cool"} />
        </div>
      </div>
    </div>
  );
};

export default ModalCool;