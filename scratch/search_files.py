import os

keywords = ['1 / 8', '1 / ', 'soundBtn', 'spiral', 'bookCanvas', 'music.mp3', 'Sketchbook']

for root, dirs, files in os.walk('.'):
    if 'node_modules' in root or '.git' in root or 'dist' in root:
        continue
    for file in files:
        if file.endswith(('.html', '.js', '.jsx', '.css')):
            path = os.path.join(root, file)
            try:
                with open(path, 'r', encoding='utf-8', errors='ignore') as f:
                    txt = f.read()
                    matches = [k for k in keywords if k in txt]
                    if matches:
                        print(f"{path}: matched {matches} (size: {len(txt)})")
            except Exception as e:
                pass
