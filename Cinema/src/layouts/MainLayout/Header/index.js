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
            <div className="" onClick={handleClickLogo}>
                <img src="https://t3.ftcdn.net/jpg/04/66/39/50/360_F_466395040_mj2YjwJe0qLlRXQk51kg0q8Jw9AwJp5r.jpg" alt="logo" style={{ height: 50 }} />
            </div>
            <div className="row">
                <div
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                    className="menu-item"
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
                                <i className="fa fa-user"></i>Tài khoản
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
            {/* user account */}


            {/* menuIcon  */}
            {/* <div className="">
        <button
          color="inherit"
          edge="end"
          onClick={handleDrawerOpen}
    
        >
          <MenuIcon />
        </button>
      </div> */}

            {/* content open menu*/}
            {/* <Drawer
        className=""
        anchor="right"
        onClose={handleDrawerClose}
        open={openDrawer}

        transitionDuration={300}
      > */}
            {/* <div className="">
          {currentUser ?
            <ListItem button classes={{ root: clsx(classes.itemAuth, classes.divide, classes.hover) }} onClick={handleUser}>
              <ListItemIcon classes={{ root: classes.icon }}>
                <Avatar alt="avatar" className={classes.avatar} src={FAKE_AVATAR} />
              </ListItemIcon>
              <ListItemText className={classes.username} primary={currentUser?.hoTen} />
            </ListItem>
            :
            <ListItem button classes={{ root: classes.listItem }} onClick={handleLogin}>
              <ListItemIcon classes={{ root: classes.icon }}>
                <AccountCircleIcon fontSize="large" />
              </ListItemIcon>
              <span className={classes.link} style={{ fontWeight: 500 }}>Đăng Nhập</span>
            </ListItem>
          }
          <IconButton classes={{ root: classes.listItem }} onClick={handleDrawerClose}>
            <ChevronRightIcon />
          </IconButton>
        </div>
        <List>
          {headMenu.map((link) => (
            <span key={link.id} className={classes.itemMenu} onClick={() => handleClickLink(link.id)} >{link.nameLink}</span>
          ))}

          {currentUser ?
            <span className={classes.itemMenu} onClick={handleLogout}>Đăng Xuất</span>
            :
            <span className={classes.itemMenu} onClick={handleRegister}>Đăng Ký</span>
          }
        </List>
      </Drawer> */}
        </div>
    );
}