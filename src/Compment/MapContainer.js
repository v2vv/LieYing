import React, { useState, useEffect } from "react";
import styles from "./MapContainer.css";
import AMapLoader from "@amap/amap-jsapi-loader";
import Trick from "./Trick";

export default function MapContainer() {
  let map = null;
  const jsAPIkey = localStorage.getItem("jsAPIkey");

  const [trickDatas, setTrickDatas] = useState(null);
  const TrickTemp = {};
  var path = [];
  console.log("hello");
  // setTrickDatas(TrickTemp);

  useEffect(() => {
    function TrickSucess(data) {
      setTrickDatas(data);
      const TrickPointsTemp = data.data.tracks[0].points;
      Object.keys(TrickPointsTemp).map((item) => {
        TrickTemp[item] = TrickPointsTemp[item].location;
      });

      // Object.keys(TrickTemp).map((item) => {
      //   console.log(TrickTemp[item]);
      //   // path[item] = new AMap.LngLat(TrickTemp[item]);
      // });

      console.log(TrickTemp);

      // TrickTemp = .;
      // console.log(data.data.tracks[0].points);
    }

    Trick(TrickSucess);

    AMapLoader.load({
      key: jsAPIkey, // 申请好的Web端开发者Key，首次调用 load 时必填
      version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: ["AMap.ToolBar", "AMap.Driving"], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      AMapUI: {
        version: "1.1",
        plugins: [],
      },
      Loca: {
        version: "2.0.0",
      },
    })
      .then((AMap) => {
        Object.keys(TrickTemp).map((item) => {
          var parts = TrickTemp[item].split(",");
          path[item] = new AMap.LngLat(
            parseFloat(parts[0]),
            parseFloat(parts[1])
          );
        });

        // console.log(path);

        //创建 Polyline 实例
        var polyline = new AMap.Polyline({
          path: path,
          strokeWeight: 2, //线条宽度
          strokeColor: "red", //线条颜色
          lineJoin: "round", //折线拐点连接处样式
        });

        const marker = new AMap.Marker({
          position: new AMap.LngLat(115.864949, 27.704341),
          title: "北京",
        });

        map = new AMap.Map("container", {
          // 设置地图容器id
          viewMode: "3D", // 是否为3D地图模式
          zoom: 15,
          zooms: [2, 22],
          center: [115.864949, 27.704341], //初始化地图中心点位置
        });
        map.add(marker);
        map.add(polyline);
      })
      .catch((e) => {
        console.log(e);
      });

    return () => {
      map?.destroy();
    };
  }, []);

  return (
    <div
      id="container"
      className={styles.container}
      style={{ height: "800px" }}
    ></div>
  );
}
