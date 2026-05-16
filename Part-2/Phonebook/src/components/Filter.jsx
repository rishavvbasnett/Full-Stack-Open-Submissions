const Filter = ({newFilter, handleFilter}) => {

  return (
    <div>
        Filter: <input value={newFilter} onChange={(e) => handleFilter(e)} />
      </div>
  )
}

export default Filter