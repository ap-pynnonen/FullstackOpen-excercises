import personService from "./services/persons"

const Persons = (props) => {

    const personToShow = props.showFilter ? props.persons.filter(person => person.name.toLowerCase().includes(props.filter.toLowerCase()) === true) : props.persons

    const personDelete = (name, id) => {
        if (window.confirm(`Delete ${name}`)) {
            personService.deletePerson(id).then(response => {
                console.log(response)
                props.setPersons(props.persons.filter(n => n.id !== id))
            })
        }
    }

    return(
        <div>{personToShow.map(person => 
            <p key={person.name}>{person.name} {person.number} <button onClick={() => personDelete(person.name, person.id)}>delete</button></p>
        )}</div>
    )
}

export default Persons