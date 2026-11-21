import json

with open(r'C:\Users\Lenovo\.gemini\antigravity\brain\2d0bb5c2-7de7-4eec-a62c-f5130cb45271\.system_generated\logs\transcript_full.jsonl', 'r', encoding='utf-8', errors='ignore') as f:
    for line in f:
        data = json.loads(line)
        idx = data.get('step_index')
        if 551 <= idx <= 750:
            for t in data.get('tool_calls', []):
                args = t.get('args', {})
                cmd = args.get('CommandLine', '')
                path = args.get('Path', '')
                desc = cmd if cmd else path
                if 'sketch' in desc.lower() or 'move' in desc.lower() or 'copy' in desc.lower() or 'remove' in desc.lower() or 'del' in desc.lower():
                    print(f"Step {idx}: {t.get('name')} {desc[:100]}")
