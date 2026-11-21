import json

with open(r'C:\Users\Lenovo\.gemini\antigravity\brain\2d0bb5c2-7de7-4eec-a62c-f5130cb45271\.system_generated\logs\transcript_full.jsonl', 'r', encoding='utf-8', errors='ignore') as f:
    for line in f:
        data = json.loads(line)
        if data.get('step_index') in [698, 699, 700]:
            print(f"Step {data.get('step_index')}: {data.get('content')}")
