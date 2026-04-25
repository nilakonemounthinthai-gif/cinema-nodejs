import { Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ModalTrailer from "./components/ModalTrailer";
import LazyLoad from "./components/LazyLoad";
import Loading from "./components/Loading";
// layout
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
// guards
import AdminRoute from "./guards/AdminRoute";
import CheckoutRoute from "./guards/CheckoutRoute";
import UserProfileRoute from "./guards/UserProfileRoute";
// page
import Homepage from "./pages/Homepage";
import MovieDetail from "./pages/MovieDetail";
import UserProfile from "./pages/UserProfile";
import BookTicket from "./pages/BookTicket";
import UsersManagement from "./pages/UsersManagement";
import MoviesManagement from "./pages/MoviesManagement";
import CreateShowtime from "./pages/CreateShowtime";
import TicketManagemnt from "./pages/TicketManagement";
import CinemaManagement from "./pages/CinemaManagement";
import MovieGerne from "./pages/MovieGerne";
import Dashboard from "./pages/Dashboard";
import TheaterComplex from "./pages/TheaterComplex";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Page404 from "./pages/Page404";
import EditShowTime from "./pages/CreateShowtime/EditShowTime";
import Invoice from "./pages/TicketManagement/invoice";
import CumRap from "./pages/CumRap";
import TinTuc from "./pages/TinTuc";
import UngDung from "./pages/UngDung";
function App() {
    return (
        <BrowserRouter>
            <Loading />
            <ModalTrailer />
            <Suspense fallback={<LazyLoad />}>
                <Switch>
                    <Route exact path={["/", "/detail/:maPhim", "/taikhoan", "/tin-tuc", "/ung-dung"]}>
                        <MainLayout>
                            <Route exact path="/" component={Homepage} />
                            <Route exact path="/detail/:maPhim" component={MovieDetail} />
                            <UserProfileRoute
                                exact
                                path="/taikhoan"
                                component={UserProfile}
                            />
                            <Route exact path="/tin-tuc" component={TinTuc} />
                            <Route exact path="/ung-dung" component={UngDung} />
                        </MainLayout>
                    </Route>

                    {/* CumRap: full-screen page — no MainLayout wrapper */}
                    <Route exact path="/cum-rap" component={CumRap} />

                    <CheckoutRoute
                        exact
                        path="/datve/:maLichChieu"
                        component={BookTicket}
                    />

                    <Route
                        exact
                        path={["/admin/users", "/admin/movies", "/admin/showtimes", "/admin/films/addnew", "/admin/ticket-management", "/admin/dashboard", "/admin/theater-complex", "/admin/cinema-management", "/admin/showtimes/:maLichChieu", "/admin/movie-genre", "/admin/chair-management", "/invoice"]}
                    >
                        <AdminLayout>
                            <AdminRoute
                                exact
                                path="/admin/users"
                                component={UsersManagement}
                            />
                            <AdminRoute
                                exact
                                path="/admin/movies"
                                component={MoviesManagement}
                            />
                            <AdminRoute
                                exact
                                path="/admin/showtimes"
                                component={CreateShowtime}
                            />
                            <AdminRoute
                                exact
                                path="/admin/showtimes/:maLichChieu"
                                component={EditShowTime}
                            />
                            <AdminRoute
                                exact
                                path="/admin/ticket-management"
                                component={TicketManagemnt}
                            />
                            <AdminRoute
                                exact
                                path="/admin/cinema-management"
                                component={CinemaManagement}
                            />
                            <AdminRoute
                                exact
                                path="/admin/dashboard"
                                component={Dashboard}
                            />
                            <AdminRoute
                                exact
                                path="/admin/theater-complex"
                                component={TheaterComplex}
                            />
                            <AdminRoute
                                exact
                                path="/admin/movie-genre"
                                component={MovieGerne}
                            />
                            <AdminRoute
                                exact
                                path="/admin/films/addnew"
                            />
                            <AdminRoute
                                exact
                                path="/invoice"
                                component={Invoice}
                            />
                        </AdminLayout>
                    </Route>

                    <Route exact path={["/login", "/signUp"]}>
                        <MainLayout>
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/signUp" component={Register} />
                        </MainLayout>
                    </Route>

                    <Route component={Page404} />
                </Switch>
            </Suspense>
        </BrowserRouter>
    );
}

export default App;
