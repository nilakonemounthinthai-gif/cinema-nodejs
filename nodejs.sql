-- =========================================================
-- Cinema NodeJS - Database Schema + Seed Data
-- Database: nodejsapi
-- =========================================================

CREATE DATABASE IF NOT EXISTS nodejsapi CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE nodejsapi;

-- =========================================================
-- TABLE: hethongrap (Theater systems)
-- =========================================================
CREATE TABLE IF NOT EXISTS `hethongrap` (
  `hid` INT NOT NULL AUTO_INCREMENT,
  `maHeThongRap` VARCHAR(50) NOT NULL,
  `tenHeThongRap` VARCHAR(100) NOT NULL,
  `logo` TEXT,
  PRIMARY KEY (`hid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =========================================================
-- TABLE: cumrap (Cinema complexes)
-- =========================================================
CREATE TABLE IF NOT EXISTS `cumrap` (
  `cid` INT NOT NULL AUTO_INCREMENT,
  `maCumRap` VARCHAR(50) NOT NULL,
  `tenCumRap` VARCHAR(150) NOT NULL,
  `diaChi` TEXT,
  PRIMARY KEY (`cid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =========================================================
-- TABLE: hethongrapvacumrap (Theater system ↔ complex)
-- =========================================================
CREATE TABLE IF NOT EXISTS `hethongrapvacumrap` (
  `hethongrap` INT NOT NULL,
  `cumrap` INT NOT NULL,
  PRIMARY KEY (`hethongrap`, `cumrap`),
  FOREIGN KEY (`hethongrap`) REFERENCES `hethongrap`(`hid`) ON DELETE CASCADE,
  FOREIGN KEY (`cumrap`) REFERENCES `cumrap`(`cid`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =========================================================
-- TABLE: danhsachrap (Individual cinemas inside a complex)
-- =========================================================
CREATE TABLE IF NOT EXISTS `danhsachrap` (
  `maRap` INT NOT NULL,
  `tenRap` VARCHAR(100) NOT NULL,
  `maCumRap` INT NOT NULL,
  PRIMARY KEY (`maRap`),
  FOREIGN KEY (`maCumRap`) REFERENCES `cumrap`(`cid`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =========================================================
-- TABLE: theloaiphim (Movie genres)
-- =========================================================
CREATE TABLE IF NOT EXISTS `theloaiphim` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `tenTheLoai` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =========================================================
-- TABLE: phiminsert (Movies)
-- =========================================================
CREATE TABLE IF NOT EXISTS `phiminsert` (
  `maPhim` INT NOT NULL AUTO_INCREMENT,
  `tenPhim` VARCHAR(200) NOT NULL,
  `biDanh` VARCHAR(200),
  `trailer` TEXT,
  `hinhAnh` TEXT,
  `moTa` TEXT,
  `maNhom` VARCHAR(10) DEFAULT 'GP09',
  `ngayKhoiChieu` DATETIME,
  `danhGia` FLOAT DEFAULT 0,
  `nhaSanXuat` VARCHAR(200),
  `daoDien` VARCHAR(200),
  `dienVien` TEXT,
  `maTheLoaiPhim` VARCHAR(100),
  `dinhDang` VARCHAR(50),
  PRIMARY KEY (`maPhim`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =========================================================
-- TABLE: lichchieuinsert (Showtimes)
-- =========================================================
CREATE TABLE IF NOT EXISTS `lichchieuinsert` (
  `maLichChieu` INT NOT NULL AUTO_INCREMENT,
  `ngayChieuGioChieu` DATETIME,
  `maRap` INT,
  `tenRap` VARCHAR(100),
  `giaVe` INT DEFAULT 75000,
  `thoiLuong` INT DEFAULT 120,
  PRIMARY KEY (`maLichChieu`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =========================================================
-- TABLE: phiminsertvalichchieuinsert (Movie ↔ Showtime)
-- =========================================================
CREATE TABLE IF NOT EXISTS `phiminsertvalichchieuinsert` (
  `phiminsert` INT NOT NULL,
  `lichchieuinsert` INT NOT NULL,
  PRIMARY KEY (`phiminsert`, `lichchieuinsert`),
  FOREIGN KEY (`phiminsert`) REFERENCES `phiminsert`(`maPhim`) ON DELETE CASCADE,
  FOREIGN KEY (`lichchieuinsert`) REFERENCES `lichchieuinsert`(`maLichChieu`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =========================================================
-- TABLE: cumrapvalichchieuinsert (Complex ↔ Showtime)
-- =========================================================
CREATE TABLE IF NOT EXISTS `cumrapvalichchieuinsert` (
  `cumrap` INT NOT NULL,
  `lichchieuinsert` INT NOT NULL,
  PRIMARY KEY (`cumrap`, `lichchieuinsert`),
  FOREIGN KEY (`cumrap`) REFERENCES `cumrap`(`cid`) ON DELETE CASCADE,
  FOREIGN KEY (`lichchieuinsert`) REFERENCES `lichchieuinsert`(`maLichChieu`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =========================================================
-- TABLE: hethongrapvaphim (Theater system ↔ Movie)
-- =========================================================
CREATE TABLE IF NOT EXISTS `hethongrapvaphim` (
  `maHeThongRap` INT NOT NULL,
  `maPhim` INT NOT NULL,
  PRIMARY KEY (`maHeThongRap`, `maPhim`),
  FOREIGN KEY (`maHeThongRap`) REFERENCES `hethongrap`(`hid`) ON DELETE CASCADE,
  FOREIGN KEY (`maPhim`) REFERENCES `phiminsert`(`maPhim`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =========================================================
-- TABLE: nguoidungvm (Users)
-- =========================================================
CREATE TABLE IF NOT EXISTS `nguoidungvm` (
  `taiKhoan` VARCHAR(100) NOT NULL,
  `matKhau` VARCHAR(255) NOT NULL,
  `email` VARCHAR(200),
  `soDt` VARCHAR(20),
  `maNhom` VARCHAR(10) DEFAULT 'GP09',
  `maLoaiNguoiDung` VARCHAR(20) DEFAULT 'KhachHang',
  `hoTen` VARCHAR(200),
  PRIMARY KEY (`taiKhoan`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =========================================================
-- TABLE: datve (Booked tickets)
-- =========================================================
CREATE TABLE IF NOT EXISTS `datve` (
  `maGhe` INT NOT NULL AUTO_INCREMENT,
  `tenGhe` VARCHAR(10),
  `loaiGhe` VARCHAR(20),
  `giaVe` INT,
  `taiKhoanNguoiDat` VARCHAR(100),
  `maLichChieu` INT,
  `tenDayDu` VARCHAR(20),
  `isConfirm` BIT(1) NOT NULL DEFAULT b'0',
  `maRap` INT,
  PRIMARY KEY (`maGhe`),
  FOREIGN KEY (`maLichChieu`) REFERENCES `lichchieuinsert`(`maLichChieu`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =========================================================
-- TABLE: thongke (Revenue statistics)
-- =========================================================
CREATE TABLE IF NOT EXISTS `thongke` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `tenPhim` VARCHAR(200),
  `ngayMuaVe` DATETIME,
  `amount` DECIMAL(15,2),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- =========================================================
-- SEED DATA
-- =========================================================

-- Movie genres
INSERT INTO `theloaiphim` (`tenTheLoai`) VALUES
  ('Hành Động'),
  ('Hài Hước'),
  ('Tình Cảm'),
  ('Kinh Dị'),
  ('Hoạt Hình'),
  ('Khoa Học Viễn Tưởng'),
  ('Phiêu Lưu');

-- Theater systems
INSERT INTO `hethongrap` (`maHeThongRap`, `tenHeThongRap`, `logo`) VALUES
  ('CGV', 'CGV Cinemas', '/img/logo-theater/cgv.png'),
  ('LotteCinema', 'Lotte Cinema', '/img/logo-theater/lot.png'),
  ('GalaxyCinema', 'Galaxy Cinema', '/img/logo-theater/gal.png'),
  ('BetaCinemas', 'Beta Cinemas', '/img/logo-theater/bhd.png');

-- Cinema complexes
INSERT INTO `cumrap` (`maCumRap`, `tenCumRap`, `diaChi`) VALUES
  ('CGV-VCM', 'CGV Vincom Center Metropolis', '29 Liễu Giai, Ba Đình, Hà Nội'),
  ('CGV-Aeon', 'CGV Aeon Mall Long Biên', 'Aeon Mall Long Biên, Hà Nội'),
  ('CGV-SC', 'CGV SC VivoCity', '1058 Nguyễn Văn Linh, Q.7, TP.HCM'),
  ('Lotte-BTH', 'Lotte Cinema Bình Thạnh', '14-16 Ung Văn Khiêm, Q. Bình Thạnh, TP.HCM'),
  ('Lotte-HBT', 'Lotte Cinema Hàng Bài', '40 Hàng Bài, Hoàn Kiếm, Hà Nội'),
  ('Galaxy-NguyenDu', 'Galaxy Nguyễn Du', '116 Nguyễn Du, Q.1, TP.HCM'),
  ('Beta-NTL', 'Beta Nguyễn Tất Thành', '86 Nguyễn Tất Thành, Q.4, TP.HCM');

-- Link theater systems ↔ complexes
-- CGV: complexes 1,2,3
INSERT INTO `hethongrapvacumrap` (`hethongrap`, `cumrap`) VALUES
  (1, 1), (1, 2), (1, 3);
-- Lotte: complexes 4,5
INSERT INTO `hethongrapvacumrap` (`hethongrap`, `cumrap`) VALUES
  (2, 4), (2, 5);
-- Galaxy: complex 6
INSERT INTO `hethongrapvacumrap` (`hethongrap`, `cumrap`) VALUES
  (3, 6);
-- Beta: complex 7
INSERT INTO `hethongrapvacumrap` (`hethongrap`, `cumrap`) VALUES
  (4, 7);

-- Individual cinemas (Phòng chiếu)
INSERT INTO `danhsachrap` (`maRap`, `tenRap`, `maCumRap`) VALUES
  (101, 'Phòng 1', 1), (102, 'Phòng 2', 1), (103, 'Phòng IMAX', 1),
  (201, 'Phòng 1', 2), (202, 'Phòng 2', 2),
  (301, 'Phòng 1', 3), (302, 'Phòng 2', 3), (303, 'Phòng 4DX', 3),
  (401, 'Phòng 1', 4), (402, 'Phòng 2', 4),
  (501, 'Phòng 1', 5), (502, 'Phòng 2', 5),
  (601, 'Phòng 1', 6), (602, 'Phòng 2', 6),
  (701, 'Phòng 1', 7), (702, 'Phòng 2', 7);

-- User accounts (password = md5 of plain text)
-- admin123  → md5 = 0192023a7bbd73250516f069df18b500
-- user123   → md5 = 92d6e503b7c839f2e9c6bfda278dabb5
INSERT INTO `nguoidungvm` (`taiKhoan`, `matKhau`, `email`, `soDt`, `maNhom`, `maLoaiNguoiDung`, `hoTen`) VALUES
  ('admin', '0192023a7bbd73250516f069df18b500', 'admin@cinema.vn', '0901234567', 'GP09', 'QuanTri', 'Quản Trị Viên'),
  ('user1',  '92d6e503b7c839f2e9c6bfda278dabb5', 'user1@gmail.com',  '0912345678', 'GP09', 'KhachHang', 'Nguyễn Văn A');

-- Movies (mix of "đang chiếu" 2024-2025 and "sắp chiếu" 2026+)
INSERT INTO `phiminsert` (`tenPhim`, `biDanh`, `trailer`, `hinhAnh`, `moTa`, `maNhom`, `ngayKhoiChieu`, `danhGia`, `nhaSanXuat`, `daoDien`, `dienVien`, `maTheLoaiPhim`, `dinhDang`) VALUES
(
  'Avengers: Doomsday',
  'avengers-doomsday',
  'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  'https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_.jpg',
  'Các siêu anh hùng Avengers phải đối mặt với mối đe dọa lớn nhất từ trước đến nay trong cuộc chiến sinh tử quyết định vận mệnh vũ trụ.',
  'GP09', '2025-05-01 00:00:00', 9.0, 'Marvel Studios', 'Anthony Russo, Joe Russo', 'Robert Downey Jr., Chris Evans, Scarlett Johansson', 'Hành Động', '2D/3D/IMAX'
),
(
  'Inside Out 3',
  'inside-out-3',
  'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  'https://cdn-media.sforum.vn/storage/app/media/phim-inside-out-2-thumb.jpg',
  'Riley đã lớn lên và những cảm xúc bên trong cô bé phải đối mặt với thử thách mới trong cuộc hành trình trưởng thành.',
  'GP09', '2025-06-15 00:00:00', 8.5, 'Pixar Animation Studios', 'Kelsey Mann', 'Amy Poehler, Maya Hawke, Kensington Tallman', 'Hoạt Hình', '2D/3D'
),
(
  'Mission Impossible 8',
  'mission-impossible-8',
  'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  'https://dep.com.vn/wp-content/uploads/2025/05/Mission-Impossible-6.jpg',
  'Ethan Hunt trở lại trong sứ mệnh bất khả thi mới - một cuộc đối đầu căng thẳng với kẻ thù vô hình nguy hiểm nhất từ trước đến nay.',
  'GP09', '2025-07-20 00:00:00', 8.2, 'Paramount Pictures', 'Christopher McQuarrie', 'Tom Cruise, Hayley Atwell, Simon Pegg', 'Hành Động', '2D/IMAX'
),
(
  'Moana 3',
  'moana-3',
  'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  'https://images2.thanhnien.vn/zoom/1200_630/528068263637045248/2024/12/2/1-1733123252292259657230-0-63-700-1400-crop-17331233955831890706041.jpg',
  'Moana bước vào hành trình mới vượt đại dương xa xôi, khám phá những điều bí ẩn của biển cả và tổ tiên.',
  'GP09', '2025-09-10 00:00:00', 8.0, 'Walt Disney Animation', 'David G. Derrick Jr.', 'Auliʻi Cravalho, Dwayne Johnson, Alan Tudyk', 'Hoạt Hình', '2D/3D'
),
(
  'Spider-Man: Beyond the Spider-Verse',
  'spider-man-beyond',
  'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  'https://gamelade.vn/wp-content/uploads/2024/12/3c7c45988ed34fe4628aed9d51507061434432482279e1b69f8fd11ced6869bf._SX1080_FMjpg_.jpg',
  'Miles Morales trở lại trong phần tiếp theo của hành trình đa vũ trụ đầy kịch tính và cảm xúc.',
  'GP09', '2025-11-05 00:00:00', 9.2, 'Sony Pictures Animation', 'Joaquim Dos Santos', 'Shameik Moore, Hailee Steinfeld, Oscar Isaac', 'Hoạt Hình', '2D/3D/IMAX'
),
(
  'The Conjuring 5',
  'the-conjuring-5',
  'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  'https://www.theconjuring.vn/assets/images/desktopbanner.jpg',
  'Ed và Lorraine Warren điều tra một vụ ám ảnh ma quỷ mới - lần này nguy hiểm hơn bao giờ hết.',
  'GP09', '2025-10-31 00:00:00', 7.5, 'New Line Cinema', 'James Wan', 'Patrick Wilson, Vera Farmiga', 'Kinh Dị', '2D'
),
(
  'Fast & Furious 12',
  'fast-furious-12',
  'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  'https://ss-images.saostar.vn/w1200/2025/5/7/pc/1746614590112/h7fvdivc651-xsqzne7yju2-3vgtvcnu3w3.jpg',
  'Gia đình Toretto một lần nữa phải đoàn kết để đối phó với kẻ thù mạnh nhất trong lịch sử.',
  'GP09', '2025-04-04 00:00:00', 7.0, 'Universal Pictures', 'Louis Leterrier', 'Vin Diesel, Michelle Rodriguez, Tyrese Gibson', 'Hành Động', '2D/IMAX'
),
(
  'Avatar 3: Fire and Ash',
  'avatar-3',
  'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  'https://daknong.1cdn.vn/2025/12/19/img_94d4e2c2.jpg',
  'Jake Sully và Neytiri tiếp tục hành trình khám phá Pandora, đối mặt với bộ tộc lửa Ash People đầy nguy hiểm.',
  'GP09', '2025-12-19 00:00:00', 8.8, '20th Century Studios', 'James Cameron', 'Sam Worthington, Zoe Saldana, Sigourney Weaver', 'Khoa Học Viễn Tưởng', '3D/IMAX'
),
(
  'Jurassic World 4',
  'jurassic-world-4',
  'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  'https://dx35vtwkllhj9.cloudfront.net/universalstudios/jurassic-world-rebirth/images/regions/us/updates1/header_HE.jpg',
  'Một thế hệ mới bước vào công viên khủng long - nơi thiên nhiên và tiến hóa không bao giờ ngừng lại.',
  'GP09', '2026-07-02 00:00:00', 7.8, 'Universal Pictures', 'Gareth Edwards', 'Scarlett Johansson, Jonathan Bailey, Manuel Garcia-Rulfo', 'Phiêu Lưu', '2D/3D/IMAX'
),
(
  'Superman (2025)',
  'superman-2025',
  'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  'https://cdn.galaxycine.vn/media/2025/7/10/superman-750_1752140210095.jpg',
  'Hành trình của Clark Kent trở thành siêu anh hùng trong thế giới hiện đại, khám phá bản sắc và sứ mệnh của mình.',
  'GP09', '2026-06-13 00:00:00', 8.1, 'DC Studios', 'James Gunn', 'David Corenswet, Rachel Brosnahan, Nicholas Hoult', 'Hành Động', '2D/3D/IMAX'
);

-- Showtimes for movies 1-8 (đang chiếu / sắp chiếu 2025)
-- CGV Vincom (cumrap cid=1, rap 101)
INSERT INTO `lichchieuinsert` (`ngayChieuGioChieu`, `maRap`, `tenRap`, `giaVe`, `thoiLuong`) VALUES
  ('2026-05-01 10:00:00', 101, 'Phòng 1', 75000, 148),   -- 1: Avengers
  ('2026-05-01 13:00:00', 101, 'Phòng 1', 75000, 148),   -- 2: Avengers
  ('2026-05-01 10:30:00', 102, 'Phòng 2', 75000, 100),   -- 3: Inside Out 3
  ('2026-05-01 14:00:00', 102, 'Phòng 2', 75000, 100),   -- 4: Inside Out 3
  ('2026-05-02 11:00:00', 103, 'Phòng IMAX', 120000, 163), -- 5: Mission Impossible 8
  ('2026-05-02 15:30:00', 103, 'Phòng IMAX', 120000, 163); -- 6: Mission Impossible 8

-- CGV Aeon Long Bien (cumrap cid=2, rap 201)
INSERT INTO `lichchieuinsert` (`ngayChieuGioChieu`, `maRap`, `tenRap`, `giaVe`, `thoiLuong`) VALUES
  ('2026-05-01 09:30:00', 201, 'Phòng 1', 75000, 148),   -- 7: Avengers
  ('2026-05-01 12:30:00', 201, 'Phòng 1', 75000, 100),   -- 8: Inside Out 3
  ('2026-05-03 10:00:00', 202, 'Phòng 2', 75000, 120);   -- 9: Moana 3

-- CGV SC VivoCity (cumrap cid=3, rap 301)
INSERT INTO `lichchieuinsert` (`ngayChieuGioChieu`, `maRap`, `tenRap`, `giaVe`, `thoiLuong`) VALUES
  ('2026-05-02 10:00:00', 301, 'Phòng 1', 75000, 120),   -- 10: Moana 3
  ('2026-05-02 17:00:00', 303, 'Phòng 4DX', 150000, 100);  -- 11: Spider-Man Beyond

-- Lotte Binh Thanh (cumrap cid=4, rap 401)
INSERT INTO `lichchieuinsert` (`ngayChieuGioChieu`, `maRap`, `tenRap`, `giaVe`, `thoiLuong`) VALUES
  ('2026-05-01 20:00:00', 401, 'Phòng 1', 75000, 112),   -- 12: The Conjuring 5
  ('2026-05-02 20:30:00', 401, 'Phòng 1', 75000, 135);   -- 13: Fast & Furious 12

-- Lotte Hang Bai (cumrap cid=5, rap 501)
INSERT INTO `lichchieuinsert` (`ngayChieuGioChieu`, `maRap`, `tenRap`, `giaVe`, `thoiLuong`) VALUES
  ('2026-05-01 09:00:00', 501, 'Phòng 1', 75000, 148),   -- 14: Avengers
  ('2026-05-01 19:00:00', 501, 'Phòng 1', 75000, 148);   -- 15: Avengers

-- Galaxy Nguyen Du (cumrap cid=6, rap 601)
INSERT INTO `lichchieuinsert` (`ngayChieuGioChieu`, `maRap`, `tenRap`, `giaVe`, `thoiLuong`) VALUES
  ('2026-05-03 11:00:00', 601, 'Phòng 1', 75000, 192),   -- 16: Avatar 3
  ('2026-05-03 15:00:00', 601, 'Phòng 1', 75000, 192);   -- 17: Avatar 3

-- Beta NTT (cumrap cid=7, rap 701)
INSERT INTO `lichchieuinsert` (`ngayChieuGioChieu`, `maRap`, `tenRap`, `giaVe`, `thoiLuong`) VALUES
  ('2026-05-02 14:00:00', 701, 'Phòng 1', 75000, 148),   -- 18: Avengers
  ('2026-05-04 10:00:00', 701, 'Phòng 1', 75000, 163);   -- 19: Superman

-- Link Movies ↔ Showtimes (phiminsertvalichchieuinsert)
-- maPhim: Avengers=1, InsideOut=2, MI8=3, Moana=4, SpiderMan=5, Conjuring=6, FF12=7, Avatar=8, JW4=9, Superman=10
INSERT INTO `phiminsertvalichchieuinsert` (`phiminsert`, `lichchieuinsert`) VALUES
  (1, 1), (1, 2),   -- Avengers @ CGV VCM phòng 1
  (2, 3), (2, 4),   -- Inside Out 3 @ CGV VCM phòng 2
  (3, 5), (3, 6),   -- MI8 @ CGV VCM IMAX
  (1, 7),           -- Avengers @ CGV Aeon
  (2, 8),           -- Inside Out 3 @ CGV Aeon
  (4, 9),           -- Moana 3 @ CGV Aeon
  (4, 10),          -- Moana 3 @ CGV SC
  (5, 11),          -- Spider-Man @ CGV SC 4DX
  (6, 12),          -- Conjuring 5 @ Lotte BTH
  (7, 13),          -- FF12 @ Lotte BTH
  (1, 14), (1, 15), -- Avengers @ Lotte HBT
  (8, 16), (8, 17), -- Avatar 3 @ Galaxy
  (1, 18),          -- Avengers @ Beta
  (10, 19);         -- Superman @ Beta

-- Link Complexes ↔ Showtimes (cumrapvalichchieuinsert)
INSERT INTO `cumrapvalichchieuinsert` (`cumrap`, `lichchieuinsert`) VALUES
  (1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6),  -- CGV VCM
  (2, 7), (2, 8), (2, 9),                            -- CGV Aeon
  (3, 10), (3, 11),                                  -- CGV SC
  (4, 12), (4, 13),                                  -- Lotte BTH
  (5, 14), (5, 15),                                  -- Lotte HBT
  (6, 16), (6, 17),                                  -- Galaxy
  (7, 18), (7, 19);                                  -- Beta

-- Link Theater systems ↔ Movies (hethongrapvaphim)
-- CGV (hid=1) shows: Avengers, InsideOut, MI8, Moana, SpiderMan
INSERT INTO `hethongrapvaphim` (`maHeThongRap`, `maPhim`) VALUES
  (1, 1), (1, 2), (1, 3), (1, 4), (1, 5);
-- Lotte (hid=2) shows: Conjuring, FF12, Avengers
INSERT INTO `hethongrapvaphim` (`maHeThongRap`, `maPhim`) VALUES
  (2, 6), (2, 7), (2, 1);
-- Galaxy (hid=3) shows: Avatar 3
INSERT INTO `hethongrapvaphim` (`maHeThongRap`, `maPhim`) VALUES
  (3, 8);
-- Beta (hid=4) shows: Avengers, Superman
INSERT INTO `hethongrapvaphim` (`maHeThongRap`, `maPhim`) VALUES
  (4, 1), (4, 10);

-- Sample stats data
INSERT INTO `thongke` (`tenPhim`, `ngayMuaVe`, `amount`) VALUES
  ('Avengers: Doomsday', '2026-04-01 10:00:00', 75000),
  ('Avengers: Doomsday', '2026-04-01 11:00:00', 75000),
  ('Inside Out 3',       '2026-04-02 14:00:00', 75000),
  ('Mission Impossible 8','2026-04-05 20:00:00', 120000),
  ('Avatar 3: Fire and Ash','2026-04-10 15:00:00', 150000),
  ('Avatar 3: Fire and Ash','2026-04-10 16:00:00', 150000),
  ('Fast & Furious 12',  '2026-04-15 19:00:00', 75000),
  ('The Conjuring 5',    '2026-04-20 21:00:00', 75000);
