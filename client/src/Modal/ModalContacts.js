import "./modalContacts.css"

const ModalContacts = ({active, setActive}) => {
    return (
        <div className={active ? "modalik active" : "modalik"} onClick={() => setActive(false)}>
            <div className={active ? "modalik__content active" : "modalik__content"} onClick={e => e.stopPropagation()}>
                <div className="contacts">
                    <span className="team">Склад розробників:</span>
                    <span>Здобувач освіти: Губач Богдан Юрійович</span> 
                    <span>Дипломний керівник: Павлова Наталя Віталіївна</span> 
                </div>
            </div>
            <a className={active ? "modalik__content active git" : "modalik__content git"} href="https://github.com/WT-Journey/pc-configurator" target="_blank" rel="noreferrer">
                Репозиторій на <span>Github</span>
            </a>
        </div>
    )
}

export default ModalContacts;