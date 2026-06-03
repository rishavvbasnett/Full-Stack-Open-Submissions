const PersonForm = ({ handleSubmit, nameRef, numberRef }) => {
  return (
    <form onSubmit={handleSubmit}>
      <h3>Add new number</h3>
      <div>
        Name: <input required ref={nameRef} />
      </div>
      <div>
        Number: <input required ref={numberRef} />
      </div>

      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  );
};

export default PersonForm;
