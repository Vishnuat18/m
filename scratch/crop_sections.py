from PIL import Image

im = Image.open('C:/Users/Lenovo/.gemini/antigravity/brain/2d0bb5c2-7de7-4eec-a62c-f5130cb45271/.user_uploaded/media_1795267724949_7e4559e9.png')

# Let's inspect:
# 1. Header region y=105 to y=175
header = im.crop((0, 105, im.width, 175))
header.save('scratch/ref_header.png')

# 2. Text region y=175 to y=400
body_sample = im.crop((0, 175, im.width, 400))
body_sample.save('scratch/ref_body.png')

# 3. Footer region y=650 to y=800
footer = im.crop((0, 650, im.width, 800))
footer.save('scratch/ref_footer.png')

print("Cropped header, body, footer")
