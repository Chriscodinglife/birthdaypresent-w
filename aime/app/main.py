import os
import logging
import threading
from aime import Aime
from sender import Sender
from receiver import Receiver
from starlette.requests import Request
from fastapi.responses import FileResponse
from fastapi import FastAPI, BackgroundTasks, HTTPException
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configure logging
logging.basicConfig(level=logging.INFO)
aime = Aime()

params = "./keys/sender_params.json"
image_dir = "./images/"
receiver = Receiver(params, image_dir, aime)

# Start the receiver process
receiver_thread = threading.Thread(target=receiver.main)
receiver_thread.start()



# Set CORS
origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    """Just a General ping for a health check"""
    return {"Hello": "World"}


@app.post("/send_prompt")
async def send_prompt(prompt: str):
    """Endpoint to where the endpoint needs to be sent"""
    sender = Sender(params)
    sender.send(prompt)
    return {"message": "Prompt sent successfully"}

old_image = None

get_image_counter = 0
get_image_limit = 4  # Maximum number of image requests allowed when image count is less than 2

@app.get("/get_image")
def get_image(background_tasks: BackgroundTasks):
    """Get a random image from the images folder"""
    
    # Set some global variables
    global old_image
    global get_image_counter
    
    # Raise an error if the Get Image Limit has been reached
    if get_image_counter > get_image_limit:
        raise HTTPException(status_code=429, detail="Image request limit reached")
    
    # Delete the old image that was used
    if old_image is not None:
        logging.info(f"Deleting image: {old_image}")
        old_image_path = os.path.join(image_dir, old_image)
        if os.path.exists(old_image_path):
            background_tasks.add_task(aime.delete_image, old_image)
            
    # Increment the counter
    get_image_counter += 1

    image_file = aime.get_random_image(old_image=old_image)
    if image_file:
        image_path = os.path.join(image_dir, image_file)

        old_image = image_file
        
        return FileResponse(image_path, media_type="image/png", filename=image_file)
    else:
        return {"message": "No image available"}


@app.get("/get_num_images")
async def get_num_images():
    """Get the number of images in the images folder"""
    global get_image_counter
    
    # Get the number of images in this server
    number_of_images = aime.get_num_images()
    
    # If the images are greater than 2, then reset the counter
    if number_of_images > 2:
        get_image_counter = 0
    
    # Return the number of images to the frontend
    return {"num_images": aime.get_num_images()}


@app.get("/get_birthday_message")
async def get_birthday_message():
    """Generate a text with ChatGPT"""
    
    text = aime.generate_birthday_message()

    return { "text" :text }


## Unused Code

# @app.get("/start_receiver")
# async def start_receiver(background_tasks: BackgroundTasks):
#     """Endpoint to start the Receiver process"""
#     background_tasks.add_task(run_receiver)
#     return {"message": "Receiver started successfully"}


# @app.get("/get_first_image")
# def get_first_image():
#     """Get the first image from the images folder"""
#     image_file = aime.get_first_image()
#     if image_file:
#         image_path = os.path.join(image_dir, image_file)
#         return FileResponse(image_path, media_type="image/png", filename=image_file)
#     else:
#         return {"message": "No image available"}


# def run_receiver():
#     """Run the receiver process in a new thread
#     and keep the main thread free from blocking
#     operations.
#     """
#     receiver.main()
