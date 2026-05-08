import React, { useEffect, useState } from 'react';
import * as yup from "yup";
import { ErrorMessage, Field, Form, Formik } from 'formik'
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import DateFnsUtils from "@date-io/date-fns";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from "@material-ui/pickers";
import { ThemeProvider } from "@material-ui/styles";
import FormControl from '@material-ui/core/FormControl';
import { materialTheme } from './styles';
import { useStyles } from './styles';
import theatersApi from '../../api/theatersApi';

export default function FormInput({ selectedPhim, onUpdate, onAddMovie }) {
    const classes = useStyles();
    const [srcImage, setSrcImage] = useState(selectedPhim?.hinhAnh)
    const [imageFile, setImageFile] = useState(null)
    const [listTheater, setListTheater] = useState([]);
    const [roomData, setRoomData] = useState({
        maTheLoai: null,
      });
    useEffect(() => {
        theatersApi.getThongTinCuaTheLoaiPhim().then(response => {
            setListTheater(response.data)
        })
    }, [])
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setRoomData(prevState => ({
          ...prevState,
          [name]: value
        }));
      };


    const movieSchema = yup.object().shape({
        tenPhim: yup.string().required("*Không được bỏ trống!"),
        daoDien: yup.string().required("*Không được bỏ trống!"),
        dienVien: yup.string().required("*Không được bỏ trống!"),
        dinhDang: yup.string().required("*Không được bỏ trống!"),
        quocGiaSX: yup.string().required("*Không được bỏ trống!"),
        trailer: yup.string().required("*Không được bỏ trống!").matches(/^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/, "*Sai link youtube"),
        hinhAnh: yup.mixed().required("*Chưa chọn hình!"),
        moTa: yup.string().required("*Không được bỏ trống!"),
        ngayKhoiChieu: yup.string().required("*Chưa chọn ngày!"),
        danhGia: yup.number().required("*Không được bỏ trống!").min(0, "*Điểm đánh giá phải từ 0 đến 10").integer("*Điểm đánh giá phải từ 0 đến 10").max(10, "*Điểm đánh giá phải từ 0 đến 10"),
    })

    const buildFormData = (fields, file) => {
        const fd = new FormData();
        Object.entries(fields).forEach(([k, v]) => {
            if (v !== undefined && v !== null) fd.append(k, v);
        });
        if (file) fd.append('hinhAnh', file);
        return fd;
    };

    const handleSubmit = (movieObj) => {
        const origHinhAnh = movieObj.hinhAnh; // File object or string (existing URL)
        const fakeImage = { srcImage, maPhim: movieObj.maPhim };
        const ngayKC = addHours(movieObj.ngayKhoiChieu, 7);

        if (selectedPhim.maPhim) {
            // EDIT MODE
            if (imageFile) {
                // New image selected — send as FormData
                const fd = buildFormData({
                    maPhim: movieObj.maPhim,
                    tenPhim: movieObj.tenPhim,
                    biDanh: movieObj.biDanh,
                    trailer: movieObj.trailer,
                    moTa: movieObj.moTa,
                    maNhom: 'GP09',
                    ngayKhoiChieu: ngayKC.toISOString(),
                    danhGia: movieObj.danhGia ?? 0,
                    quocGiaSX: movieObj.quocGiaSX,
                    daoDien: movieObj.daoDien,
                    dienVien: movieObj.dienVien,
                    maTheLoaiPhim: roomData.maTheLoai || movieObj.maTheLoaiPhim,
                    dinhDang: movieObj.dinhDang,
                }, imageFile);
                onUpdate(fd, null, fakeImage); // null → goes to updateMovieUpload path
            } else {
                // No new image — plain object, keep existing hinhAnh
                movieObj.maTheLoaiPhim = roomData.maTheLoai || movieObj.maTheLoaiPhim;
                movieObj.ngayKhoiChieu = ngayKC;
                onUpdate(movieObj, typeof origHinhAnh === 'string' ? origHinhAnh : '', fakeImage);
            }
            return;
        }

        // ADD MODE — always FormData
        const biDanh = movieObj.tenPhim
            .toLowerCase()
            .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            .replace(/\u0111/g, 'd').replace(/\u0110/g, 'd')
            .replace(/[^a-z0-9\s-]/g, '')
            .trim().replace(/\s+/g, '-');

        const fd = buildFormData({
            tenPhim: movieObj.tenPhim,
            biDanh,
            trailer: movieObj.trailer,
            moTa: movieObj.moTa,
            maNhom: 'GP09',
            ngayKhoiChieu: ngayKC.toISOString(),
            danhGia: movieObj.danhGia ?? 0,
            quocGiaSX: movieObj.quocGiaSX,
            daoDien: movieObj.daoDien,
            dienVien: movieObj.dienVien,
            maTheLoaiPhim: roomData.maTheLoai,
            dinhDang: movieObj.dinhDang,
        }, imageFile);
        onAddMovie(fd);
    };

    function addHours(date, hours) {
        date.setTime(date.getTime() + hours * 60 * 60 * 1000);
        return date;
    }



    return (
        <Formik
            initialValues={{
                maPhim: selectedPhim.maPhim,
                tenPhim: selectedPhim.tenPhim,
                biDanh: selectedPhim.biDanh,
                trailer: selectedPhim.trailer,
                hinhAnh: selectedPhim.hinhAnh,
                daoDien: selectedPhim.daoDien,
                dienVien: selectedPhim.dienVien,
                dinhDang: selectedPhim.dinhDang,
                quocGiaSX: selectedPhim.nhaSanXuat,
                moTa: selectedPhim.moTa,
                maNhom: 'GP09',
                ngayKhoiChieu: selectedPhim?.ngayKhoiChieu ? new Date(selectedPhim.ngayKhoiChieu) : (() => { const d = new Date(); d.setHours(0,0,0,0); return d; })(),
                danhGia: selectedPhim.danhGia ?? 0,
            }}
            validationSchema={movieSchema}
            onSubmit={handleSubmit}
        >{(formikProp) => (
            <Form >
                <div className="form-group">
                    <label>Tên phim&nbsp;</label>
                    <ErrorMessage name="tenPhim" render={msg => <span className="text-danger">{msg}</span>} />
                    <Field name="tenPhim" className="form-control" />
                </div>
                <div className="form-group">
                    <label>Trailer&nbsp;</label>
                    <ErrorMessage name="trailer" render={msg => <span className="text-danger">{msg}</span>} />
                    <Field name="trailer" className="form-control" />
                </div>
                <div className="form-group">
                    <label>Hình ảnh&nbsp;</label>
                    <ErrorMessage name="hinhAnh" render={msg => <span className="text-danger">{msg}</span>} />
                    <div className="form-row">
                        <div className="col-2">
                            {srcImage ? <img src={srcImage} id="image-selected" alt="movie" className="img-fluid rounded" /> : <ImageOutlinedIcon style={{ fontSize: 60 }} />}
                        </div>
                        <div className="col-10">
                            <input type="file" name="hinhAnh" accept=".jpg,.jpeg,.png,.webp" className="form-control" onChange={(e) => {
                                const file = e.currentTarget.files[0];
                                if (file) {
                                    formikProp.setFieldValue('hinhAnh', file);
                                    setImageFile(file);
                                    setSrcImage(URL.createObjectURL(file));
                                }
                            }} />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label>Đạo diễn&nbsp;</label>
                    <ErrorMessage name="daoDien" render={msg => <span className="text-danger">{msg}</span>} />
                    <Field as="textarea" name="daoDien" className="form-control" />
                </div>
                <div className="form-group">
                    <label>Diễn viên&nbsp;</label>
                    <ErrorMessage name="dienVien" render={msg => <span className="text-danger">{msg}</span>} />
                    <Field as="textarea" name="dienVien" className="form-control" />
                </div>
                <div className="form-group">
                    <label>Dinh dạng&nbsp;</label>
                    <ErrorMessage name="dinhDang" render={msg => <span className="text-danger">{msg}</span>} />
                    <Field as="textarea" name="dinhDang" className="form-control" />
                </div>
                <div className="form-group">
                    <label>Quốc Gia SX&nbsp;</label>
                    <ErrorMessage name="quocGiaSX" render={msg => <span className="text-danger">{msg}</span>} />
                    <Field as="textarea" name="quocGiaSX" className="form-control" />
                </div>
                <div className="form-group">
                    <label>Mô tả&nbsp;</label>
                    <ErrorMessage name="moTa" render={msg => <span className="text-danger">{msg}</span>} />
                    <Field as="textarea" name="moTa" className="form-control" />
                </div>
                <div className="form-group">
                    <label>Thể Loại Phim&nbsp;</label>
                    <select
                        className="form-control"
                        name="maTheLoai"
                        aria-label="Default select example"
                        value={roomData.maTheLoai}
                        onChange={handleInputChange}
                    >
                        <option>--Chọn Thể Loại Phim--</option>
                        {listTheater.map(system => (
                            <option key={system.id} value={system.id}>{system.tenTheLoai}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Ngày khởi chiếu&nbsp;</label>
                    <ErrorMessage name="ngayKhoiChieu" render={msg => <span className="text-danger">{msg}</span>} />
                    <FormControl className={classes.formControl} focused={false}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <ThemeProvider theme={materialTheme}>
                                <KeyboardDatePicker
                                    value={formikProp.values.ngayKhoiChieu}
                                    onChange={date => formikProp.setFieldValue('ngayKhoiChieu', date)}
                                    format="yyyy-MM-dd"
                                />
                            </ThemeProvider>
                        </MuiPickersUtilsProvider>
                    </FormControl>
                </div>
                <div className="form-group" hidden={selectedPhim.maPhim ? false : true}>
                    <label>Đánh giá&nbsp;</label>
                    <ErrorMessage name="danhGia" render={msg => <span className="text-danger">{msg}</span>} />
                    <Field name="danhGia" type="number" className="form-control" />
                </div>
                <button type="submit" className="form-control">Submit</button>
            </Form>
        )}</Formik>
    )
}
