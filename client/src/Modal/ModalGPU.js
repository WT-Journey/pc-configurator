import { useState, useEffect, useCallback } from 'react';
import VueGPU from '../ironVueComponents/VueGPU';
import "./modalGPU.css"

const ModalGPU = ({active, setActive, items, parentCallback, isLoading}) => {

    const [check, setCheck] = useState(0);

    const [minPrice, setMinPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState(300000)
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [filteredItems, setFilteredItems] = useState(items);  
  
    const getVideoCard = useCallback(async()=> {
        const response = await fetch(
          'http://localhost:8080/videocard',
          {
            method: 'POST',
            headers:{
              "Content-Type":'application/json'
            },
            body: JSON.stringify({
              "Price": [Number(minPrice) ,Number(maxPrice)],
              "Videomemory_type": selectedFilters.length !== 0 ? selectedFilters : ""
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
        if (check !== 8){
        async function fetchData() {
          try {
            const response123 = await getVideoCard();
            setFilteredItems(response123); // Встановлюємо отримані дані у стан
          } catch (error) {
            console.error('Ошибка при загрузке данных:', error);
          }
        }
        fetchData();
        setCheck(c => c + 1)
        }
        // console.log(filteredItems)
    }, [check, getVideoCard]); 

    
    useEffect(() => {
    //   filterItems();
    async function fetchData() {
        try {
          const response123 = await getVideoCard();
          setFilteredItems(response123); // Встановлюємо отримані дані у стан
        } catch (error) {
          console.error('Помилка при завантаженні даних:', error);
        }
      }
      fetchData();
    }, [getVideoCard, isLoading]);


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
                    <p>Тип памʼяті відеокарти:</p>
                      <div>
                          <input 
                              type="checkbox"
                              name="GDDR2"
                              id="GDDR2"
                              onChange={() => handleFilterButtonClick("GDDR2")}
                              checked={selectedFilters.includes("GDDR2")}
                          />
                          <label htmlFor="GDDR2">GDDR2</label>
                      </div>
                      <div>
                          <input 
                              type="checkbox"
                              id="GDDR3"
                              name="GDDR3"
                              onChange={() => handleFilterButtonClick("GDDR3")} 
                              checked={selectedFilters.includes("GDDR3")}
                          />
                          <label htmlFor="GDDR3">GDDR3</label>
                      </div>
                      <div>
                          <input 
                              type="checkbox"
                              id="GDDR5"
                              name="GDDR5"
                              onChange={() => handleFilterButtonClick("GDDR5")} 
                              checked={selectedFilters.includes("GDDR5")}
                          />
                          <label htmlFor="GDDR5">GDDR5</label>
                      </div>
                      <div>
                          <input 
                              type="checkbox"
                              id="GDDR5X"
                              name="GDDR5X"
                              onChange={() => handleFilterButtonClick("GDDR5X")} 
                              checked={selectedFilters.includes("GDDR5X")}
                          />
                          <label htmlFor="GDDR5X">GDDR5X</label>
                      </div>
                      <div>
                          <input 
                              type="checkbox"
                              id="GDDR6"
                              name="GDDR6"
                              onChange={() => handleFilterButtonClick("GDDR6")}
                              checked={selectedFilters.includes("GDDR6")}
                          />
                          <label htmlFor="GDDR6">GDDR6</label>
                      </div>
                      <div>
                          <input 
                              type="checkbox"
                              id="GDDR6X"
                              name="GDDR6X"
                              onChange={() => handleFilterButtonClick("GDDR6X")}
                              checked={selectedFilters.includes("GDDR6X")}
                          />
                          <label htmlFor="GDDR6X">GDDR6X</label>
                      </div>
                </div>
                <div className='scroll'>
                    <VueGPU items={filteredItems} parentCallback={parentCallback}/>
                </div>
            </div>
        </div>
    )
}

export default ModalGPU;