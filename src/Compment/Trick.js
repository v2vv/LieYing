import axios from "axios";

export default function Trick(TrickSucess) {
  const webkey = localStorage.getItem("webkey");

  var now = new Date();
  console.log(now.getTime());

  // 定义GET请求的参数
  const params = {
    key: webkey,
    sid: "1023621",
    tid: "865589838",
    // starttime: `${now.getTime() - 86400000}`,
    // endtime: `${now.getTime()}`,
    trid: 260,
  };

  // 使用Axios发送GET请求
  axios
    .get("https://tsapi.amap.com/v1/track/terminal/trsearch", { params })
    .then((response) => {
      console.log("请求成功");
      console.log(response.data);
      TrickSucess(response.data);

      return;
      // setData(response.data); // 更新状态以保存获取的数据
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}
