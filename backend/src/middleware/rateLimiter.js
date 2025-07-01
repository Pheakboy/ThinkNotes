import ratelimit from "../config/Upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    const { success } = await ratelimit.limit("my-rate-limit");
    if (!success) {
      return res.status(429).json({
        message: "Too many requests, please try again later.",
      });
    }
    next();
  } catch (error) {
    console.error("Error in rate limiter middleware:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default rateLimiter;
