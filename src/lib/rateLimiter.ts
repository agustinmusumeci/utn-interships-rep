class RateLimiter {
  private requests: Map<string, { count: number; firstRequest: number }>;

  constructor() {
    this.requests = new Map();
  }

  checkIp(ip: string) {
    if (!this.requests.has(ip)) {
      this.requests.set(ip, { count: 0, firstRequest: Date.now() });
    }

    const data = this.requests.get(ip)!;
    const interval = 60000; // 1 minute
    const limit = 5;

    if (Date.now() - data.firstRequest > interval) {
      data.count = 0;
      data.firstRequest = Date.now();
    }

    data.count += 1;

    if (data.count > limit) {
      return { message: "Too many request, please try again later.", ok: false };
    }

    return { message: "Ok", ok: true };
  }
}

export default new RateLimiter();
