import { useState, useEffect, useCallback } from 'react';
import VueCPU from '../ironVueComponents/VueCPU';
import "./modalCPU.css"

const ModalCPU = ({active, setActive, items, parentCallback, isLoading}) => {

    const [check, setCheck] = useState(0);
    const [filteredItems, setFilteredItems] = useState(items);

    const [minPrice, setMinPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState(300000)

    const [selectedFiltersSocket, setSelectedFiltersSocket] = useState([]);
    const [selectedFiltersCores, setSelectedFiltersCores] = useState([]);
    
    const getCpu = useCallback(async()=> {
        const response = await fetch(
          'http://localhost:8080/cpu',
          {
            method: 'POST',
            headers:{
              "Content-Type":'application/json'
            },
            body: JSON.stringify({
              "Price": [Number(minPrice),Number(maxPrice)],
              "Socket": selectedFiltersSocket.length !== 0 ? selectedFiltersSocket : "",
              "Core_number": selectedFiltersCores.length !== 0 ? selectedFiltersCores : "",
            })
    
          }
        )
        const jsonData = await response.json()
        return jsonData.Page_data
    }, [minPrice, maxPrice, selectedFiltersSocket, selectedFiltersCores]);

    useEffect(() => {
        // Всередині цієї функції ви можете викликати вашу асинхронну функцію
        if (check !== 5){
        async function fetchData() {
          try {
            const response123 = await getCpu();
            setFilteredItems(response123); // Встановлюємо отримані дані у стан
          } catch (error) {
            console.error('Помилка при завантаженні даних:', error);
          }
        }
        fetchData();
        setCheck(c => c + 1)
        }
        // console.log(filteredItems)
    }, [check, getCpu]); 

    useEffect(() => {
        // Всередині цієї функції ви можете викликати вашу асинхронну функцію
        async function fetchData() {
          try {
            const response1 = await getCpu();
            setFilteredItems(response1); // Встановлюємо отримані дані у стан
          } catch (error) {
            console.error('Помилка при завантаженні даних:', error);
          }
        }
    
        fetchData();
    }, [getCpu, isLoading]); 

    const handleFilterButtonClickCores = (selectedCategory) => {
        if (selectedFiltersCores.includes(selectedCategory)) {
          let filters = selectedFiltersCores.filter((el) => el !== selectedCategory);
          setSelectedFiltersCores(filters);
        } else {
          setSelectedFiltersCores([...selectedFiltersCores, selectedCategory]);
        }
    };

    const handleFilterButtonClickSocket = (selectedCategory) => {
        if (selectedFiltersSocket.includes(selectedCategory)) {
          let filters = selectedFiltersSocket.filter((el) => el !== selectedCategory);
          setSelectedFiltersSocket(filters);
        } else {
          setSelectedFiltersSocket([...selectedFiltersSocket, selectedCategory]);
        }
    };

    return (
        <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
            <div className={active ? "modal__content active" : "modal__content"} onClick={e => e.stopPropagation()}>
                <form className="filters-scroll">
                    <p>Вартість</p>
                    <div className='price'>
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
                        <div>
                            <p>Кількість ядер</p>
                            <div>
                                <input 
                                    type="checkbox"
                                    id="core-2"
                                    name="2"
                                    onChange={() => handleFilterButtonClickCores(2)}
                                />
                                <label htmlFor="core-2">2</label>
                            </div>
                            <div>
                                <input 
                                    type="checkbox"
                                    id="core-4"
                                    name="4"
                                    onChange={() => handleFilterButtonClickCores(4)}
                                />
                                <label htmlFor="core-4">4</label>
                            </div>
                            <div>
                                <input 
                                    type="checkbox"
                                    id="core-6"
                                    name="6"
                                    onChange={() => handleFilterButtonClickCores(6)}
                                />
                                <label htmlFor="core-6">6</label>
                            </div>
                            <div>
                                <input 
                                    type="checkbox"
                                    id="core-8"
                                    name="8"
                                    onChange={() => handleFilterButtonClickCores(8)}
                                />
                                <label htmlFor="core-8">8</label>
                            </div>
                            <div>
                                <input 
                                    type="checkbox"
                                    id="core-10"
                                    name="10"
                                    onChange={() => handleFilterButtonClickCores(10)}
                                />
                                <label htmlFor="core-10">10</label>
                            </div>
                            <div>
                                <input 
                                    type="checkbox"
                                    id="core-12"
                                    name="12"
                                    onChange={() => handleFilterButtonClickCores(12)}
                                />
                                <label htmlFor="core-12">12</label>
                            </div>
                            <div>
                                <input 
                                    type="checkbox"
                                    id="core-16"
                                    name="16"
                                    onChange={() => handleFilterButtonClickCores(16)}
                                />
                                <label htmlFor="core-16">16</label>
                            </div>
                            <div>
                                <input 
                                    type="checkbox"
                                    id="core-24"
                                    name="24"
                                    onChange={() => handleFilterButtonClickCores(24)}
                                />
                                <label htmlFor="core-24">24</label>
                            </div>
                        </div>
                        <div>
                            <p>Сокет</p>
                            <div>
                                <input 
                                    type="checkbox"
                                    name="LGA1700"
                                    id="LGA1700"
                                    onChange={() => handleFilterButtonClickSocket("LGA1700")}
                                />
                                <label htmlFor="LGA1700">LGA1700</label>
                            </div>
                            <div>
                                <input 
                                    type="checkbox"
                                    id="LGA1151"
                                    name="LGA1151"
                                    onChange={() => handleFilterButtonClickSocket("LGA1151")}
                                />
                                <label htmlFor="LGA1151">LGA1151</label>
                            </div>
                            <div>
                                <input 
                                    type="checkbox"
                                    id="LGA1200"
                                    name="LGA1200"
                                    onChange={() => handleFilterButtonClickSocket("LGA1200")}
                                />
                                <label htmlFor="LGA1200">LGA1200</label>
                            </div>
                            <div>
                                <input 
                                    type="checkbox"
                                    id="AM4"
                                    name="AM4"
                                    onChange={() => handleFilterButtonClickSocket("AM4")}
                                />
                                <label htmlFor="AM4">AM4</label>
                            </div>
                            <div>
                                <input 
                                    type="checkbox"
                                    id="AM3+"
                                    name="AM3+"
                                    onChange={() => handleFilterButtonClickSocket("AM3+")}
                                />
                                <label htmlFor="AM3+">AM3+</label>
                            </div>
                            <div>
                                <input 
                                    type="checkbox"
                                    id="AM5"
                                    name="AM5"
                                    onChange={() => handleFilterButtonClickSocket("AM5")}
                                />
                                <label htmlFor="AM5">AM5</label>
                            </div>
                        </div>
                </form>
                <div className='scroll'>
                    <VueCPU items={filteredItems} parentCallback={parentCallback} itemType={"CPU"}/>
                </div>
            </div>
        </div>
    )
}

export default ModalCPU;