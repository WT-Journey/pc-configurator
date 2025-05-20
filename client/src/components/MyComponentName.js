import { useState, useEffect } from 'react';
import "./components.css"

function MyComponentName({config}) {
    const [data, setData] = useState(null);
    const [companyName, setCompanyName] = useState(config.conf_name);

  async function updateNameConfig(data, value) {
    const response = await fetch(
      'http://localhost:8080/update_name',
      {
        method: 'POST',
        headers:{
          "Content-Type":'application/json'
        },
        body: JSON.stringify({
          "NewName":value,
          "ID": data.id
        })
      }
    )
    const jsonData = await response.json()
    console.log(jsonData)
    
  }

  async function getConfigs() {
    const response = await fetch(
      'http://localhost:8080/get_configs',
      {
        method: 'POST',
        headers:{
          "Content-Type":'application/json'
        },
        body: JSON.stringify({
        })
      }
    )
    const jsonData = await response.json()
    // console.log(jsonData)
    return jsonData
  }

  useEffect(() => {
    // Всередині цієї функції можна викликати вашу асинхронну функцію
    async function fetchData() {
      try {
        const response = await getConfigs();
        setData(response); // Встановлюємо отримані дані у стан
      } catch (error) {
        console.error('Помилка при завантаженні даних:', error);
      }
    }

    fetchData();
  }, []); // Другий аргумент (порожній масив) свідчить про те, що ефект буде виконуватись тільки при монтуванні компонента.

  return (
    <div className="Name">
      <div>
        <input
          type="text"
          value={companyName}
          onChange={e => setCompanyName(e.target.value)}
          className='rename'
        />
        <button className='renameBtn' onClick={() => updateNameConfig(config, companyName)}>
          <img src="../images/rename.svg" alt="" className='renameImg'/>
        </button>
      </div>
    </div>
  );
}

export default MyComponentName;