import os

for root, dirs, files in os.walk('.'):
    if 'node_modules' in root or '.git' in root or 'dist' in root:
        continue
    for file in files:
        path = os.path.join(root, file)
        try:
            with open(path, 'r', encoding='utf-8', errors='ignore') as f:
                c = f.read()
                if '1 / 8' in c or '1/8' in c or 'music.mp3' in c:
                    print(f"MATCH: {path}")
        except Exception:
            pass
