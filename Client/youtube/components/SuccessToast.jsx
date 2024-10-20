import { toast } from "react-toastify";

export function Toast(msg, sec) {
  return (
    toast.success(msg, {
      position: 'top-center',
      autoClose: sec,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'light',
    })
  )
}