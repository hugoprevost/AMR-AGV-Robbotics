import './movingButton.scss';

import {useRef} from 'react';

function MovingButton() {
  const ref = useRef(null);

  const handleClick = () => {
    ref.current?.scrollIntoView({behavior: 'smooth'});
  };

  return (
    <div>
      <div ref={ref}>
        <button onClick={handleClick}>Scroll to element</button>
        <div style={{height: '155rem'}} />
      </div>
    </div>
  );
}
export default MovingButton;