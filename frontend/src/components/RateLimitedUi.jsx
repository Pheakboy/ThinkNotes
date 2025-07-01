import { Zap } from "lucide-react";

const RateLimitedUi = () => {
  return (
    <div className="bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-600 rounded-2xl p-6 max-w-3xl mx-auto shadow-xl backdrop-blur-sm">
      <div className="flex items-start gap-4">
        {/* Glowing Icon */}
        <div className="relative">
          <div className="bg-green-500 rounded-xl p-3 shadow-lg">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div className="absolute inset-0 bg-green-400 rounded-xl blur opacity-40"></div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="text-white font-semibold text-xl mb-2 tracking-tight">
            Rate Limit Reached
          </h3>
          <p className="text-gray-300 text-sm mb-3 leading-relaxed">
            Too many requests detected. Taking a quick breather to keep things
            smooth.
          </p>

          {/* Status indicator */}
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
            <span>Please wait a few moments</span>
          </div>
        </div>
      </div>

      {/* Subtle accent */}
      <div className="mt-4 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
    </div>
  );
};

export default RateLimitedUi;
