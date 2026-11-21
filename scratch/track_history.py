import json

with open(r'C:\Users\Lenovo\.gemini\antigravity\brain\2d0bb5c2-7de7-4eec-a62c-f5130cb45271\.system_generated\logs\transcript_full.jsonl', 'r', encoding='utf-8', errors='ignore') as f:
    for line in f:
        data = json.loads(line)
        idx = data.get('step_index')
        if 471 <= idx <= 550:
            for t in data.get('tool_calls', []):
                args = t.get('args', {})
                print(f"Step {idx}: {t.get('name')} {args.get('CommandLine', args.get('Path', ''))[:100]}")
