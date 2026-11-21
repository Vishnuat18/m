from PIL import Image

im = Image.open('C:/Users/Lenovo/.gemini/antigravity/brain/2d0bb5c2-7de7-4eec-a62c-f5130cb45271/.user_uploaded/media_1795267724949_7e4559e9.png')
# Doodle is around y=680 to y=750, x=20 to x=300
doodle = im.crop((15, 680, 320, 750))
doodle.save('scratch/ref_doodle_crop.png')
print("Saved ref_doodle_crop.png, size:", doodle.size)
