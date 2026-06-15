import React, { useState, useEffect } from "react";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { scroller } from "react-scroll";
import { LOGOUT } from "../../../reducers/constants/Auth";
import { LOADING_BACKTO_HOME } from "../../../reducers/constants/Lazy";
import { getMovieList } from "../../../reducers/actions/Movie";
import { getTheaters } from "../../../reducers/actions/Theater";

import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Avatar from "@material-ui/core/Avatar";

import "./style.css"
const headMenu = [
    { nameLink: "Lịch chiếu", type: "scroll", id: "lichchieu" },
    { nameLink: "Cụm rạp",    type: "route",  path: "/cum-rap" },
    { nameLink: "Tin tức",    type: "route",  path: "/tin-tuc" },
    { nameLink: "Ứng dụng",  type: "route",  path: "/ung-dung" },
];

export default function Header() {
    const { currentUser } = useSelector((state) => state.authReducer);
    const { isLoadingBackToHome } = useSelector((state) => state.lazyReducer);
    const dispatch = useDispatch();
    let location = useLocation();
    const history = useHistory();
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
    const [openDrawer, setOpenDrawer] = useState(false);

    // nếu đang mở drawer mà chuyển sang màn hình lớn thì phải tự đóng lại
    useEffect(() => {
        if (isDesktop) {
            if (openDrawer) {
                setOpenDrawer(false);
            }
        }
    }, [isDesktop]);

    useEffect(() => {
        // clicklink > push to home > scrollTo after loading
        if (!isLoadingBackToHome) {
            setTimeout(() => {
                scroller.scrollTo(location.state, {
                    duration: 800,
                    smooth: "easeInOutQuart",
                });
            }, 200);
        }
    }, [isLoadingBackToHome]);

    const handleLogout = () => {
        setOpenDrawer(false);
        dispatch({ type: LOGOUT });
    };
    const handleLogin = () => {
        history.push("/login", location.pathname); // truyền kèm location.pathname để đăng nhập xong quay lại
    };
    const handleRegister = () => {
        history.push("/signUp", location.pathname);
    };
    const handleClickLogo = () => {
        if (location.pathname === "/") {
            dispatch(getMovieList());
            dispatch(getTheaters());
            return;
        }
        dispatch({ type: LOADING_BACKTO_HOME });
        setTimeout(() => {
            history.push("/", "");
        }, 50);
    };
    const handleClickLink = (item) => {
        setOpenDrawer(false);
        if (item.type === "route") {
            history.push(item.path);
            return;
        }
        // type === "scroll"
        if (location.pathname === "/") {
            scroller.scrollTo(item.id, {
                duration: 800,
                smooth: "easeInOutQuart",
            });
        } else {
            dispatch({ type: LOADING_BACKTO_HOME });
            setTimeout(() => {
                history.push("/", item.id);
            }, 50);
        }
    };

    const handleUser = () => {
        history.push("/taikhoan");
        setOpenDrawer(false);
    };

    const handleDrawerOpen = () => {
        setOpenDrawer(true);
    };
    const handleDrawerClose = () => {
        setOpenDrawer(false);
    };

    return (
        <div className="header">
            {/* Mobile Menu Icon */}
            {!isDesktop && (
                <div className="mobile-menu-icon">
                    <IconButton color="inherit" onClick={handleDrawerOpen}>
                        <MenuIcon fontSize="large" />
                    </IconButton>
                </div>
            )}

            <div className="logo-container" onClick={handleClickLogo} style={{ cursor: "pointer", display: 'flex', alignItems: 'center' }}>
                <img src="https://t3.ftcdn.net/jpg/04/66/39/50/360_F_466395040_mj2YjwJe0qLlRXQk51kg0q8Jw9AwJp5r.jpg" alt="logo" style={{ height: 50 }} />
            </div>

            {/* Desktop Menu */}
            {isDesktop ? (
                <div className="row desktop-menu">
                    <div
                        className="menu-item"
                        style={{ display: 'flex', alignItems: 'center' }}
                    >
                        {headMenu.map((link) => (
                            <span
                                key={link.nameLink}
                                className=""
                                onClick={() => handleClickLink(link)}
                            >
                                {link.nameLink}
                            </span>
                        ))}
                    </div>
                    <div className="">
                        {currentUser ? (
                            <ul className="flexAl">
                                <li onClick={handleUser} className="btn-up">
                                    <i className="fa fa-user"></i> Tài khoản
                                </li>
                                <li className="btn-up" onClick={handleLogout}>Đăng xuất</li>
                            </ul>
                        ) : (
                            <>
                                <ul className="flexAl">
                                    <li className="btn-up" onClick={handleLogin}>Đăng Nhập</li>
                                    <li className="btn-up" onClick={handleRegister}>Đăng Ký</li>
                                </ul>
                            </>
                        )}
                    </div>
                </div>
            ) : (
                <div style={{ width: 48 }}></div> /* placeholder to center the logo */
            )}

            {/* Mobile Drawer (Left) */}
            <Drawer
                anchor="left"
                open={openDrawer}
                onClose={handleDrawerClose}
                classes={{ paper: 'mobile-drawer-paper' }}
            >
                <div className="drawer-header">
                    {currentUser ? (
                        <ListItem button onClick={handleUser}>
                            <ListItemIcon>
                                <Avatar alt="avatar" src={`https://ui-avatars.com/api/?name=${currentUser?.hoTen}`} />
                            </ListItemIcon>
                            <ListItemText primary={currentUser?.hoTen} />
                        </ListItem>
                    ) : (
                        <ListItem button onClick={handleLogin}>
                            <ListItemIcon>
                                <AccountCircleIcon fontSize="large" />
                            </ListItemIcon>
                            <ListItemText primary="Đăng Nhập" />
                        </ListItem>
                    )}
                    <IconButton onClick={handleDrawerClose} color="inherit">
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                
                <List className="drawer-list">
                    {headMenu.map((link) => (
                        <ListItem button key={link.nameLink} onClick={() => handleClickLink(link)}>
                            <ListItemText primary={link.nameLink} />
                        </ListItem>
                    ))}
                    {currentUser ? (
                        <ListItem button onClick={handleLogout}>
                            <ListItemText primary="Đăng Xuất" />
                        </ListItem>
                    ) : (
                        <ListItem button onClick={handleRegister}>
                            <ListItemText primary="Đăng Ký" />
                        </ListItem>
                    )}
                </List>
            </Drawer>
        </div>
    );
}