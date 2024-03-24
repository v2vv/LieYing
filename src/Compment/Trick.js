import axios from "axios";

export default function Trick(TrickSucess) {
  const webkey = localStorage.getItem("webkey");
  // 定义GET请求的参数
  const params = {
    key: webkey,
    sid: "1023621",
    tid: "864266019",
    trid: "60",
  };

  // 使用Axios发送GET请求
  axios
    .get("https://tsapi.amap.com/v1/track/terminal/trsearch", { params })
    .then((response) => {
      console.log("请求成功");
      TrickSucess(response.data);
      //   console.log(response.data);
      return;
      // setData(response.data); // 更新状态以保存获取的数据
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}
