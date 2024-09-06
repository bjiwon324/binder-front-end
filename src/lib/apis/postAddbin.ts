import { PostAddbinValues } from "@/components/domains/addBin/addBinForm";
import { instance } from "./axios";

const postAddbin = async (data: PostAddbinValues) => {
  try {
    const res = await instance.post("/bins", data, {
      headers: { "Content-Type": "application/json" },
    });
    console.log(res);
    return res;
  } catch (error) {
    console.error("Error posting bin data:", error);
    throw error;
  }
};

export default postAddbin;
