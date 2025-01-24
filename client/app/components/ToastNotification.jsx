"use client";

import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { Flip, Zoom, Bounce } from "react-toastify";

export default function ToastNotification({ type = "info", message, onClose, timeout = 3000 }) {
  useEffect(() => {
    if (message && message.length > 0) {
      const styles = {
        position: "bottom-right",
        autoClose: type === "error" ? false : timeout,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: getTransition(type),
      };

      // Show the toast based on the type
      showToast(type, message, styles);

      // // Close manually if `onClose` is provided
      // if (onClose) {
      //   const timer = setTimeout(onClose, timeout || 3000);
      //   return () => clearTimeout(timer); // Cleanup on unmount
      // }
    }
  }, [message, timeout, onClose, type]);

  return null; // Toast notifications do not need a visible component
}

// Utility function to get the transition style based on the type
function getTransition(type) {
  switch (type) {
    case "warning":
      return Zoom;
    case "error":
      return Bounce;
    default: // info, success
      return Flip;
  }
}

// Utility function to display the toast
function showToast(type, message, styles) {
  switch (type) {
    case "success":
      toast.success(message, styles);
      break;
    case "warning":
      toast.warn(message, styles);
      break;
    case "error":
      toast.error(message, styles);
      break;
    default:
      toast.info(message, styles);
      break;
  }
}


// "use client";

// import React, { useEffect } from 'react';
// import { toast } from 'react-toastify';

// export default function ToastNotification({ type, message, onClose, timeout = false }) {

//   useEffect(() => {
//     if (message && message.length > 0) {
//       const timer = setTimeout(() => {
//         onClose();
//       }, timeout);

//       return () => clearTimeout(timer); // Cleanup on unmount or prop change
//     }
//   }, [message, timeout, onClose]);


//   if (!message || message.length === 0) return null;

//   const styles = {
//     position: "bottom-right",
//     autoClose: timeout,
//     hideProgressBar: false,
//     closeOnClick: false,
//     pauseOnHover: true,
//     draggable: true,
//     progress: undefined,
//     theme: "colored",
//     transition: Flip,
//   }

//   if (type === "info") {
//     return toast.success(
//       message, styles
//     );

//   } if (type === "success") {
//     return toast.success(
//       message, styles
//     );

//   } if (type == "warning") {
//     styles.transition = Zoom;
//     return toast.warn(
//       message, styles
//     );
//   }
//   if (type == "error") {
//     styles.autoClose = false;
//     styles.transition = Bounce;
//     return toast.error(
//       message, styles
//     );
//   }

// }


// import PropTypes from 'prop-types';
// ToastNotification.propTypes = {
//     type: PropTypes.oneOf(["success", "warning", "error", "default"]).isRequired, // Restrict `type` to specific values
//     title: PropTypes.string, // Optional title
//     messages: PropTypes.arrayOf(PropTypes.string).isRequired, // Array of strings
//     onClose: PropTypes.func.isRequired, // Callback for closing the toast
//     timeout: PropTypes.number, // Timeout in milliseconds, default set below
// };
