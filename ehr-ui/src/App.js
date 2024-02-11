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
      "prompt": JSON.stringify("User { \"patient_id\": \"P002\", \"patient_name\": \"Maggie Robinson\", \"gender\": \"Female\", \"heart_disease_history\": [ { \"timestamp\": \"2001-02-11T08:00:00Z\", \"age\": 34, \"risk_factors\": { \"smoking\": false, \"diabetes\": false, \"hypertension\": false, \"family_history\": false }, \"symptoms\": { \"chest_pain\": true, \"shortness_of_breath\": false, \"fatigue\": false }, \"diagnostic_tests\": { \"cholesterol_levels\": { \"value\": 120, \"units\": \"mg/dL\" }, \"blood_pressure\": \"90/80\", \"ECG_result\": \"Normal\", \"stress_test\": { \"result\": \"Negative\", \"details\": \"No significant abnormalities observed during stress test\" }, \"echocardiogram\": { \"ejection_fraction\": 49, \"details\": \"Mild reduction in heart pumping function\" } }, \"diagnosis\": { \"heart_disease\": false, \"type\": \"No Heart Disease\", \"severity\": \"N/A\" }, \"treatments\": { \"medications\": [], \"lifestyle_changes\": [] } }, { \"timestamp\": \"2001-08-15T10:30:00Z\", \"age\": 34, \"risk_factors\": { \"smoking\": false, \"diabetes\": true, \"hypertension\": false, \"family_history\": true }, \"symptoms\": { \"chest_pain\": true, \"shortness_of_breath\": true, \"fatigue\": true }, \"diagnostic_tests\": { \"cholesterol_levels\": { \"value\": 150, \"units\": \"mg/dL\" }, \"blood_pressure\": \"125/85\", \"ECG_result\": \"Abnormal\", \"stress_test\": { \"result\": \"Positive\", \"details\": \"Indicates potential coronary artery disease\" }, \"echocardiogram\": { \"ejection_fraction\": 50, \"details\": \"Slight reduction in heart pumping function\" } }, \"diagnosis\": { \"heart_disease\": false, \"type\": \"No Heart Disease\", \"severity\": \"N/A\" }, \"treatments\": { \"medications\": [], \"lifestyle_changes\": [] } }, { \"timestamp\": \"2002-04-13T14:45:00Z\", \"age\": 35, \"risk_factors\": { \"smoking\": false, \"diabetes\": true, \"hypertension\": false, \"family_history\": true }, \"symptoms\": { \"chest_pain\": true, \"shortness_of_breath\": true, \"fatigue\": true }, \"diagnostic_tests\": { \"cholesterol_levels\": { \"value\": 150, \"units\": \"mg/dL\" }, \"blood_pressure\": \"120/85\", \"ECG_result\": \"Abnormal\", \"stress_test\": { \"result\": \"Positive\", \"details\": \"Indicates potential coronary artery disease\" }, \"echocardiogram\": { \"ejection_fraction\": 50, \"details\": \"Slight reduction in heart pumping function\" } }, \"diagnosis\": { \"heart_disease\": false, \"type\": \"No Heart Disease\", \"severity\": \"N/A\" }, \"treatments\": { \"medications\": [], \"lifestyle_changes\": [] } }, { \"timestamp\": \"2002-12-19T08:00:00Z\", \"age\": 35, \"risk_factors\": { \"smoking\": false, \"diabetes\": false, \"hypertension\": true, \"family_history\": true }, \"symptoms\": { \"chest_pain\": false, \"shortness_of_breath\": true, \"fatigue\": true }, \"diagnostic_tests\": { \"cholesterol_levels\": { \"value\": 140, \"units\": \"mg/dL\" }, \"blood_pressure\": \"120/80\", \"ECG_result\": \"Abnormal\", \"stress_test\": { \"result\": \"Positive\", \"details\": \"Indicates potential coronary artery disease\" }, \"echocardiogram\": { \"ejection_fraction\": 47, \"details\": \"Mild reduction in heart pumping function\" } }, \"diagnosis\": { \"heart_disease\": false, \"type\": \"No Heart Disease\", \"severity\": \"N/A\" }, \"treatments\": { \"medications\": [], \"lifestyle_changes\": [\"Regular exercise\", \"Dietary modifications\"] } }, { \"timestamp\": \"2004-01-21T11:30:00Z\", \"age\": 36, \"risk_factors\": { \"smoking\": true, \"diabetes\": true, \"hypertension\": true, \"family_history\": false }, \"symptoms\": { \"chest_pain\": true, \"shortness_of_breath\": false, \"fatigue\": false }, \"diagnostic_tests\": { \"cholesterol_levels\": { \"value\": 120, \"units\": \"mg/dL\" }, \"blood_pressure\": \"100/70\", \"ECG_result\": \"Normal\", \"stress_test\": { \"result\": \"Negative\", \"details\": \"No significant abnormalities observed during stress test\" }, \"echocardiogram\": { \"ejection_fraction\": 58, \"details\": \"Excellent heart pumping function\" } }, \"diagnosis\": { \"heart_disease\": true, \"type\": \"Coronary Artery Disease\", \"severity\": \"Severe\" }, \"treatments\": { \"medications\": [\"Aspirin\", \"Beta-blocker\"], \"lifestyle_changes\": [\"Dietary modifications\", \"Regular exercise\"] } }, { \"timestamp\": \"2006-08-15T15:15:00Z\", \"age\": 37, \"risk_factors\": { \"smoking\": true, \"diabetes\": true, \"hypertension\": true, \"family_history\": true }, \"symptoms\": { \"chest_pain\": true, \"shortness_of_breath\": false, \"fatigue\": true }, \"diagnostic_tests\": { \"cholesterol_levels\": { \"value\": 220, \"units\": \"mg/dL\" }, \"blood_pressure\": \"130/80\", \"ECG_result\": \"Moderate\", \"stress_test\": { \"result\": \"Negative\", \"details\": \"No significant abnormalities observed during stress test\" }, \"echocardiogram\": { \"ejection_fraction\": 64, \"details\": \"Mild heart pumping function\" } }, \"diagnosis\": { \"heart_disease\": true, \"type\": \"Heart Failure\", \"severity\": \"Severe\" }, \"treatments\": { \"medications\": [\"Aspirin\", \"Beta-blocker\", \"Statins\"], \"lifestyle_changes\": [\"Dietary modifications\", \"Exercise\"] } } ] } this is the EHR data of a patient. I want you to  summarize this in the following format: patient info: Patient ID: [EHR subject number] Sex, Age [latest age], these 3 in a table (one row for each timestamp): Admission Date: [yyyy-mm-dd], Discharge Date: [yyyy-mm-dd], Chief Complaint - CC: [What was the main presenting symptom or problem for which the patient needs treatment?] Summarize rest of the info into these : Admitting Service: [What service admitted the patient? E.g. Medicine, Surgery, Trauma, ICU] History of Present Illness - HPI: [What past medical history of medical problems or conditions relevant to the CC; What were the presenting of symptoms?; What contextual information is relevant to the symptoms? What were the relevant tests or studies done so far to diagnose the CC?] Brief Hospital Course: [What were the major events and treatments for the most relevant problems?] Relevant Results and Findings: What were the key radiographic and laboratory diagnostic findings?] Disposition: [Where was the patient discharged to and in what condition?] Discharge Medication list: [What medications were recommended at discharge? What are the changes from the admission medication lists?] write the info in HTML format inside a div tag." + ""),
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
