import { ImageResponse } from "next/og"

export const size = { width: 180, height: 180 }
export const contentType = "image/png"

const MARK_SVG =
  "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64' fill='none'>" +
  "<path d='M11 46V18L22 32L33 18V46' stroke='%23F1F5F9' stroke-width='6' stroke-linecap='round' stroke-linejoin='round'/>" +
  "<path d='M33 18L53 46V18' stroke='%23F1F5F9' stroke-width='6' stroke-linecap='round' stroke-linejoin='round'/>" +
  "</svg>"
const MARK_DATA_URI = `data:image/svg+xml,${MARK_SVG}`

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0b1220",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- satori (ImageResponse) requires a plain img */}
        <img src={MARK_DATA_URI} width={118} height={118} alt="" />
      </div>
    ),
    { ...size }
  )
}
