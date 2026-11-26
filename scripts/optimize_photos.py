# Run with: uv run --with pillow python scripts/optimize_photos.py
"""Generate the responsive assets used by the portfolio; retain original photos."""
from pathlib import Path
from PIL import Image, ImageOps

photos = Path(__file__).resolve().parents[1] / "dist/client/photos"
sources = [p for p in photos.glob("ktm-*.jpg") if "preview" not in p.stem]
sources += [photos / "mountain-3200.jpg", photos / "climber-feature-1440.jpg"]

for source in sources:
    with Image.open(source) as original:
        image = ImageOps.exif_transpose(original).convert("RGB")
        stem = source.stem.removesuffix("-3200").removesuffix("-1440")
        widths = (768, 1440, 2400) if stem == "mountain" else (640, 1280, 1920)
        for width in widths:
            if width > image.width:
                continue
            height = round(image.height * width / image.width)
            resized = image.resize((width, height), Image.Resampling.LANCZOS)
            output = photos / f"{stem}-{width}.webp"
            resized.save(output, "WEBP", quality=80, method=6)
            print(f"{output.name}: {output.stat().st_size // 1024} KB ({width}×{height})")

# The edited homepage uses these original portfolio photographs.
for name in ['rainbow','people','harbor','climb','coastal','sail','carousel-model',
             'tracks','bridge','motorcycle','twilight','couple','hero']:
    with Image.open(photos / f"{name}.jpg") as original:
        image = ImageOps.exif_transpose(original).convert("RGB")
        for width in sorted({min(480,image.width),min(960,image.width),image.width}):
            resized = image.resize((width,round(image.height*width/image.width)),Image.Resampling.LANCZOS)
            resized.save(photos / f"{name}-{width}.webp", "WEBP", quality=82, method=6)
