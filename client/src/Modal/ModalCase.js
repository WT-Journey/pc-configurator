import { useState, useEffect, useCallback } from 'react';
import VueCase from '../ironVueComponents/VueCase';
import "./modalCase.css"

const ModalCase = ({active, setActive, items, parentCallback}) => {

    const [minPrice, setMinPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState(300000)

    const [filteredItems, setFilteredItems] = useState(items);
    
    const getBody = useCallback(async()=> {
        const response = await fetch(
          'http://localhost:8080/body',
          {
            method: 'POST',
            headers:{
              "Content-Type":'application/json'
            },
            body: JSON.stringify({
                "Price": [Number(minPrice),Number(maxPrice)],
            })
    
          }
        )
        const jsonData = await response.json()
        return jsonData.Page_data
    }, [minPrice, maxPrice]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response123 = await getBody();
                setFilteredItems(response123); // Встановлюємо отримані дані у стан
            } catch (error) {
                console.error('Помилка при завантажені даних:', error);
            }
        }
        fetchData();
    },[getBody])

    return (
        <div className={active ? "modalc active" : "modalc"} onClick={() => setActive(false)}>
            <div className={active ? "modalc__content active" : "modalc__content"} onClick={e => e.stopPropagation()}>
                <form className='filters'>
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
                </form>
                <div className='scroll'>
                    <VueCase items={filteredItems} parentCallback={parentCallback}/>
                </div>
            </div>
        </div>
    )
}

export default ModalCase;