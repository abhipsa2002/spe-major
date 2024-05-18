from PIL import Image
import pickle
import base64
import json
import io
import multiprocessing as mp
from transformers import ViTFeatureExtractor, AutoTokenizer
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import torch
from transformers import AutoModelForSeq2SeqLM
from transformers import VisionEncoderDecoderModel, VisionEncoderDecoderConfig
from huggingface_hub import from_pretrained_keras

# Define configuration settings
class Config:
    ENCODER = "google/vit-base-patch16-224"
    DECODER = "gpt2"
    TRAIN_BATCH_SIZE = 8
    VAL_BATCH_SIZE = 8
    VAL_EPOCHS = 1
    LR = 5e-5
    SEED = 42
    MAX_LEN = 128
    SUMMARY_LEN = 20
    WEIGHT_DECAY = 0.01
    MEAN = (0.485, 0.456, 0.406)
    STD = (0.229, 0.224, 0.225)
    TRAIN_PCT = 0.95
    NUM_WORKERS = mp.cpu_count()
    EPOCHS = 3
    IMG_SIZE = (224, 224)
    LABEL_MASK = -100
    TOP_K = 1000
    TOP_P = 0.95

# Initialize feature extractor and tokenizer
feature_extractor = ViTFeatureExtractor.from_pretrained(Config.ENCODER)
tokenizer = AutoTokenizer.from_pretrained(Config.DECODER)
tokenizer.pad_token = tokenizer.unk_token

# # Load pre-trained model from pickle file
# with open('./pickle/model.pkl', 'rb') as f:
#     model = pickle.load(f)

def load_model():
    model_dir = 'abhipsapanda/imagecap'
    try:
        # Load model directly from Hugging Face model hub
        model = VisionEncoderDecoderModel.from_pretrained(model_dir)
        return model
    except Exception as e:
        print(f"Error loading model: {e}")
        return None

model = load_model() 

@csrf_exempt
def generate_caption(request):
    if request.method == 'POST':
        try:
            # Load the data from the request
            data = json.loads(request.body)
            image_data = data['image']
            
            # The image data is expected to be prefixed with 'data:image/jpeg;base64,'
            # We need to remove this prefix before decoding
            if image_data.startswith('data:image/jpeg;base64,'):
                image_data = image_data.replace('data:image/jpeg;base64,', '')

            # Decode the base64 string into binary data
            image_bytes = base64.b64decode(image_data)

            # Convert the binary data to an image
            image = Image.open(io.BytesIO(image_bytes)).convert("RGB")

            # Process the image and generate a caption
            caption = process_image(image)

            return JsonResponse({'caption': caption})
        
        except KeyError:
            return JsonResponse({'error': 'Missing image data'}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
        except Exception as e:
            # Catch other exceptions, e.g., errors during image processing or base64 decoding
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)

def process_image(image):
    # Convert image to RGB and then to PyTorch tensor
    image = image.convert("RGB")
    image_tensor = feature_extractor(image, return_tensors="pt")

    # Generate caption using the model on CPU
    generated_caption = tokenizer.decode(
        model.generate(image_tensor.pixel_values)[0],
        skip_special_tokens=True
    )

    # Split the caption into sentences based on full stop delimiter
    sentences = generated_caption.split('. ')

    # Trim the sentences to contain only the first three sentences
    trimmed_caption = '. '.join(sentences[:3])

    trimmed_caption += "."

    return trimmed_caption


