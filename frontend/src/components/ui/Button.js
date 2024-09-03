import React from 'react';

import '../../styles/Button.css';

const Button = ({title, onClick, disabled}) => {
  return (
    <div className="CustomButton">
      <button className="Button" onClick={onClick} disabled={disabled}>
        {title}
      </button>
    </div>
  );
}

export default React.memo(Button);
