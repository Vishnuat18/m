import os

print("Files in dist:")
for root, dirs, files in os.walk('dist'):
    for f in files:
        p = os.path.join(root, f)
        print(f"  {p}: {os.path.getsize(p)} bytes")
