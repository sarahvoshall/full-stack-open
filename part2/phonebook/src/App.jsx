import { useState, useEffect } from "react";
import axios from "axios";

import personServices from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  useEffect(() => {
    personServices.getAll().then((data) => {
      setPersons(data);
    });
  }, []);

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (persons.find((person) => person.name === newName)) {
      alert("This person is already in your phonebook.")
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };

      personServices.create(newPerson).then((data) => {
        setPersons(persons.concat(data));
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const handleDeleteClick = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      personServices.deletePerson(id).then(() => {
        personServices.getAll().then((data) => setPersons(data));
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input />
      </div>
      <h2>Add a new contact</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input onChange={handleNameChange} value={newName} />
        </div>
        <div>
          number: <input onChange={handleNumberChange} value={newNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <li key={person.id}>
            {person.name} {person.number}
            <button onClick={() => handleDeleteClick(person.id)}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
