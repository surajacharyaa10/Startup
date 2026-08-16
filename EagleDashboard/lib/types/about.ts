export interface CoreValue {
  icon: string;
  title: string;
  desc: string;
  bg: string;
}

export interface OfferItem {
  icon?: string;
  title: string;
}

export interface OfferCategory {
  section: string;
  items: OfferItem[];
}

export interface About {
  _id: string;
  title: string;
  description: string;
  vision: string;
  mission: string;
  coreValues: CoreValue[];
  whatWeOffer: OfferCategory[];
}

export interface AboutInput {
  title: string;
  description: string;
  vision: string;
  mission: string;
  coreValues: CoreValue[];
  whatWeOffer: OfferCategory[];
}


