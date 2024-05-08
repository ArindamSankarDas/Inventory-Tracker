import PropTypes from "prop-types";

const FormInput = ({
  holderName,
  inputType,
  inputName,
  inputValue,
  onInputChange,
}) => {
  return (
    <input
      type={inputType}
      name={inputName}
      id={inputName}
      className='bg-gray-300 w-full px-4 py-2 text-lg font-medium rounded-md placeholder:text-gray-600'
      placeholder={holderName}
      value={inputValue}
      onChange={onInputChange}
    />
  );
};
FormInput.propTypes = {
  holderName: PropTypes.string,
  inputType: PropTypes.string,
  inputName: PropTypes.string,
  inputValue: PropTypes.any,
  onInputChange: PropTypes.func,
};

export default FormInput;
