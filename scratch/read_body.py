with open('Sketchbook.html', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

# Let's find body tag and everything before the script tag
import re
match = re.search(r'<body[\s\S]*?<script>', text)
if match:
    print("Body HTML before script:")
    print(match.group(0)[:2500])
else:
    print("No match")
