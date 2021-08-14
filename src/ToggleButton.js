import './App.scss';

export default function ToggleButton({text1, text2, current, handleClick}) {
  return(
    <div className="toggle-button">
      <div onClick={handleClick} className="text text1">{text1}</div>
      <div onClick={handleClick} className="text text2">{text2}</div>
      <div className={`highlight ${current? 'left' : 'right'}`}></div>
    </div>
  );
}