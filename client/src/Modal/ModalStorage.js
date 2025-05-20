import { useState, useEffect, useCallback } from 'react';
import VueStorage from '../ironVueComponents/VueStorage';
import "./modalStorage.css"

const ModalStorage = ({active, setActive, items, parentCallback, isLoading}) => {
    // console.log(items)
    
    const [check, setCheck] = useState(0);

    const [minPrice, setMinPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState(300000)

    const [selectedFilters, setSelectedFilters] = useState([]);
    const [filteredItems, setFilteredItems] = useState(items);

    const getHardDrive = useCallback(async () => {
    const response = await fetch(
      'http://localhost:8080/hard_drive',
      {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify({
          "Price": [Number(minPrice), Number(maxPrice)],
          "Disk_type": selectedFilters.length !== 0 ? selectedFilters : ""
        })
      }
    )
    const jsonData = await response.json();
    return jsonData.Page_data;
  }, [minPrice, maxPrice, selectedFilters]);

    const handleFilterButtonClick = (selectedCategory) => {
      if (selectedFilters.includes(selectedCategory)) {
        let filters = selectedFilters.filter((el) => el !== selectedCategory);
        setSelectedFilters(filters);
      } else {
        setSelectedFilters([...selectedFilters, selectedCategory]);
      }
    }; 

    useEffect(() => {
      // Всередині цієї функції ви можете викликати вашу асинхронну функцію
      if (check !== 5){
      async function fetchData() {
        try {
          const response123 = await getHardDrive();
          setFilteredItems(response123); // Встановлюємо отримані дані у стан
        } catch (error) {
          console.error('Помилка при завантаженні даних:', error);
        }
      }
      fetchData();
      setCheck(c => c + 1)
      }
    }, [check, getHardDrive]);  

    useEffect(() => {
      async function fetchData() {
        try {
          const response1 = await getHardDrive();
          setFilteredItems(response1); // Встановлюємо отримані дані у стан
        } catch (error) {
          console.error('Помилка при завантаженні даних:', error);
        }
      }
  
      fetchData();
    }, [getHardDrive, isLoading]);

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
                    <p>Тип накопичувача даних:</p>
                    <div>
                        <input 
                            type="checkbox"
                            id="HDD"
                            name="HDD"
                            onChange={() => handleFilterButtonClick("HDD")} 
                        />
                        <label htmlFor="HDD">HDD</label>
                    </div>
                    <div>
                        <input 
                            type="checkbox"
                            id="SSD"
                            name="SSD"
                            onChange={() => handleFilterButtonClick("SSD")} 
                        />
                        <label htmlFor="SSD">SSD</label>
                    </div>
                </div>
                <div className='scroll'>
                    <VueStorage items={filteredItems} parentCallback={parentCallback}/>
                </div>
            </div>
        </div>
    )
}

export default ModalStorage;