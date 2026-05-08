import React, { useEffect, useState, useRef } from 'react';
import { BarChart } from '@mui/x-charts';
import Typography from '@material-ui/core/Typography';
import usersApi from '../../api/usersApi';

export default function MoviesManagement() {
  const [phim, setPhim] = useState([]);
  const [revenue, setRevenue] = useState([]);
  const containerRef = useRef(null);
  const [chartWidth, setChartWidth] = useState(800);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setChartWidth(containerRef.current.offsetWidth - 48);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  useEffect(() => {
    usersApi.getMonth()
      .then(response => {
        console.log(response.data);
        setRevenue(response.data);
      })
      .catch(error => {
        console.error('Error fetching revenue:', error);
      });
  }, []);

  useEffect(() => {
    usersApi.getPhim()
      .then(response => {
        console.log(response.data);
        setPhim(response.data);
      })
      .catch(error => {
        console.error('Error fetching phim:', error);
      });
  }, []);

  return (
    <div ref={containerRef} style={{ width: '100%', paddingBottom: '32px' }}>
      <Typography variant="h5" style={{ marginBottom: 16, fontWeight: 600, color: '#172b4d' }}>
        Thống kê theo từng tháng
      </Typography>
      {revenue.length > 0 ? (
        <BarChart
          xAxis={[
            {
              id: 'barCategories',
              data: revenue.map(item => 'Tháng ' + item.thang ),
              scaleType: 'band',
            },
          ]}
          series={[
            {
              data: revenue.map(item => item.doanhSo),
            },
          ]}
          width={chartWidth}
          height={320}
          margin={{ top: 20, right: 30, bottom: 50, left: 100 }}
        />
      ) : (
        <p>Loading...</p>
      )}
      <Typography variant="h5" style={{ marginBottom: 16, fontWeight: 600, color: '#172b4d' }}>
        Thống kê phim xem nhiều nhất
      </Typography>
      {phim.length > 0 ? (
        <BarChart
          xAxis={[
            {
              id: 'barCategories',
              data: phim.map(item => item.tenPhim),
              scaleType: 'band',
            },
          ]}
          series={[
            {
              data: phim.map(item => item.soLuong),
            },
          ]}
          width={chartWidth}
          height={320}
          margin={{ top: 20, right: 30, bottom: 50, left: 100 }}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}