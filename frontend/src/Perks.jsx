import PropTypes from "prop-types";
import { IoIosWifi } from "react-icons/io";
import { CiParking1 } from "react-icons/ci";
import { TbAirConditioning } from "react-icons/tb";
import { FaPersonSwimming } from "react-icons/fa6";
import { MdSportsGymnastics, MdOutlinePets, MdLocalLaundryService } from "react-icons/md";
import { FaKitchenSet } from "react-icons/fa6";

const Perks = ({ selected, onChange }) => {

  const handleChClick = (e) => {
    const { checked, name } = e.target;
    console.log(e.target.name);

    if (checked) {
      onChange([...selected, name]);
    } else {
      onChange(selected.filter(selectedName => selectedName !== name));
    }
  };

  return (
    <>
      <label className="border p-4 flex rounded-full gap-2 items-center">
        <input
          type="checkbox"
          name="wifi"
          checked={selected.includes("wifi")}
          onChange={handleChClick}
        />
        <IoIosWifi />
        <span>Wifi</span>
      </label>

      <label className="border p-4 flex rounded-full gap-2 items-center">
        <input
          type="checkbox"
          name="parking"
          checked={selected.includes("parking")}
          onChange={handleChClick}
        />
        <CiParking1 />
        <span>Free Parking</span>
      </label>

      <label className="border p-4 flex rounded-full gap-2 items-center">
        <input
          type="checkbox"
          name="airConditioning"
          checked={selected.includes("airConditioning")}
          onChange={handleChClick}
        />
        <TbAirConditioning />
        <span>Air Conditioning</span>
      </label>

      <label className="border p-4 flex rounded-full gap-2 items-center">
        <input
          type="checkbox"
          name="swimmingPool"
          checked={selected.includes("swimmingPool")}
          onChange={handleChClick}
        />
        <FaPersonSwimming />
        <span>Swimming Pool</span>
      </label>

      <label className="border p-4 flex rounded-full gap-2 items-center">
        <input
          type="checkbox"
          name="gymAccess"
          checked={selected.includes("gymAccess")}
          onChange={handleChClick}
        />
        <MdSportsGymnastics />
        <span>Gym Access</span>
      </label>

      <label className="border p-4 flex rounded-full gap-2 items-center">
        <input
          type="checkbox"
          name="pet"
          checked={selected.includes("pet")}
          onChange={handleChClick}
        />
        <MdOutlinePets />
        <span>Pet Friendly</span>
      </label>

      <label className="border p-4 flex rounded-full gap-2 items-center">
        <input
          type="checkbox"
          name="laundry"
          checked={selected.includes("laundry")}
          onChange={handleChClick}
        />
        <MdLocalLaundryService />
        <span>Laundry Service</span>
      </label>

      <label className="border p-4 flex rounded-full gap-2 items-center">
        <input
          type="checkbox"
          name="kitchen"
          checked={selected.includes("kitchen")}
          onChange={handleChClick}
        />
        <FaKitchenSet />
        <span>Kitchen Facilities</span>
      </label>
    </>
  );
};

// PropTypes validation
Perks.propTypes = {
  selected: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Perks;
