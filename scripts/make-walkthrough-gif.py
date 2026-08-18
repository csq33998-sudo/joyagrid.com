from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter


ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "assets"
OUT = ASSETS / "joyagoo-walkthrough.gif"
W, H = 960, 540
FPS = 8


def font(size, bold=False):
    candidates = [
        "C:/Windows/Fonts/arialbd.ttf" if bold else "C:/Windows/Fonts/arial.ttf",
        "C:/Windows/Fonts/segoeuib.ttf" if bold else "C:/Windows/Fonts/segoeui.ttf",
    ]
    for candidate in candidates:
        if Path(candidate).exists():
            return ImageFont.truetype(candidate, size)
    return ImageFont.load_default()


F_TITLE = font(46, True)
F_HEAD = font(30, True)
F_BODY = font(22)
F_SMALL = font(17)
F_BADGE = font(15, True)


COLORS = {
    "bg": (248, 247, 242),
    "ink": (20, 24, 28),
    "muted": (91, 96, 101),
    "panel": (255, 255, 255),
    "line": (222, 216, 207),
    "green": (41, 115, 83),
    "red": (182, 65, 50),
    "gold": (202, 147, 60),
    "blue": (51, 91, 132),
    "dark": (28, 32, 35),
}


def ease(t):
    t = max(0, min(1, t))
    return t * t * (3 - 2 * t)


def wrap(draw, text, width, fnt):
    words = text.split()
    lines = []
    current = ""
    for word in words:
        trial = (current + " " + word).strip()
        if draw.textbbox((0, 0), trial, font=fnt)[2] <= width or not current:
            current = trial
        else:
            lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def draw_text(draw, xy, text, fnt, fill=COLORS["ink"], width=None, leading=8):
    x, y = xy
    if width is None:
        draw.text((x, y), text, font=fnt, fill=fill)
        return y + draw.textbbox((x, y), text, font=fnt)[3] - y
    for line in wrap(draw, text, width, fnt):
        draw.text((x, y), line, font=fnt, fill=fill)
        y += draw.textbbox((x, y), line, font=fnt)[3] - y + leading
    return y


def rounded(draw, box, radius=18, fill=COLORS["panel"], outline=None, width=1):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def crop_cover(path, size):
    img = Image.open(path).convert("RGB")
    sw, sh = size
    scale = max(sw / img.width, sh / img.height)
    nw, nh = int(img.width * scale), int(img.height * scale)
    img = img.resize((nw, nh), Image.Resampling.LANCZOS)
    left = (nw - sw) // 2
    top = (nh - sh) // 2
    return img.crop((left, top, left + sw, top + sh))


PRODUCTS = [
    ("Sneakers", "Clean Low Sneaker", "$72", "Most saved", "product-clean-sneaker.png"),
    ("Outerwear", "Washed Bomber", "$89", "QC ready", "product-washed-bomber.png"),
    ("Pants", "Wide-Leg Denim", "$64", "Daily fit", "product-wide-denim.png"),
    ("Bags", "Studio Tote", "$58", "Commute", "product-studio-tote.png"),
    ("Accessories", "Metal Shades", "$28", "Detail", "product-metal-frame.png"),
    ("Hoodies", "Cropped Hoodie", "$49", "Soft street", "product-cropped-hoodie.png"),
]


def base():
    img = Image.new("RGB", (W, H), COLORS["bg"])
    d = ImageDraw.Draw(img)
    d.rectangle((0, 0, W, 68), fill=(255, 255, 255))
    d.line((0, 68, W, 68), fill=COLORS["line"], width=1)
    logo = crop_cover(ASSETS / "joyagoo-icon-64.png", (42, 42))
    img.paste(logo, (34, 14))
    d.text((88, 17), "Joya Grid", font=font(22, True), fill=COLORS["ink"])
    d.text((88, 42), "Joyagoo spreadsheet hub", font=font(13), fill=COLORS["muted"])
    nav = ["Spreadsheet", "Guides", "Calculator"]
    x = 545
    for item in nav:
        d.text((x, 27), item, font=F_SMALL, fill=COLORS["muted"])
        x += 104
    rounded(d, (810, 16, 925, 52), 18, fill=COLORS["dark"])
    d.text((834, 27), "Streetstyle", font=F_SMALL, fill=(255, 255, 255))
    return img


