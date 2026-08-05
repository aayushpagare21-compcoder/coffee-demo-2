/**
 * Every image URL on the site is built here.
 *
 * picsum.photos seeded URLs are used so a given seed always resolves to the
 * same photograph: screenshots taken before and after an A/B variant are
 * therefore comparable. To move the site onto local assets, change IMAGE_HOST
 * and `imageUrl` below; nothing else needs to touch image URLs.
 */

export const IMAGE_HOST = "https://picsum.photos";

/**
 * @param seed  stable seed string; the same seed always returns the same photo
 * @param width  intrinsic width in px
 * @param height intrinsic height in px
 * @param ext    optional extension, e.g. ".webp"
 */
export function imageUrl(
  seed: string,
  width: number,
  height: number,
  ext = "",
): string {
  return `${IMAGE_HOST}/seed/${seed}/${width}/${height}${ext}`;
}
