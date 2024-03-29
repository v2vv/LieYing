import React, { useEffect } from "react";
import styles from "./MapContainer.css";
import AMapLoader from "@amap/amap-jsapi-loader";
import Trick from "./Trick";
import { useContext } from "react";
import { TimeZoneContext } from "./Context";

export default function MapContainer() {
  const { TimeZone } = useContext(TimeZoneContext);
  useEffect(() => {
    const jsAPIkey = localStorage.getItem("jsAPIkey");
    let map = null;
    const TrickPoint = {};
    const TrickPointsTime = {};
    const TrickPointsSpeeds = {};
    const TrickPointsDirection = {};
    var path = [];
    var labelMarkerGroup = [];
    //设置一个图标对象
    const icon = {
      type: "image", //图标类型，现阶段只支持 image 类型
      image:
        "https://a.amap.com/jsapi_demos/static/demo-center/marker/express2.png", //可访问的图片 URL
      size: [64, 30], //图片尺寸
      anchor: "center", //图片相对 position 的锚点，默认为 bottom-center
    };
    console.log("hello");

    function FormartTime(unixTime) {
      // 创建一个新的 Date 对象，传入 Unix 时间戳乘以 1000，以毫秒为单位
      let date = new Date(unixTime);

      // 使用 Date 对象的方法获取标准时间的各个部分
      let year = date.getFullYear();
      let month = date.getMonth() + 1; // 月份从 0 开始，所以需要加 1
      let day = date.getDate();
      let hours = date.getHours();
      let minutes = date.getMinutes();
      if (minutes < 10) minutes = `0${minutes}`;
      let seconds = date.getSeconds();

      // 格式化时间为字符串
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    function TrickSucess(data) {
      const TrickPoints = data.data.tracks[0].points;
      console.log(data.data);

      console.log(TrickPoint);
      console.log(TrickPointsTime);

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
          const labelsLayer = new AMap.LabelsLayer({
            zooms: [0, 20],
            zIndex: 1000,
            collision: false, //该层内标注是否避让
            allowCollision: true, //不同标注层之间是否避让
          });

          Object.keys(TrickPoints).map((item) => {
            var parts = TrickPoints[item].location.split(",");
            path[item] = new AMap.LngLat(
              parseFloat(parts[0]),
              parseFloat(parts[1])
            );

            labelMarkerGroup[item] = new AMap.LabelMarker({
              name: `${item}`, //此属性非绘制文字内容，仅为标识使用
              position: [parseFloat(parts[0]), parseFloat(parts[1])],
              zIndex: 16,
              rank: 1, //避让优先级
              icon: icon, //标注图标，将 icon 对象传给 icon 属性
            }).on("click", (e) => {
              // e.setText(`${FormartTime(TrickPointsTime[item])}`);

              // console.log(e);

              //信息窗体的内容
              var content = [
                `时间: ${FormartTime(TrickPoints[item].locatetime)}`,
                `速度:${TrickPoints[item].speed} km/h`,
                `方向: ${TrickPoints[item].direction}° ( 0° 为正北方向 )`,
              ];

              //创建 infoWindow 实例
              var infoWindow = new AMap.InfoWindow({
                content: content.join("<br>"), //传入字符串拼接的 DOM 元素
                anchor: "top-left",
              });

              //打开信息窗体
              infoWindow.open(map, [
                parseFloat(parts[0]),
                parseFloat(parts[1]),
              ]); //map 为当前地图的实例，map.getCenter() 用于获取地图中心点坐标。
            });

            return 0;
          });

          labelsLayer.add(labelMarkerGroup);
          console.log(labelMarkerGroup);

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
          map.add(labelsLayer);
          // map.add(labelMarker);
        })
        .catch((e) => {
          console.log(e);
        });

      return () => {
        map?.destroy();
      };

      // TrickTemp = .;
      // console.log(data.data.tracks[0].points);
    }

    Trick({ TrickSucess, TimeZone });
  }, [TimeZone]);

  return (
    <div
      id="container"
      className={styles.container}
      style={{ height: "400px" }}
    ></div>
  );
}