def product_card(img, x, y, product, active=False):
    d = ImageDraw.Draw(img)
    category, name, price, tag, filename = product
    shadow = Image.new("RGBA", (188, 238), (0, 0, 0, 0))
    sd = ImageDraw.Draw(shadow)
    sd.rounded_rectangle((8, 8, 180, 230), radius=18, fill=(0, 0, 0, 28 if active else 14))
    shadow = shadow.filter(ImageFilter.GaussianBlur(8))
    img.paste(shadow, (x - 8, y - 8), shadow)
    rounded(d, (x, y, x + 172, y + 222), 16, fill=(255, 255, 255), outline=COLORS["green"] if active else COLORS["line"], width=3 if active else 1)
    photo = crop_cover(ASSETS / filename, (154, 116))
    img.paste(photo, (x + 9, y + 9))
    rounded(d, (x + 18, y + 18, x + 94, y + 43), 13, fill=COLORS["dark"])
    d.text((x + 29, y + 24), category, font=F_BADGE, fill=(255, 255, 255))
    d.text((x + 14, y + 138), name, font=font(17, True), fill=COLORS["ink"])
    d.text((x + 14, y + 165), tag, font=font(14), fill=COLORS["muted"])
    d.text((x + 122, y + 165), price, font=font(18, True), fill=COLORS["green"])
    rounded(d, (x + 14, y + 188, x + 158, y + 210), 11, fill=(235, 244, 238))
    d.text((x + 37, y + 192), "QC + price", font=font(13, True), fill=COLORS["green"])


def cursor(draw, x, y):
    pts = [(x, y), (x, y + 34), (x + 9, y + 26), (x + 17, y + 42), (x + 25, y + 38), (x + 17, y + 23), (x + 31, y + 23)]
    draw.polygon(pts, fill=(255, 255, 255), outline=(0, 0, 0))


def scene_title(t):
    img = base()
    d = ImageDraw.Draw(img)
    hero = crop_cover(ASSETS / "joyagoo-spreadsheet-og.png", (390, 300))
    img.paste(hero, (520, 132))
    d.rectangle((520, 132, 910, 432), outline=COLORS["line"], width=2)
    d.text((50, 130), "Joyagoo Spreadsheet 2026", font=F_TITLE, fill=COLORS["ink"])
    draw_text(d, (52, 198), "A visual walkthrough for browsing categories, checking QC context, comparing USD prices, and opening Streetstyle only after the find passes basic checks.", F_BODY, COLORS["muted"], 395)
    rounded(d, (52, 330, 292, 382), 24, fill=COLORS["green"])
    d.text((86, 346), "Browse top finds", font=font(20, True), fill=(255, 255, 255))
    cursor(d, 145 + int(20 * ease(t)), 394 - int(20 * ease(t)))
    return img


