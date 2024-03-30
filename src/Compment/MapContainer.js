import React, { useEffect } from "react";
import styles from "./MapContainer.css";
import AMapLoader from "@amap/amap-jsapi-loader";
import Trick from "./Trick";
import { useContext } from "react";
import { TimeZoneContext } from "./Context";
import dayjs from "dayjs";

export default function MapContainer() {
  const { TimeZone } = useContext(TimeZoneContext);
  useEffect(() => {
    const jsAPIkey = localStorage.getItem("jsAPIkey");
    let map = null;
    const TrickPoint = {};
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
        map = new AMap.Map("container", {
          // 设置地图容器id
          viewMode: "3D", // 是否为3D地图模式
          zoom: 15,
          zooms: [2, 22],
          center: [115.864949, 27.704341], //初始化地图中心点位置
        });

        function TrickSucess(data) {
          const labelsLayer = new AMap.LabelsLayer({
            zooms: [0, 20],
            zIndex: 1000,
            collision: false, //该层内标注是否避让
            allowCollision: true, //不同标注层之间是否避让
          });

          const TrickPoints = data.data?.tracks[0].points;
          console.log(data.data);
          console.log(TrickPoint);

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
            }).on("click", () => {
              // e.setText(`${FormartTime(TrickPointsTime[item])}`);

              // console.log(e);

              //信息窗体的内容
              var content = [
                `时间: ${dayjs(TrickPoints[item].locatetime).format(
                  "HH:mm:ss MM/DD/YY"
                )}`,
                `速度:${TrickPoints[item].speed} km/h`,
                `方向: ${TrickPoints[item].direction}° ( 0° 为正北方向 )`,
                `手机运行状态: ${
                  TrickPoints[item].props?.LockStatus === undefined
                    ? "未知"
                    : TrickPoints[item].props?.LockStatus == "Lock"
                    ? "解锁"
                    : "锁定"
                }`,
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

            //创建 Polyline 实例
            var polyline = new AMap.Polyline({
              path: path,
              strokeWeight: 2, //线条宽度
              strokeColor: "red", //线条颜色
              lineJoin: "round", //折线拐点连接处样式
            });

            map.add(polyline);
            labelsLayer.add(labelMarkerGroup);
            console.log(labelMarkerGroup);
            map.add(labelsLayer);
            return 0;
          });
        }
        console.log(TimeZone);
        Trick({ TrickSucess, TimeZone });

        const marker = new AMap.Marker({
          position: new AMap.LngLat(115.864949, 27.704341),
          title: "大同村",
        });
        map.add(marker);

        // Trick(TrickSucess,TimeZone)

        // requsttemp.current.

        // <Trick TrickSucess={TrickSucess} />;

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
  }, [TimeZone]);

  return (
    <div
      id="container"
      className={styles.container}
      style={{ height: "400px" }}
    ></div>
  );
}
