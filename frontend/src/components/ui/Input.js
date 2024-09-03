import React from 'react';
import '../../styles/Input.css';

const Input = ({ value, onChange }) => {
  return (
    <div className="CustomInput">
      <input
        className="Input"
        type="number"
        placeholder="Type number, from 0 to 100"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default React.memo(Input);
