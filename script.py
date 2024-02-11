#script to expose api for huggingface llama model

# input parameters -> context(KB) based on user prompt (like get only heart related data), json data and prompt


import transformers
import torch
from flask import Flask, request, jsonify
from transformers import pipeline

from transformers import AutoTokenizer

app = Flask(__name__)

model = "meta-llama/Llama-2-7b-chat-hf"

# Load the GPT-Neo model using Hugging Face's pipeline
# generator = pipeline('text-generation', model='EleutherAI/gpt-neo-2.7B', device=0)

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
    # result = generator(prompt, max_length=100, num_return_sequences=1)
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
    # generated_text = result[0]['generated_text']
    # return generated_text
    return ""

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
        if not isinstance(patient_data, dict) or 'heart_dataset' not in patient_data:
            return jsonify({"error": "Invalid 'patient_data' structure"}), 400

        generated_result = generate_text(prompt, patient_data)
        return jsonify({"prompt": prompt, "patient_data": patient_data, "generated_text": generated_result})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
