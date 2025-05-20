import "./modalInfo.css"

const ModalInfo = ({active, setActive}) => {
    return (
        <div className={active ? "modalar active" : "modalar"} onClick={() => setActive(false)}>
            <div className={active ? "modalar__content active" : "modalar__content"} onClick={e => e.stopPropagation()}>
                <p className="info">
                    Конфігуратор ПК — онлайн-інструмент, який дозволяє самостійно зібрати персональний компʼютер. Окрім конфігуратора, є можливість сформувати каталог готових конфігурацій, 
                    та обрати збірку на будь-який смак/бюджет.
                </p>
            </div>
        </div>
    )
}

export default ModalInfo;