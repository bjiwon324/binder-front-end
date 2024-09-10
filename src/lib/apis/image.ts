import { instance } from "./axios";
const test =
  "eyJhbGciOiJIUzUxMiJ9.eyJ1c2VybmFtZSI6ImJqaXdvbjAzMjRAZ21haWwuY29tIiwicm9sZSI6IlJPTEVfVVNFUiIsImlhdCI6MTcyNTk2MTE1MiwiZXhwIjoxNzI2NTY1OTUyfQ.7fisaXDYhP3njeRPisM_PsySYMZdJd29v9X1WK139rGleSjk4v2JKI4gzfTJultzs5Cxp3Uh4_y8o-nPJfn4Hw";

export const postImg = async (data: any) => {
  try {
    const res = await instance.post("/images", data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: test,
      },
    });
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
