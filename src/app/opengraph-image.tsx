import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt     = "Vipin MV | UI / Frontend Developer";
export const size    = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0d1117",
          position: "relative",
          fontFamily: "system-ui, sans-serif",
          overflow: "hidden",
        }}
      >
        {/* Grid background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Purple glow top-left */}
        <div
          style={{
            position: "absolute",
            top: -120,
            left: -80,
            width: 480,
            height: 480,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(124,58,237,0.35) 0%, transparent 70%)",
          }}
        />

        {/* Indigo glow bottom-right */}
        <div
          style={{
            position: "absolute",
            bottom: -100,
            right: -60,
            width: 420,
            height: 420,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(79,70,229,0.30) 0%, transparent 70%)",
          }}
        />

        {/* Card */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "24px",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Logo badge */}
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: "20px",
              background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "42px",
              fontWeight: 800,
              color: "white",
              boxShadow: "0 0 40px rgba(124,58,237,0.5)",
            }}
          >
            V
          </div>

          {/* Name */}
          <div
            style={{
              fontSize: "72px",
              fontWeight: 800,
              color: "white",
              letterSpacing: "-2px",
              lineHeight: 1,
            }}
          >
            Vipin{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #a855f7 0%, #6366f1 100%)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              MV
            </span>
          </div>

          {/* Role */}
          <div
            style={{
              fontSize: "28px",
              fontWeight: 500,
              color: "rgba(255,255,255,0.55)",
              letterSpacing: "0.5px",
            }}
          >
            UI / Frontend Developer
          </div>

          {/* Divider */}
          <div
            style={{
              width: "120px",
              height: "2px",
              background: "linear-gradient(90deg, transparent, rgba(168,85,247,0.6), transparent)",
              margin: "4px 0",
            }}
          />

          {/* Stat pills */}
          <div style={{ display: "flex", gap: "16px" }}>
            {[
              { value: "6+",  label: "Years Exp."   },
              { value: "30%", label: "Page Speed ↑" },
              { value: "40%", label: "Bundle Size ↓" },
            ].map((s) => (
              <div
                key={s.label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "12px",
                  padding: "12px 24px",
                  gap: "4px",
                }}
              >
                <span
                  style={{
                    fontSize: "26px",
                    fontWeight: 800,
                    background: "linear-gradient(135deg, #a855f7, #6366f1)",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  {s.value}
                </span>
                <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          {/* URL */}
          <div style={{ fontSize: "18px", color: "rgba(255,255,255,0.25)", marginTop: "8px" }}>
            vipinmv.dev
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
