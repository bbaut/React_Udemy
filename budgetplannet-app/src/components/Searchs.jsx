import {useState, useEffect} from 'react'

const Searchs = ({search, setSearch}) => {
  return (
    <div className='filtros sombra contenedor'>
        <form>
            <div className='campo'>
                <label>Expenses</label>
                <select 
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="saved">Saved</option>
                  <option value="food">Food</option>
                  <option value="entertainment">Entertainment</option>
                  <option value="home">Home</option>
                  <option value="insurance">Insurance</option>
                  <option value="other">Other</option>
                </select>
            </div>
        </form>
    </div>
  )
}

export default Searchs