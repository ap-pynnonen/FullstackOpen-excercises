const Persons = (props) => {

    const personToShow = props.showFilter ? props.persons.filter(person => person.name.toLowerCase().includes(props.filter.toLowerCase()) === true) : props.persons

    return(
        <div>{personToShow.map(person => 
            <p key={person.name}>{person.name} {person.number}</p>
        )}</div>
    )
}

export default Persons