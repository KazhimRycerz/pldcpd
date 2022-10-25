import Animal from "./Animals";
import {useEffect, useContext} from "react";
import axios from "axios"; 
import './AnimalList.scss'
import { AnimalListContext } from "../../context/AnimalListContext";

const AnimalList = () => {
    const [animals, setAnimals, loaded, setLoaded] = useContext(AnimalListContext);

    useEffect(() => {
        const getAllAnimals = async () => {
            const resp = await axios.get("http://localhost:3001/animals");
            const data = await resp.data;
            setAnimals(data);
            setLoaded(true);
        }
        getAllAnimals();
    }, [loaded])

    const onAnimalDelete = async (id) => {
        await axios.delete(`http://localhost:3001/animals/${id}`);
        // Gib mir alle animals zurück die nicht die id haben von dem animal, welches ich gerade gelöscht habe. 
        const updatedAnimals = animals.filter(animalObj => {
            if(animalObj._id === id) return false;
            return true; 
        });
        setAnimals(updatedAnimals);
    }

    return(
        <div id="listBox">
            <h1>Current list of Animals</h1>
            <ul>
                {animals.map((animalObj, index) => {
                    return (<Animal name={animalObj.name} species={animalObj.species} key={index} onAnimalDelete={onAnimalDelete} id={animalObj._id}/>)
                })}
            </ul>
        </div>
    )
}


export default AnimalList;