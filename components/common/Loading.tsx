import styled from "@emotion/styled";

interface ILoadingProps {
  endWidth?: string;
}
const LoaderStyle = styled.svg<{ endWidth: string | undefined }>`
  animation: duck ${(props) => (props.endWidth ? "10s" : "30s")} linear infinite
    normal forwards;
  @keyframes duck {
    0% {
      transform: translate(-300px, 0);
    }
    100% {
      transform: translate(${(props) => props.endWidth || "100vw"}, 0);
    }
  }
  #duck_head {
    animation: duck_head__to 1000ms linear infinite normal forwards;
  }
  @keyframes duck_head__to {
    0% {
      transform: translate(110.031826px, 51.199867px);
    }
    40% {
      transform: translate(117.174461px, 50.647962px);
    }
    50% {
      transform: translate(111.031826px, 48.199867px);
    }
    100% {
      transform: translate(110.031826px, 48.199867px);
    }
  }
  #duck_body {
    animation: duck_body__to 1000ms linear infinite normal forwards;
  }
  @keyframes duck_body__to {
    0% {
      transform: translate(90.38567px, 75.430407px);
    }
    50% {
      transform: translate(90.38567px, 73.430407px);
    }
    100% {
      transform: translate(90.38567px, 75.430407px);
    }
  }
`;
const Loading = ({ ...props }: ILoadingProps) => {
  return (
    <>
      <LoaderStyle endWidth={props.endWidth}>
        <svg
          id="e4plAnYPWs21"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 200 130"
          shapeRendering="geometricPrecision"
          textRendering="geometricPrecision"
        >
          <defs>
            <radialGradient
              id="duck_head-fill"
              cx="0"
              cy="0"
              r="0.716159"
              spreadMethod="pad"
              gradientUnits="objectBoundingBox"
              gradientTransform="matrix(0.866025 0.5 -0.5 0.866025 0.5 0.5)"
            >
              <stop id="duck_head-fill-0" offset="0%" stopColor="#d2dbed" />
              <stop id="duck_head-fill-1" offset="100%" stopColor="#dcd9d6" />
            </radialGradient>
            <linearGradient
              id="duck_body-fill"
              x1="0.848496"
              y1="-0.317087"
              x2="0.177392"
              y2="0.862913"
              spreadMethod="pad"
              gradientUnits="objectBoundingBox"
              gradientTransform="translate(0 0)"
            >
              <stop id="duck_body-fill-0" offset="0%" stopColor="#c8c8c8" />
              <stop id="duck_body-fill-1" offset="46%" stopColor="#d2dbed" />
            </linearGradient>
          </defs>
          <g id="duck_head" transform="translate(110.031826,51.199867)">
            <g transform="translate(-116.174461,-49.647962)">
              <ellipse
                rx="20.003217"
                ry="18.539566"
                transform="translate(106.027522 50.199868)"
                fill="url(#duck_head-fill)"
                strokeWidth="0"
              />
              <ellipse
                rx="3"
                ry="3"
                transform="matrix(.999852 0.017228-.017228 0.999852 116.226145 50.199868)"
                fill="#030304"
                strokeWidth="0"
              />
              <path
                d="M139.147895,55.670385q3.817352,2.896186,8.111873,2.896186q2.62443.565571,1.431507,3.4995t-9.54338,2.933929q-5.094616-1.295709-5.094616-2.933929c0-1.63822,5.094616-3.292763,5.094616-6.395686Z"
                transform="matrix(.8 0 0 0.8 12.788108 6.648206)"
                fill="#fad606"
                strokeWidth="0.5"
              />
            </g>
          </g>
          <g id="duck_body" transform="translate(90.38567,75.430407)">
            <path
              d="M114.18347,59.93995c14.26163,0,25.82297,9.36141,25.82297,20.90929s-9.896909,20.655685-18.003224,20.655685-12.628035.079174-13.730432,0-5.086234,0-5.447784,0c-13.57427,0-23.29838-9.377245-27.4034-20.655675s3.57134-20.4214,17.14561-20.4214c3.42996,0,6.9083.58376,10.25779,1.63822c3.42776-1.36159,7.28285-2.12611,11.35846-2.12611l.00001-.00001Z"
              transform="translate(-107.161564,-80.849239)"
              fill="url(#duck_body-fill)"
              strokeWidth="0"
            />
          </g>
        </svg>
      </LoaderStyle>
    </>
  );
};

export default Loading;
