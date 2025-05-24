import "../components/components.css"

export default function VuePower({items, parentCallback}) {

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
                                <h2>{item.name}</h2>
                                <div>
                                    <p>{item.power_unit_type}, потужність: {item.power} Ватт</p>
                                </div>
                            </div>
                        </div>
                        <div className="itemWrapper">
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
