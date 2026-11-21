with open(r'C:\Users\Lenovo\OneDrive\Desktop\M\mm.html', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

print("Length of mm.html:", len(text))
print("First 1000 chars:")
print(text[:1000])

import re
print("\nTitle:", re.findall(r'<title>.*?</title>', text))
print("Contains 1 / 8?:", '1 / 8' in text)
print("Contains music.mp3?:", 'music.mp3' in text)
print("Contains spiral?:", 'spiral' in text)
