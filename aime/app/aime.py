import os
import time
import random
import requests

IMAGES_FOLDER = "./images"


class Aime:
    def __init__(self):
        pass

    def get_random_image(self, old_image=None):
        """Return a random image"""
        image_files = os.listdir(IMAGES_FOLDER)
        if len(image_files) <= 2:
            # No images, generate a new image
            print("No images, generating new image")
            self.generate_new_image()

        if old_image is not None:
            if old_image in image_files:
                image_files.remove(old_image)

        image_files = os.listdir(IMAGES_FOLDER)
        if image_files:
            image_file = random.choice(image_files)
            time.sleep(1)
            return image_file
        return None

    def generate_new_image(self):
        """Make a request to the main server to generate a new image"""
        server_url = "http://localhost:8000/send_prompt?prompt=a photo of a really cool dragon in pixel art with a cake in its hand celebrating its birthday"
        response = requests.post(url=server_url)
        if response.status_code == 200:
            print("New image generated successfully")

    def delete_image(self, image_name: str):
        image_path = os.path.join(IMAGES_FOLDER, image_name)

        image_files = os.listdir(IMAGES_FOLDER)

        if len(image_files) == 1:
            # Prevent deleting anymore images
            return False

        if os.path.exists(image_path):
            os.remove(image_path)
            return True
        return False

    def get_num_images(self):
        """Return the number of images left in the images folder"""
        return len(os.listdir(IMAGES_FOLDER))


# old code


# def get_first_image(self):
#     """Return the first image in the images folder"""
#     image_files = os.listdir(IMAGES_FOLDER)
#     server_url = "http://localhost:8000/start_receiver"
#     response = requests.get(url=server_url)
#     if response.status_code == 200:
#         print("Receiver started successfully")

#     if image_files:
#         image_file = image_files[0]
#         return image_file
#     return None
