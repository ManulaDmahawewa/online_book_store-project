import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <DotLottieReact
        className="w-36"
        src="https://lottie.host/41d33e9a-5a44-4c71-acb5-ae04e938ba53/e3kweN1zot.json"
        loop
        autoplay
      />
    </div>
  );
};

export default Loading;
