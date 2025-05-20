import { useState, Suspense } from "react";
import ModalContacts from "./Modal/ModalContacts";
import ModalInfo from "./Modal/ModalInfo";
import {Routes, Route} from "react-router-dom";
import {ConfigsPage} from "./pages/ConfigsPage";
import {MainPage} from "./pages/MainPage"
import "./App.css";

function App() {

  async function getBody() {
    const response = await fetch(
      'http://localhost:8080/body',
      {
        method: 'POST',
        headers:{
          "Content-Type":'application/json'
        },
        body: JSON.stringify({
          "Price": [0,300000]
        })

      }
    )
    const jsonData = await response.json()
    console.log(jsonData)
    
  }

  async function getCpu() {
    const response = await fetch(
      'http://localhost:8080/cpu',
      {
        method: 'POST',
        headers:{
          "Content-Type":'application/json'
        },
        body: JSON.stringify({
          "Price": [18000,30000000],
        })

      }
    )
    const jsonData = await response.json()
    console.log(jsonData)
  }

  async function getMotherBoard() {
    const response = await fetch(
      'http://localhost:8080/motherboard',
      {
        method: 'POST',
        headers:{
          "Content-Type":'application/json'
        },
        body: JSON.stringify({
          "Form_factor": "",
          "Memory_type": ""
        })
        
        
      }
    )
    const jsonData = await response.json()
    console.log(jsonData)
  }

  async function getCoolingSystem() {
    const response = await fetch(
      'http://localhost:8080/cooling_system',
      {
        method: 'POST',
        headers:{
          "Content-Type":'application/json'
        },
        body: JSON.stringify({
          "Cooling_system_type": ""
        })
        
      }
    )
    const jsonData = await response.json()
    console.log(jsonData)
  }

  async function getHardDrive() {
    const response = await fetch(
      'http://localhost:8080/hard_drive',
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
    console.log(jsonData)
  }

  async function getRAM() {
    const response = await fetch(
      'http://localhost:8080/ram',
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
    console.log(jsonData)
  }

  async function getPowerUnit() {
    const response = await fetch(
      'http://localhost:8080/power_unit',
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
    console.log(jsonData)
  }

  async function getVideoCard() {
    const response = await fetch(
      'http://localhost:8080/videocard',
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
    console.log(jsonData)
  }


  async function setConfig() {
    const response=await fetch(
      'http://localhost:8080/set_config',
      {
        method: 'POST',
        headers:{
          "Content-Type":'application/json'
        },
        body: JSON.stringify({
          "Name":"Sborka-pereborka",
          "Body":"2",
          "Motherboard":"3",
          "Processor":"1",
          "Cooling_system":"1",
          "RAM":"1",
          "Videocard":"2",
          "Disk":"4",
          "Power_unit":"1",
          "Full_price":"2"
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
    console.log(jsonData)
    
  }
  
  async function configExistence() { 
    const response = await fetch(
      'http://localhost:8080/config_existence',
      {
        method: 'POST',
        headers:{
          "Content-Type":'application/json'
        },
        body: JSON.stringify({
          "Name" : "Sborka"
        })
      }
    )
    const jsonData = await response.json()
    console.log(jsonData)
    
  }

  async function deleteConfig() {
    const response = await fetch(
      'http://localhost:8080/delete_config',
      {
        method: 'POST',
        headers:{
          "Content-Type":'application/json'
        },
        body: JSON.stringify({
          "ID":"4"
        })

      }
    )
    const jsonData = await response.json()
    console.log(jsonData)
    
  }

  async function updateNameConfig() {
    const response = await fetch(
      'http://localhost:8080/update_name',
      {
        method: 'POST',
        headers:{
          "Content-Type":'application/json'
        },
        body: JSON.stringify({
          "NewName":"nameTest",
          "ID":"3"
        })
      }
    )
    const jsonData = await response.json()
    console.log(jsonData)
    
  }

  async function getCount() { 
    const response = await fetch(
      'http://localhost:8080/count',
      {
        method: 'POST',
        headers:{
          "Content-Type":'application/json'
        },
        body: JSON.stringify({
          "Component" : "Videocard"
        })

      }
    )
    const jsonData = await response.json()
    console.log(jsonData)
    
  }

  async function selectProduct() {
    const response = await fetch(
      'http://localhost:8080/select_component',
      {
        method: 'POST',
        headers:{
          "Content-Type":'application/json'
        },
        body: JSON.stringify({
          "Component" : "Videocard",
          "ID":"2"
        })
      }
    )
    const jsonData = await response.json()
    console.log(jsonData)
    
  }

  async function getMaxPriceInComponents() {
    const response = await fetch(
      'http://localhost:8080/max_component_price',
      {
        method: 'POST',
        headers:{
          "Content-Type":'application/json'
        },
        body: JSON.stringify({
          "Component":"Disk"
        })

      }
    )
    const jsonData = await response.json()
    console.log(jsonData)
    
  }

  async function getFiltersInComponent() {
    const response = await fetch(
      'http://localhost:8080/component_filters',
      {
        method: 'POST',
        headers:{
          "Content-Type":'application/json'
        },
        body: JSON.stringify({
          "Component":"Videocard"
        })

      }
    )
    const jsonData = await response.json()
    console.log(jsonData)
    
  }

  const [modalInfoActive, setModalInfoActive] = useState(false);
  const [modalContactsActive, setModalContactsActive] = useState(false);
  // отримання фільтрів 
  return (
    <div className="app">
        <header className="header">
          <a href="/">
            <img src="./images/configurator.jpg" width="100" alt="логотип" className="mainLogo" />
          </a>
          <nav className="navbar">
            <a href="/Configs" className="configurations">Каталог конфігурацій</a>
            <button className="open-btn" onClick={() => setModalInfoActive(true)}>Мануал</button>
            <button className="open-btn" onClick={() => setModalContactsActive(true)}>Зворотній звʼязок</button>
          </nav>
        </header>

        <ModalInfo active={modalInfoActive} setActive={setModalInfoActive} className="modalInfo">
        </ModalInfo>
        <ModalContacts active={modalContactsActive} setActive={setModalContactsActive} className="modalContacts">
        </ModalContacts>
        <Suspense fallback={<div>loading...</div>}>
        <Routes>
          <Route path="/" element={<MainPage />}/>  
          <Route path="/configs" element={<ConfigsPage />}/>
        </Routes>
        </Suspense>
    </div> 
  )
}

export default App;
