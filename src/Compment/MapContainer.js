import React, { useState, useEffect } from "react";
import styles from "./MapContainer.css";
import AMapLoader from "@amap/amap-jsapi-loader";
import Trick from "./Trick";

export default function MapContainer() {
  let map = null;
  const jsAPIkey = localStorage.getItem("jsAPIkey");

  const [trickDatas, setTrickDatas] = useState(null);
  // const TrickTemp = Trick();
  console.log("hello");
  // setTrickDatas(TrickTemp);

  useEffect(() => {
    function TrickSucess(data) {
      setTrickDatas(data);
      console.log(data);
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
