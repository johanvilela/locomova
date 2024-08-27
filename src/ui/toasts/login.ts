import { toast } from "react-toastify";

export function showFailedLoginToast() {
  toast.error("Não foi possível entrar", {
    toastId: "failedLogin",
    pauseOnHover: false,
  });
}

export function showLogoutToast() {
  toast.info("Saiu", {
    toastId: "logout",
    pauseOnHover: false,
    autoClose: 1500,
    closeButton: false,
  });
}
