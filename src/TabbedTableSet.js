import React, {useState} from 'react'
import './styles/TabbedTableSet.css'

/*This component maintains a set of tables that can be shown or hidden based on which tab the user clicks */
const TabbedTableSet = (props) =>{
    //currentTableIndex is used to show whichever stat table the user clicks on
    const [currentTableIndex, setCurrentTableIndex] = useState(0)

    const superhero = props.superhero
    //convert the hero's parameters to html tables
    const powerstatsTable = objectToTable(superhero.name, superhero.powerstats)
    const appearanceTable = objectToTable(superhero.name, superhero.appearance)
    const biographyTable = objectToTable(superhero.name, superhero.biography)
    const workTable = objectToTable(superhero.name, superhero.work)
    const connectionsTable = objectToTable(superhero.name, superhero.connections)

    //make an array of the tables so the appropriate table can be selected by index
    const aggregateTable = [powerstatsTable, appearanceTable, biographyTable, workTable, connectionsTable]

    const buttonText = ["Stats", "Appearance", "Bio", "Work", "Connections"]

    return(
        <div className='TabbedTable'>
            <div className='TabSet'>
            {buttonText.map((text) =>{
                return(<button className="TableTab" key={superhero.name + text} onClick= {() => {setCurrentTableIndex(buttonText.indexOf(text))}} >{text}</button>)
            })}
            </div>
            <table>
                <tbody>
                {
                    aggregateTable[currentTableIndex]
                }
                </tbody>
            </table>
        </div>
    )
}

//takes an object representing a set of stats and formats it into table rows
const objectToTable = (superheroName, objectValue) =>{
    //for each entry in the object, create a table row made up of 2 columns
    const table = Object.entries(objectValue).map((entry) =>{
        //get the name of the stat, and format camelCase to Capitalized Words 
        let statName = entry[0]
        statName = statName.replace(/([A-Z])/g, " $1")
        statName = statName.charAt(0).toUpperCase() + statName.slice(1);
        //get the value of the stat, fix it if it's null, and then get the first element if there are alternate units (e.g. lb vs kg)
        let statValue = entry[1]
        if (statValue === null) statValue = "unspecified"
        if (Array.isArray(statValue)) statValue = statValue[0]
        //return a table row with the formatted key and value
        return(
            <tr key={superheroName + statName}>
                <td>
                    {statName}    
                </td>
                <td>
                    {statValue}
                </td>
            </tr>
        )
    })
    return table
}

export default TabbedTableSet