import json

with open(r'C:\Users\Lenovo\.gemini\antigravity\brain\2d0bb5c2-7de7-4eec-a62c-f5130cb45271\.system_generated\logs\transcript_full.jsonl', 'r', encoding='utf-8', errors='ignore') as f:
    for line in f:
        data = json.loads(line)
        idx = data.get('step_index')
        if 435 <= idx <= 470:
            for t in data.get('tool_calls', []):
                args = t.get('args', {})
                path = args.get('Path', '')
                if path:
                    print(f"Step {idx}: write_file to {path}")
                    with open(f"scratch/file_step_{idx}.txt", 'w', encoding='utf-8') as out:
                        out.write(args.get('Content', ''))
