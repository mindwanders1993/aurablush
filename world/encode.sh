#!/bin/bash
# ============================================================================
# Aura Blush — lets-scroll asset pipeline (architecture A, continuous walkthrough)
#
# Run with bash, never zsh: zsh arrays are 1-indexed and will silently chain the
# wrong scene's frames (SKILL.md gotcha).
#
#   bash world/encode.sh frames    # extract each leg's first+last frame
#   bash world/encode.sh check     # verify every seam is frame-locked
#   bash world/encode.sh encode    # produce the shipping .mp4s
#   bash world/encode.sh posters   # produce the shipping poster stills
#   bash world/encode.sh all
#
# Drop your rendered files in first:
#   world/renders/still_<id>.png     world/renders/still_<id>-m.png
#   world/renders/leg_<id>.mp4       world/renders/leg_<id>-m.mp4
# ============================================================================
set -uo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
W="$ROOT/world"
R="$W/renders"
F="$W/frames"
OUT="$ROOT/public/world"

# Scene order IS the camera path. Never reorder without re-rendering the chain.
NAMES="arrival consult prep brows lips reveal"

mkdir -p "$R" "$F" "$OUT/vid"

have() { [ -f "$1" ]; }

# ---------------------------------------------------------------------------
# frames — each leg's first frame (the poster, and the seam's "after" side) and
# last frame (the conditioning image the NEXT leg must start on).
# ---------------------------------------------------------------------------
do_frames() {
  for suffix in "" "-m"; do
    for n in $NAMES; do
      src="$R/leg_${n}${suffix}.mp4"
      have "$src" || { echo "skip  leg_${n}${suffix}.mp4 (not rendered yet)"; continue; }
      ffmpeg -v error -y -ss 0      -i "$src" -frames:v 1 -q:v 2 "$F/first_${n}${suffix}.png"
      ffmpeg -v error -y -sseof -0.15 -i "$src" -frames:v 1 -q:v 2 "$F/last_${n}${suffix}.png"
      echo "frames leg_${n}${suffix} -> first_${n}${suffix}.png last_${n}${suffix}.png"
    done
  done
}

# ---------------------------------------------------------------------------
# check — the seam rule. Leg i must OPEN on leg i-1's actual last frame. A tool
# that ignored the start image drifts here, and no crossfade will hide it.
# Judge by composition, not raw dB: a correctly frame-locked seam still reads
# ~18-25 dB from detail shimmer alone. Below ~15 dB means a different shot.
# ---------------------------------------------------------------------------
do_check() {
  for suffix in "" "-m"; do
    prev=""
    for n in $NAMES; do
      clip="$R/leg_${n}${suffix}.mp4"
      have "$clip" || { prev="$n"; continue; }

      # Spec: aspect + duration
      read -r wpx hpx dur < <(ffprobe -v error -select_streams v:0 \
        -show_entries stream=width,height:format=duration \
        -of csv=p=0:s=x "$clip" 2>/dev/null | tr 'x\n' '  ')
      echo "spec  leg_${n}${suffix}: ${wpx}x${hpx}, ${dur}s"
      if [ -n "${wpx:-}" ] && [ -n "${hpx:-}" ]; then
        if [ -z "$suffix" ] && [ "$wpx" -le "$hpx" ]; then
          echo "  !! desktop leg is not landscape"
        fi
        if [ -n "$suffix" ] && [ "$wpx" -ge "$hpx" ]; then
          echo "  !! mobile leg is NOT natively portrait — a downscaled 16:9 file is not the mobile version"
        fi
      fi

      # Seam: this leg's frame 0 vs the previous leg's last frame
      if [ -n "$prev" ] && have "$F/last_${prev}${suffix}.png" && have "$F/first_${n}${suffix}.png"; then
        db=$(ffmpeg -hide_banner -i "$F/first_${n}${suffix}.png" -i "$F/last_${prev}${suffix}.png" \
              -lavfi psnr -f null - 2>&1 | sed -n 's/.*average:\([0-9.]*\).*/\1/p' | tail -1)
        verdict=$(awk -v d="${db:-0}" 'BEGIN{ if (d+0 >= 15) print "locked"; else print "BROKEN" }')
        echo "seam  ${prev}${suffix} -> ${n}${suffix}: PSNR ${db:-n/a} dB  [$verdict]"
        if [ "$verdict" = "BROKEN" ]; then
          echo "  !! leg_${n}${suffix} does not open on leg_${prev}${suffix}'s last frame."
          echo "     Its tool ignored the start image, or it was generated from the still"
          echo "     instead of $F/last_${prev}${suffix}.png. Re-render it — a crossfade"
          echo "     cannot hide a wrong start frame."
        fi
      fi
      prev="$n"
    done
  done
  echo
  echo "Leg 0 (arrival) has no seam before it — it opens on still_arrival.png."
}

