import { IChain as Chain } from "../models/chain";
import React from "react";

export default function () {
  const [chains, setChains] = React.useState<Chain[]>([
    {
      name: "My Private Chain",
      network: "private",
      rpc: ["http://127.0.0.1:8545"],
    },
  ]);

  return [chains, setChains];
}
