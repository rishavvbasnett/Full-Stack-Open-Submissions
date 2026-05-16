const PersonForm = ({handleSubmit, newName, setNewName, newNumber, setNewNumber}) => {

  return (
          <form onSubmit={handleSubmit}>
        <h3>Add new number</h3>
        <div>
          Name:{" "}
          <input
            required
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </div>
        <div>
          Number:{" "}
          <input
            required
            value={newNumber}
            onChange={(e) => setNewNumber(e.target.value)}
          />
        </div>

        <div>
          <button type="submit">Add</button>
        </div>
      </form>
  )
}

export default PersonForm