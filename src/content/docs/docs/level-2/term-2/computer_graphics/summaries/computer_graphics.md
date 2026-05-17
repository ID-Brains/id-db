---
title: "Computer Graphics"
date: 2026-05-16
description: "Comprehensive summary of computer graphics fundamentals covering display technologies (CRT, LCD, OLED, Plasma), raster vs vector media formats, color models (RGB/CMYK), 2D transformation matrices, and C graphics programming with graphics.h."
type: "summary"
subject: "computer_graphics"
level: 2
term: 2
contributor: "k5602"
tags:
  - Computer-Graphics
  - Display-Technology
  - Color-Theory
  - 2D-Transformations
  - C-Programming
language: "en"
---

# Computer Graphics

---

## Table of Contents

1. [Hardware & Display Technologies](#1-hardware--display-technologies)
2. [Media Formats & Color Theory](#2-media-formats--color-theory)
3. [2D Transformations (Math)](#3-2d-transformations-math)
4. [Legacy C Graphics Programming](#4-legacy-c-graphics-programming)
5. [Quick-Fire Revision Cheatsheet](#5-quick-fire-revision-cheatsheet)

---

## 1. Hardware & Display Technologies

### The Big Picture

Every monitor or screen you use is built on one of a handful of fundamental technologies. The exam will likely ask you to **compare** them, so understand *why* each one works the way it does, not just the name.

### CRT (Cathode Ray Tube) - The Old School

A CRT works by firing a beam of electrons at a phosphor-coated screen. The electrons excite the phosphor, which glows. The beam scans across the screen line by line, top to bottom, at very high speed - so fast your eye perceives a steady image. This is called **raster scanning**.

**Key characteristics:**
- Heavy and bulky (the tube needs depth)
- Excellent viewing angles (the screen glows toward you from every angle)
- Good color reproduction and contrast
- High power consumption
- Now considered legacy technology

### LCD (Liquid Crystal Display)

LCDs do not produce their own light. Instead, they use a **backlight** (usually fluorescent, or now LED) behind a grid of liquid crystals. Each crystal can be electrically twisted to block or allow light through a color filter. The combination of red, green, and blue filters produces color.

**Key characteristics:**
- Flat and thin
- Lower power than CRT
- Narrower viewing angles than CRT (though modern IPS panels improved this)
- Good lifespan

### LED-Backlit LCD

This is technically still an LCD, but the fluorescent backlight is replaced with LEDs. The result is better brightness control, lower power draw, and thinner panels. When someone says "LED TV" in a store, they almost always mean this - an LCD with LED backlighting.

### OLED (Organic Light-Emitting Diode)

OLED is fundamentally different: **each pixel produces its own light**. There is no backlight at all. When a pixel should be black, it simply turns off, emitting zero light.

**Key characteristics:**
- True blacks (pixel is off = no light = perfect black)
- Best contrast ratio of any display technology
- Thinner than LCD (no backlight layer needed)
- Faster response times
- More expensive to manufacture
- Can suffer from burn-in over time

### Plasma

Plasma displays work by exciting small pockets of gas (plasma) with electricity, causing them to emit UV light, which then hits a phosphor coating to produce visible color. Each cell is essentially a tiny fluorescent lamp.

**Key characteristics:**
- Excellent color and contrast
- Good viewing angles
- Higher power consumption
- Heavier than LCD
- Largely discontinued (replaced by OLED)

### Comparison Table

| Feature | CRT | LCD | LED-LCD | OLED | Plasma |
|---|---|---|---|---|---|
| Self-emitting pixels | No | No | No | **Yes** | Yes |
| Best contrast | Good | Medium | Medium | **Best** | Good |
| Power use | High | Low | **Lowest** | Medium | High |
| Thickness | Bulky | Thin | Thin | **Thinnest** | Medium |
| Viewing angle | Best | Narrow | Medium | Best | Best |
| Cost | Cheap (old) | Cheap | Medium | Expensive | N/A |

> **Exam point:** If asked "which technology has the best contrast?" the answer is **OLED**, because black pixels are truly off. If asked "which is cheapest?", think **LCD** and the balance of features is LED.

---

## 2. Media Formats & Color Theory

### Raster vs. Vector - The Core Difference

This distinction is one of the most commonly tested concepts in graphics courses.

A **raster image** is a grid of pixels. Each pixel stores a color value. The image is defined by its resolution (e.g., 1920×1080). If you zoom in too much, you see the individual squares - this is called **pixelation**. Raster images are ideal for photos.

A **vector image** stores shapes as mathematical equations - "draw a circle with center (100, 100) and radius 50." Because it's math, you can scale it to any size and it will always render perfectly sharp. Vector images are ideal for logos, icons, and illustrations.

| Property | Raster | Vector |
|---|---|---|
| Made of | Pixels (grid) | Mathematical shapes |
| Scales well? | **No** - pixelates | **Yes** - always sharp |
| Best for | Photos, textures | Logos, icons, diagrams |
| File size | Can be large | Usually small |
| Examples | JPEG, PNG, GIF, TIFF | SVG, AI, EPS, PDF |

### Raster File Formats - Know the Differences

- **JPEG (.jpg):** Uses *lossy* compression. Every time you save, it discards some image data to reduce file size. Best for photographs where minor quality loss is acceptable. Does NOT support transparency.

- **GIF (.gif):** Uses *lossless* compression but is limited to only **256 colors**. Supports animation and simple transparency. Not suitable for photos (color banding), but fine for simple icons or animations.

- **PNG (.png):** Uses *lossless* compression and supports millions of colors plus a full **alpha channel** (transparency). Larger file size than JPEG but no quality loss. Ideal for logos, screenshots, UI graphics.

- **TIFF (.tif):** High-quality, often *uncompressed*. Used in professional printing and photography. Very large file sizes.

- **PSD (.psd):** Adobe Photoshop's native format. Stores layers, masks, and editing history.

### Vector File Formats

- **SVG:** XML-based vector format, works natively in web browsers.
- **AI:** Adobe Illustrator's native format.
- **EPS:** Older vector format, used in print workflows.
- **PDF:** Can contain both vector and raster content; widely used for documents.

### Color Models - RGB vs. CMYK

Understanding *why* these two models are different is more important than memorizing the names.

**RGB (Red, Green, Blue) - Additive Color**

RGB is used by screens (monitors, phones, TVs). Screens start from darkness (black) and *add* light. If you add Red + Green + Blue at full intensity, you get **White**. This is called additive mixing because you are adding wavelengths of light.

```
Red + Green = Yellow
Red + Blue  = Magenta
Green + Blue = Cyan
Red + Green + Blue = White
No light at all = Black
```

**CMYK (Cyan, Magenta, Yellow, Key/Black) - Subtractive Color**

CMYK is used in printing. Paper starts white (it reflects all light). Ink *absorbs* (subtracts) certain wavelengths. Cyan ink absorbs red, Magenta absorbs green, Yellow absorbs blue. Combining all three in theory gives black, but in practice it gives muddy brown - that's why a separate **Key (Black)** ink is added.

```
Cyan + Magenta + Yellow = (imperfect) Black
Adding Key (K) = True Black
```

> **Memory trick:** RGB = screens, light, additive → adding light gives White. CMYK = print, ink, subtractive → absorbing light gives Black.

### Pixel Data & Python (Know the Concepts)

A color image is stored in memory as a **3D array** of shape `(height, width, 3)` - the 3 channels are R, G, B. A grayscale image is a **2D array** of shape `(height, width)` because each pixel only needs one brightness value.

```python
import numpy as np
from PIL import Image

img = Image.open("photo.jpg")
arr = np.array(img)  # shape: (H, W, 3) for RGB

gray = img.convert("L")
gray_arr = np.array(gray)  # shape: (H, W) for grayscale
```

### Video Formats

A video is essentially a sequence of images (frames) compressed together. A **codec** (coder-decoder) handles the compression algorithm.

- **MP4 (.mp4):** Most common format, uses H.264 codec, great balance of quality and file size.
- **AVI (.avi):** Older Microsoft format, less compression, larger files.
- **MOV (.mov):** Apple's format, high quality, used in professional editing.
- **3GPP (.3gp):** Designed for mobile phones, very compressed/low quality.

---

## 3. 2D Transformations (Math)

> **This is my highest-priority section.** Expect matrix multiplication questions.

### Why Matrices?

A 2D point is just `(x, y)`. To apply a transformation, we could write separate formulas for each type, but that gets complicated when combining them. Instead, we use a clever trick: we add a third value and write every point as `(x, y, 1)`. This is called using **homogeneous coordinates**, and it lets us represent *every* kind of transformation as a 3×3 matrix multiplication. This means we can combine multiple transformations by simply multiplying their matrices together.

A point is written as a column vector:
```
P = | x |
    | y |
    | 1 |
```

And transformation is applied as: `P' = M × P`

---

### Translation - Moving a Point

To move a point by `(tx, ty)`:

```
T = | 1  0  tx |
    | 0  1  ty |
    | 0  0   1 |
```

**Working it out:**
```
x' = x + tx
y' = y + ty
```

**Example:** Move point (3, 4) by (5, 2):
```
| 1  0  5 |   | 3 |   | 3 + 5 |   | 8 |
| 0  1  2 | × | 4 | = | 4 + 2 | = | 6 |
| 0  0  1 |   | 1 |   |   1   |   | 1 |
```
Result: `(8, 6)` ✓

---

### Scaling - Resizing

To scale by `sx` in X and `sy` in Y (relative to the origin):

```
S = | sx  0   0 |
    | 0   sy  0 |
    | 0   0   1 |
```

**Working it out:**
```
x' = sx * x
y' = sy * y
```

**Example:** Scale point (3, 4) by factor 2 in both axes:
```
| 2  0  0 |   | 3 |   | 6 |
| 0  2  0 | × | 4 | = | 8 |
| 0  0  1 |   | 1 |   | 1 |
```
Result: `(6, 8)` ✓

> **Watch out:** Scaling is always relative to the **origin (0,0)**. If your shape is not at the origin, it will also move. To scale around a specific pivot point: translate the pivot to the origin → scale → translate back.

---

### Rotation - Spinning Around the Origin

To rotate by angle θ (counterclockwise):

```
R = | cos θ  -sin θ  0 |
    | sin θ   cos θ  0 |
    | 0       0      1 |
```

**Working it out:**
```
x' = x·cos θ - y·sin θ
y' = x·sin θ + y·cos θ
```

**Example:** Rotate point (1, 0) by 90°:
- cos(90°) = 0, sin(90°) = 1
```
x' = 1·0 - 0·1 = 0
y' = 1·1 + 0·0 = 1
```
Result: `(0, 1)` - point moved from the positive X-axis to the positive Y-axis ✓

---

### Shearing

Shearing "skews" a shape along one axis. In X-direction shear:

```
Shx = | 1  shx  0 |
      | 0   1   0 |
      | 0   0   1 |
```

Result: `x' = x + shx·y`, `y' = y` - the X coordinate is shifted proportionally to Y.

---

### Reflection

Reflection across the **X-axis** (flip vertically, y becomes -y):
```
| 1   0  0 |
| 0  -1  0 |
| 0   0  1 |
```

Reflection across the **Y-axis** (flip horizontally, x becomes -x):
```
| -1  0  0 |
|  0  1  0 |
|  0  0  1 |
```

---

### Composite Transformations - Order Matters!

When combining transformations, you multiply the matrices. The order matters because matrix multiplication is **not commutative** (A×B ≠ B×A in general).

**Classic exam problem: Rotate a shape around a specific pivot point P(px, py)**

Step 1: Translate so pivot moves to origin: `T(-px, -py)`
Step 2: Rotate by θ: `R(θ)`
Step 3: Translate back: `T(px, py)`

Combined matrix: `M = T(px, py) × R(θ) × T(-px, -py)`

Apply to point: `P' = M × P`

---

## 4. Legacy C Graphics Programming

### Setting Up - `initgraph`

Before drawing anything, you must initialize the graphics system:

```c
#include <graphics.h>
#include <conio.h>

int main() {
    int gd = DETECT, gm;  // gd = DETECT means: auto-detect the best driver & mode
    initgraph(&gd, &gm, "C:\\Turboc3\\BGI");  // path to BGI driver files

    // --- your drawing code goes here ---

    getch();         // wait for a keypress before closing
    closegraph();    // shut down graphics mode and free memory
    return 0;
}
```

> **`DETECT`** tells the system to automatically choose the highest-resolution graphics driver available. You don't have to know what card is installed.

**Other setup functions:**
- `getmaxx()` - returns the maximum X coordinate of the screen
- `getmaxy()` - returns the maximum Y coordinate of the screen
- `cleardevice()` - clears the entire screen (fills with background color)

---

### Drawing Basic Shapes

```c
// Line from (x1,y1) to (x2,y2)
line(50, 50, 200, 200);

// Circle centered at (cx,cy) with radius r
circle(300, 200, 80);

// Rectangle from top-left (x1,y1) to bottom-right (x2,y2)
rectangle(100, 100, 400, 300);

// Arc: center (x,y), start angle, end angle, radius
arc(300, 200, 0, 180, 80);  // top half-circle

// Ellipse: center (x,y), start angle, end angle, x-radius, y-radius
ellipse(300, 200, 0, 360, 100, 50);

// Single pixel at (x,y) with color
putpixel(150, 150, RED);

// Polygon: pass number of points and array of coordinate pairs
int pts[] = {100,100, 200,50, 300,100, 300,200, 100,200};
drawpoly(5, pts);  // 5 points
```

---

### Color & Styling

```c
setcolor(YELLOW);              // sets the OUTLINE / drawing color
setbkcolor(BLACK);             // sets the BACKGROUND color

// To fill a closed shape:
setfillstyle(SOLID_FILL, RED); // set fill pattern and color
floodfill(cx, cy, YELLOW);     // fill starting from (cx,cy), stop at border color YELLOW
```

> **Critical rule:** `floodfill` floods outward from the given point until it hits the border color. If the shape is not completely closed, the fill will leak and cover the whole screen. Always make sure your shape is closed before calling `floodfill`.

### The `graphics.h` Color Numbers (Memorize These!)

| Number | Color | Number | Color |
|---|---|---|---|
| 0 | BLACK | 8 | DARKGRAY |
| 1 | BLUE | 9 | LIGHTBLUE |
| 2 | GREEN | 10 | LIGHTGREEN |
| 3 | CYAN | 11 | LIGHTCYAN |
| 4 | RED | 12 | LIGHTRED |
| 5 | MAGENTA | 13 | LIGHTMAGENTA |
| 6 | BROWN | 14 | YELLOW |
| 7 | LIGHTGRAY | 15 | WHITE |

> **Pattern to notice:** Colors 0-7 are the "dark" base colors. Colors 8-15 are their lighter versions, except 14 is YELLOW (not LIGHTBROWN) and 15 is WHITE.

---

### Animation - The Core Loop Pattern

The standard pattern for animating a shape in C graphics:

```c
int x = 0;  // starting position

while (x < getmaxx()) {
    // Step 1: Draw the shape at current position
    circle(x, 200, 30);

    // Step 2: Pause so the user can see it
    delay(30);  // milliseconds

    // Step 3: Erase the shape (draw it again in background color)
    setcolor(BLACK);
    circle(x, 200, 30);
    setcolor(WHITE);  // reset color

    // Step 4: Update position for next frame
    x += 5;
}
```

Alternatively, `cleardevice()` can replace the erase step, but it clears everything - useful only if you're redrawing the whole scene each frame.

---

### Interactivity - Mouse & Keyboard

**Mouse (mouse.h):**
```c
#include <mouse.h>

initmouse();           // initialize mouse driver
int x, y, click;
getmouse(&click, &x, &y);  // get current mouse state: button clicked, x pos, y pos
```

**Keyboard (key.h):**
```c
#include <key.h>

int key = getkey();    // waits for a key and returns its code
if (key == KEY_UP) { /* move up */ }
```

---

### Plotting Mathematical Functions - Sine Wave Example

```c
#include <math.h>

int cx = getmaxx() / 2;
int cy = getmaxy() / 2;

// Draw axes
line(0, cy, getmaxx(), cy);   // horizontal axis
line(cx, 0, cx, getmaxy());   // vertical axis

// Plot sine wave
for (int x = 0; x < getmaxx(); x++) {
    double angle = (x - cx) * 0.05;     // map pixel x to radians
    int y = cy - (int)(sin(angle) * 80); // scale amplitude to 80 pixels
    putpixel(x, y, YELLOW);
}
```

---

### Python Graphics Libraries (Quick Reference)

| Library | Best Used For |
|---|---|
| **Turtle** | Simple 2D drawing, learning basics |
| **Tkinter** | Desktop GUI applications |
| **Pygame** | 2D games and interactive programs |
| **Matplotlib** | Data plotting and charts |

---

## 5. Quick-Fire Revision Cheatsheet

Use this section for a final review 30 minutes before the exam.

**Displays:** OLED = best contrast + thinnest. LCD = cheap. CRT = best viewing angles (legacy). LED-LCD = most power-efficient LCD variant.

**Raster vs. Vector:** Raster = pixels, pixelates when scaled, JPEG/PNG/GIF. Vector = math, always sharp, SVG/AI/EPS.

**Compression:** JPEG = lossy (quality lost). GIF = lossless but only 256 colors. PNG = lossless + transparency.

**Color models:** RGB = screens, additive, R+G+B = White. CMYK = printing, subtractive, C+M+Y+K = Black.

**Translation matrix:**
```
| 1  0  tx |
| 0  1  ty |
| 0  0   1 |
```

**Scaling matrix:**
```
| sx  0   0 |
| 0   sy  0 |
| 0   0   1 |
```

**Rotation matrix (angle θ):**
```
| cosθ  -sinθ  0 |
| sinθ   cosθ  0 |
|  0      0    1 |
```

**Rotate around pivot:** T(pivot) × R(θ) × T(-pivot), applied right to left.

**initgraph:** `DETECT` = auto-detect driver. `closegraph()` = clean up.

**Filling shapes:** `setfillstyle(pattern, color)` → `floodfill(x, y, border_color)`. Shape must be closed or fill leaks.

**Animation loop:** Draw → delay() → Erase → Update position → Repeat.

**Color 14 = YELLOW. Color 4 = RED. Color 0 = BLACK. Color 15 = WHITE.**

---

> Now going through the transformation matrices one more time with a pen and paper - actually multiply two matrices by hand is enough and i don't need to memorize the formulas as it's more about intuition.
