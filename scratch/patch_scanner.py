with open('scratch/scanner/Scanner.jsx', 'r', encoding='utf-8') as f:
    code = f.read()

code = code.replace("import { useEffect, useRef } from 'react';", "import { useEffect, useRef, useState } from 'react';")

code = code.replace(
    "const containerRef = useRef(null);",
    "const [fallback, setFallback] = useState(false);\n  const containerRef = useRef(null);"
)

code = code.replace(
    "if (!container || !canvas || !gl) return undefined;",
    "if (!container || !canvas) return undefined;\n    if (!gl) {\n      setFallback(true);\n      return undefined;\n    }"
)

code = code.replace(
    '<canvas ref={canvasRef} className="scanner-canvas" aria-hidden="true" />',
    '{fallback ? <div className="scanner-fallback-gradient" /> : <canvas ref={canvasRef} className="scanner-canvas" aria-hidden="true" />}'
)

with open('src/components/Scanner.jsx', 'w', encoding='utf-8') as f:
    f.write(code)

print('Wrote src/components/Scanner.jsx successfully')
