from pathlib import Path

from PIL import Image, ImageDraw


ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "public" / "assets" / "hiranix"
STAGE_SIZE = (1614, 975)
MOBILE_CROP = (380, 40, 1614, 975)

PRODUCTS = (
    ("metal", 47.583, 16.15, 0.0, 0.0),
    ("pvc", 28.005, 46.769, 0.0, 0.05),
    ("plate", 44.548, 65.31, 0.03, 0.04),
    ("nail", 68.575, 60.1, 0.0, 0.09),
    ("clip", 76.778, 65.52, 0.0, 0.23),
    ("tie", 79.801, 80.718, 0.0, 0.30),
)


def stage_point(x_percent: float, y_percent: float) -> tuple[int, int]:
    return (
        round(STAGE_SIZE[0] * x_percent / 100 - MOBILE_CROP[0]),
        round(STAGE_SIZE[1] * y_percent / 100 - MOBILE_CROP[1]),
    )


def mask_embedded_plinth(image: Image.Image, crop_top: float, crop_bottom: float) -> Image.Image:
    isolated = image.copy()
    alpha = isolated.getchannel("A")
    draw = ImageDraw.Draw(alpha)
    if crop_top:
        draw.rectangle((0, 0, image.width, round(image.height * crop_top)), fill=0)
    if crop_bottom:
        draw.rectangle(
            (0, round(image.height * (1 - crop_bottom)), image.width, image.height),
            fill=0,
        )
    isolated.putalpha(alpha)
    return isolated


def main() -> None:
    plate = Image.open(ASSETS / "hero-plate.webp").convert("RGBA")
    canvas = plate.crop(MOBILE_CROP)

    for product_id, x, y, crop_top, crop_bottom in PRODUCTS:
        product = Image.open(ASSETS / f"drop-{product_id}.webp").convert("RGBA")
        product = mask_embedded_plinth(product, crop_top, crop_bottom)
        canvas.alpha_composite(product, stage_point(x, y))

    canvas.convert("RGB").save(ASSETS / "hero-scene-mobile.webp", "WEBP", quality=92, method=6)


if __name__ == "__main__":
    main()
