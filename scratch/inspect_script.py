import re

with open('Sketchbook.html', 'r', encoding='utf-8', errors='ignore') as f:
    content = f.read()

# Extract the script
script_match = re.search(r'<script>([\s\S]*?)</script>', content)
if script_match:
    script_text = script_match.group(1)
    print("Script length:", len(script_text))
    # Look for page definitions or arrays
    lines = script_text.split('\n')
    for i in range(min(100, len(lines))):
        print(f"{i}: {lines[i][:120]}")
