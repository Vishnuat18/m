import os

def update_file(path):
    with open(path, "r", encoding="utf-8") as f:
        c = f.read()

    # 1. Add DEFAULT_PHOTOS and bump STORAGE_KEY to v2
    target1 = """    const STORAGE_KEY = "sketchbook_22p_user_photos_v1";
    const TOTAL_PAGES = 22;
    const TOTAL_SLOTS = 33;
    const MAX_SPREAD = 12;"""

    replace1 = """    const TOTAL_PAGES = 22;
    const TOTAL_SLOTS = 33;
    const MAX_SPREAD = 12;

    const DEFAULT_PHOTOS = {};
    for (let i = 1; i <= TOTAL_SLOTS; i++) {
      DEFAULT_PHOTOS[`photo-${i}`] = `assets/scrapbook/slot-${i}.jpg`;
    }

    const STORAGE_KEY = "sketchbook_22p_user_photos_v2";"""

    if target1 not in c:
        print(f"Target 1 not found in {path}")
        return False
    c = c.replace(target1, replace1)

    # 2. Initialize userPhotos with DEFAULT_PHOTOS
    target2 = """    let userPhotos = {};
    let audioCtx = null;

    const baseImages = {};
    const pageCanvases = {};
    const userPhotoImgs = {};

    let curl = {
      active: false,
      dir: 1,
      corner: "bottom",
      px: 0, py: 0,
      dragging: false,
      hovering: false,
      anim: null
    };

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) userPhotos = JSON.parse(saved);
    } catch (e) {
      userPhotos = {};
    }"""

    replace2 = """    let userPhotos = { ...DEFAULT_PHOTOS };
    let audioCtx = null;

    const baseImages = {};
    const pageCanvases = {};
    const userPhotoImgs = {};

    let curl = {
      active: false,
      dir: 1,
      corner: "bottom",
      px: 0, py: 0,
      dragging: false,
      hovering: false,
      anim: null
    };

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        userPhotos = { ...DEFAULT_PHOTOS, ...parsed };
      }
    } catch (e) {
      userPhotos = { ...DEFAULT_PHOTOS };
    }"""

    if target2 not in c:
        print(f"Target 2 not found in {path}")
        return False
    c = c.replace(target2, replace2)

    # 3. Enhance photo loading to check im.complete for cached loads
    target3 = """      Object.keys(userPhotos).forEach((slotId) => {
        const im = new Image();
        im.onload = () => {
          userPhotoImgs[slotId] = im;
          const pg = findPageForSlot(slotId);
          if (pg) compositePageCanvas(pg);
          render();
        };
        im.src = userPhotos[slotId];
      });"""

    replace3 = """      Object.keys(userPhotos).forEach((slotId) => {
        const im = new Image();
        im.onload = () => {
          userPhotoImgs[slotId] = im;
          const pg = findPageForSlot(slotId);
          if (pg) compositePageCanvas(pg);
          render();
        };
        im.src = userPhotos[slotId];
        if (im.complete) {
          userPhotoImgs[slotId] = im;
          const pg = findPageForSlot(slotId);
          if (pg) compositePageCanvas(pg);
        }
      });"""

    if target3 not in c:
        print(f"Target 3 not found in {path}")
        return False
    c = c.replace(target3, replace3)

    # 4. Clear photos resets to DEFAULT_PHOTOS
    target4 = """    clearPhotosBtn.addEventListener("click", () => {
      userPhotos = {};
      Object.keys(userPhotoImgs).forEach((k) => delete userPhotoImgs[k]);
      savePhotos();
      for (let p = 1; p <= TOTAL_PAGES; p++) compositePageCanvas(p);
      updatePhotoCounters();
      rebuildVisibleHotspots();
      render();
      showToast("Cleared all placed photos.");
    });"""

    replace4 = """    clearPhotosBtn.addEventListener("click", () => {
      userPhotos = { ...DEFAULT_PHOTOS };
      Object.keys(userPhotoImgs).forEach((k) => delete userPhotoImgs[k]);
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {}
      loadAllAssets();
      updatePhotoCounters();
      rebuildVisibleHotspots();
      render();
      showToast("Reset all photos to default scrapbook memories.");
    });"""

    if target4 not in c:
        print(f"Target 4 not found in {path}")
        return False
    c = c.replace(target4, replace4)

    with open(path, "w", encoding="utf-8") as f:
        f.write(c)
    print(f"Successfully updated {path}")
    return True

res1 = update_file("Sketchbook.html")
res2 = update_file("public/Sketchbook.html")
if res1 and res2:
    print("Both Sketchbook files updated successfully!")
else:
    print("Failed to update one or more files.")
