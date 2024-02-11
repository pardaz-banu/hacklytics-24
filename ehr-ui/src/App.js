import {useState} from "react";
import Data from "./data/heartdata.json";
import './App.css';

function App() {

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Select the patient');
  const options = ['Patient1-Nadia-P001', 'Patient2-Uma-P002']; 
  const [patientData,setPatientData] = useState("");
  const [patientSummary,setPatientSummary] = useState("");

  const toggleOptions = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option) => {
    setSelectedOption(option);
    const params = option.split("-");
    const pdata = Data.heart_dataset.find(item => item.patient_id === params[params.length-1]);
    setPatientData(JSON.stringify(pdata, null, 2));
    toggleOptions();
  };

  const showPatientSummary = () => {

  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>PharmaLlama</h2>
        <div id="input-params">

        </div>
        <div id="graph-space">
          <div className='input-fields'>
          <div className={`custom-select ${isOpen ? 'active' : ''}`}>
            <div className="select-box" onClick={toggleOptions}>
              <span id="selectedOption">{selectedOption}</span>
              <div className="arrow-icon">▼</div>
            </div>
            <div className="options-container">
              {options.map((option, index) => (
                <div
                  key={index}
                  className="option"
                  onClick={() => selectOption(option)}
                >
                  {option}
                </div>
              ))}
            </div>
          </div>
          </div>
          <h4>Patient raw EHR records over time</h4>
          <div className='json-data-div'>
            <pre style={{ textAlign: 'left', whiteSpace: 'pre-wrap' }}>{patientData}</pre>
          </div>
          <h4 style={{margin: "60px 0 20px"}}>Charts Analysis over time for Heart related tests</h4>
          <div className='json-data-div'>
            <pre style={{ textAlign: 'left', whiteSpace: 'pre-wrap' }}>{patientData}</pre>
          </div>
            {
              patientSummary ?
                <div className='json-data-div'>
                  {patientSummary}
                </div>
               : <button onClick={() => showPatientSummary()}>Summarize the records</button>
            }
        </div>
      </header>
    </div>
  );
}

export default App;