# ---------------------------------------------------------------------------
# encode — native resolution, crf 20, GOP 8, light sharpen, no audio, faststart.
# Seekability comes from the engine's blob loading, not from keyframe density,
# so all-intra is unnecessary (and 3x the file size).
# ---------------------------------------------------------------------------
enc_desktop() {
  ffmpeg -v error -y -i "$1" -an -vf "unsharp=5:5:0.8:5:5:0.0" \
    -c:v libx264 -preset slow -crf 20 -pix_fmt yuv420p \
    -g 8 -keyint_min 8 -sc_threshold 0 -movflags +faststart "$2" \
    && echo "enc   $(basename "$2") $(du -h "$2" | cut -f1)"
}

# Phones: 720 wide and a tighter GOP — seek cost on a phone decoder scales with
# distance from the last keyframe, so -g 4 scrubs far smoother than the master.
enc_mobile() {
  ffmpeg -v error -y -i "$1" -an -vf "scale=720:-2,unsharp=5:5:0.6:5:5:0.0" \
    -c:v libx264 -preset slow -crf 23 -pix_fmt yuv420p \
    -g 4 -keyint_min 4 -sc_threshold 0 -movflags +faststart "$2" \
    && echo "enc   $(basename "$2") $(du -h "$2" | cut -f1)"
}

do_encode() {
  for n in $NAMES; do
    have "$R/leg_${n}.mp4"   && enc_desktop "$R/leg_${n}.mp4"   "$OUT/vid/${n}.mp4"
    have "$R/leg_${n}-m.mp4" && enc_mobile  "$R/leg_${n}-m.mp4" "$OUT/vid/${n}-m.mp4"
  done
}

# ---------------------------------------------------------------------------
# posters — the still the engine shows until the clip paints its first frame.
# Taken from each leg's OWN frame 0 so there is no poster-to-video pop; falls
# back to the rendered scene still when the leg isn't in yet.
# (This ffmpeg build has no libwebp, so posters ship as JPEG.)
# ---------------------------------------------------------------------------
do_posters() {
  for n in $NAMES; do
    if have "$F/first_${n}.png"; then
      ffmpeg -v error -y -i "$F/first_${n}.png" -vf "scale='min(1600,iw)':-2" -q:v 3 "$OUT/${n}.jpg" \
        && echo "post  ${n}.jpg (from leg frame 0)"
    elif have "$R/still_${n}.png"; then
      ffmpeg -v error -y -i "$R/still_${n}.png" -vf "scale='min(1600,iw)':-2" -q:v 3 "$OUT/${n}.jpg" \
        && echo "post  ${n}.jpg (from still)"
    fi
    if have "$F/first_${n}-m.png"; then
      ffmpeg -v error -y -i "$F/first_${n}-m.png" -vf "scale='min(1080,iw)':-2" -q:v 3 "$OUT/${n}-m.jpg" \
        && echo "post  ${n}-m.jpg (from portrait leg frame 0)"
    elif have "$R/still_${n}-m.png"; then
      ffmpeg -v error -y -i "$R/still_${n}-m.png" -vf "scale='min(1080,iw)':-2" -q:v 3 "$OUT/${n}-m.jpg" \
        && echo "post  ${n}-m.jpg (from portrait still)"
    fi
  done
}

case "${1:-all}" in
  frames)  do_frames ;;
  check)   do_check ;;
  encode)  do_encode ;;
  posters) do_posters ;;
  all)     do_frames; do_encode; do_posters; do_check ;;
  *)       sed -n '2,20p' "$0"; exit 1 ;;
esac
