import axios from "axios";
import FormData from "form-data";

export default function redirectRequest(redirectUrl) {
  return async (req, res, next) => {
    let updatedRedirectUrl = redirectUrl;
    if (req.params !== {}) {
      Object.entries(req.params).forEach(([key, value]) => {
        updatedRedirectUrl = updatedRedirectUrl.concat(`/${value}`);
      });
    }

    const formData = new FormData();
    console.log({
      headers: req.headers,
      body: req.body,
      file: req.file,
    });
    if (req.headers["content-type"]?.split(";")[0] === "multipart/form-data") {
      Object.entries(req.body)?.forEach(([key, value]) => {
        console.log({ key: key, value: value });
        if (Array.isArray(value)) {
          value?.forEach((val) => {
            formData?.append(key + "[]", val);
          });
        } else {
          formData?.append(key, value);
        }
      });
      if (req.file) {
        formData.append("file", req.file.buffer, {
          filename: req.file.originalname,
        });
      }
    }

    try {
      const axiosResult = await axios({
        method: req.method,
        url: updatedRedirectUrl,
        data:
          req.headers["content-type"]?.split(";")[0] === "multipart/form-data"
            ? formData
            : req.body,
        params: req.query,
        headers: {
          userToken: req.headers["user-token"],
          "Content-Type": req.headers["content-type"],
        },
      });

      res.status(axiosResult?.status).json(axiosResult?.data);
    } catch (err) {
      console.log(err);
      res.status(err?.response?.status ?? 500).json(err?.response?.data ?? {});
    }
  };
}
