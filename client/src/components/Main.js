import React, { useState, Suspense, useLayoutEffect } from "react";
import "./components.css";

const ModalCase = React.lazy(() => import ("../Modal/ModalCase"))
const ModalMother = React.lazy(() => import ("../Modal/ModalMother"))
const ModalRAM = React.lazy(() => import ("../Modal/ModalRAM"))
const ModalGPU = React.lazy(() => import ("../Modal/ModalGPU"))
const ModalStorage = React.lazy(() => import ("../Modal/ModalStorage"))
const ModalPower = React.lazy(() => import ("../Modal/ModalPower"))
const ModalCPU = React.lazy(() => import ("../Modal/ModalCPU"))
const ModalCool = React.lazy(() => import ("../Modal/ModalCool"))
const ModalBad = React.lazy(() => import ("../Modal/ModalBad"))
const ModalGood = React.lazy(() => import ("../Modal/ModalGood"))

export const Main = () => {

  const [countBody, setCountBody] = useState(0);
  const [countMother, setCountMother] = useState(0);
  const [countRAM, setCountRAM] = useState(0);
  const [countCool, setCountCool] = useState(0);
  const [countGPU, setCountGPU] = useState(0);
  const [countCPU, setCountCPU] = useState(0);
  const [countStorage, setCountStorage] = useState(0);
  const [countPower, setCountPower] = useState(0);

  const [dataBody, setBody] = useState(null);
  const [dataMother, setMother] = useState(null);
  const [dataRAM, setRAM] = useState(null);
  const [dataCool, setCool] = useState(null);
  const [dataGPU, setGPU] = useState(null);
  const [dataCPU, setCPU] = useState(null);
  const [dataStorage, setStorage] = useState(null);
  const [dataPower, setPower] = useState(null);

  const [pickedCase, setConfigCase] = useState("");
  const [pickedMother, setConfigMother] = useState("");
  const [pickedCool, setConfigCool] = useState("");
  const [pickedRAM, setConfigRAM] = useState("");
  const [pickedGPU, setConfigGPU] = useState("");
  const [pickedStorage, setConfigStorage] = useState("");
  const [pickedPower, setConfigPower] = useState("");
  const [pickedCPU, setConfigCPU] = useState("");
  const [pickedName, setName] = useState("Збірка");

  const [isLoading, setIsLoading] = useState(true);

  const [modalBad, setModalBad] = useState(false)
  const [modalGood, setModalGood] = useState(false)

  const [modalBadContent, setModalBadContent] = useState("Не обрані усі комплектуючі")

  function setConfigCheck(){
    console.log(pickedCase)
    console.log(pickedMother)
    console.log(pickedCool)
    console.log(pickedRAM)
    console.log(pickedGPU)
    console.log(pickedStorage)
    console.log(pickedPower)
    console.log(pickedCPU)
    if (pickedCase === "" || pickedMother === "" || pickedCool === "" || pickedRAM === "" || pickedGPU === "" || pickedStorage === ""
    || pickedPower === "" || pickedCPU === ""){
      setModalBad(true)
      console.log(0)
    } else if (!(pickedMother.socket === pickedCPU.socket)){
      setModalBad(true)
      console.log(1)
      setModalBadContent("Сокети материнської плати та процесора не співпадають")
    } else if (!pickedCase.form_factors.includes(pickedMother.form_factor)){
      setModalBad(true)
      console.log(2)
      setModalBadContent("Форм-фактори материнської плати та корпуса не співпадають")
    } else if (!(pickedMother.memory_type === pickedRAM.memory_type)){
      setModalBad(true)
      console.log(3)
      setModalBadContent("Материнська плата не підтримує цей тип памʼяті")
    } else if (!pickedCool.string_agg.includes(pickedCPU.socket)){
      setModalBad(true)
      console.log(4)
      setModalBadContent("Сокети материнської плати та системи охолодження")
    } else if (!(Number(pickedCPU.tdp) + Number(pickedGPU.power) < Number(pickedPower.power) + 100)){
      setModalBad(true)
      console.log(5)
      setModalBadContent("Енергоспоживання збірки перевищує потужність блока живлення")
    } else {
      setConfig(pickedName, pickedCase, pickedMother, pickedCPU, pickedCool, pickedRAM, pickedGPU, pickedStorage, pickedPower)
      setModalGood(true)
    }
  }

  async function setConfig(name, body, mother, cpu, cool, ram, gpu, storage, power) {
    const fullPrice = cpu.price + mother.price + body.price + cool.price + ram.price + gpu.price + storage.price + power.price
    const response=await fetch(
      'http://localhost:8080/set_config',
      {
        method: 'POST',
        headers:{
          "Content-Type":'application/json'
        },
        body: JSON.stringify({
          "Name":name,
          "Body":String(body.id),
          "Motherboard":String(mother.id),
          "Processor":String(cpu.id),
          "Cooling_system":String(cool.id),
          "RAM":String(ram.id),
          "Videocard":String(gpu.id),
          "Disk":String(storage.id),
          "Power_unit":String(power.id),
          "Full_price":String(fullPrice)
        })
      }
    )
    const jsonData = await response.json()
    console.log(jsonData)
  }

  async function getBody() {
    const response = await fetch(
      'http://localhost:8080/body',
      {
        method: 'POST',
        headers:{
          "Content-Type":'application/json'
        },
        body: JSON.stringify({
          "Price": [0,30000]
        })

      }
    )
    const jsonData = await response.json()
    return jsonData.Page_data
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

        })
      }
    )
    const jsonData = await response.json()
    return jsonData.Page_data
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

        })
      }
    )
    const jsonData = await response.json()
    return jsonData.Page_data
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
          
        })
      }
    )
    const jsonData = await response.json()
    return jsonData.Page_data
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
    return jsonData.Page_data
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
    return jsonData.Page_data
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
    return jsonData.Page_data
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
    return jsonData.Page_data
  }

  async function getCount(iron) { 
    const response = await fetch(
      'http://localhost:8080/count',
      {
        method: 'POST',
        headers:{
          "Content-Type":'application/json'
        },
        body: JSON.stringify({
          "Component" : iron
        })

      }
    )
    const jsonData = await response.json()
    return jsonData
    
  }

  useLayoutEffect(() => {
    // Всередині цієї функції ви можете викликати вашу асинхронну функцію
    async function fetchData() {
      try {
        const response = await getBody();
        setBody(response); // Встановлюємо отримані дані у стан
        const response1 = await getMotherBoard();
        setMother(response1); // Встановлюємо отримані дані у стан
        const response2 = await getCoolingSystem();
        setCool(response2); // Встановлюємо отримані дані у стан
        const response3 = await getRAM();
        setRAM(response3); // Встановлюємо отримані дані у стан
        const response4 = await getVideoCard();
        setGPU(response4); // Встановлюємо отримані дані у стан
        const response5 = await getHardDrive();
        setStorage(response5); // Встановлюємо отримані дані у стан
        const response6 = await getPowerUnit();
        setPower(response6); // Встановлюємо отримані дані у стан
        const response7 = await getCpu();
        setCPU(response7); // Встановлюємо отримані дані у стан
        
        const Count = await getCount("body")
        setCountBody(Count[0].amount)
        const Count1 = await getCount("processor")
        setCountCPU(Count1[0].amount)
        const Count2 = await getCount("cooling_system")
        setCountCool(Count2[0].amount)
        const Count3 = await getCount("videocard")
        setCountGPU(Count3[0].amount)
        const Count4 = await getCount("motherboard")
        setCountMother(Count4[0].amount)
        const Count5 = await getCount("power_unit")
        setCountPower(Count5[0].amount)
        const Count6 = await getCount("ram")
        setCountRAM(Count6[0].amount)
        const Count7 = await getCount("disk")
        setCountStorage(Count7[0].amount)

        setIsLoading(false);
       
      } catch (error) {
        console.error('Помилка при завантаженні даних:', error);
      }
    }

    fetchData();
  }, []); // Другий аргумент (пустий масив) свідчить про те, що ефект буде виконуватись тільки при монтуванні компонента.
  const [modalCaseActive, setModalCaseActive] = useState(false);
  const [modalMotherActive, setModalMotherActive] = useState(false);
  const [modalRAMActive, setModalRAMActive] = useState(false);
  const [modalCoolActive, setModalCoolActive] = useState(false);
  const [modalGPUActive, setModalGPUActive] = useState(false);
  const [modalStorageActive, setModalStorageActive] = useState(false);
  const [modalPowerActive, setModalPowerActive] = useState(false);
  const [modalCPUActive, setModalCPUActive] = useState(false);
    return(
      <main className="main">
        <div className="leftContainers">
          <div className={pickedCase !== "" ? "components active" : "components"}>
            <div className="componentLogo">
              <img src="../images/caseLogo.svg" alt="корпус" />
              <p>Корпус</p>
            </div>
            <div className="rightAdd">
              {
                pickedCase !== "" ? 
                <div className="pickedIron">
                  <img src={pickedCase.img} alt="case" className="pickedImg"/>
                  <p>{pickedCase.name}</p>
                </div>:
                <p>{countBody} товарів</p>
              }
              <button className="componentAdd" onClick={() => setModalCaseActive(true)}>Додати</button>
            </div>
          </div>
          <div className={pickedMother !== "" ? "components active" : "components"}>
            <div className="componentLogo">
              <img src="../images/motherboardLogo.svg" alt="Плата" />
              <p>Материнська плата</p>
            </div>
            <div>
              <div className="rightAdd">
                {
                pickedMother !== "" ? 
                <div className="pickedIron">
                  <img src={pickedMother.img} alt="case" className="pickedImg"/>
                  <p>{pickedMother.name}</p>
                </div>:
                <p>{countMother} товарів</p>
                }
                <button className="componentAdd" onClick={() => setModalMotherActive(true)}>Додати</button>
              </div>
            </div>
          </div>
          <div className={pickedCool !== "" ? "components active" : "components"}>
            <div className="componentLogo">
              <img src="../images/CPUCoolingLogo.svg" alt="Охолодження" />
              <p>Система охолодження</p>
            </div>
            <div className="rightAdd">
                {
                pickedCool !== "" ? 
                <div className="pickedIron">
                  <img src={pickedCool.img} alt="case" className="pickedImg"/>
                  <p>{pickedCool.name}</p>
                </div>:
                <p>{countCool} товарів</p>
                }
              <button className="componentAdd" onClick={() => setModalCoolActive(true)}>Додати</button>
            </div>
          </div>
          <div className={pickedRAM !== "" ? "components active" : "components"}>
            <div className="componentLogo">
              <img src="../images/RAMLogo.svg" alt="RAM" />
              <p>Оперативна памʼять</p>
            </div>
            <div className="rightAdd">
                {
                pickedRAM !== "" ? 
                <div className="pickedIron">
                  <img src={pickedRAM.img} alt="case" className="pickedImg ram"/>
                  <p>{pickedRAM.name}</p>
                </div>:
                <p>{countRAM} товарів</p>
                }
              <button className="componentAdd" onClick={() => setModalRAMActive(true)}>Додати</button>
            </div>
          </div>
          <div className={pickedGPU !== "" ? "components active" : "components"}>
            <div className="componentLogo">
              <img src="../images/GPULogo.svg" alt="GPU" />
              <p>Відеокарта</p>
            </div>
            <div className="rightAdd">
                {
                pickedGPU !== "" ? 
                <div className="pickedIron">
                  <img src={pickedGPU.img} alt="case" className="pickedImg"/>
                  <p>{pickedGPU.name}</p>
                </div>:
                <p>{countGPU} товарів</p>
                }
              <button className="componentAdd" onClick={() => setModalGPUActive(true)}>Додати</button>
            </div>
          </div>
          <div className={pickedStorage !== "" ? "components active" : "components"}>
            <div className="componentLogo">
              <img src="../images/dataStorageLogo.svg" alt="Накопичувач" />
              <p>Зберігання даних</p>
            </div>
            <div className="rightAdd">
                {
                pickedStorage !== "" ? 
                <div className="pickedIron">
                  <img src={pickedStorage.img} alt="case" className="pickedImg"/>
                  <p>{pickedStorage.name}</p>
                </div>:
                <p>{countStorage} товарів</p>
                }
              <button className="componentAdd" onClick={() => setModalStorageActive(true)}>Додати</button>
            </div>
          </div>
          <div className={pickedPower !== "" ? "components active" : "components"}>
            <div className="componentLogo">
              <img src="../images/powerUnitLogo.svg" alt="БП" className="powerUnit"/>
              <p>Блок живлення</p>
            </div>
            <div className="rightAdd">
                {
                pickedPower !== "" ? 
                <div className="pickedIron">
                  <img src={pickedPower.img} alt="case" className="pickedImg"/>
                  <p>{pickedPower.name}</p>
                </div>:
                <p>{countPower} товарів</p>
                }
              <button className="componentAdd" onClick={() => setModalPowerActive(true)}>Додати</button>
            </div>
          </div>
          <div className={pickedCPU !== "" ? "components active" : "components"}>
            <div className="componentLogo">
              <img src="../images/CPULogo.svg" alt="CPU" />
              <p>Процесор</p>
            </div>
            <div className="rightAdd">
                {
                pickedCPU !=="" ? 
                <div className="pickedIron">
                  <img src={pickedCPU.img} alt="case" className="pickedImg"/>
                  <p>{pickedCPU.name}</p>
                </div>:
                <p>{countCPU} товарів</p>
                }
              <button className="componentAdd" onClick={() => setModalCPUActive(true)}>Додати</button>
            </div>
          </div>
        </div>
        <div className="rightContainers">
          <input type="text" placeholder="Введіть назву збірки" value={pickedName} onChange={e => setName(e.target.value)} className="inputName"/>
          <button className="btnName" onClick={() => setConfigCheck()}>Зберегти збірку</button>
        </div>
        <Suspense fallback={<div>loading...</div>}>
        <ModalCase active={modalCaseActive} setActive={setModalCaseActive} items={dataBody} state={pickedCase} isLoading={isLoading} 
        parentCallback={setConfigCase} className="modalCase">
        </ModalCase>
        <ModalMother active={modalMotherActive} setActive={setModalMotherActive} items={dataMother} state={pickedMother} isLoading={isLoading} 
        parentCallback={setConfigMother} className="modalCase">
        </ModalMother>
        <ModalCool active={modalCoolActive} setActive={setModalCoolActive} items={dataCool} state={pickedCool} isLoading={isLoading}
        parentCallback={setConfigCool} className="modalCase">
        </ModalCool>
        <ModalRAM active={modalRAMActive} setActive={setModalRAMActive} items={dataRAM} isLoading={isLoading}
        state={pickedRAM} parentCallback={setConfigRAM} className="modalCase">
        </ModalRAM>
        <ModalGPU active={modalGPUActive} setActive={setModalGPUActive} items={dataGPU} state={pickedGPU} isLoading={isLoading} 
        parentCallback={setConfigGPU} className="modalCase">
        </ModalGPU>
        <ModalStorage active={modalStorageActive} setActive={setModalStorageActive} items={dataStorage} state={pickedStorage} isLoading={isLoading} 
        parentCallback={setConfigStorage} className="modalCase">
        </ModalStorage>
        <ModalPower active={modalPowerActive} setActive={setModalPowerActive} items={dataPower} state={pickedPower} isLoading={isLoading}
        parentCallback={setConfigPower} className="modalCase">
        </ModalPower>
        <ModalCPU active={modalCPUActive} setActive={setModalCPUActive} items={dataCPU} state={pickedCPU} isLoading={isLoading}
        parentCallback={setConfigCPU} className="modalCase">
        </ModalCPU>
        <ModalBad active={modalBad} setActive={setModalBad} badText={modalBadContent}/>
        <ModalGood active={modalGood} setActive={setModalGood}/>
        </Suspense>
      </main>
    )
}

export default Main