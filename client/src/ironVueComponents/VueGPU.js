import "../components/components.css"

export default function VueGPU({items, parentCallback}) {

    function handlerItem(event) {
        parentCallback(event)
    }

    return (
        
      <div>
            {
                items?.map(item => {
                    return(
                    <div key={item.id} className='wrapperIron'>
                        <div className='leftBlock'>                       
                            <img src={item.img} alt="" className='cardImg'/>
                            <div>
                                <h1>{item.name}</h1>
                                <div>
                                    <p>тип памʼяті: {item.videomemory_type}, споживання: {item.power} Ватт</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h2>{item.price}</h2>
                            <button onClick={() => handlerItem(item)}>Додати</button>
                        </div> 
                    </div>
                    )
                })
            }
      </div>
    )
}
