import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /*
   * No security headers are set by default, and in particular NO
   * Content-Security-Policy. The whole point of this fixture is that an
   * inline <style>, an inline <script> and two third-party async scripts run
   * without anything getting in their way.
   *
   * ----------------------------------------------------------------------
   * STRICT CSP TEST (commented out on purpose)
   * ----------------------------------------------------------------------
   * Uncomment the block below to check that the snippet still works under a
   * realistic strict policy. Replace <cdn-host> with the host that serves
   * SCRIPT_SRC_1 / SCRIPT_SRC_2 in components/opti-snippet.tsx, and swap the
   * two 'unsafe-inline' entries for the sha256 hashes of STYLE_CONTENT and
   * INLINE_SCRIPT_CONTENT once you know their final values:
   *
   *   printf '%s' "$INLINE_SCRIPT_CONTENT" | openssl dgst -sha256 -binary | openssl base64
   *
   * async: true, headers() {} -- Next runs this on every request in dev.
   *
   * async headers() {
   *   return [
   *     {
   *       source: "/:path*",
   *       headers: [
   *         {
   *           key: "Content-Security-Policy",
   *           value: [
   *             "default-src 'self'",
   *             // 'unsafe-inline' here only until the snippet hash is known.
   *             "script-src 'self' 'unsafe-inline' https://<cdn-host>",
   *             "style-src 'self' 'unsafe-inline'",
   *             "img-src 'self' data: https://picsum.photos https://fastly.picsum.photos",
   *             "connect-src 'self' https://<cdn-host>",
   *             "font-src 'self'",
   *             "frame-ancestors 'none'",
   *             "base-uri 'self'",
   *             "form-action 'self'",
   *           ].join("; "),
   *         },
   *       ],
   *     },
   *   ];
   * },
   */
};

export default nextConfig;
