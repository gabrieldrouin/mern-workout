import { useState } from "react"
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

const WorkoutForm = () => {
    const { dispatch } =  useWorkoutsContext()
    const [title, setTitle] = useState('')
    const [sets, setSets] = useState('')
    const [reps, setReps] = useState('')
    const [rest, setRest] = useState('')
    const [error, setError] = useState(null)

const handleSubmit = async (e) => {
    e.preventDefault()

    const workout = {title, sets, reps, rest}

    const response = await fetch('/api/workouts', {
        method: 'POST',
        body: JSON.stringify(workout),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const json = await response.json()

    if (!response.ok) {
        setError(json.error)
    }
    if (response.ok) {
        setTitle('')
        setSets('')
        setReps('')
        setRest('')
        setError(null)
        console.log('Nouvel exercice ajouté', json)
        dispatch({type: 'CREATE_WORKOUT', payload: json})
    }
}

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Nouvel exercice</h3>

            <label>Nom de l'exercice:</label>
            <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            />

            <label>Nombre de sets:</label>
            <input
            type="number"
            onChange={(e) => setSets(e.target.value)}
            value={sets}
            />

            <label>Nombre de reps:</label>
            <input
            type="number"
            onChange={(e) => setReps(e.target.value)}
            value={reps}
            />

            <label>Temps de repos (secondes):</label>
            <input
            type="number"
            onChange={(e) => setRest(e.target.value)}
            value={rest}
            />

            <button>Ajouter</button>
            {error && <div className="error">{error}</div>}
        </form>

    )
}

export default WorkoutForm