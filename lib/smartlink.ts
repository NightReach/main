interface Offer {
    id: number;
    url: string;
    epc: number;                // earnings per click
    geo: string[];             // allowed GEOs
    device: string[];          // allowed devices
  }
  
  interface Context {
    geo: string;
    device: string;
  }
  
  export function pickOffer(offers: Offer[], ctx: Context) {
    let scored = offers.map((o) => {
      let score = 0;
  
      // Base weight: EPC is king
      score += o.epc * 100;
  
      // GEO match boost
      if (o.geo.includes(ctx.geo)) score += 20;
      else score -= 10;
  
      // Device match boost
      if (o.device.includes(ctx.device)) score += 10;
      else score -= 5;
  
      return { ...o, score };
    });
  
    scored.sort((a, b) => b.score - a.score);
    return scored[0];
  }
  