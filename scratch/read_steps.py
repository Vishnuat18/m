import json

steps = [393, 436, 445, 468]

with open(r'C:\Users\Lenovo\.gemini\antigravity\brain\2d0bb5c2-7de7-4eec-a62c-f5130cb45271\.system_generated\logs\transcript_full.jsonl', 'r', encoding='utf-8', errors='ignore') as f:
    for line in f:
        data = json.loads(line)
        idx = data.get('step_index')
        if idx in steps:
            print(f"=== STEP {idx} ===")
            tc = data.get('tool_calls', [])
            for t in tc:
                print("Tool call:", t.get('name'))
                args = t.get('args', {})
                if 'Path' in args:
                    print("  Path:", args['Path'])
                if 'CommandLine' in args:
                    print("  Cmd:", args['CommandLine'])
