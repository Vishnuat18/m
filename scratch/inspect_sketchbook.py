import sys

with open('Sketchbook.html', 'r', encoding='utf-8', errors='ignore') as f:
    content = f.read()

print(f"Sketchbook.html size: {len(content)} chars")
# Find title, scripts, and key structural elements
import re
print("First 500 chars:")
print(content[:500])

print("\n--- Looking for script tags ---")
scripts = re.findall(r'<script[\s\S]*?</script>', content)
print(f"Found {len(scripts)} script tags")
for i, s in enumerate(scripts):
    print(f"Script {i}: length {len(s)}")
    print(s[:200] + '...')

print("\n--- Looking for body tags or container divs ---")
containers = re.findall(r'<div class="[^"]*"', content)[:10]
print("Containers:", containers)
