import Script from "next/script";

const Map = () => {
  return (
    <>
      <Script
        src={`http://map.vworld.kr/js/vworldMapInit.js.do?version=2.0&apiKey=${process.env.NEXT_PUBLIC_ENV_MAP_KEY}`}
        strategy="afterInteractive"
      />
      <Script id="nextjs-map" strategy="afterInteractive">
        {`
          vw?.ol3?.MapOptions = {
            basemapType: vw.ol3.BasemapType.GRAPHIC,
            controlDensity: vw.ol3.DensityType.EMPTY,
            interactionDensity: vw.ol3.DensityType.BASIC,
            controlsAutoArrange: true,
            homePosition: vw.ol3.CameraPosition,
            initPosition: vw.ol3.CameraPosition,
          };

          const vmap = new vw.ol3.Map("vmap", vw.ol3.MapOptions);

          function move(x, y, z) {
            var _center = [x, y];
            var z = z;
            var pan = ol.animation.pan({
              duration: 2000,
              source: vmap.getView().getCenter(),
            });
            vmap.beforeRender(pan);
            vmap.getView().setCenter(_center);
            setTimeout("fnMoveZoom()", 3000);
          }

          function fnMoveZoom() {
            const zoom = vmap.getView().getZoom();
            if (16 > zoom) {
              vmap.getView().setZoom(14);
            }
          }
        `}
      </Script>
    </>
  );
};

export default Map;
//  <div id="vmap" style="width:100%;height:350px;left:0px;top:0px"></div>
//  <div id="buttons">
//   <button type="button" onclick="javascript:move(14129709.590359,4512313.7639686,15);" >여의도</button>
//   <button type="button" onclick="javascript:move(14679304.585522275, 4472545.1240446,14);" >독도</button>
