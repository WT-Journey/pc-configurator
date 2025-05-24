import "../components/components.css"

export default function VueMother({items, parentCallback}) {

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
                                    <p>{item.chipset}, {item.form_factor}, {item.memory_type}, {item.socket}</p>
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
