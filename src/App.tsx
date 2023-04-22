import "./App.css";
import Ship, { ShipFormValues } from "./components/Ship";
import { useEffect, useState } from "react";
import axios from "axios";
import ShipForm from "./components/ShipForm";
import FiltersShip from "./components/FiltersShip";
import { useForm } from "react-hook-form";

const aircraftsURL = "http://localhost:5173/api/ships";

interface Data {
  id: number;
  name: string;
  type: string;
  launchYear: number;
}

const App = () => {
  const [aircrafts, setAircrafts] = useState<Data[]>([]); //Estado donde se almacena la respuesta de la API

  const [fromShipComponent, setFromShipComponent] = useState(false);
  const [aircraftData, setAircraftData] = useState<ShipFormValues>(); //Estado donde se almacenan los datos de un avión específico
  const [formVisibility, setFormVisibility] = useState(false); //Estado que maneja la visibilidad del formulario

  const [searchValue, setSearchValue] = useState(""); //Estado donde se almacena la búsqueda del usuario
  const [selectedType, setSelectedType] = useState(""); //Estado donde se almacena el tipo de avión escogido en el dropdown por el usuario

  const handleSetAircraftData = (data: ShipFormValues) => {
    setAircraftData(data);
  };

  //Cambiar la visibilidad del formulario
  const changeFormVisibility = () => {
    setFormVisibility(!formVisibility);
  };

  //Llamada a la API para renderizar contenido
  useEffect(() => {
    axios.get(aircraftsURL).then((response) => {
      setAircrafts(response.data);
    });
  }, []);

  //Función para añadir un avión nuevo
  const { reset } = useForm<ShipFormValues>();
  const createShip = (data: ShipFormValues) => {
    axios
      .post("http://localhost:5173/api/ships", data)
      .then(() => {
        changeFormVisibility();
        reset();
        axios.get(aircraftsURL).then((response) => {
          setAircrafts(response.data);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Función para actualizar un avión
  const updateShip = (id: number, data: ShipFormValues) => {
    axios
      .put(`http://localhost:5173/api/ships/${id}`, data)
      .then(() => {
        changeFormVisibility();
        reset();
        axios.get(aircraftsURL).then((response) => {
          setAircrafts(response.data);
        });
      })
      .catch((error) => {
        console.log(error);
      });
      setFromShipComponent(false);
      reset(data)
  };

  //Función para abrir el formulario y guardar la información de un avión específico en el estado aircraftData
  const openForm = (data: ShipFormValues) => {
    changeFormVisibility()
    setFromShipComponent(true);
    setAircraftData(data);
  };

  const closeForm = () => {
    changeFormVisibility()
    setAircraftData({
      id: 0,
      name: "",
      type: "",
      launchYear: 0,
    })
    setFromShipComponent(false)
  }

  //Función para eliminar un avión
  const deleteShip = (id: number) => {
    axios
      .delete(`http://localhost:5173/api/ships/${id}`)
      .then(() => {
        setAircrafts(aircrafts.filter((aircraft) => aircraft.id !== id));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Función para actualizar el estado de búsqueda
  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchValue(event.target.value);
  };

  //Función para actualizar el estado del filtro por tipo
  const handleTypeSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedType(event.target.value);
  };

  //Constante array que almacena los aviones que coincidan con el valor del estado de búsqueda searchValue
  //y verifica que el tipo de avión coincida con el valor guardado en el estado selectedType
  const filteredAircrafts = aircrafts.filter(
    (aircraft) =>
      aircraft.name.toLowerCase().includes(searchValue.toLowerCase()) &&
      (selectedType === "" || aircraft.type === selectedType)
  );

  const aircraftTypes = [
    ...new Set(aircrafts.map((aircraft) => aircraft.type)),
  ];

  return (
    <main className="aircrafts">
      <FiltersShip
        searchValue={searchValue}
        handleSearchInputChange={handleSearchInputChange}
        selectedType={selectedType}
        handleTypeSelectChange={handleTypeSelectChange}
        aircraftTypes={aircraftTypes}
      />
      <button onClick={changeFormVisibility} className="aircrafts__add-ship">
        Añadir avión
      </button>
      {formVisibility && (
        <ShipForm
          createShip={createShip}
          updateShip={updateShip}
          closeForm = {closeForm}
          setAircraftData={handleSetAircraftData}
          fromShipComponent={fromShipComponent}
          aircraftData={aircraftData}
        />
      )}
      <ul className="aircrafts-list">
        {aircrafts
          ? filteredAircrafts.map((aircraft) => {
              return (
                <Ship
                  key={aircraft.id}
                  aircraft={aircraft}
                  openForm={openForm}
                  deleteShip={deleteShip}
                />
              );
            })
          : null}
      </ul>
    </main>
  );
};

export default App;
