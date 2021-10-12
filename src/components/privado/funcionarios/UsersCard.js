import React from 'react'
const imagemLixeira = "https://2.bp.blogspot.com/-DqfqcqsH47M/UMixbjsQlnI/AAAAAAAAI_U/IQkIeo-wOaU/s1600/Lixeira+-+Premium+Design+3D+(1).png"
export default function UsersCard(props) {
    return (
        <div>
            <div>
                <h3>{props.user}</h3>
            </div>
            <div>
                <button onClick={()=>props.delete(props.id)}><img alt="deletar" src={imagemLixeira}/></button>
            </div>
        </div>
    )
}

