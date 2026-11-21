import os, base64

with open('Sketchbook.html', 'r', encoding='utf-8') as f:
    content = f.read()

start_marker = 'const COVER_IMG = "data:image/jpeg;base64,'
idx = content.find(start_marker)
if idx != -1:
    idx += len(start_marker)
    end_idx = content.find('"', idx)
    b64_str = content[idx:end_idx]
    img_data = base64.b64decode(b64_str)
    os.makedirs('assets', exist_ok=True)
    os.makedirs('public/assets', exist_ok=True)
    with open('assets/sketchbook-cover.jpg', 'wb') as out:
        out.write(img_data)
    with open('public/assets/sketchbook-cover.jpg', 'wb') as out:
        out.write(img_data)
    print(f'Extracted sketchbook-cover.jpg ({len(img_data)} bytes)')
else:
    print('Marker not found')
