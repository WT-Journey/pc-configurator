import { useState, useEffect, useCallback } from 'react';
import VuePower from '../ironVueComponents/VuePower';
import "./modalPower.css"

const ModalPower = ({active, setActive, items, parentCallback, isLoading}) => {

    const [check, setCheck] = useState(0);

    const [minPrice, setMinPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState(300000)
    
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [filteredItems, setFilteredItems] = useState(items);

    const getPowerUnit = useCallback(async()=> {
      const response = await fetch(
        'http://localhost:8080/power_unit',
        {
          method: 'POST',
          headers:{
            "Content-Type":'application/json'
          },
          body: JSON.stringify({
            "Price": [Number(minPrice),Number(maxPrice)],
            "Power_unit_type": selectedFilters.length !== 0 ? selectedFilters : ""
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
          const response123 = await getPowerUnit();
          setFilteredItems(response123); // Встановлюємо отримані дані у стан
        } catch (error) {
          console.error('Помилка при завантаженні даних:', error);
        }
      }
      fetchData();
      setCheck(c => c + 1)
      }
      // console.log(filteredItems)
    }, [check, getPowerUnit]); 

    useEffect(() => {
      // filterItems();
      async function fetchData() {
        try {
          const response1 = await getPowerUnit();
          setFilteredItems(response1); // Встановлюємо отримані дані у стан
        } catch (error) {
          console.error('Помилка при завантаженні даних:', error);
        }
      }
  
      fetchData();
    }, [getPowerUnit, isLoading]);

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
                        min="0"
                      />
                      <input 
                        type="number"
                        value={maxPrice}
                        onChange={e => setMaxPrice(e.target.value)}
                        min="0"
                      />      
                    </div>                     
                    <p>Тип блоку живлення:</p>
                      <div>
                          <input 
                              type="checkbox"
                              id="ATX"
                              name="ATX"
                              onChange={() => handleFilterButtonClick("ATX")} 
                          />
                          <label htmlFor="ATX">ATX</label>
                      </div>
                      <div>
                          <input 
                              type="checkbox"
                              id="TFX"
                              name="TFX"
                              onChange={() => handleFilterButtonClick("TFX")} 
                          />
                          <label htmlFor="TFX">TFX</label>
                      </div>
                      <div>
                          <input 
                              type="checkbox"
                              id="SFX"
                              name="SFX"
                              onChange={() => handleFilterButtonClick("SFX")} 
                          />
                          <label htmlFor="SFX">SFX</label>
                      </div>
                </div>
                <div className='scroll'>
                    <VuePower items={filteredItems} parentCallback={parentCallback} itemType={"Mother"}/>
                </div>
            </div>
        </div>
    )
}

export default ModalPower;