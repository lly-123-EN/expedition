# Expedition

<!-- project logo w/ quick links -->
<p align="center">
  <img src="https://github.com/etclabscore/jade-media-assets/blob/master/j-explorer/j-explorer(PNG)/128x128.png?raw=true" />
</p>
<center>
  <h3 align="center">Expedition</h3>

  <p align="center">
    A block explorer for the Ethereum Stack.
    <br />
    <a href="https://expedition.dev">View Demo</a>
    ·
    <a href="https://github.com/etclabscore/expedition/issues/new?assignees=&labels=&template=bug_report.md&title=">Report Bug</a>
    ·
    <a href="https://github.com/etclabscore/expedition/issues/new?assignees=&labels=&template=feature_request.md&title=">Request Feature</a>
  </p>
</center>

![expedition_gif](https://user-images.githubusercontent.com/364566/94349388-d17fb000-fff8-11ea-92ae-71c002474a65.gif)

<!-- table of contents -->
## Table of Contents
  - [About The Project](#about-the-project)
  - [Getting Started](#getting-started)
      - [Prerequisites](#prerequisites)
      - [Installation](#installation)
- [Usage](#usage)
  - [Start explorer](#start-the-explorer)
  - [Configurations](#configurations)
- [Contributing](#contributing)
- [Resources](#resources)

<!-- about the project -->
## About The Project

[Expedition](https://expedition.dev) is a minimal block explorer for Ethereum Stack. It does not use a database, and can be configured to point at any remote RPC node for any EVM-based network. The goal of the Explorer is to provide a resource for network information and block exploration with only an Ethereum EPC endpoint.

Explorer Features:
- Display chain id
- Syncing status
- Runtime configuration for endpoints
- Search by Block, Transaction, Address
- Charts for hash, transaction count, gas used, uncles
- Preview latest blocks with pagination
- Multi-language support

<!-- getting started with the project -->
## Getting Started
### Prerequisites
- node `v10.15.3` or later
- npm `v6.4.1` or later

### Installation
Clone/ download the project, and install dependencies.
```bash
git clone https://github.com/xops/expedition.git && cd expedition && npm install
```

<!-- example usage, screen shots, demos -->
## Usage

### Start the explorer
```bash
npm start
```
*The explorer will run at http://localhost:3000/.*

### Configurations

#### Set rpc via url

`?rpcUrl=` Set custom rpc url.

Example: 

http://localhost:3000/?rpcUrl=https://www.ethercluster.com/kotti

#### Configure default urls via environment variables

Override eth url

```
REACT_APP_ETH_RPC_URL=https://www.ethercluster.com/kotti npm start
```

<!-- template just leave alone  -->
## Roadmap
See the [open issues](https://github.com/etclabscore/xops/issues) for a list of proposed features (and known issues).

<!-- template just leave alone  -->
## Contributing
How to contribute, build and release are outlined in [CONTRIBUTING.md](CONTRIBUTING.md), [BUILDING.md](BUILDING.md) and [RELEASING.md](RELEASING.md) respectively. Commits in this repository follow the [CONVENTIONAL_COMMITS.md](CONVENTIONAL_COMMITS.md) specification.

## License
Apache License 2.0

<!-- references and additional resources  -->
## Resources
- [OpenRPC](https://open-rpc.org)

---
*This repo originally forked from [ETCDEVTeam/emerald-explorer](https://github.com/ETCDEVTeam/emerald-explorer).*

修改代码：将D:\expedition\expedition\src\hooks中的useChainList中的内容修改

改前：

```
 #这是一个「链列表 Hook」:给整个 Expedition 前端提供一个「当前可用区块链列表」
export default function () {
#默认内置了3条链（都是公网） 
 const [chains, setChains] = React.useState<Chain[]>([
   {
     name: "Ethereum Classic",
     network: "mainnet",
     rpc: ["https://www.ethercluster.com/etc"],
   },
   {
     name: "Matic",
     network: "mainnet",
     rpc: ["https://rpc-mainnet.matic.network"],
   },
   {
     name: "Matic - Mumbai",
     network: "testnet",
     rpc: ["https://rpc-mumbai.matic.today"],
   },
 ]);
#这个代码是作者原来的高级设计浏览器启动后从 chainid.network 拉取 全球所有已知区块链的配置
自动生成“多链浏览器”，但现在的设计太乱了被弃用
 // uncomment once we add 'chain list provider' concept. This list blows.
 // useEffect(() => {
 //   if (chains === undefined) {
 //     fetch("https://chainid.network/chains.json")
 //       .then((r) => r.json())
 //       .then((chainIdNetwork) => {
 //         const filteredChains = chainIdNetwork.filter((c: Chain) => {
 //           if (c.rpc.length === 0) {
 //             return false;
 //           }
 //           return true;
 //         });
 //         if (chains) {
 //           setChains(mergeChainSets(chains, filteredChains));
 //         } else {
 //           setChains(filteredChains);
 //         }
 //       });
 //   }
 // }, [chains]);
 return [chains, setChains];
}
```

改后：

```
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
```

修改原因：

核心原因是业务场景从「通用多链浏览器」转向「私有化 / 本地链开发调试」

### 核心目标变更：从 “公网多链” 到 “私有链 / 本地链”

原代码的设计初衷是做**通用型多链浏览器**：

- 内置 3 条主流公网链（ETC、Polygon 主网 / 测试网）作为基础；
- 还预留了从 `chainid.network` 拉取全球所有公链配置的逻辑，试图覆盖全量公网链；

而修改后的代码完全聚焦**私有链 / 本地开发场景**：

- 只保留一条本地私有链（`http://127.0.0.1:8545` 是以太坊私链 / 测试节点的默认地址）；
- 移除了所有公网链和拉取远程链列表的逻辑；
