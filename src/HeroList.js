import React from 'react'
import HeroInfoCard from './HeroInfoCard'

const HeroList = (props) =>{
    const superheroes = props.superheroes
    if (superheroes.length === 0) return <></>
    return(
        <ul>
        {
            superheroes.map(superhero =>{
                return(
                    <li key = {superhero.id}>
                        <HeroInfoCard superhero = {superhero}></HeroInfoCard>
                    </li>
                )
            })
        }
        </ul>
    )
}

export default HeroList