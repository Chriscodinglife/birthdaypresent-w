# AIME

Back end service to provide images and provide ChatGPT generated images

## API

### Get a general health check with ping

`/ping`

### Get a random image from the backend

`/get_image`

Get image can also take in a query parameter called old_image URL that will delete a specific image filename from the backend. This is meant for data upkeep/cleanup, and giving the back end
and eventual chance to generate new images if there aren't any left in the backend
`/get_image?old_image=<file_name>`

You can get the filename running the /get_image endpoint first, getting the content-disposition filename value, and then passing that back into /get_image as the old_image parameter.

### Generate a new image

`/send_prompt`

### Get the number of images left in the backend

`/get_num_images`

### ENV VARS

SECRET_NAME
REGION_NAME
