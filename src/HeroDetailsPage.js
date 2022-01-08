import React, {useState, useEffect} from 'react'
import axios from 'axios'
import HeroList from './HeroList'
import SearchBar from './SearchBar'
import config from './Config'

/*This component fetches the data from the API endpoint and displays the SearchBar and HeroList once the request is complete.
The HeroList is filtered based on the search query */
const HeroDetailsPage = () =>{
    const [superheroData, setSuperheroData] = useState([])
    const [searchString, setSearchString] = useState("")
    const [apiErrorOccurred, setApiErrorOccurred] = useState(false)

    //once mounted, load superheroData from the api and update the state
    useEffect(() =>{
        const requestURL = config.apiURL + config.apiEndpoint
        axios.get(requestURL).then(response =>{
            setSuperheroData(response.data)
        })
        .catch((error) =>{
            setApiErrorOccurred(true)
        })
    }, [])

    const searchCallback = (searchValue) =>{
        window.scrollTo(0,0)
        setSearchString(searchValue)
    }

    const isDataLoaded = superheroData.length > 0
    //if the user entered a search string, filter heroes out based on name
    const filteredHeroes = (searchString.length === 0) ? superheroData : superheroData.filter((superhero) =>{
        return superhero.name.toLowerCase().includes(searchString)
    })

    //if the api request is complete, show the search bar and hero list
    if (isDataLoaded && filteredHeroes.length > 0){
        return (
            <div>
                <SearchBar searchCallback={searchCallback}/>
                <HeroList superheroes={filteredHeroes}/>
            </div>
        )
    }
    //if the data is loaded but the search query filters all of them out, inform the user
    else if (isDataLoaded && filteredHeroes.length === 0){
        return(
            <div>
                <SearchBar searchCallback={searchCallback}/>
                <p>No heroes found with the given name.</p>
            </div>
        )
    }
    //if there were any errors fetching the data, inform the user
    else if (apiErrorOccurred){
        return <p>There was an error retrieving the data.</p>
    }
    //if the data isn't loaded, but an error hasn't happened, show a loading message
    else{
        return <p>Loading...</p>
    }
}

export default HeroDetailsPage