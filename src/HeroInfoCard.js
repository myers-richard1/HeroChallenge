import React from 'react'
import LazyLoad from 'react-lazyload'
import TabbedTableSet from './TabbedTableSet'
import placeholderImage from './placeholder.jpg'
import './styles/HeroInfoCard.css'

/*This component displays the name, image, and stats of the hero. */
const HeroInfoCard = (props) =>{
    const superhero = props.superhero

    const image = <img src={superhero.images.md} alt={'...'}/>
    const placeholder = <img src={placeholderImage} alt={'...'}/>

    return (
        <div>
            <p className="HeroCardTitle">
                {superhero.name}
            </p>
            <div className="ImageWithTable">
                <LazyLoad height={480} placeholder={placeholder}>
                    {image}
                </LazyLoad>
                <TabbedTableSet superhero={superhero}/>
            </div>
        </div>
        )
}

export default HeroInfoCard