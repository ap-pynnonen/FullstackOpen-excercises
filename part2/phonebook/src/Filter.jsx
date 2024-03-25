const Filter = (props) => {

    const handleFilterChange = (event) => {
        props.setFilter(event.target.value)
        if (event.target.value.length > 0) {
          props.setShowFilter(true)
        }
        else {
          props.setShowFilter(false)
        }
      }

    return(
        <div>
            filter shown with <input value={props.filter} onChange={handleFilterChange} />
        </div>
    )
}

export default Filter