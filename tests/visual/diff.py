#!/usr/bin/env python3
"""Vergelijkt twee mappen met screenshots. Gebruik: python3 tests/visual/diff.py <oud> <nieuw> [drempel-%]
Een pixel telt als anders bij een kanaalverschil > 16. Exit 1 als een pagina boven de drempel zit."""
import os, sys
from PIL import Image, ImageChops

old, new = sys.argv[1], sys.argv[2]
threshold = float(sys.argv[3]) if len(sys.argv) > 3 else 0.5
worst = 0.0
for name in sorted(n for n in os.listdir(old) if n.endswith(".png")):
    a = Image.open(os.path.join(old, name)).convert("RGB")
    path = os.path.join(new, name)
    if not os.path.exists(path):
        print(f"ONTBREEKT {name}"); worst = 100; continue
    b = Image.open(path).convert("RGB")
    if a.size != b.size:
        print(f"MAAT      {name}: {a.size} -> {b.size}"); worst = 100; continue
    mask = ImageChops.difference(a, b).convert("L").point(lambda v: 255 if v > 16 else 0)
    changed = mask.histogram()[255]
    pct = 100 * changed / (a.size[0] * a.size[1])
    worst = max(worst, pct)
    print(f"{'OK  ' if pct <= threshold else 'DIFF'} {name}: {pct:.3f}% pixels anders")
sys.exit(0 if worst <= threshold else 1)
