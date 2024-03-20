const Total = (props) => {
    //console.log(props);
    //console.log("here")
    //console.log(props.course.parts[0].name);

    const total = props.course.parts.reduce(function (acc, obj) {return acc + obj.exercises;}, 0);

    return (
        <div>
            <b>Number of exercises {total}</b>
        </div>
    )
}

export default Total