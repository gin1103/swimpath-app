"""Generate placeholder PWA icons for SwimPath.

Simple brand-blue rounded square with a few white wave strokes — a
placeholder to unblock PWA installability. Replace with real artwork in the
"UI polish" phase (CLAUDE.md Development Workflow step 15).
"""
from PIL import Image, ImageDraw

BRAND_COLOR = (14, 116, 189)  # a calm pool blue


def draw_waves(draw: ImageDraw.ImageDraw, size: int) -> None:
    stroke = max(2, size // 32)
    for i, y_ratio in enumerate((0.42, 0.55, 0.68)):
        y = size * y_ratio
        amplitude = size * 0.05
        points = []
        steps = 24
        for step in range(steps + 1):
            x = size * (step / steps)
            phase = (step / steps) * 3.14159 * 2 + i * 1.0
            points.append((x, y + amplitude * __import__("math").sin(phase)))
        draw.line(points, fill=(255, 255, 255, 235), width=stroke, joint="curve")


def make_icon(size: int, path: str, padding_ratio: float = 0.0) -> None:
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    pad = int(size * padding_ratio)
    draw.rounded_rectangle(
        [pad, pad, size - pad, size - pad],
        radius=int(size * 0.22),
        fill=BRAND_COLOR,
    )
    inner = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    inner_draw = ImageDraw.Draw(inner)
    draw_waves(inner_draw, size)
    img.alpha_composite(inner)
    img.save(path)


make_icon(192, "public/pwa-192.png")
make_icon(512, "public/pwa-512.png")
# Maskable icon needs extra safe-area padding so OS masks don't clip it.
make_icon(512, "public/pwa-maskable-512.png", padding_ratio=0.1)
make_icon(180, "public/apple-touch-icon.png")
print("icons written")
