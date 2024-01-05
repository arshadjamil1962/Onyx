import { toast } from 'react-toastify';

export const youTubeApiKey = process.env.REACT_APP_UTUBE_API;
export const youtubeUrl = process.env.REACT_APP_UTUBE_URL;


export const notifyAlert = (alertType, alertMessage, alertDelay = 1000) =>
toast(alertMessage, {
  type: alertType,
  position: "top-center",
  autoClose: alertDelay,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  closeButton: false,
});
