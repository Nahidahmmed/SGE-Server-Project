
  
  const Form = ({ int, label, setState, inputValue, filterer, dataArray }) => {
    return (
        <div className="form-group">
        <label htmlFor={`input-${int}`}>{label}</label>
        <select
          id={`input-${int}`}
          className="form-control"
          value={inputValue}
          onChange={e => setState(e.target.value)}
        >
          <option value="">Select {label}</option>
          {(dataArray || filterer).map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  };
  
  export default Form;