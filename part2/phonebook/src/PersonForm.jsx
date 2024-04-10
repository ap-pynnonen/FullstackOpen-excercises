import personService from "./services/persons"

const PersonForm = (props) => {

    const addPerson = (event) => {
        event.preventDefault()
        let Namecheck = false;
        let personID = 0;

        const personObject = {
          name: props.newName,
          number: props.newNumber,
        }
        for(let i = 0;props.persons.length > i;i++) {
          if(props.persons[i].name === props.newName) {
            Namecheck = true;
            personID = props.persons[i].id
            //alert(`${props.newName} is already added to phonebook`)
          }
        }
       if (Namecheck === false) {
        personService.create(personObject).then(response => {
          props.setPersons(props.persons.concat(response.data))
        })
        
        props.setNewName('')
        props.setNewNumber('')
       }
       else {
        if (window.confirm(`${props.newName} is already added to phonebook, replave the old number with a new one?`)) {
          personService.updateNumber(personID, personObject).then(response => {
            console.log(response)
            props.setPersons(props.persons.map(person => person.id !== personID ? person : response.data))
            
            props.setNewName('')
            props.setNewNumber('')
          })
        }
       }
      
      }
      
      const handlePersonChange = (event) => {
        props.setNewName(event.target.value)
      }
      
      const handleNumberChange = (event) => {
        props.setNewNumber(event.target.value)
      }

    return (
        <form onSubmit={addPerson}>
        <div>
          name: <input value={props.newName} onChange={handlePersonChange} />
        </div>
        <div>
          number: <input value={props.newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonForm