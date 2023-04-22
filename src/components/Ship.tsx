import "./styles/Ship.css";

export interface ShipFormValues {
  id: number,
  name: string;
  type: string;
  launchYear: number;
}
export interface AircraftData {
  id: number;
  name: string;
  type: string;
  launchYear: number;
}
export interface Aircraft {
  aircraft: AircraftData;
  openForm: (data: ShipFormValues) => void;
  deleteShip: (id: number) => void
}

export const Ship = ({ aircraft, openForm, deleteShip }: Aircraft) => {
  const shipData = {
    id: aircraft.id,
    name: aircraft.name,
    type: aircraft.type,
    launchYear: aircraft.launchYear,
  }

  return (
    <article className="aircraft-card">
      <h2 className="aircraft-card__name">{aircraft.name}</h2>
      <p className="aircraft-card__type">Tipo: {aircraft.type}</p>
      <p className="aircraft-card__launch-year">
        Año de lanzamiento: {aircraft.launchYear}
      </p>
      <div className="aircraft-card__options">
        <button className="aircraft-card__button aircraft-card__button-update" onClick={() => openForm(shipData)}>Editar</button>
        <button className="aircraft-card__button aircraft-card__button-delete" onClick={() => deleteShip(aircraft.id)}>Eliminar</button>
      </div>
    </article>
  );
};

export default Ship;
