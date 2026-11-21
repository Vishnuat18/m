import os
import unicodedata

def is_emoji_or_symbol(char):
    cat = unicodedata.category(char)
    code = ord(char)
    if code in [0x2190, 0x2191, 0x2192, 0x2193, 0x2197, 0x2199]: # standard arrows
        return False
    if code in [0x2022, 0x00B7]: # bullets
        return False
    if code in [0x25A6, 0x2588, 0x25A0, 0x25A1]: # small boxes
        return False
    if code > 127:
        name = unicodedata.name(char, '')
        if any(w in name for w in ['EMOJI', 'HEART', 'STAR', 'SPARKLE', 'SIGN', 'SYMBOL', 'NOTE', 'GIFT', 'BOOK', 'HAND', 'FACE']):
            return True
        if cat in ['So', 'Sk']:
            return True
    return False

files_to_check = ['index.html', 'vite.config.js', 'package.json']

for path in files_to_check:
    if os.path.exists(path):
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
        for line_idx, line in enumerate(content.split('\n')):
            found = [(c, unicodedata.name(c, 'UNKNOWN'), hex(ord(c))) for c in line if is_emoji_or_symbol(c)]
            if found:
                print(f"{path}:{line_idx+1}: {found} -> {line.strip()[:80]}")
