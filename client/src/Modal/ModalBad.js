import "./modalBad.css"

const ModalContacts = ({active, setActive, badText}) => {
    return (
        <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
            <div className={active ? "modal__content active" : "modal__content"} onClick={e => e.stopPropagation()}>
                <div className="badContent">
                    <img src="../images/vectorBad.svg" alt="НЕВДАЧА" className="bad"/>
                    <div className="issue">
                        {badText}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalContacts;