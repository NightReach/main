import parser from "ua-parser-js";

export function isBot(uaString: string = "") {
  const ua = uaString.toLowerCase();
  const keywords = [
    "bot",
    "crawl",
    "spider",
    "curl",
    "wget",
    "python",
    "headless",
    "phantom",
    "axios",
    "scraper"
  ];

  return keywords.some(k => ua.includes(k));
}

export function isBadDevice(uaString: string = "") {
  const ua = parser(uaString);

  // Known emulator or "fake mobile" patterns
  const device = ua.device.model || "";
  return /(emulator|sdk|genymotion|virtualbox|vmware)/i.test(device);
}

export function isBotIP(ip: string) {
  const datacenterIPRanges = [
    "146.70.",   // Hosting providers
    "5.188.",
    "45.131.",
    "104.244.", 
    "185.244."
  ];

  return datacenterIPRanges.some(prefix => ip.startsWith(prefix));
}
export async function tooManyClicks(ip: string, prisma: any) {
    const lastMinute = new Date(Date.now() - 60 * 1000);
  
    const count = await prisma.click.count({
      where: {
        ip,
        createdAt: { gte: lastMinute }
      }
    });
  
    return count > 10;   // >10 clicks per minute = red flag
  }
  