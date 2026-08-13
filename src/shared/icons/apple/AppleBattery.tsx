export default function AppleBattery() {
  return (
    <svg
      width="22"
      height="13"
      viewBox="0 0 24 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Battery Body */}
      <rect
        x="1"
        y="1"
        width="20.5"
        height="12"
        rx="3"
        stroke="currentColor"
        strokeOpacity="0.45"
        strokeWidth="1.5"
      />

      {/* Battery Level */}
      <rect
        x="3.8"
        y="3.6"
        width="11.8"
        height="6.8"
        rx="1.5"
        fill="currentColor"
      />

      {/* Battery Cap */}
      <rect
        x="22.2"
        y="4"
        width="1.5"
        height="6"
        rx="0.8"
        fill="currentColor"
      />
    </svg>
  );
}