import React from 'react';
import '../../styles/Button.css';

const Button = ({title, onClick}) => {
  return (
    <div className="CustomButton">
      <button className="Button" onClick={onClick}>
        {title}
      </button>
    </div>
  );
}

export default React.memo(Button);
