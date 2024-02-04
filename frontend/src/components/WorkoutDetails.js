import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

// date fns
import { format } from 'date-fns';
import { frCA } from 'date-fns/locale';

const WorkoutDetails = ({ workout }) => {
    const { dispatch } = useWorkoutsContext()

    const handleClick = async () => {
        const response = await fetch('/api/workouts/' + workout._id, {
            method: 'DELETE'
        })

        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_WORKOUT', payload: json})
        }
    }


    return (
        <div className = "workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Sets: </strong>{workout.sets}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p><strong>Repos: </strong>{workout.rest}</p>
            <p>{format(new Date(workout.createdAt), "PPPpp", {locale: frCA})}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    )
}


export default WorkoutDetails