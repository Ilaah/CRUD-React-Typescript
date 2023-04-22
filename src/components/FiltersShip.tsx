import './styles/FilterShip.css'

interface FiltersProps {
  searchValue: string,
  handleSearchInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  selectedType: string,
  handleTypeSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void,
  aircraftTypes: string[]
}

const FiltersShip = ({searchValue, handleSearchInputChange, selectedType, handleTypeSelectChange, aircraftTypes}: FiltersProps) => {
  
  return (
    <div className="aircrafts__filters__container">
      <input
        type="text"
        placeholder="Buscar avión por nombre"
        value={searchValue}
        onChange={handleSearchInputChange}
        className="aircrafts__search__name"
      />
      <select
        value={selectedType}
        onChange={handleTypeSelectChange}
        className="aircrafts__dropdown__types"
      >
        <option value="">Todos los tipos</option>
        {aircraftTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  )
}

export default FiltersShip
