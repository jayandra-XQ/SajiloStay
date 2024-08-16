import { IoIosWifi } from "react-icons/io";
import { CiParking1 } from "react-icons/ci";
import { TbAirConditioning } from "react-icons/tb";
import { FaPersonSwimming } from "react-icons/fa6";
import { MdSportsGymnastics } from "react-icons/md";
import { MdOutlinePets } from "react-icons/md";
import { MdLocalLaundryService } from "react-icons/md";
import { FaKitchenSet } from "react-icons/fa6";

const Perks = ({selected, onChange}) => {
  return (
    <>
       <label className="border p-4 flex rounded-full  gap-2 items-center">
                <input type="checkbox" />
                <IoIosWifi />
                <span>Wifi</span>
              </label>

              <label className="border p-4 flex rounded-full gap-2 items-center">
                <input type="checkbox" />
                <CiParking1 />
                <span>Free Parking</span>
              </label>

              <label className="border p-4 flex rounded-full gap-2 items-center">
                <input type="checkbox" />
                <TbAirConditioning />
                <span>Air Conditioning</span>
              </label>

              <label className="border p-4 flex rounded-full gap-2 items-center">
                <input type="checkbox" />
                <FaPersonSwimming />
                <span>Swimming Pool</span>
              </label>

              <label className="border p-4 flex rounded-full gap-2 items-center">
                <input type="checkbox" />
                <MdSportsGymnastics />
                <span>Gym Access</span>
              </label>

              <label className="border p-4 flex rounded-full gap-2 items-center">
                <input type="checkbox" />
                <MdOutlinePets />
                <span>Pet Friendly</span>
              </label>


              <label className="border p-4 flex rounded-full gap-2 items-center">
                <input type="checkbox" />
                <MdLocalLaundryService />
                <span>Laundry Service</span>
              </label>

              <label className="border p-4 flex rounded-full gap-2 items-center">
                <input type="checkbox" />
                <FaKitchenSet />
                <span>Kitchen Facilities</span>
              </label>
    </>
  )
}

export default Perks