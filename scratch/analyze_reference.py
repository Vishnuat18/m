from PIL import Image

im = Image.open('C:/Users/Lenovo/.gemini/antigravity/brain/2d0bb5c2-7de7-4eec-a62c-f5130cb45271/.user_uploaded/media_1795267724949_7e4559e9.png')
w, h = im.size

# Check top background color (outside the paper)
print("Top background (x=230, y=30):", im.getpixel((230, 30)))

# Find where the paper starts vertically and horizontally
for y in range(0, 200, 10):
    p = im.getpixel((230, y))
    # print when color changes to warm parchment
    if p[0] > 100:
        print(f"Paper starts vertically around y={y}: {p}")
        break

# Check horizontal bounds of paper at y=300
left_x = 0
right_x = w - 1
for x in range(0, w):
    if im.getpixel((x, 300))[0] > 100:
        left_x = x
        break
for x in range(w-1, -1, -1):
    if im.getpixel((x, 300))[0] > 100:
        right_x = x
        break

print(f"Paper horizontal bounds at y=300: left={left_x}, right={right_x}, total width={w}")

# Check bottom bounds of paper at x=230
for y in range(h-1, -1, -10):
    if im.getpixel((230, y))[0] > 100:
        print(f"Paper bottom bounds around y={y}: {im.getpixel((230,y))}")
        break

# Check paper background color
print("Center paper color (x=230, y=500):", im.getpixel((230, 500)))
print("Text color (sample dark ink):")
# Let's find darkest pixel around y=200
darkest = (255, 255, 255)
for y in range(190, 210):
    for x in range(left_x, right_x):
        pix = im.getpixel((x, y))
        if sum(pix[:3]) < sum(darkest[:3]):
            darkest = pix
print("Darkest ink:", darkest)
