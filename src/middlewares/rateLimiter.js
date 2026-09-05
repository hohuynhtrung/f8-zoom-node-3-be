function createRateLimiter(config) {
  const { windowMs, maxRequests, message } = config;
  const requests = new Map();

  return (req, res, next) => {
    const ip = req.ip;
    const now = Date.now();

    if (!requests.has(ip) || now > requests.get(ip).resetTime) {
      requests.set(ip, {
        count: 1,
        resetTime: now + windowMs,
      });
      return next();
    }

    const tracker = requests.get(ip);
    if (tracker.count >= maxRequests) {
      return res.status(429).json({ error: message });
    }

    tracker.count += 1;
    next();
  };
}

const apiRateLimiter = createRateLimiter({
  windowMs: 60000,
  maxRequests: 100,
  message: "Too many requests",
});

module.exports = {
  createRateLimiter,
  apiRateLimiter,
};
