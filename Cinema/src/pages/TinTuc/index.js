import React from "react";

const newsData = [
    {
        id: 1,
        title: "Avengers: Doomsday hé lộ trailer đầu tiên",
        desc: "Marvel chính thức tung teaser khiến fan toàn cầu bùng nổ với loạt nhân vật quen thuộc trở lại.",
        image: "https://picsum.photos/400/250?random=1",
        date: "25/04/2026",
        link: "https://www.google.com/search?q=Avengers+Doomsday+trailer"
    },
    {
        id: 2,
        title: "CGV giảm giá vé cuối tuần cho học sinh, sinh viên",
        desc: "Chương trình ưu đãi áp dụng tại tất cả cụm rạp CGV trên toàn quốc vào thứ 7 và chủ nhật.",
        image: "https://picsum.photos/400/250?random=2",
        date: "24/04/2026",
        link: "https://www.cgv.vn"
    },
    {
        id: 3,
        title: "Top 10 phim hot nhất tháng 4/2026",
        desc: "Danh sách những bộ phim đang dẫn đầu phòng vé Việt Nam và thế giới.",
        image: "https://picsum.photos/400/250?random=3",
        date: "23/04/2026",
        link: "https://www.google.com/search?q=top+movies+2026"
    },
    {
        id: 4,
        title: "Rạp chiếu phim nâng cấp trải nghiệm IMAX",
        desc: "Hệ thống âm thanh và màn hình mới sẽ được triển khai tại các thành phố lớn.",
        image: "https://picsum.photos/400/250?random=4",
        date: "22/04/2026",
        link: "https://www.imax.com"
    }
];

export default function TinTuc() {
    return (
        <div
            style={{
                paddingTop: 100,
                paddingBottom: 60,
                backgroundColor: "#0d0d14",
                minHeight: "100vh"
            }}
        >
            {/* Title */}
            <h2
                style={{
                    textAlign: "center",
                    color: "#fa5238",
                    marginBottom: 30,
                    fontSize: 28,
                    fontWeight: "bold"
                }}
            >
                Tin tức điện ảnh
            </h2>

            {/* Grid */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: 20,
                    maxWidth: 1100,
                    margin: "0 auto",
                    padding: "0 16px"
                }}
            >
                {newsData.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => window.open(item.link, "_blank")}
                        style={{
                            background: "#1a1a24",
                            borderRadius: 12,
                            overflow: "hidden",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
                            cursor: "pointer",
                            transition: "0.3s ease",
                            border: "1px solid rgba(255,255,255,0.05)"
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = "translateY(-6px)";
                            e.currentTarget.style.boxShadow =
                                "0 10px 25px rgba(0,0,0,0.6)";
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow =
                                "0 4px 12px rgba(0,0,0,0.4)";
                        }}
                    >
                        {/* Image */}
                        <img
                            src={item.image}
                            alt={item.title}
                            style={{
                                width: "100%",
                                height: 170,
                                objectFit: "cover"
                            }}
                        />

                        {/* Content */}
                        <div style={{ padding: 14 }}>
                            <div
                                style={{
                                    fontSize: 12,
                                    color: "#aaa",
                                    marginBottom: 6
                                }}
                            >
                                {item.date}
                            </div>

                            <h3
                                style={{
                                    fontSize: 16,
                                    marginBottom: 8,
                                    color: "#fff",
                                    lineHeight: 1.3
                                }}
                            >
                                {item.title}
                            </h3>

                            <p
                                style={{
                                    fontSize: 13,
                                    color: "#b3b3b3",
                                    lineHeight: 1.5
                                }}
                            >
                                {item.desc}
                            </p>

                            <div
                                style={{
                                    marginTop: 10,
                                    fontSize: 12,
                                    color: "#fa5238",
                                    fontWeight: 500
                                }}
                            >
                                Xem chi tiết →
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}