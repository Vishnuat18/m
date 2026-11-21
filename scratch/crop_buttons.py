from PIL import Image

im = Image.open('scratch/ref_header.png')
# Let's inspect the left button around x=10 to x=60
left_btn = im.crop((8, 5, 65, 65))
left_btn.save('scratch/ref_left_btn.png')

# Right button around x=400 to x=455
right_btn = im.crop((395, 5, 452, 65))
right_btn.save('scratch/ref_right_btn.png')

print("Left button and right button cropped")
