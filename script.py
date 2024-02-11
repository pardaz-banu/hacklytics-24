#script to expose api for huggingface llama model

# input parameters -> context(KB) based on user prompt (like get only heart related data), json data and prompt

sampleOutput = "<div> <h2>Patient Info:</h2> <table> <tr> <th>Patient ID</th> <th>Sex, Age</th> </tr> <tr> <td>P002</td> <td>Female, 37</td> </tr> </table> <h2>Admission Details:</h2> <table> <tr> <th>Admission Date</th> <th>Discharge Date</th> <th>Chief Complaint - CC</th> </tr> <tr> <td>2001-02-11</td> <td>2001-02-11</td> <td>Chest pain</td> </tr> <tr> <td>2001-08-15</td> <td>2001-08-15</td> <td>Chest pain, shortness of breath, fatigue</td> </tr> <tr> <td>2002-04-13</td> <td>2002-04-13</td> <td>Chest pain, shortness of breath, fatigue</td> </tr> <tr> <td>2002-12-19</td> <td>2002-12-19</td> <td>Shortness of breath, fatigue</td> </tr> <tr> <td>2004-01-21</td> <td>2004-01-21</td> <td>Chest pain</td> </tr> </table> <h2>Summarized Information:</h2> <p> <strong>Admitting Service:</strong> Medicine<br> <strong>History of Present Illness - HPI:</strong> Patient presented with chest pain and shortness of breath. Diagnostic tests revealed abnormalities indicating potential coronary artery disease. Subsequent visits showed progression with symptoms of fatigue. Lifestyle changes recommended.<br> <strong>Brief Hospital Course:</strong> No significant abnormalities observed during stress tests. Diagnosis initially indicated no heart disease but later progressed to coronary artery disease and heart failure.<br> <strong>Relevant Results and Findings:</strong> Abnormal ECG results, positive stress tests indicating potential coronary artery disease, echocardiograms showing mild to severe reduction in heart pumping function.<br> <strong>Disposition:</strong> Discharged with recommendations for medications and lifestyle changes.<br> <strong>Discharge Medication list:</strong> Aspirin, Beta-blocker, Statins; changes made from admission medication lists. </p> </div>";


import transformers
import torch
from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline

from transformers import AutoTokenizer

app = Flask(__name__)
CORS(app)

model = "meta-llama/Llama-2-7b-chat-hf"

# # Load the GPT-Neo model using Hugging Face's pipeline
generator = pipeline('text-generation', model='EleutherAI/gpt-neo-2.7B', device=0)

tokenizer = AutoTokenizer.from_pretrained(model)
pipeline = transformers.pipeline(
    "text-generation",
    model=model,
    torch_dtype=torch.float16,
    device_map="auto",
)

def generate_text(prompt, patient_data):
    # You can use the patient_data as needed in your generation process
    # For simplicity, this example just returns the generated text
    result = generator(patient_data + prompt, max_length=100, num_return_sequences=1)
    sequences = pipeline(
        prompt,
        do_sample=True,
        top_k=10,
        num_return_sequences=1,
        eos_token_id=tokenizer.eos_token_id,
        max_length=200,
    )
    for seq in sequences:
        print(f"Result: {seq['generated_text']}")
    generated_text = result[0]['generated_text']
    return generated_text
    # return sampleOutput

@app.route('/generate-text', methods=['POST'])
def generate_text_api():
    try:
        data = request.get_json()

        # Check if 'prompt' and 'patient_data' are present in the request
        if 'prompt' not in data or 'patient_data' not in data:
            return jsonify({"error": "Missing 'prompt' or 'patient_data' in the request"}), 400

        prompt = data['prompt']
        patient_data = data['patient_data']

        # Validate patient_data structure as needed
        if not isinstance(patient_data, dict):
            return jsonify({"error": "Invalid 'patient_data' structure"}), 400

        generated_result = generate_text(prompt, patient_data)
        return jsonify({"prompt": prompt, "patient_data": patient_data, "generated_text": generated_result})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
