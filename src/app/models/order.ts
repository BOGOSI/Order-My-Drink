

export interface Order {
    date?: string;
    item?: string;
    item2?: string;
    item3?: string;
    name?: string;
    quantity?: number;
    quantity2?: number;
    quantity3?: number;
    room?: string;
    status?: string;
  }

  export interface OrderId extends Order {
    id: string;
  }
