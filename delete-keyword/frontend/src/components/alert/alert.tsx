import * as React from "react";

import { toast } from "react-toastify";
function notifyError(message: String) {
  toast.error(message);
  setTimeout(() => {
    window.location.href = "/";
  }, 7100);
}
function notifySuccess(message: String) {
  toast.success(message);
  setTimeout(() => {
    window.location.href = "/";
  }, 7100);
}
let alert = {
  notifyError: notifyError,
  notifySuccess: notifySuccess
};
export default alert;
