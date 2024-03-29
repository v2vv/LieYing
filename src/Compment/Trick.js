import axios from "axios";

export default function Trick({ TrickSucess, TimeZone }) {
  const webkey = localStorage.getItem("webkey");

  console.log(`start time :${TimeZone.Startime} end time: ${TimeZone.EndTime}`);

  // 定义GET请求的参数
  const params = {
    key: webkey,
    sid: "1023621",
    tid: "865589838",
    starttime: TimeZone.Startime,
    endtime: TimeZone.EndTime,
    // trid: 260,
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
