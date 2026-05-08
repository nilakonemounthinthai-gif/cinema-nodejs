
import React, { useState } from 'react';

import { SnackbarProvider } from 'notistack';
import Hidden from '@material-ui/core/Hidden';
import { useSelector } from "react-redux";

import NavBar from './NavBar';
import TopBar from './TopBar';

export default function AdminLayout(props) {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.authReducer);
  if (currentUser?.maLoaiNguoiDung !== "QuanTri") { 
    return <>{props.children}</>
  }
  return (
    <SnackbarProvider maxSnack={3}>
      <TopBar onMobileNavOpen={() => setMobileNavOpen(true)} />
      <div style={{ display: 'flex', height: 'calc(100vh - 64px)' }}>
        <Hidden mdDown>
          <div style={{ width: 256, flexShrink: 0 }} />
        </Hidden>
        <NavBar
          onMobileClose={() => setMobileNavOpen(false)}
          openMobile={isMobileNavOpen}
        />
        <main className='content-admin' style={{ flex: 1, minWidth: 0, overflow: 'auto' }}>
          {props.children}
        </main>
      </div>
    </SnackbarProvider>
  )
}

