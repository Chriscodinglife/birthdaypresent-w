import os
import sys
import signal
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

# Pass in certain necessary paramaters
params = "./keys/sender_params.json"
image_dir = "./images/"

# Initiate the receiver for images
receiver = Receiver(params, image_dir, aime)


def shutdown_event(signal, frame):
    """Function to handle the shutdown event or signal."""
    # Stop the receiver thread
    receiver.stop()  # Assuming you have a stop method in your Receiver class

    # Wait for the receiver thread to join
    receiver_thread.join()

    # Exit the program
    sys.exit(0)
    
    
# Register the shutdown event or signal handler
signal.signal(signal.SIGINT, shutdown_event)  # Handles the Ctrl+C event
signal.signal(signal.SIGTERM, shutdown_event)  # Handles the termination signal

# Start the receiver process
receiver_thread = threading.Thread(target=receiver.main)
receiver_thread.start()

# Set CORS
origins = [
    "*",
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


@app.get("/get_image")
def get_image(background_tasks: BackgroundTasks):
    """Get a random image from the images folder"""
    
    # Set some global variables
    global old_image
    
    # Delete the old image that was used
    if old_image is not None:
        logging.info(f"Deleting image: {old_image}")
        old_image_path = os.path.join(image_dir, old_image)
        if os.path.exists(old_image_path):
            background_tasks.add_task(aime.delete_image, old_image)
        

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
    
    # Get the number of images in this server
    number_of_images = aime.get_num_images()
    
    # Return the number of images to the frontend
    return {"num_images": number_of_images}


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
