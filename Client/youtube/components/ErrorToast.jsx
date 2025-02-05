import { toast } from "react-toastify";

export function ErrorToast(msg, sec) {
  return (
    toast.error(msg, {
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