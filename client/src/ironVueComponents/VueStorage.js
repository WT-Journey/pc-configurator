import "../components/components.css"

export default function VueStorage({items, parentCallback}) {

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
                                    <p>{item.disk_type}</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h2 className="itemWrapper">{item.price}</h2>
                            <button onClick={() => handlerItem(item)}>Додати</button>
                        </div> 
                    </div>
                    )
                })
            }
      </div>
    )
}
