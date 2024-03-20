import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState([0,0,0,0,0,0,0])
  const [maxVote, setmaxVote] = useState(0)

  const RandomAnecdote = () => {
    const randomNumber = Math.floor(Math.random() * 7)
    setSelected(randomNumber);
  }

  const Vote = () => {
    const copy = {...points};
    copy[selected] += 1;
    setPoints(copy);
    
    let max = copy[0];
    let maxIndex = 0;
    //copy.length return undefined so this is needed
    let copykeys = Object.keys(copy);
    let copylen = copykeys.length
    //console.log(copylen)

    for (let i = 1; i < copylen+1; i++) {
        if (copy[i] > max) {
            maxIndex = i;
            max = copy[i];
        }
    }
    setmaxVote(maxIndex)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <button onClick={Vote}>Vote</button>
      <button onClick={RandomAnecdote}>next anecdote</button>

    <h1>Anecdote with most votes</h1>
    <p>{anecdotes[maxVote]}</p>
    <p>has {points[maxVote]} votes</p>
    </div>
  )
}

export default App