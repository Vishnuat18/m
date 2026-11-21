import os

for root, dirs, files in os.walk('.'):
    if 'node_modules' in root or '.git' in root or 'dist' in root:
        continue
    for file in files:
        path = os.path.join(root, file)
        if any(w in path.lower() for w in ['sketch', 'book', 'scrap', 'site', 'm-ui']):
            print(f"{path} ({os.path.getsize(path)} bytes)")
