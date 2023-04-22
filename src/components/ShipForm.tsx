import { useForm } from "react-hook-form";
import "./styles/ShipForm.css";

interface ShipFormProps {
  createShip: (data: ShipFormValues) => void;
  updateShip: (id: number, data: ShipFormValues) => void;
  closeForm: () => void;
  setAircraftData: (data: ShipFormValues) => void;
  fromShipComponent: boolean;
  aircraftData: ShipFormValues | undefined;
}

interface ShipFormValues {
  id: number;
  name: string;
  type: string;
  launchYear: number;
}

const ShipForm = ({
  createShip,
  updateShip,
  closeForm,
  setAircraftData,
  fromShipComponent,
  aircraftData,
}: ShipFormProps) => {
  const { register, handleSubmit, reset } = useForm<ShipFormValues>();
  const clearFormData = () => {
    setAircraftData({
      id: 0,
      name: "",
      type: "",
      launchYear: 0,
    });
  };

  const onSubmit = (data: ShipFormValues) => {
    if (fromShipComponent && aircraftData) {
      updateShip(aircraftData.id, data);
    } else {
      createShip(data);
    }
    clearFormData();
  };

  return (
    <section className="aircrafts__form__container">
      <form className="aircrafts__form" onSubmit={handleSubmit(onSubmit)}>
        <h2>{fromShipComponent ? "Editar avión" : "Añade un avión"}</h2>
        <div className="aircrafts__form__field">
          <label className="aircrafts__form__label">Nombre del avión:</label>
          <input
            className="aircrafts__form__input"
            type="text"
            {...register("name")}
            defaultValue={aircraftData && aircraftData.name}
          />
        </div>

        <div className="aircrafts__form__field">
          <label className="aircrafts__form__label">Tipo de avión:</label>
          <select
            className="aircrafts__form__dropdown"
            {...register("type")}
            defaultValue={aircraftData ? aircraftData.type : "Commercial"}
          >
            <option value="Commercial">Commercial</option>
            <option value="Private">Private</option>
            <option value="Military">Military</option>
          </select>
        </div>

        <div className="aircrafts__form__field">
          <label className="aircrafts__form__label">Año de lanzamiento:</label>
          <input
            className="aircrafts__form__input"
            type="number"
            {...register("launchYear")}
            defaultValue={aircraftData && aircraftData.launchYear}
          />
        </div>
        <div className="aircrafts__form__buttons__container">
          <button
            className="aircrafts__form__button aircrafts__form__button-cancel"
            type="button"
            onClick={() => {
              closeForm();
            }}
          >
            Cancelar
          </button>
          <button className="aircrafts__form__button" type="submit">
            Enviar
          </button>
        </div>
      </form>
    </section>
  );
};

export default ShipForm;
