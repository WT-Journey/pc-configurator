import { useState, useEffect, useCallback } from 'react';
import VueMother from '../ironVueComponents/VueMother';
import "./modalMother.css"

const ModalMother = ({active, setActive, items, parentCallback, isLoading}) => {

    const [check, setCheck] = useState(0);

    const [filteredItems, setFilteredItems] = useState(items);
    // console.log(items)
    const [minPrice, setMinPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState(300000)

    const [selectedFiltersSocket, setSelectedFiltersSocket] = useState([]);
    const [selectedFiltersForm, setSelectedFiltersForm] = useState([]);
    const [selectedFiltersMemory, setSelectedFiltersMemory] = useState([]);
    const [selectedFiltersChip, setSelectedFiltersChip] = useState([]);

    const getMotherBoard = useCallback(async()=> {
        const response = await fetch(
          'http://localhost:8080/motherboard',
          {
            method: 'POST',
            headers:{
              "Content-Type":'application/json'
            },
            body: JSON.stringify({
              "Price": [Number(minPrice),Number(maxPrice)],
              "Chipset": selectedFiltersChip.length !== 0 ? selectedFiltersChip : "",
              "Memory_type": selectedFiltersMemory.length !== 0 ? selectedFiltersMemory : "",
              "Socket": selectedFiltersSocket.length !== 0 ? selectedFiltersSocket : "",
              "Form_factor": selectedFiltersForm.length !== 0 ? selectedFiltersForm : ""
            })                   
          }
        )
        const jsonData = await response.json()
        return jsonData.Page_data
      }, [selectedFiltersSocket, selectedFiltersForm, selectedFiltersMemory, selectedFiltersChip, minPrice, maxPrice]);

    useEffect(() => {
        // Всередині цієї функції ви можете викликати вашу асинхронну функцію
        if (check !== 10){
        async function fetchData() {
          try {
            const response123 = await getMotherBoard();
            setFilteredItems(response123); // Встановлюємо отримані дані у стан
          } catch (error) {
            console.error('Помилка при завантаженні даних:', error);
          }
        }
        fetchData();
        setCheck(c => c + 1)
        }
        // console.log(filteredItems)
    }, [check, getMotherBoard]); 
    
    useEffect(() => {
        // Всередині цієї функції ви можете викликати вашу асинхронну функцію
        async function fetchData() {
          try {
            const response123 = await getMotherBoard();
            setFilteredItems(response123); // Встановлюємо отримані дані у стан
          } catch (error) {
            console.error('Помилка при завантаженні даних:', error);
          }
        }
        fetchData();
        // console.log(filteredItems)
    }, [getMotherBoard, isLoading]); 


    const handleFilterButtonClickChip = (selectedCategory) => {
        if (selectedFiltersChip.includes(selectedCategory)) {
          let filters = selectedFiltersChip.filter((el) => el !== selectedCategory);
          setSelectedFiltersChip(filters);
        } else {
          setSelectedFiltersChip([...selectedFiltersChip, selectedCategory]);
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

    const handleFilterButtonClickMemory = (selectedCategory) => {
        if (selectedFiltersMemory.includes(selectedCategory)) {
          let filters = selectedFiltersMemory.filter((el) => el !== selectedCategory);
          setSelectedFiltersMemory(filters);
        } else {
          setSelectedFiltersMemory([...selectedFiltersMemory, selectedCategory]);
        }
    };

    const handleFilterButtonClickForm = (selectedCategory) => {
        if (selectedFiltersForm.includes(selectedCategory)) {
          let filters = selectedFiltersForm.filter((el) => el !== selectedCategory);
          setSelectedFiltersForm(filters);
        } else {
          setSelectedFiltersForm([...selectedFiltersForm, selectedCategory]);
        }
    };

    return (
        <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
            <div className={active ? "modal__content active" : "modal__content"} onClick={e => e.stopPropagation()}>
                    <form className='filters-scroll'>
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
                            <p>Чіпсет</p>
                            <div>
                                <input 
                                    type="checkbox"
                                    id="AMD_B550"
                                    name="AMD B550"
                                    onChange={() => handleFilterButtonClickChip("AMD B550")}
                                />
                                <label htmlFor="AMD_B550">AMD B550</label>
                            </div>
                            <div>
                                <input 
                                    type="checkbox"
                                    id="Intel_B760"
                                    name="Intel B760"
                                    onChange={() => handleFilterButtonClickChip("Intel B760")}
                                />
                                <label htmlFor="Intel_B760">Intel B760</label>
                            </div>
                            <div>
                                <input 
                                    type="checkbox"
                                    id="AMD_A520"
                                    name="AMD A520"
                                    onChange={() => handleFilterButtonClickChip("AMD A520")}
                                />
                                <label htmlFor="AMD_A520">AMD A520</label>
                            </div>
                            <div>
                                <input 
                                    type="checkbox"
                                    id="AMD_B650"
                                    name="AMD B650"
                                    onChange={() => handleFilterButtonClickChip("AMD B650")}
                                />
                                <label htmlFor="AMD_B650">AMD B650</label>
                            </div>
                            <div>
                                <input 
                                    type="checkbox"
                                    id="Intel_Z790"
                                    name="Intel Z790"
                                    onChange={() => handleFilterButtonClickChip("Intel Z790")}
                                />
                                <label htmlFor="Intel_Z790">Intel Z790</label>
                            </div>
                            <div>
                                <input 
                                    type="checkbox"
                                    id="Intel_B560"
                                    name="Intel B560"
                                    onChange={() => handleFilterButtonClickChip("Intel B560")}
                                />
                                <label htmlFor="Intel_B560">Intel B560</label>
                            </div>
                            <div>
                                <input 
                                    type="checkbox"
                                    id="Intel_H310"
                                    name="Intel H310"
                                    onChange={() => handleFilterButtonClickChip("Intel H310")}
                                />
                                <label htmlFor="Intel_H310">Intel H310</label>
                            </div>
                            <div>
                                <input 
                                    type="checkbox"
                                    id="Intel_H470"
                                    name="Intel H470"
                                    onChange={() => handleFilterButtonClickChip("Intel H470")}
                                />
                                <label htmlFor="Intel_H470">Intel H470</label>
                            </div>
                            <div>
                                <input 
                                    type="checkbox"
                                    id="AMD_A320"
                                    name="AMD A320"
                                    onChange={() => handleFilterButtonClickChip("AMD A320")}
                                />
                                <label htmlFor="AMD_A320">AMD A320</label>
                            </div>
                            <div>
                                <input 
                                    type="checkbox"
                                    id="Intel_H670"
                                    name="Intel H670"
                                    onChange={() => handleFilterButtonClickChip("Intel H670")}
                                />
                                <label htmlFor="Intel_H670">Intel H670</label>
                            </div>
                            <div>
                                <input 
                                    type="checkbox"
                                    id="AMD_B450"
                                    name="AMD B450"
                                    onChange={() => handleFilterButtonClickChip("AMD B450")}
                                />
                                <label htmlFor="AMD_B450">AMD B450</label>
                            </div>
                            <div>
                                <input 
                                    type="checkbox"
                                    id="Intel_H610"
                                    name="Intel H610"
                                    onChange={() => handleFilterButtonClickChip("Intel H610")}
                                />
                                <label htmlFor="Intel_H610">Intel H610</label>
                            </div>
                            <div>
                                <input 
                                    type="checkbox"
                                    id="Intel_B660"
                                    name="Intel B660"
                                    onChange={() => handleFilterButtonClickChip("Intel B660")}
                                />
                                <label htmlFor="Intel_B660">Intel B660</label>
                            </div>
                            <div>
                                <input 
                                    type="checkbox"
                                    id="Intel_Z590"
                                    name="Intel Z590"
                                    onChange={() => handleFilterButtonClickChip("Intel Z590")}
                                />
                                <label htmlFor="Intel_Z590">Intel Z590</label>
                            </div>
                            <div>
                                <input 
                                    type="checkbox"
                                    id="Intel_H510"
                                    name="Intel H510"
                                    onChange={() => handleFilterButtonClickChip("Intel H510")}
                                />
                                <label htmlFor="Intel_H510">Intel H510</label>
                            </div>
                            <div>
                                <input 
                                    type="checkbox"
                                    id="Intel_Z690"
                                    name="Intel Z690"
                                    onChange={() => handleFilterButtonClickChip("Intel Z690")}
                                />
                                <label htmlFor="Intel_Z690">Intel Z690</label>
                            </div>
                            <div>
                                <input 
                                    type="checkbox"
                                    id="Intel_H410"
                                    name="Intel H410"
                                    onChange={() => handleFilterButtonClickChip("Intel H410")}
                                />
                                <label htmlFor="Intel_H410">Intel H410</label>
                            </div>
                        </div>
                        <div>
                            <p>Підтримуючий тип памʼяті:</p>
                            <div>
                                <input 
                                    type="checkbox"
                                    id="DDR3"
                                    name="DDR3"
                                    onChange={() => handleFilterButtonClickMemory("DDR3")} 
                                />
                                <label htmlFor="DDR3">DDR3</label>
                            </div>
                            <div>
                                <input 
                                    type="checkbox"
                                    id="DDR4"
                                    name="DDR4"
                                    onChange={() => handleFilterButtonClickMemory("DDR4")} 
                                />
                                <label htmlFor="DDR4">DDR4</label>
                            </div>
                            <div>
                                <input 
                                    type="checkbox"
                                    id="DDR5"
                                    name="DDR5"
                                    onChange={() => handleFilterButtonClickMemory("DDR5")} 
                                />
                                <label htmlFor="DDR5">DDR5</label>
                            </div>
                        </div>
                        <div>
                            <p>Форм-фактор:</p>
                            <div>
                                <input 
                                    type="checkbox"
                                    id="ATX"
                                    name="ATX"
                                    onChange={() => handleFilterButtonClickForm("ATX")}
                                />
                                <label htmlFor="ATX">ATX</label>
                            </div>
                            <div>
                                <input 
                                    type="checkbox"
                                    id="microATX"
                                    name="microATX"
                                    onChange={() => handleFilterButtonClickForm("microATX")}
                                />
                                <label htmlFor="microATX">microATX</label>
                            </div>
                            <div>
                                <input 
                                    type="checkbox"
                                    id="Mini-ITX"
                                    name="Mini-ITX"
                                    onChange={() => handleFilterButtonClickForm("Mini-ITX")}

                                />
                                <label htmlFor="Mini-ITX">Mini-ITX</label>
                            </div>
                        </div>
                        <div>
                            <p>Сокет</p>
                            <div>
                                <input 
                                    type="checkbox"
                                    id="LGA1700"
                                    name="LGA1700"
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
                <div>
                    <div className='scroll'>
                        <VueMother items={filteredItems} parentCallback={parentCallback}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalMother;