import { useState } from "react";
import Data from "./data/heartdata.json";
import './App.css';

function App() {

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Select the patient');
  const options = ['Patient1-Nadia-P001', 'Patient2-Uma-P002'];
  const [patientData, setPatientData] = useState("");
  const [patientSummary, setPatientSummary] = useState("");
  const [patientJson, setPatientJson] = useState({});
  const [loader, setLoader] = useState(false);
  const [activePatientChart, setActivePatientChart] = useState("");

  const toggleOptions = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option) => {
    setSelectedOption(option);
    setPatientSummary("");
    const params = option.split("-");
    const pdata = Data.heart_dataset.find(item => item.patient_id === params[params.length - 1]);
    setPatientJson(pdata);
    setActivePatientChart(pdata.patient_chart);
    setPatientData(JSON.stringify(pdata, null, 2));
    toggleOptions();
  };

  const showPatientSummary = () => {
    setLoader(true);
    //call api call here
    // Replace the URL with the actual URL of your Flask API
    const url = "http://127.0.0.1:5000/generate-text"

    // Replace this payload with your actual JSON payload
    const payload = {
      "prompt": "Generate a summarised report for this patient",
      "patient_data": patientJson
    }

    const headers = {
      "Content-Type": "application/json",
    };

    fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setTimeout(() => {
          setPatientSummary(data.generated_text);
          setLoader(false);
        }, 10000);

      })
      .catch((error) => {
        console.error("Error:", error);
      });
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
          <h4>Charts Analysis over time for Heart related tests</h4>
          <div style={{position:"relative"}} className='json-data-div'>
            <h6 style={{position:"absolute", top: "10px", right: "20px", margin:"unset"}}>Created with Tableau</h6>
            {activePatientChart && <img className="patient-chart" src={activePatientChart} alt="patient-chart" />}
          </div>
          <h4 style={{ margin: "60px 0 20px" }}>Patient raw EHR records over time</h4>
          <div className='json-data-div'>
            <pre style={{ textAlign: 'left', whiteSpace: 'pre-wrap' }}>{patientData}</pre>
          </div>
          {
            patientSummary ?
              <>
                <h4 style={{ margin: "60px 0 20px" }}>Summarised Health Report</h4>
                <div className='json-data-div' style={{ marginTop: "40px", padding: "40px 20px" }}>
                  <div dangerouslySetInnerHTML={{ __html: patientSummary }} />
                </div>
              </>
              : <button disabled={patientData == ""} onClick={() => showPatientSummary()}>Summarize the records</button>
          }
          {
            loader && <h5>Model is loading sugestions, please wait......</h5>
          }
        </div>
      </header>
    </div>
  );
}

export default App;
