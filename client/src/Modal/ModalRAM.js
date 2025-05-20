import { useState, useEffect, useCallback } from 'react';
import VueRAM from '../ironVueComponents/VueRAM';
import "./modalRAM.css"

const ModalRAM = ({active, setActive, items, isLoading, parentCallback}) => {
  // console.log(items)

  const [check, setCheck] = useState(0);

  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(300000)

  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filteredItems, setFilteredItems] = useState(items);

    const getRAM = useCallback(async()=> {
      const response = await fetch(
        'http://localhost:8080/ram',
        {
          method: 'POST',
          headers:{
            "Content-Type":'application/json'
          },
          body: JSON.stringify({
            "Price": [Number(minPrice),Number(maxPrice)],
            "Memory_type": selectedFilters.length !== 0 ? selectedFilters : ""
          })
        }
      )
      const jsonData = await response.json()
      return jsonData.Page_data
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
          const response123 = await getRAM();
          setFilteredItems(response123); // Встановлюємо отримані дані у стан
        } catch (error) {
          console.error('Помилка при завантаженні даних:', error);
        }
      }
      fetchData();
      setCheck(c => c + 1)
      }
      // console.log(filteredItems)
    }, [check, getRAM]); 
  
    useEffect(() => {
      // filterItems();
      async function fetchData() {
        try {
          const response1 = await getRAM();
          setFilteredItems(response1); // Встановлюємо отримані дані у стан
        } catch (error) {
          console.error('Помилка при завантаженні даних:', error);
        }
      }
  
      fetchData();
    }, [getRAM, isLoading]);
  
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
                    <p>Тип оперативної памʼяті:</p>
                      <div>
                          <input 
                              type="checkbox"
                              id="DDR2"
                              name="DDR2"
                              onChange={() => handleFilterButtonClick("DDR2")} 
                          />
                          <label htmlFor="DDR2">DDR2</label>
                      </div>
                      <div>
                          <input 
                              type="checkbox"
                              id="DDR3"
                              name="DDR3"
                              onChange={() => handleFilterButtonClick("DDR3")} 
                          />
                          <label htmlFor="DDR3">DDR3</label>
                      </div>
                      <div>
                          <input 
                              type="checkbox"
                              id="DDR4"
                              name="DDR4"
                              onChange={() => handleFilterButtonClick("DDR4")} 
                          />
                          <label htmlFor="DDR4">DDR4</label>
                      </div>
                      <div>
                          <input 
                              type="checkbox"
                              id="DDR5"
                              name="DDR5"
                              onChange={() => handleFilterButtonClick("DDR5")} 
                          />
                          <label htmlFor="DDR5">DDR5</label>
                      </div>
                </div>
                <div className='scroll'>
                    <VueRAM items={filteredItems} parentCallback={parentCallback}/>
                </div>
            </div>
        </div>
    )
}

export default ModalRAM;