import React, {useState} from 'react'
import './styles/SearchBar.css'

const SearchBar = (props) =>{
    const [text, setText] = useState("")
    const searchCallback = props.searchCallback

    
    const handleTextEdit = (event) =>{
        const text = event.target.value
        setText(text)
        return
    }

    const handleFormSubmit = (event) =>{
        event.preventDefault()
        searchCallback(text.toLowerCase())
    }
    
    return(
        <div>
            <form className='SearchForm' onSubmit={handleFormSubmit} >
                <input className='SearchBox' type="text" name="search" id="search" value={text} onChange={handleTextEdit}/>
                <input className='SearchButton' type="submit" value="Search by name"></input>
            </form>
        </div>
    )
}

export default SearchBar