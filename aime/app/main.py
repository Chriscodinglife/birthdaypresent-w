import os
import logging
import threading
from aime import Aime
from sender import Sender
from receiver import Receiver
from starlette.requests import Request
from fastapi.responses import FileResponse
from fastapi import FastAPI, BackgroundTasks

app = FastAPI()

# Configure logging
logging.basicConfig(level=logging.INFO)

params = "./sender_params.json"
image_dir = "./images/"
receiver = Receiver(params, image_dir)

# Start the receiver process
receiver_thread = threading.Thread(target=receiver.main)
receiver_thread.start()

aime = Aime()


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


@app.get("/get_image")
def get_image(background_tasks: BackgroundTasks, request: Request = None):
    """Get a random image from the images folder"""

    logging.info(f"Query params: {request.query_params}")

    if request is not None:
        query_params = dict(request.query_params)
        old_image = query_params.get("old_image")
        if old_image is not None:
            old_image_path = os.path.join(image_dir, old_image)
            if os.path.exists(old_image_path):
                background_tasks.add_task(aime.delete_image, old_image)

    image_file = aime.get_random_image(old_image=old_image)
    if image_file:
        image_path = os.path.join(image_dir, image_file)

        return FileResponse(image_path, media_type="image/png", filename=image_file)
    else:
        return {"message": "No image available"}


@app.get("/get_num_images")
def get_num_images():
    """Get the number of images in the images folder"""
    return {"num_images": aime.get_num_images()}


@app.get("get_text")
def get_text():
    """Generate a text with ChatGPT"""

    return text


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
