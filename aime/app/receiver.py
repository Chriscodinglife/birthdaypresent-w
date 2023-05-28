import os
import re
import sys
import json
import glob
import time
import requests
import argparse
import numpy as np
import pandas as pd
from PIL import Image
from aime import Aime
from datetime import datetime

aime = Aime()


class Receiver:
    def __init__(self, params, local_path):
        self.params = params
        self.local_path = local_path
        self.max_images = 4

        self.sender_initializer()

        self.df = pd.DataFrame(columns=["prompt", "url", "filename", "is_downloaded"])

    def sender_initializer(self):
        with open(self.params, "r") as json_file:
            params = json.load(json_file)

        self.channelid = params["channelid"]
        self.authorization = params["authorization"]
        self.headers = {"authorization": self.authorization}

    def retrieve_messages(self):
        r = requests.get(
            f"https://discord.com/api/v10/channels/{self.channelid}/messages?limit={100}",
            headers=self.headers,
        )
        jsonn = json.loads(r.text)
        return jsonn

    def collecting_results(self):
        message_list = self.retrieve_messages()
        self.awaiting_list = pd.DataFrame(columns=["prompt", "status"])
        for message in message_list:
            if (message["author"]["username"] == "Midjourney Bot") and (
                "**" in message["content"]
            ):
                if len(message["attachments"]) > 0:
                    if (message["attachments"][0]["filename"][-4:] == ".png") or (
                        "(Open on website for full quality)" in message["content"]
                    ):
                        id = message["id"]
                        prompt = message["content"].split("**")[1].split(" --")[0]
                        url = message["attachments"][0]["url"]
                        filename = message["attachments"][0]["filename"]
                        if id not in self.df.index:
                            self.df.loc[id] = [prompt, url, filename, 0]

                    else:
                        id = message["id"]
                        prompt = message["content"].split("**")[1].split(" --")[0]
                        if ("(fast)" in message["content"]) or (
                            "(relaxed)" in message["content"]
                        ):
                            try:
                                status = re.findall("(\w*%)", message["content"])[0]
                            except:
                                status = "unknown status"
                        self.awaiting_list.loc[id] = [prompt, status]

                else:
                    id = message["id"]
                    prompt = message["content"].split("**")[1].split(" --")[0]
                    if "(Waiting to start)" in message["content"]:
                        status = "Waiting to start"
                    self.awaiting_list.loc[id] = [prompt, status]

    def outputer(self):
        if len(self.awaiting_list) > 0:
            print(datetime.now().strftime("%H:%M:%S"))
            print("prompts in progress:")
            print(self.awaiting_list)
            print("=========================================")

        waiting_for_download = [
            self.df.loc[i].prompt
            for i in self.df.index
            if self.df.loc[i].is_downloaded == 0
        ]
        if len(waiting_for_download) > 0:
            print(datetime.now().strftime("%H:%M:%S"))
            print("waiting for download prompts: ", waiting_for_download)
            print("=========================================")

    def downloading_results(self):
        processed_prompts = []
        for i in self.df.index:
            if self.df.loc[i].is_downloaded == 0:
                response = requests.get(self.df.loc[i].url)
                scratch_folder = "./scratch"
                os.makedirs(
                    scratch_folder, exist_ok=True
                )  # Create the scratch folder if it doesn't exist
                scratch_image_path = os.path.join(
                    scratch_folder, self.df.loc[i].filename
                )
                with open(scratch_image_path, "wb") as req:
                    req.write(response.content)
                self.df.loc[i, "is_downloaded"] = 1
                processed_prompts.append(self.df.loc[i].prompt)

                # Split the downloaded image into four quarters
                self.split_image_into_quarters(scratch_image_path, self.local_path)

                # Delete the original image file
                self.delete_image(scratch_image_path)

        if len(processed_prompts) > 0:
            print(datetime.now().strftime("%H:%M:%S"))
            print("processed prompts: ", processed_prompts)
            print("=========================================")

            if len(processed_prompts) > 0:
                print(datetime.now().strftime("%H:%M:%S"))
                print("processed prompts: ", processed_prompts)
                print("=========================================")

    def split_image_into_quarters(self, image_path, output_folder):
        image = Image.open(image_path)
        width, height = image.size
        quarter_width = width // 2
        quarter_height = height // 2

        for row in range(2):
            for col in range(2):
                left = col * quarter_width
                upper = row * quarter_height
                right = left + quarter_width
                lower = upper + quarter_height

                cropped_image = image.crop((left, upper, right, lower))
                quarter_image_path = os.path.join(
                    output_folder, f"{row}{col}_{os.path.basename(image_path)}"
                )
                cropped_image.save(quarter_image_path)

    def delete_image(self, image_path):
        if os.path.exists(image_path):
            os.remove(image_path)

    def generate_new_images(self):
        image_files = os.listdir(self.local_path)
        if not image_files:
            aime.generate_new_image()

    def main(self):
        while True:
            self.collecting_results()
            self.outputer()
            self.downloading_results()
            self.generate_new_images()
            time.sleep(5)


def parse_args(args):
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--params",
        help="Path to discord authorization and channel parameters",
        required=True,
    )
    parser.add_argument("--local_path", help="Path to output images", required=True)

    return parser.parse_args(args)


if __name__ == "__main__":
    args = sys.argv[1:]
    args = parse_args(args)
    params = args.params
    local_path = args.local_path  #'/Users/georgeb/discord_api/images/'

    print("=========== listening started ===========")
    receiver = Receiver(params, local_path)
    receiver.main()
