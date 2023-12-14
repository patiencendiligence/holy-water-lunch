import { MouseEventHandler } from "react";

interface IToast {
  type?: string; // success, danger, warning
  message?: string;
  subMessage?: string;
  isShow: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
const Toast = (data: IToast) => {
  return (
    <>
      {!!data.isShow && (
        <div
          id={`toast-${data.type}`}
          className="flex absolute items-center w-full p-4 mb-4 text-gray-400 bg-gray-800 rounded-lg shadow z-11"
          role="alert"
          style={{
            top: "50%",
            left: "2%",
            width: "96%",
            marginTop: "-200px",
          }}
        >
          {data.type === "success" && (
            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
              <img src="@/assets/ico-check.svg" alt="Check icon" />
            </div>
          )}
          {data.type === "danger" && (
            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
              <img src="@/assets/ico-danger.svg" alt="Error icon" />
            </div>
          )}
          {data.type === "warning" && (
            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200">
              <img src="@/assets/ico-warning.svg" alt="Warning icon" />
            </div>
          )}
          <div className="ml-3 text-sm font-normal">
            {data.message}
            <br />
            {data.subMessage && data.subMessage}
          </div>
          <button
            type="button"
            className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            data-dismiss-target="#toast-success"
            aria-label="Close"
            onClick={data.onClick}
          >
            <img src="@/assets/ico-close.svg" alt="Close icon" />
          </button>
        </div>
      )}
    </>
  );
};
export default Toast;
