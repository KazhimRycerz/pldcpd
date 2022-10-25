import './LearningOpportunities.scss'

const Animal = (props) => {
    const { name, species, onAnimalDelete, id } = props;

    return (<>
        <li>A {species} called {name} <button onClick={() => onAnimalDelete(id)}>delete</button></li>
    </>)
}

export default Animal; 