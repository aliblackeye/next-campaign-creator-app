"use client"

// Libs
import { ToastContainer } from "react-toastify"

// Styles
import 'react-toastify/dist/ReactToastify.css';


// Libs
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ToastContainer position="bottom-center" />
    </>
  )
}
