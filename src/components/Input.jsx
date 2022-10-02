const InputBox = ({ type, onChange, value }) => {
  return (
    <input
      className='outline-none border-2 border-orange-700 rounded-md py-2 px-2 focus:bg-orange-50 text-blank'
      type={type}
      onChange={onChange}
      value={value}
    />
  );
};

export default InputBox;