def scene_cards(t):
    img = base()
    d = ImageDraw.Draw(img)
    d.text((46, 92), "Step 1: choose a category", font=F_HEAD, fill=COLORS["ink"])
    draw_text(d, (48, 132), "Start with intent. Sneakers, outerwear, bags, hoodies, pants, and accessories need different checks.", F_BODY, COLORS["muted"], 430)
    for i, p in enumerate(PRODUCTS):
        x = 470 + (i % 3) * 150
        y = 94 + (i // 3) * 228
        product_card(img, x, y, p, active=i == int(t * 5.99))
    cursor(d, 560 + int(250 * ease(t)), 390 - int(230 * ease(t)))
    return img


def scene_qc(t):
    img = base()
    d = ImageDraw.Draw(img)
    product_card(img, 54, 126, PRODUCTS[1], active=True)
    d.text((300, 98), "Step 2: check QC evidence", font=F_HEAD, fill=COLORS["ink"])
    checks = [
        ("Shape", "side profile, toe, silhouette"),
        ("Construction", "stitching, panels, hardware"),
        ("Texture", "wash, fabric, finish"),
        ("Fit", "measurements before saving"),
    ]
    for i, (a, b) in enumerate(checks):
        y = 154 + i * 70
        color = COLORS["green"] if i <= int(t * 3.99) else COLORS["line"]
        rounded(d, (304, y, 812, y + 48), 15, fill=(255, 255, 255), outline=color, width=2)
        d.ellipse((322, y + 14, 342, y + 34), fill=color)
        if i <= int(t * 3.99):
            d.line((327, y + 24, 334, y + 31, 340, y + 17), fill=(255, 255, 255), width=3)
        d.text((360, y + 9), a, font=font(18, True), fill=COLORS["ink"])
        d.text((470, y + 11), b, font=font(17), fill=COLORS["muted"])
    cursor(d, 765, 172 + int(205 * ease(t)))
    return img


def scene_cost(t):
    img = base()
    d = ImageDraw.Draw(img)
    d.text((52, 96), "Step 3: estimate total cost", font=F_HEAD, fill=COLORS["ink"])
    draw_text(d, (54, 138), "A cheap item can become expensive after service fee, shipping weight, packaging, and buffer.", F_BODY, COLORS["muted"], 360)
    rows = [("Item", "$72"), ("Domestic", "$6"), ("Service", "$7"), ("Shipping", "$24"), ("Buffer", "$8")]
    x, y = 470, 102
    rounded(d, (x, y, x + 360, y + 304), 22, fill=(255, 255, 255), outline=COLORS["line"])
    total = 0
    values = [72, 6, 7, 24, 8]
    for i, (label, val) in enumerate(rows):
        yy = y + 34 + i * 46
        d.text((x + 32, yy), label, font=font(20), fill=COLORS["muted"])
        shown = int(values[i] * ease(max(0, min(1, t * 1.4 - i * 0.12))))
        total += shown
        d.text((x + 260, yy), f"${shown}", font=font(22, True), fill=COLORS["ink"])
    d.line((x + 28, y + 256, x + 330, y + 256), fill=COLORS["line"], width=2)
    d.text((x + 32, y + 270), "Estimated total", font=font(22, True), fill=COLORS["ink"])
    d.text((x + 248, y + 270), f"${total}", font=font(28, True), fill=COLORS["green"])
    return img


def scene_destination(t):
    img = base()
    d = ImageDraw.Draw(img)
    d.text((54, 94), "Step 4: verify destination", font=F_HEAD, fill=COLORS["ink"])
    draw_text(d, (56, 136), "Open the external page only after the find has enough evidence. Current destination: Streetstyle.", F_BODY, COLORS["muted"], 380)
    rounded(d, (468, 122, 870, 390), 22, fill=(255, 255, 255), outline=COLORS["line"])
    d.text((500, 158), "streetstyle.maisonlooks.com", font=font(26, True), fill=COLORS["ink"])
    d.text((500, 202), "/en/search?q=sneakers", font=font(21), fill=COLORS["blue"])
    rounded(d, (500, 270, 760, 326), 28, fill=COLORS["dark"])
    d.text((552, 287), "View on Streetstyle", font=font(22, True), fill=(255, 255, 255))
    cursor(d, 642 + int(30 * ease(t)), 332 - int(28 * ease(t)))
    return img


def scene_end(t):
    img = base()
    d = ImageDraw.Draw(img)
    d.text((86, 128), "Browse smarter. Check first. Then open Streetstyle.", font=font(42, True), fill=COLORS["ink"])
    draw_text(d, (90, 204), "Use JoyaGrid as your Joyagoo spreadsheet workflow: category, product card, QC context, price check, and final destination.", F_BODY, COLORS["muted"], 650)
    rounded(d, (90, 338, 380, 396), 29, fill=COLORS["green"])
    d.text((132, 356), "joyagrid.com/joyagoo-spreadsheet", font=font(18, True), fill=(255, 255, 255))
    return img


SCENES = [
    (scene_title, 3.2),
    (scene_cards, 4.0),
    (scene_qc, 4.0),
    (scene_cost, 3.6),
    (scene_destination, 3.4),
    (scene_end, 3.2),
]


def main():
    frames = []
    durations = []
    for fn, seconds in SCENES:
        count = int(seconds * FPS)
        for i in range(count):
            t = i / max(1, count - 1)
            frames.append(fn(t))
            durations.append(int(1000 / FPS))
    frames[0].save(
        OUT,
        save_all=True,
        append_images=frames[1:],
        duration=durations,
        loop=0,
        optimize=True,
    )
    print(OUT)


if __name__ == "__main__":
    main()
