import { Plus } from "lucide-react";
import PropTypes from "prop-types";

const SubHeader = ({
  setNewItem,
  title,
  headers,
  disable,
  isToggleActive,
  handleToggleActive,
}) => {
  const [subHead1, subHead2] = headers;

  return (
    <div className='flex flex-col gap-5 lg:inventory_header_container'>
      <div
        className={`inventory_mobil_header before:inventory_mobil_header_before ${
          isToggleActive ? "before:left-0" : "before:left-1/2"
        } lg:inventory_desktop_header lg:before:content-none`}
      >
        <h2
          className={`relative w-full text-center cursor-pointer lg:w-fit
    ${
      isToggleActive
        ? "lg:before:inventory_sub_heading"
        : "lg:before:content-none"
    }
    `}
          onClick={() => handleToggleActive(true)}
        >
          {subHead1}
        </h2>
        <h2
          className={`relative w-full text-center cursor-pointer lg:w-fit
    ${
      !isToggleActive
        ? "lg:before:inventory_sub_heading"
        : "lg:before:content-none"
    }
    `}
          onClick={() => handleToggleActive(false)}
        >
          {subHead2}
        </h2>
      </div>

      <div className='flex justify-between items-center px-5 lg:px-0'>
        <h1 className='text-2xl font-semibold '>{title}</h1>
        {disable ? null : (
          <div
            className='bg-black px-2 py-2 rounded-full cursor-pointer inventory_hover_effect select-none'
            onClick={() => setNewItem(true)}
          >
            <Plus color='black' size={"18px"} />
          </div>
        )}
      </div>
    </div>
  );
};

SubHeader.propTypes = {
  isToggleActive: PropTypes.bool,
  handleToggleActive: PropTypes.func,
  headers: PropTypes.array,
  title: PropTypes.string,
  disable: PropTypes.bool,
  setNewItem: PropTypes.func,
};

export default SubHeader;
