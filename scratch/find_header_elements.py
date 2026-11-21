from PIL import Image

im = Image.open('scratch/ref_header.png')
w, h = im.size
print(f"Header size: {w}x{h}")
# Let's inspect where the circle buttons are horizontally
# Find dark circles
for x in range(w):
    # check if there's a dark line in the middle of y around h//2
    p = im.getpixel((x, h//2))
    if p[0] < 100:
        pass
