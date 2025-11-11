'use client'

import { cn } from '@/lib/utils'

interface PageLoadingAnimationProps {
  isVisible?: boolean
}

export const IconLoading = ({
  className = 'w-24 md:w-36 md:h-36 h-24',
}: {
  className?: string
}) => (
  <svg
    className={cn(` animate-[spin_1s_linear_infinite] text-primary`, className)}
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      className="animate-[dash_1.5s_ease-in-out_infinite] stroke-current"
      cx="50"
      cy="50"
      r="20"
      fill="none"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
)

const LoadingText = ({ text }: { text: string }) => {
  return (
    <>
      <style>
        {`
      @keyframes pxl_load_characters {
    0%, 75%, 100% {
        opacity: 0;
        -webkit-transform: rotateY(-90deg);
        -khtml-transform: rotateY(-90deg);
        -moz-transform: rotateY(-90deg);
        -ms-transform: rotateY(-90deg);
        -o-transform: rotateY(-90deg);
        transform: rotateY(-90deg);
    }

    25%, 50% {
        opacity: 1;
        -webkit-transform: rotateY(0deg);
        -khtml-transform: rotateY(0deg);
        -moz-transform: rotateY(0deg);
        -ms-transform: rotateY(0deg);
        -o-transform: rotateY(0deg);
        transform: rotateY(0deg);
    }
}


.loading-text {
  font-size: calc(26px + 1.8vw);
  line-height: 60px;
  font-weight: 700;
  text-align: center;
  user-select: none;
  -webkit-transition: all 0.5s ease-in-out;
  -khtml-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  -ms-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
}


.loading-text span {
  position: relative;
  display: inline-block;
  color: rgba(0, 0, 0, 0.20);
  margin: 0 8px;
}

@media screen and (max-width: 575px) {
  
.loading-text span {
      margin: 0 5px;
  }
}


.loading-text span:before {
  content: attr(data-text);
  position: absolute;
  left: 0;
  top: 0px;
  opacity: 0;
  color: var(--color-primary);
  -webkit-transform: rotateY(-90deg);
  -khtml-transform: rotateY(-90deg);
  -moz-transform: rotateY(-90deg);
  -ms-transform: rotateY(-90deg);
  -o-transform: rotateY(-90deg);
  transform: rotateY(-90deg);
  -webkit-animation: pxl_load_characters 4s infinite;
  -khtml-animation: pxl_load_characters 4s infinite;
  -moz-animation: pxl_load_characters 4s infinite;
  -ms-animation: pxl_load_characters 4s infinite;
  -o-animation: pxl_load_characters 4s infinite;
  animation: pxl_load_characters 4s infinite;
}

${Array.from({ length: text.length })
  .map(
    (_, index) => `
  .loading-text span:nth-child(${index + 2}):before {
    -webkit-animation-delay: ${Math.floor((index + 1) * 0.2 * 10) / 10}s;
    animation-delay: ${Math.floor((index + 1) * 0.2 * 10) / 10}s;
  }
`,
  )
  .join('\n')}
      `}
      </style>
      <div className="loading-text">
        {text.split('').map((char, index) => (
          <span key={index} data-text={char}>
            {char}
          </span>
        ))}
      </div>
    </>
  )
}

export default function PageLoadingAnimation({ isVisible = true }: PageLoadingAnimationProps) {
  if (!isVisible) return null

  return (
    <div className="min-h-screen w-full">
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          {/* Beautiful SVG Loading Animation */}
          <style>
            {`@keyframes spin-custom {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
       `}
          </style>
          <IconLoading />
          <LoadingText text="CD LIGHT" />
        </div>
      </div>
    </div>
  )
}
