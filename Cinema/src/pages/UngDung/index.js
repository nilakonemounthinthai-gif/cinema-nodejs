import React from "react";

export default function UngDung() {
    return (
        <div
            style={{
                paddingTop: 100,
                minHeight: "100vh",
                background: "linear-gradient(135deg, #0d0d14, #0d0d14)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                paddingBottom: 60
            }}
        >
            <div
                style={{
                    maxWidth: 1000,
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: 40,
                    alignItems: "center",
                    padding: "0 16px"
                }}
            >
                {/* Left content */}
                <div>
                    <h2
                        style={{
                            color: "#ffffff",
                            fontSize: 32,
                            marginBottom: 16,
                            fontWeight: "bold"
                        }}
                    >
                        Ứng dụng đặt vé xem phim
                    </h2>

                    <p style={{ color: "#b3b3b3", lineHeight: 1.6, marginBottom: 20 }}>
                        Trải nghiệm đặt vé nhanh chóng, chọn ghế dễ dàng, thanh toán
                        tiện lợi và nhận ưu đãi độc quyền ngay trên điện thoại của bạn.
                    </p>

                    <ul
                        style={{
                            color: "#b3b3b3",
                            lineHeight: 1.8,
                            paddingLeft: 18,
                            marginBottom: 20
                        }}
                    >
                        <li>🎬 Đặt vé chỉ trong vài giây</li>
                        <li>💺 Chọn ghế trực quan</li>
                        <li>🔥 Nhận khuyến mãi mỗi tuần</li>
                        <li>📱 Hỗ trợ iOS & Android</li>
                    </ul>

                    {/* Buttons */}
                    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                        <button
                            style={{
                                padding: "10px 16px",
                                background: "#000",
                                color: "#ffffff",
                                border: "none",
                                borderRadius: 8,
                                cursor: "pointer"
                            }}
                            onClick={() =>
                                window.open(
                                    "https://apps.apple.com",
                                    "_blank"
                                )
                            }
                        >
                            App Store
                        </button>

                        <button
                            style={{
                                padding: "10px 16px",
                                background: "#fa5238",
                                color: "#ffffff",
                                border: "none",
                                borderRadius: 8,
                                cursor: "pointer"
                            }}
                            onClick={() =>
                                window.open(
                                    "https://play.google.com",
                                    "_blank"
                                )
                            }
                        >
                            Google Play
                        </button>
                    </div>
                </div>

                {/* Right content */}
                <div style={{ 
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",   // căn giữa ngang
                    justifyContent: "center",
                    textAlign: "center"

                 }}>
                    <img
                        src="https://news.vio.vn/wp-content/uploads/2024/03/app-dat-ve-xem-phim-2.png"
                        alt="app preview"
                        style={{
                            width: "100%",
                            maxWidth: 320,
                            borderRadius: 20,
                            boxShadow: "0 10px 25px rgba(0,0,0,0.15)"
                        }}
                    />

                    {/* QR placeholder */}
                    <div
                        style={{
                            marginTop: 20,
                            padding: 12,
                            background: "#fff",
                            borderRadius: 12,
                            boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center"
                        }}
                    >
                        <img
                            src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=cinema-app"
                            alt="qr"
                            style={{ width: 120, height: 120 }}
                        />
                        <div style={{ fontSize: 12, marginTop: 6, color: "#666" }}>
                            Quét để tải app
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}