import { nanoid } from "nanoid";
import { createMuiTheme } from "@material-ui/core/styles";

const currentUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
const avtIdUser = currentUser ? currentUser?.avtIdUser : nanoid(10);
export { avtIdUser };
export const BASE_URL = "http://localhost:4000/api";
export const URL_BANNER = 'http://movieapi.cyberlearn.vn/api/QuanLyPhim/LayDanhSachBanner';
export const FAKE_AVATAR = `https://i.pravatar.cc/300?u=${avtIdUser}`;
export const UNKNOW_USER = "/img/unknowUser.png";
export const DISPLAY_MOBILE_BookTicket = "(max-width:768px)";
export const DISPLAY_MOBILE_THEATER = "(max-width:678px)";
export const HIDDEN_SEARCHTICKET = "(max-width:992px)";
export const DISPLAY_MOBILE_HOMEPAGE = "(max-width:736px)";
export const IMG_LOADING = "/img/logoTixLoading.png";
export const DEFAULT_IMG = "https://placehold.co/300x450/1a1a2e/e94560?text=Kh%C3%B4ng+c%C3%B3+%E1%BA%A3nh";

// FIX F1: Updated date ranges so "Đang chiếu" shows recently-released films
// and "Sắp chiếu" shows upcoming films (future dates).
export const DATE_BEGIN_DANGCHIEU = "2024-01-01";
export const DATE_END_DANGCHIEU = new Date().toISOString().slice(0, 10); // today

export const DATE_BEGIN_SAPCHIEU = new Date().toISOString().slice(0, 10); // today
export const DATE_END_SAPCHIEU = "2030-12-31"; // far future

export const arrayGiaVe = [35000, 40000, 50000, 75000];

export const theme = createMuiTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 678,
            md: 736,
            lg: 768,
            xl: 992,
        },
    },
});