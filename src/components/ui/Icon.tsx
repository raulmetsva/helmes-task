interface IconProps {
  className?: string;
}

export const RefreshIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M15.3333 3.16666V7.16666H11.3333"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M0.666667 13.8333V9.83334H4.66667"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2.34 6.50001C2.67811 5.54453 3.25276 4.69028 4.01031 4.01696C4.76787 3.34363 5.68364 2.87319 6.67219 2.64952C7.66074 2.42584 8.68984 2.45624 9.66346 2.73786C10.6371 3.01948 11.5235 3.54315 12.24 4.26001L15.3333 7.16668M0.666667 9.83334L3.76 12.74C4.4765 13.4569 5.36292 13.9805 6.33654 14.2622C7.31016 14.5438 8.33926 14.5742 9.32781 14.3505C10.3164 14.1268 11.2321 13.6564 11.9897 12.9831C12.7472 12.3097 13.3219 11.4555 13.66 10.5"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// You can add more icons later in the same file
