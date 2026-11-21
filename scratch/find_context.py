with open('Sketchbook.html', 'r', encoding='utf-8', errors='ignore') as f:
    lines = f.readlines()

for i, l in enumerate(lines):
    if '1 / 8' in l or '1/8' in l or '1 / ' in l:
        print(f"Line {i}: {l.strip()[:100]}")
        for j in range(max(0, i-5), min(len(lines), i+6)):
            print(f"  {j}: {lines[j].rstrip()[:120]}")
