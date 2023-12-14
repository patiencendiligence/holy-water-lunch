const LogoSvg = () => {
  return (
    <svg
      className="loading pl-4"
      viewBox="0 -80 1320 300"
      enableBackground="0 -80 1320 300"
      xmlSpace="preserve"
    >
      <defs>
        <pattern
          id="water"
          width=".25"
          height="1.1"
          patternContentUnits="objectBoundingBox"
        >
          <path
            fill="#18b4fc"
            d="M0.25,1H0c0,0,0-0.659,0-0.916c0.083-0.303,0.158,0.334,0.25,0C0.25,0.327,0.25,1,0.25,1z"
          />
        </pattern>

        <text
          id="text"
          transform="matrix(1 0 0 1 -8.0684 116.7852)"
          fontSize="210"
        >
          HOLY WATER
        </text>

        <mask id="text_mask">
          <use x="0" y="0" xlinkHref="#text" opacity="1" fill="#18b4fc" />
        </mask>
      </defs>

      <rect
        className="water-fill"
        mask="url(#text_mask)"
        fill="url(#water)"
        x="-400"
        y="0"
        width="1600"
        height="120"
      />
    </svg>
  );
};

export default LogoSvg;
