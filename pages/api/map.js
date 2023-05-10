import Script from "next/script";

const Map = () => {
  return (
    <>
      <Script
        src={`http://map.vworld.kr/js/vworldMapInit.js.do?version=2.0&apiKey=${process.env.NEXT_PUBLIC_ENV_MAP_KEY}`}
        strategy="afterInteractive"
      />
    </>
  );
};

export default Map;
//  <div id="vmap" style="width:100%;height:350px;left:0px;top:0px"></div>
//  <div id="buttons">
//   <button type="button" onclick="javascript:move(14129709.590359,4512313.7639686,15);" >여의도</button>
//   <button type="button" onclick="javascript:move(14679304.585522275, 4472545.1240446,14);" >독도</button>
