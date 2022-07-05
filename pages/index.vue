<template>
  <v-app>
    <div class="wrapper">
      <header class="header">
        <div class="header__inner">
          <div class="header__logo">
          </div>

          <v-dialog v-model="dialog" max-width="300">
            <template #activator="{ on, attrs }">
              <div
                v-if="!controllerInfo || controllerInfo.PSD"
                class="header__btn"
                disabled
              >
                <span class="btn header__link">{{ connectButtonLabel }}</span>
              </div>

              <div v-else class="header__btn" v-bind="attrs" v-on="on">
                <span class="btn header__link">{{ connectButtonLabel }}</span>
                <v-icon v-if="wallet" right>mdi-check</v-icon>
              </div>
            </template>

            <div class="connect-modal__content">
              <div class="connect-modal__content-inner">
                <div class="connect-modal__title">Connect using:</div>
                <div class="connect-modal__links">
                  <div
                    :disabled="providerType === 'M'"
                    @click="clickConnectMetamask"
                    class="connect-modal__link btn"
                  >
                    METAMASK
                  </div>

                  <div
                    :disabled="providerType === 'W'"
                    @click="clickConnectWalletconnect"
                    class="connect-modal__link btn"
                  >
                    CONNECTWALLET
                  </div>
                </div>
              </div>
            </div>
          </v-dialog>
        </div>
      </header>

      <main class="main">
        <div class="swapper">
          <div class="swapper__inner">
            <div class="swapper__row">
              <div class="swapper__col">
                <v-select
                  outlined
                  :value="FromToken"
                  :items="Tokens"
                  :disabled="!!loading_swapping"
                  @change="selectFromChainOnChangeHandler"
                  label="Select from"
                  solo
                >
                  <v-icon slot="append" size="12">fa fa-chevron-down</v-icon>

                  <template v-slot:selection="{ item }">
                    <img
                      v-if="FromToken === 'DBX Smart Network (DBX-20)'"
                      src="/dbx.svg"
                    />
                    <img
                      v-if="FromToken === 'Ethereum (ERC-20)'"
                      src="/Ethereum.svg"
                    />
                    <img
                      v-if="FromToken === 'Binance Smart Chain (BEP-20)'"
                      src="/Binance.svg"
                    />

                    <span class="select-btn__output-txt">{{ item }}</span>
                  </template>

                  <template v-slot:item="{ item }">
                    <img
                      v-if="item === 'DBX Smart Network (DBX-20)'"
                      src="/dbx.svg"
                    />
                    <img
                      v-if="item === 'Ethereum (ERC-20)'"
                      src="/Ethereum.svg"
                    />
                    <img
                      v-if="item === 'Binance Smart Chain (BEP-20)'"
                      src="/Binance.svg"
                    />
                    {{ item }}
                  </template>
                </v-select>
                <v-select
                  outlined
                  :value="FromCoin"
                  :items="FromCoins"
                  :disabled="!!loading_swapping"
                  @change="selectFromCoinOnChangeHandler"
                  label="Select from"
                  solo
                >
                  <v-icon slot="append" size="12">fa fa-chevron-down</v-icon>

                  <template v-slot:selection="{ item }">
                    <img
                      v-if="FromCoin === 'USDT'"
                      src="/USDT.png"
                    />
                    <img
                      v-if="FromCoin === 'USDC'"
                      src="/USDC.png"
                    />
                    <img
                      v-if="FromCoin === 'xUS'"
                      src="/xUS.png"
                    />
                    <img
                      v-if="FromCoin === 'DBX'"
                      src="/dbx.svg"
                    />
                    <span class="select-btn__output-txt">{{ item }}</span>
                  </template>

                  <template v-slot:item="{ item }">
                    <img
                      v-if="item === 'USDT'"
                      src="/USDT.png"
                    />
                    <img
                      v-if="item === 'USDC'"
                      src="/USDC.png"
                    />
                    <img
                      v-if="item === 'xUS'"
                      src="/xUS.png"
                    />
                    <img
                      v-if="item === 'DBX'"
                      src="/DBX.svg"
                    />
                    {{ item }}
                  </template>
                </v-select>

                <div class="swapper-quantity">
                  <div class="swapper-quantity__item">
                    Balance: 
                    <span>
                      {{ BNStrToNumstr(dirBalance[0], dirDecimal[0])}} {{this.FromCoin}}
                    </span>
                  </div>
                  <div class="swapper-quantity__item">
                    Approved:
                    <span>
                      {{ BNStrToNumstr(currentApproved, dirDecimal[0])}} {{this.FromCoin}}
                    </span>
                  </div>
                  <div class="swapper-quantity__item">
                    Fee:
                    <span
                      >{{
                        controllerInfo ? BNStrToNumstr(feeBNStr, dirDecimal[0]) : "..."
                      }}
                      {{this.FromCoin}}</span
                    >
                  </div>
                  <div class="swapper-quantity__item">
                    Min: <span>{{ BNStrToNumstr(minBNStr, dirDecimal[0]) }} {{this.FromCoin}}</span>
                  </div>
                </div>
              </div>
              <div class="swapper__col">
                <v-select
                  outlined
                  :value="ToToken"
                  :items="Tokens"
                  :disabled="!!loading_swapping"
                  @change="selectToChainOnChangeHandler"
                  label="Select to"
                  solo
                >
                  <v-icon slot="append" size="12">fa fa-chevron-down</v-icon>
                  <template v-slot:selection="{ item }">
                    <img
                      v-if="ToToken === 'DBX Smart Network (DBX-20)'"
                      src="/dbx.svg"
                    />
                    <img
                      v-if="ToToken === 'Ethereum (ERC-20)'"
                      src="/Ethereum.svg"
                    />
                    <img
                      v-if="ToToken === 'Binance Smart Chain (BEP-20)'"
                      src="/Binance.svg"
                    />
                    <span class="select-btn__output-txt">{{ item }}</span>
                  </template>

                  <template v-slot:item="{ item }">
                    <img
                      v-if="item === 'DBX Smart Network (DBX-20)'"
                      src="/dbx.svg"
                    />
                    <img
                      v-if="item === 'Ethereum (ERC-20)'"
                      src="/Ethereum.svg"
                    />
                    <img
                      v-if="item === 'Binance Smart Chain (BEP-20)'"
                      src="/Binance.svg"
                    />

                    {{ item }}
                  </template>
                </v-select>

                <v-select
                  outlined
                  :value="ToCoin"
                  :items="ToCoins"
                  :disabled="!!loading_swapping"
                  @change="selectToCoinOnChangeHandler"
                  label="Select to"
                  solo
                >
                  <v-icon slot="append" size="12">fa fa-chevron-down</v-icon>

                  <template v-slot:selection="{ item }">
                    <img
                      v-if="ToCoin === 'USDT'"
                      src="/USDT.png"
                    />
                    <img
                      v-if="ToCoin === 'USDC'"
                      src="/USDC.png"
                    />
                    <img
                      v-if="ToCoin === 'xUS'"
                      src="/xUS.png"
                    />
                    <img
                      v-if="ToCoin === 'DBX'"
                      src="/dbx.svg"
                    />

                    <span class="select-btn__output-txt">{{ item }}</span>
                  </template>

                  <template v-slot:item="{ item }">
                    <img
                      v-if="item === 'USDT'"
                      src="/USDT.png"
                    />
                    <img
                      v-if="item === 'USDC'"
                      src="/USDC.png"
                    />
                    <img
                      v-if="item === 'xUS'"
                      src="/xUS.png"
                    />
                    <img
                      v-if="item === 'DBX'"
                      src="/DBX.svg"
                    />
                    {{ item }}
                  </template>
                </v-select>
                <div class="swapper-quantity">
                  <div class="swapper-quantity__item">
                    Balance: 
                    <span>
                      {{ BNStrToNumstr(dirBalance[1], dirDecimal[1]) }} {{this.ToCoin}}
                    </span>
                  </div>
                  <div class="swapper-quantity__item">
                    Will receive:
                    <span>
                      {{
                        amountEnough && controllerInfo
                          ? "~" +
                            BNStrToNumstr(
                              substractFee(
                                amountBN.toString(),
                                feeBNStr
                              ).toString(),
                              dirDecimal[0]
                            )
                          : "..."
                      }}
                      {{this.ToCoin}}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="swapper__amount">
              <div class="swapper-amount">
                <div class="swapper-amount__title">Amount11111:</div>

                <div class="swapper-amount__field-wrapper">
                  <v-text-field
                    v-if="contractInfoOk"
                    v-model="inputAmount"
                    :append-icon="
                      approvedEnough && !approvedEqual
                        ? 'mdi-restore'
                        : canMaximizeAmount
                        ? 'mdi-arrow-collapse-up'
                        : ''
                    "
                    :rules="[
                      () => amountValid || 'Enter proper amount',
                      () => amountEnough || 'Amount is too low',
                      () => balanceEnough || 'Balance too low',
                    ]"
                    label="Choose the vacancy"
                    placeholder="123.456..."
                    required
                    @click:append="handleClickAppend"
                  />

                  <v-text-field
                    v-else
                    outlined
                    label="Choose the vacancy"
                    disabled
                  />
                </div>
              </div>
            </div>

            <button
              class="swapper__controls"
              :loading="loading_swapping"
              v-if="requestDisabled"
              @click="handleClickRequest"
            >
              <span class="btn swapper__link"> SWAP </span>
            </button>
            <button
              class="swapper__controls"
              :loading="loading_swapping"
              v-else
              @click="handleClickRequest"
            >
              <span class="btn swapper__link"> SWAP </span>
            </button>
          </div>

          <v-card-text v-if="hashes && hashes_url && hashes_names">
            Transaction hashes:
            <br />
            Collect ({{ hashes_names.C }})
            <a
              :href="`${hashes_url.C}/tx/${hashes.txHashCollect}`"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ hashes.txHashCollect }}
            </a>
            <br />
            Dispense ({{ hashes_names.D }})
            <a
              :href="`${hashes_url.D}/tx/${hashes.txHashDispense}`"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ hashes.txHashDispense }}
            </a>
          </v-card-text>
        </div>

        <div
          v-if="
            loadingMessage ||
            errorMessage ||
            warningMessage ||
            inBetween ||
            hashes
          "
          class="message-container"
        >
          <v-alert v-if="loadingMessage" outlined type="info">
            {{ loadingMessage }}
          </v-alert>

          <v-alert v-if="errorMessage" dismissible outlined type="error">
            {{ errorMessage }}
          </v-alert>

          <v-alert v-if="warningMessage" dismissible outlined type="warning">
            {{ warningMessage }}
          </v-alert>

          <v-alert v-if="inBetween" outlined type="info">
            Value sent. Sending request to controller. It might take up to 5min,
            please wait...
          </v-alert>

          <v-alert v-if="hashes" outlined type="success">
            Success! Save transaction hashes below
          </v-alert>
        </div>
      </main>

      <div class="decor">
        <div class="decor__img decor__img--1">
          <picture>
            <source srcset="/images/general/decor-1.png" type="image/webp" />
            <img
              src="/images/general/decor-1.png"
              width="525"
              height="561"
              alt="img"
            />
          </picture>
        </div>
        <div class="decor__img decor__img--2">
          <picture>
            <source srcset="/images/general/decor-2.png" type="image/webp" />
            <img
              src="/images/general/decor-2.png"
              width="268"
              height="268"
              alt="img"
            />
          </picture>
        </div>
        <div class="decor__img decor__img--3">
          <picture>
            <source srcset="/images/general/decor-3.png" type="image/webp" />
            <img
              src="/images/general/decor-3.png"
              width="603"
              height="312"
              alt="img"
            />
          </picture>
        </div>
        <div class="decor__img decor__img--4">
          <picture>
            <source srcset="/images/general/decor-4.png" type="image/webp" />
            <img
              src="/images/general/decor-4.png"
              width="1188"
              height="516"
              alt="img"
            />
          </picture>
        </div>
        <div class="decor__img decor__img--5">
          <picture>
            <source srcset="/images/general/decor-5.png" type="image/webp" />
            <img
              src="/images/general/decor-5.png"
              width="637"
              height="799"
              alt="img"
            />
          </picture>
        </div>
        <div class="decor__img decor__img--6">
          <picture>
            <source srcset="/images/general/decor-6.png" type="image/webp" />
            <img
              src="/images/general/decor-6.png"
              width="408"
              height="573"
              alt="img"
            />
          </picture>
        </div>
      </div>
    </div>
  </v-app>
</template>

<script lang="ts">
/* eslint-disable camelcase */
/* eslint-disable no-console */
import Vue from "vue";
import { Contract, providers, BigNumber } from "ethers";
import Axios from "axios";
import Token from "~/abis/Token.json";

import abiUSDT from "~/abis/USDT.json";
// import BalanceAndAllowance from "~/abis/BalanceAndAllowance.json";

import BridgeAssist from "~/abis/BridgeAssist.json";

const address_BABE = "0x6Ab775C3A7Db386acDFAF598968464B59e6b5095"; // "0xE562014651C191178CA2Be7f86910760Ce957C7f";
const address_BABX = "0xe073900E8f456CecE1588071Cda54297008f5A44"; // "0x3A893beAC002c85CB6D85865C66093F420483FE2";
const address_BAEB = "0x67412cA1Aa3DcA2194b6E843E3c790FF4fFa87e4"; // "0x227996B1f17c5E8caB4Cc843124f0Cf6399d37D9";
const address_BAEX = "0x7FdBe745ED1354248f9048A2C3051F4c11e29212"; // "0xd274515b94fAb45639136a5BFF74F704509680c7";

const address_BAX = "0x7E75E882285d1d5Eebd96e03e890b8014cf08ba8"; // "0x547e9337C88ADFe32C2A9e5273F281b813FB085D";

const address_TKNB = "0x9caa60A2Ea0b767Dc2594579a17E69b644fA4104"; // "0x67dcAa9468c219ad81F5825EF0c8f58879c657dd";
const address_TKNE = "0xB8D7372ee6Ff64fE464376d8FFC519ee4997064C"; // "0x3cbc780d2934d55a06069e837fabd3e6fc23dab0";

const address_USDT = "0xac6a28d4486F8Cd435B061F48a8abA7E427eE029"; // "0xdAC17F958D2ee523a2206206994597C13D831ec7";
const address_USDC = "0xf0Ae6228BBf1423e0b55E6D9c74F167A155800B5"; // "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d";
const address_XUS = "0xB8D7372ee6Ff64fE464376d8FFC519ee4997064C"; // "0x91efa3FC448b7FCD40880F3ef650eB99635e6143";

// to do 0x2d23cB626eAa037C24529cdFa3Ff0c416f748af8
// const address_USDCE = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
// const address_BUSDE = "0x4Fabb145d64652a948d72533023f6E7A623C7C53";

// const address_USDTB = "0x55d398326f99059fF775485246999027B3197955";
// const address_USDCB = "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d";
// const address_BUSDB = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56";

const _providerB = new providers.JsonRpcProvider(
  // "https://bsc-dataseed1.binance.org"
  "https://data-seed-prebsc-1-s1.binance.org:8545/"
); // for reading contracts
const _providerE = new providers.InfuraProvider(3, "976b8b2358be48468b36d8739e79414e"); // for reading contracts
const _providerX = new providers.JsonRpcProvider("https://rpc.dbx-testnet.com/"); // for reading contracts
const TKNE = new Contract(address_TKNE, Token.abi, _providerE);

const USDT = new Contract(address_USDT, abiUSDT.abi, _providerE);
const USDC = new Contract(address_USDC, abiUSDT.abi, _providerB); // start 
const XUS = new Contract(address_XUS, abiUSDT.abi, _providerX);

const TKNB = new Contract(address_TKNB, Token.abi, _providerB);
const BAX = new Contract(address_BAX, BridgeAssist.abi, _providerX);  // end

const JSONRPC_BSC = {
  id: 1,
  jsonrpc: "2.0",
  method: "wallet_addEthereumChain",
  params: [
    {
      chainName: "Binance Smart Chain Mainnet",
      chainId: "0x38",
      nativeCurrency: {
        name: "Binance Chain Native Token",
        symbol: "BNB",
        decimals: 18,
      },
      rpcUrls: [
        "https://bsc-dataseed1.binance.org",
        "https://bsc-dataseed2.binance.org",
        "https://bsc-dataseed3.binance.org",
        "https://bsc-dataseed4.binance.org",
        "https://bsc-dataseed1.defibit.io",
        "https://bsc-dataseed2.defibit.io",
        "https://bsc-dataseed3.defibit.io",
        "https://bsc-dataseed4.defibit.io",
        "https://bsc-dataseed1.ninicoin.io",
        "https://bsc-dataseed2.ninicoin.io",
        "https://bsc-dataseed3.ninicoin.io",
        "https://bsc-dataseed4.ninicoin.io",
        "wss://bsc-ws-node.nariox.org",
      ],
      blockExplorerUrls: ["https://bscscan.com"],
      iconUrls: [
        "https://cryptologos.cc/logos/binance-coin-bnb-logo.svg",
        "https://cryptologos.cc/logos/binance-coin-bnb-logo.png",
      ],
    },
  ],
};

const Tokens = [
  "Ethereum (ERC-20)",
  "Binance Smart Chain (BEP-20)",
  "DBX Smart Network (DBX-20)",
];

const FromCoins = [
  "USDT",
  "DBX"
];

const ToCoins = [
  "USDC",
  "DBX"
];

function _wait(ms = 20000) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function removeTrailingZeros(str: string): string {
  if (str === "0") return str;
  // console.log("mcb: removeTrailingZeros => ", str, "str.slice(-1): ", str.slice(-1));
  if (str.slice(-1) === ".") return str.substr(0, str.length - 1);
  if (str.slice(-1) === "0")
    return removeTrailingZeros(str.substr(0, str.length - 1));
  return str;
}
function numstrToBN(input: string, decimals = 18): BigNumber {
  const spl = input.split(".");
  if (spl[1]) spl[1] = spl[1].substr(0, decimals);
  // console.log("yyyyyyyyyyyy", "decimal: ", decimals, "------", spl.join("") + (decimals == 18 ? "000000000000000000" : "000000").substr(0, decimals - (spl[1] || "").length));

  return BigNumber.from(
    spl.join("") + (decimals == 18 ? "000000000000000000" : "000000").substr(0, decimals - (spl[1] || "").length)
  );
}
function BNStrToNumstr(str: string, decimals = 18, precision = 3): string {
  if (str === "0") return str;
  console.log("mcb: BNStrToNumstr_decimals=> ", decimals, " Balance: ", str);
  if (isNaN(Number(str))) return "NaN";
  switch (decimals) {
    case 18:
      if (str.length <= 18)
        return removeTrailingZeros(
          ("0." + "000000000000000000".substr(0, 18 - str.length) + str).substr(
            0,
            18 - str.length + precision + 2
          )
        );
      else
        return [str.substr(0, str.length - 18), str.slice(-18)]
          .join(".")
          .substr(0, str.length - 18 + precision + 1);
    case 6:
      // console.log("4444444444444444: ", ("0." + "000000".substr(0, 6 - str.length) + str).substr(0,6 - str.length + precision + 2), "strlength: ", str.length);
      if (str.length <= 6)
        return removeTrailingZeros(
          ("0." + "000000".substr(0, 6 - str.length) + str).substr(
            0,
            6 - str.length + precision + 2
          )
        );
      else
        return [str.substr(0, str.length - 6), str.slice(-6)]
          .join(".")
          .substr(0, str.length - 6 + precision + 1);
    default:
      return str;
  }
}
function substractFee(amount: string, fee: string) {
  return BigNumber.from(amount).sub(fee);
}
type DirectionType = "EB" | "BE" | "EX" | "BX" | "XE" | "XB";
type CoinDirectionType = "SS" |  "DD";

export default Vue.extend({
  data() {
    return {
      Tokens,
      FromToken: "Ethereum (ERC-20)",
      ToToken: "Binance Smart Chain (BEP-20)",
      // changed by djordje.
      FromCoins,
      ToCoins,
      FromCoin: "DBX",
      ToCoin: "DBX",
      fromChainName: "ETH",
      toChainName: "BNB",
      provider: null as providers.Web3Provider | null,
      signer: null as providers.JsonRpcSigner | null,
      wallet: "",
      direction: "EB" as DirectionType,
      coinDirection: "DD" as CoinDirectionType,
      approvedEB: "",
      approvedEX: "",
      approvedBE: "",
      approvedBX: "",
      approvedX: "",
      approvedX_dirE: false,

      approvedEBS: "",
      approvedEXS: "",
      approvedBES: "",
      approvedBXS: "",
      approvedXS: "",
      approvedX_dirES: false,

      balanceE: "",
      balanceB: "",
      balanceX: "",

      balanceES: "",
      balanceBS: "",
      balanceXS: "",

      inputAmount: "",
      controllerInfo: null as {
        BE: string;
        EB: string;
        EX: string;
        BX: string;
        XE: string;
        XB: string;
        BES: string;
        EBS: string;
        EXS: string;
        BXS: string;
        XES: string;
        XBS: string;
        PSD: boolean;
      } | null,
      errorMessage_misc: "",
      warningMessage: "",
      successMessage: "",
      loading_swapping: false,
      loading_approve: false,
      loading_request: false,
      loading_provider: false,
      loading_controllerInfo: true,
      loading_contractInfo: false,
      loading_add: false,
      paused_chainIdHandler: false,
      inBetween: false,
      hashes: null as { txHashCollect: string; txHashDispense: string } | null,
      hashes_url: null as { C: string; D: string } | null,
      hashes_names: null as { C: string; D: string } | null,
      dialog: false,
      dialog_help: false,
      chainId: null as null | number,
    };
  },
  computed: {
    // MESSAGES
    connectButtonLabel(): string {
      return this.wallet
        ? this.wallet.substr(0, 6) + "..." + this.wallet.substr(-4)
        : "Connect";
    },
    loadingMessage(): string {
      return this.loading_controllerInfo
        ? "Loading controller info..."
        : this.loading_provider
        ? "Connecting provider..."
        : this.loading_contractInfo
        ? "Loading contract info..."
        : "";
    },
    err_controllerInfo(): boolean {
      return !this.loading_controllerInfo && !this.controllerInfo;
    },
    err_shutDown(): boolean {
      return this.preShutDown;
    },
    err_chainId(): boolean {
      return (
        !!this.chainId &&
        this.chainId !==
          { EB: 3, BE: 97, EX: 3, BX: 97, XE: 48366, XB: 48366 }[this.direction]
      );
    },
    err_balanceLow(): boolean {
      console.log("mcb: err_balance=> ", this.dirBalance[0], " this.minBNStr: ", this.minBNStr);
      return (
        !!this.dirBalance[0] &&
        BigNumber.from(this.dirBalance[0]).lt(this.minBNStr)
      );
    },
    errorMessage(): string {
      return this.err_controllerInfo
        ? "Could not load info from controller. Usage is blocked. Try refreshing the page"
        : this.err_shutDown
        ? "Controller will soon shut down for maintenance. Usage is blocked. Please wait"
        : this.err_chainId
        ? `You selected wrong network for this direction. Select ${
            this.dirChainName[0]
          } in your provider${
            this.providerType === "M" ? "" : " and refresh the page"
          }`
        : this.err_balanceLow
        ? "Your balance is lower than minimum amount. Usage is blocked"
        : this.errorMessage_misc;
    },
    smAndUp(): boolean {
      return (this as any).$vuetify.breakpoint.smAndUp;
    },
    providerType(): "N" | "W" | "M" {
      return !this.provider
        ? "N"
        : this.provider.provider.isMetaMask
        ? "M"
        : "W";
    },
    dirChainName(): string[] {
      return {
        EB: ["Ethereum (ERC-20)", "Binance Smart Chain (BEP-20)"],
        BE: ["Binance Smart Chain (BEP-20)", "Ethereum (ERC-20)"],
        EX: ["Ethereum (ERC-20)", "DBX Smart Network (DBX-20)"],
        BX: ["Binance Smart Chain (BEP-20)", "DBX Smart Network (DBX-20)"],
        XE: ["DBX Smart Network (DBX-20)", "Ethereum (ERC-20)"],
        XB: ["DBX Smart Network (DBX-20)", "Binance Smart Chain (BEP-20)"],
      }[this.direction];
    },
    dirChainNameShort(): string[] {
      return {
        EB: ["ETH", "BSC"],
        BE: ["BSC", "ETH"],
        EX: ["ETH", "DBX"],
        BX: ["BSC", "DBX"],
        XE: ["DBX", "ETH"],
        XB: ["DBX", "BSC"],
      }[this.direction];
    },
    dirChainExplorer(): string[] {
      return {
        EB: ["https://ropsten.etherscan.io", "https://testnet.bscscan.com"],
        BE: ["https://testnet.bscscan.com", "https://ropsten.etherscan.io"],
        EX: ["https://ropsten.etherscan.io", "https://18.140.252.76/"],
        BX: ["https://testnet.bscscan.com", "https://18.140.252.76/"],
        XE: ["https://18.140.252.76/", "https://ropsten.etherscan.io"],
        XB: ["https://18.140.252.76/", "https://testnet.bscscan.com"],
      }[this.direction];
    },
    dirChainLogo(): string[] {
      return {
        EB: ["/ethereumlogo.png", "/binancelogo.png"],
        BE: ["/binancelogo.png", "/ethereumlogo.png"],
        EX: ["/ethereumlogo.png", "/dbxlogo.png"],
        BX: ["/binancelogo.png", "/dbxlogo.png"],
        XE: ["/dbxlogo.png", "/ethereumlogo.png"],
        XB: ["/dbxlogo.png", "/binancelogo.png"],
      }[this.direction];
    },
    dirBalance(): string[] {
      return {
        DD: {
          EB: [this.balanceE, this.balanceB],
          BE: [this.balanceB, this.balanceE],
          EX: [this.balanceE, this.balanceX],
          BX: [this.balanceB, this.balanceX],
          XE: [this.balanceX, this.balanceE],
          XB: [this.balanceX, this.balanceB]},
        SS: {
          EB: [this.balanceES, this.balanceBS],
          BE: [this.balanceBS, this.balanceES],
          EX: [this.balanceES, this.balanceXS],
          BX: [this.balanceBS, this.balanceXS],
          XE: [this.balanceXS, this.balanceES],
          XB: [this.balanceXS, this.balanceBS]}
      }[this.coinDirection][this.direction];
    },
    dirDecimal(): number[] {
      return {
        DD: {
            EB: [18, 18],
            BE: [18, 18],
            EX: [18, 18],
            BX: [18, 18],
            XE: [18, 18],
            XB: [18, 18]},
        SS: {
            EB: [6, 18],
            BE: [18, 6],
            EX: [6,  6],
            BX: [18, 6],
            XE: [6,  6],
            XB: [6, 18]}
      }[this.coinDirection][this.direction]
    },
    currentApproved(): string {
      return {
        DD: {
          EB: this.approvedEB,
          BE: this.approvedBE,
          EX: this.approvedEX,
          BX: this.approvedBX,
          XE: this.approvedX,
          XB: this.approvedX},
        SS: {
          EB: this.approvedEBS,
          BE: this.approvedBES,
          EX: this.approvedEXS,
          BX: this.approvedBXS,
          XE: this.approvedXS,
          XB: this.approvedXS}
      }[this.coinDirection][this.direction];
    },
    // TECHNICAL OK
    preShutDown(): boolean {
      return !!this.controllerInfo?.PSD;
    },
    contractInfoOk(): boolean {
      return !!this.currentApproved && !!this.dirBalance[0];
    },
    allSafe(): boolean {
      return (
        !!this.wallet &&
        !!this.controllerInfo &&
        this.contractInfoOk &&
        !this.errorMessage &&
        !this.loading_controllerInfo &&
        !this.loading_provider &&
        !this.loading_contractInfo
      );
    },
    // VALID DATA
    approvedEqual(): boolean {
      return this.amountBN.eq(this.currentApproved);
    },
    amountValid(): boolean {
      return !!Number(this.inputAmount);
    },
    approvedNonZero(): boolean {
      return this.approvedBN.gt(0);
    },
    // ENOUGH
    amountEnough(): boolean {
      console.log("amountEnough(): ", this.minBNStr, " -> ", this.amountBN.toString());
      return this.minBNStr ? this.amountBN.gte(this.minBNStr) : false;
    },
    balanceEnough(): boolean {
      // console.log("balanceEnough: ", this.amountBN.toString(), " : ", this.dirBalance[0]);

      return this.amountBN.lte(this.dirBalance[0]);
    },
    approvedEnough(): boolean {
      if (!this.controllerInfo) return false;
      return this.approvedBN.gte(this.minBNStr);
    },
    // BUTTONS DISABLED
    requestDisabled(): boolean {
      return !(
        this.allSafe &&
        this.amountValid &&
        this.amountEnough &&
        this.balanceEnough
      );
    },
    canMaximizeAmount(): boolean {
      return !this.approvedNonZero && this.amountBN.lt(this.dirBalance[0]);
    },
    // CONVERTERS
    amountBN(): BigNumber {
      console.log("changeable");
      return this.amountValid ? 
          numstrToBN(this.inputAmount.trim(), this.dirDecimal[0])
        : 
        BigNumber.from(0);
    },
    approvedBN(): BigNumber {
      // return BigNumber.from(this.currentApproved || 0);
      return BigNumber.from(0);
    },
    feeBNStr(): string {
      if (!this.controllerInfo) return "";
      return this.coinDirection === "DD" ? this.controllerInfo[this.direction] : (this.controllerInfo as any)[this.direction + "S"];
    },
    minBNStr(): string {
      if (!this.controllerInfo) return "";
      return this.coinDirection === "DD" ? (this.controllerInfo as any)["MIN_" + this.direction] : (this.controllerInfo as any)["MIN_" + this.direction + "S"];
    },
  },
  async mounted() {
    if (!this.smAndUp) window.scrollTo(0, 160);
    await this.loadControllerInfo();
  },
  methods: {
    BNStrToNumstr,
    substractFee,
    async updateChainId() {
      this.chainId = (await this.provider?.getNetwork())?.chainId || null;
    },
    async clickConnectWalletconnect() {
      this.dialog = false;
      if (this.providerType === "M") this.wallet = "";
      await this.connectWalletconnect();
      if (this.wallet) await this.loadContractInfo();
      if (this.contractInfoOk && this.approvedNonZero)
        this.restoreInputAmount();
    },
    async connectWalletconnect() {
      this.loading_provider = true;
      try {
        const WalletConnectProvider =
          require("@walletconnect/web3-provider").default;
        const wc = new WalletConnectProvider(
          this.direction === "EB" || this.direction === "EX" 
            ? {
                rpc: {
                  3: "https://ropsten.infura.io/v3/",
                },
                chainId: 3,
                qrcode: true,
              }
            : this.direction === "XB" || this.direction === "XE"
            ? {
                rpc: { 48366: "https://rpc.dbx-testnet.com/" },
                chainId: 48366,
                qrcode: true,
              }
            : {
                rpc: { 97: "https://data-seed-prebsc-1-s1.binance.org:8545/" },
                chainId: 97,
                qrcode: true,
              }
        );
        await wc.enable();
        this.provider = new providers.Web3Provider(wc);
        this.signer = this.provider.getSigner();
        this.wallet = await this.signer.getAddress();
        await this.updateChainId();
      } catch (error) {
        this.errorMessage_misc =
          "Could not connect Walletconnect. Error: " + error.message;
        console.error(error);
      }
      this.loading_provider = false;
    },
    async clickConnectMetamask() {
      console.log("111111111111");
      this.dialog = false;
      if (this.providerType === "W") this.wallet = "";
      await this.connectMetamask();
      (window.ethereum as any).on("chainChanged", async (chainId: string) => {
        console.log({ chainId });
        if (this.loading_swapping) {
          this.paused_chainIdHandler = true;
          return;
        }
        if (!this.paused_chainIdHandler) this.hashes = null;
        switch (chainId) {
          case "0x3":
            if (this.ToToken == "Ethereum (ERC-20)") {
              this.ToToken = this.FromToken;
              this.direction = (this.direction[1] +
                this.direction[0]) as DirectionType;
            }
            this.direction = ("E" + this.direction[1]) as DirectionType;
            this.FromToken = "Ethereum (ERC-20)";
            break;
          case "0x62":
            if (this.ToToken == "Binance Smart Chain (BEP-20)") {
              this.ToToken = this.FromToken;
              this.direction = (this.direction[1] +
                this.direction[0]) as DirectionType;
            }
            this.direction = ("B" + this.direction[1]) as DirectionType;
            this.FromToken = "Binance Smart Chain (BEP-20)";
            break;
          case "0xBCEE":
            if (this.ToToken == "DBX Smart Network (DBX-20)") {
              this.ToToken = this.FromToken;
              this.direction = (this.direction[1] +
                this.direction[0]) as DirectionType;
            }
            this.direction = ("X" + this.direction[1]) as DirectionType;
            this.FromToken = "DBX Smart Network (DBX-20)";
            break;
          default:
            return;
        }
        await this.connectMetamask();
        if (this.contractInfoOk && this.approvedNonZero)
          this.restoreInputAmount();
      });
      console.log("33333333333333:", this.wallet);
      if (this.wallet) await this.loadContractInfo();
      if (this.contractInfoOk && this.approvedNonZero)
        this.restoreInputAmount();
    },
    async connectMetamask() {
      this.loading_provider = true;
      console.log("22222222222");
      try {
        if (!window.ethereum)
          throw new Error("Please set up MetaMask properly");
        await (window.ethereum as any).enable();
        this.provider = new providers.Web3Provider(
          (window.ethereum as any) || window.web3
        );
        this.signer = this.provider.getSigner();
        this.wallet = await this.signer.getAddress();
        await this.updateChainId();
        if (!this.paused_chainIdHandler) this.hashes = null;
        switch (this.chainId) {
          case 3:
            if (this.ToToken == "Ethereum (ERC-20)") {
              this.ToToken = this.FromToken;
              this.direction = (this.direction[1] +
                this.direction[0]) as DirectionType;
            }
            this.direction = ("E" + this.direction[1]) as DirectionType;
            this.FromToken = "Ethereum (ERC-20)";
            break;
          case 97:
            if (this.ToToken == "Binance Smart Chain (BEP-20)") {
              this.ToToken = this.FromToken;
              this.direction = (this.direction[1] +
                this.direction[0]) as DirectionType;
            }
            this.direction = ("B" + this.direction[1]) as DirectionType;
            this.FromToken = "Binance Smart Chain (BEP-20)";
            break;
          case 48366:
            if (this.ToToken == "DBX Smart Network (DBX-20)") {
              this.ToToken = this.FromToken;
              this.direction = (this.direction[1] +
                this.direction[0]) as DirectionType;
            }
            this.direction = ("X" + this.direction[1]) as DirectionType;
            this.FromToken = "DBX Smart Network (DBX-20)";
            break;
          default:
            return;
        }
      } catch (error) {
        this.errorMessage_misc =
          "Could not connect MetaMask. Error: " + error.messagee;
        console.error(error);
      }
      this.loading_provider = false;
    },
    restoreInputAmount() {
      this.inputAmount = removeTrailingZeros(
        BNStrToNumstr(this.currentApproved)
      );
    },
    handleClickAppend() {
      console.log("ddddddddddddddddd");
      if (this.approvedEnough && !this.approvedEqual) this.restoreInputAmount();
      else if (this.canMaximizeAmount)
        this.inputAmount = removeTrailingZeros(
          BNStrToNumstr(this.dirBalance[0], this.dirDecimal[0])
        );
    },
    async handleClickAdd() {
      this.loading_add = true;
      try {
        const addedNetwork = await this.provider?.provider.request?.(
          JSONRPC_BSC
        );
        await this.updateChainId();
        console.log({ addedNetwork });
      } catch (error) {
        console.error(error);
      }
      this.loading_add = false;
    },
    // selecting stable coin change event handler
    selectFromCoinOnChangeHandler(data: any) {
      this.hashes = null;
      switch (data) {
        case "USDT":
          // this.coinDirection = ("T" + this.coinDirection[1]) as CoinDirectionType;
          this.FromCoin = "USDT";
          break;
        case "USDC":
          // this.coinDirection = ("C" + this.coinDirection[1]) as CoinDirectionType;
          this.FromCoin = "USDC";
          break;
        case "xUS":
          // this.coinDirection = ("D" + this.coinDirection[1]) as CoinDirectionType;
          this.FromCoin = "xUS";
          break;
        case "DBX":
          // this.coinDirection = ("D" + this.coinDirection[1]) as CoinDirectionType;
          this.FromCoin = "DBX";
          this.ToCoin = "DBX";
          break;
      }

      if (data !== "DBX") {
        switch (this.ToToken) {
          case "Ethereum (ERC-20)":
            // this.direction = ("E" + this.direction[1]) as DirectionType;
            // this.FromToken = "Ethereum (ERC-20)";
            // this.fromChainName = "ETH";
            this.ToCoin = "USDT"
            break;
          case "Binance Smart Chain (BEP-20)":
            // this.direction = ("B" + this.direction[1]) as DirectionType;
            // this.FromToken = "Binance Smart Chain (BEP-20)";
            // this.fromChainName = "BNB";
            this.ToCoin = "USDC"
            break;
          case "DBX Smart Network (DBX-20)":
            // this.direction = ("X" + this.direction[1]) as DirectionType;
            // this.FromToken = "DBX Smart Network (DBX-20)";
            // this.fromChainName = "DBX";
            this.ToCoin = "xUS"
            break;
        }
        // this.direction = this.direction + "S" as DirectionType;
        this.coinDirection = "SS" as CoinDirectionType;
      } else {
        // this.direction = this.direction[0] + this.direction[1] as DirectionType;
        this.coinDirection = "DD" as CoinDirectionType;
      }

      console.log("mcb->selectFromCoinOnChangeHandler: this.direction", this.direction);
    },
    selectToCoinOnChangeHandler(data: any) {
      this.hashes = null;

      switch (data) {
        case "USDT":
          // this.coinDirection = (this.coinDirection[0] + "T") as CoinDirectionType;
          this.ToCoin = "USDT";
          break;
        case "USDC":
          // this.coinDirection = (this.coinDirection[0] + "C") as CoinDirectionType;
          this.ToCoin = "USDC";
          break;
        case "xUS":
          // this.coinDirection = (this.coinDirection[0] + "D") as CoinDirectionType;
          this.ToCoin = "xUS";
          break;
        case "DBX":
          // this.coinDirection = (this.coinDirection[0] + "D") as CoinDirectionType;
          this.ToCoin = "DBX";
          this.FromCoin = "DBX"
          break;
      }


      if (data !== "DBX") {
        switch (this.FromToken) {
          case "Ethereum (ERC-20)":
            // this.direction = ("E" + this.direction[1]) as DirectionType;
            // this.FromToken = "Ethereum (ERC-20)";
            // this.fromChainName = "ETH";
            this.FromCoin = "USDT"
            break;
          case "Binance Smart Chain (BEP-20)":
            // this.direction = ("B" + this.direction[1]) as DirectionType;
            // this.FromToken = "Binance Smart Chain (BEP-20)";
            // this.fromChainName = "BNB";
            this.FromCoin = "USDC"
            break;
          case "DBX Smart Network (DBX-20)":
            // this.direction = ("X" + this.direction[1]) as DirectionType;
            // this.FromToken = "DBX Smart Network (DBX-20)";
            // this.fromChainName = "DBX";
            this.FromCoin = "xUS"
            break;
        }
        // this.direction = this.direction + "S" as DirectionType;
        this.coinDirection = "SS" as CoinDirectionType;
      } else {
        this.coinDirection = "DD" as CoinDirectionType;
        // this.direction = this.direction[0] + this.direction[1] as DirectionType;
      }
    },
    selectFromChainOnChangeHandler(data: any) {
      this.hashes = null;
      if (data == this.ToToken) {
        this.direction = (this.direction[1] +
          this.direction[0]) as DirectionType;
        this.ToToken = this.FromToken;
        this.FromToken = data;
        console.log("mcb: direction ", this.direction);
      } else {
        switch (data) {
          case "Ethereum (ERC-20)":
            this.direction = ("E" + this.direction[1]) as DirectionType;
            this.FromToken = "Ethereum (ERC-20)";
            // this.fromChainName = "ETH";
            break;
          case "Binance Smart Chain (BEP-20)":
            this.direction = ("B" + this.direction[1]) as DirectionType;
            this.FromToken = "Binance Smart Chain (BEP-20)";
            // this.fromChainName = "BNB";
            break;
          case "DBX Smart Network (DBX-20)":
            this.direction = ("X" + this.direction[1]) as DirectionType;
            this.FromToken = "DBX Smart Network (DBX-20)";
            // this.fromChainName = "DBX";
            break;
        }

        console.log("mcb: direction ", this.direction);
      }
      switch (data) {
        case "Ethereum (ERC-20)":
          this.FromCoins = [
            "USDT",
            "DBX"
          ];
          this.fromChainName = "ETH";
          break;
        case "Binance Smart Chain (BEP-20)":
          this.FromCoins = [
            "USDC",
            "DBX"
          ];
          this.fromChainName = "BNB";
          break;
        case "DBX Smart Network (DBX-20)":
          this.FromCoins = [
            "xUS",
            "DBX"
          ];
          this.fromChainName = "DBX";
          break;
      }

      switch (this.ToToken) {
        case "Ethereum (ERC-20)":
          this.ToCoins = [
            "USDT",
            "DBX"
          ];
          this.toChainName = "ETH";
          break;
        case "Binance Smart Chain (BEP-20)":
          this.ToCoins = [
            "USDC",
            "DBX"
          ];
          this.toChainName = "BNB";
          break;
        case "DBX Smart Network (DBX-20)":
          this.ToCoins = [
            "xUS",
            "DBX"
          ];
          this.toChainName = "DBX";
          break;
      }
      this.FromCoin = "DBX";
      this.ToCoin = "DBX";
    },
    selectToChainOnChangeHandler(data: any) {
      this.hashes = null;
      if (data == this.FromToken) {
        this.direction = (this.direction[1] +
          this.direction[0]) as DirectionType;
        this.FromToken = this.ToToken;
        this.ToToken = data;
      } else {
        switch (data) {
          case "Ethereum (ERC-20)":
            this.direction = (this.direction[0] + "E") as DirectionType;
            this.ToToken = "Ethereum (ERC-20)";
            // this.toChainName = "ETH";
            break;
          case "Binance Smart Chain (BEP-20)":
            this.direction = (this.direction[0] + "B") as DirectionType;
            this.ToToken = "Binance Smart Chain (BEP-20)";
            // this.toChainName = "BNB";
            break;
          case "DBX Smart Network (DBX-20)":
            this.direction = (this.direction[0] + "X") as DirectionType;
            this.ToToken = "DBX Smart Network (DBX-20)";
            // this.toChainName = "DBX";
            break;
        }
      }

      switch (data) {
        case "Ethereum (ERC-20)":
          this.ToCoins = [
            "USDT",
            "DBX"
          ];
          this.toChainName = "ETH";
          break;
        case "Binance Smart Chain (BEP-20)":
          this.ToCoins = [
            "USDC",
            "DBX"
          ];
          this.toChainName = "BNB";
          break;
        case "DBX Smart Network (DBX-20)":
          this.ToCoins = [
            "xUS",
            "DBX"
          ];
          this.toChainName = "DBX";
          break;
      }

      switch (this.FromToken) {
        case "Ethereum (ERC-20)":
          this.FromCoins = [
            "USDT",
            "DBX"
          ];
          this.fromChainName = "ETH";
          break;
        case "Binance Smart Chain (BEP-20)":
          this.FromCoins = [
            "USDC",
            "DBX"
          ];
          this.fromChainName = "BNB";
          break;
        case "DBX Smart Network (DBX-20)":
          this.FromCoins = [
            "xUS",
            "DBX"
          ];
          this.fromChainName = "DBX";
          break;
      }
      this.FromCoin = "DBX";
      this.ToCoin = "DBX";
    },
    async loadControllerInfo() {
      this.loading_controllerInfo = true;
      try {
        this.controllerInfo = (
          // await Axios.get("https://dbxbridge.uc.r.appspot.com/info")
          await Axios.get("https://test-node-server000.herokuapp.com/info")
          // await Axios.get("http://135.181.15.84:443/info")
        ).data;
        if (!this.controllerInfo)
          throw new Error("Received invalid data from controller");
      } catch (error) {
        console.error(error);
      }
      console.log("mcb: loadControllerInfo=> ", this.controllerInfo);
      this.loading_controllerInfo = false;
    },
    async loadContractInfo() {
      this.loading_contractInfo = true;
      console.log("mcb: loadContractInfo");
      try {
        const w = this.wallet;
        console.log("mcb: wallet=> ", w, " chain Id: ", this.chainId);
        const [Bb, Eb, Xb, BbS, EbS, XbS, BEa, BXa, EBa, EXa, Xa, Xd, BEaS, BXaS, EBaS, EXaS, XaS, XdS] = (
          await Promise.all([
            TKNB.balanceOf(w),
            TKNE.balanceOf(w),
            _providerX.getBalance(w),

            USDC.balanceOf(w),
            USDT.balanceOf(w),
            XUS.balanceOf(w),

            TKNB.allowance(w, address_BABE),
            TKNB.allowance(w, address_BABX),
            TKNE.allowance(w, address_BAEB),
            TKNE.allowance(w, address_BAEX),

            BAX.locked(w),
            BAX.directionE(w),

            ////////////////////////////
            USDC.allowance(w, address_BABE),
            USDC.allowance(w, address_BABX),
            USDT.allowance(w, address_BAEB),
            USDT.allowance(w, address_BAEX),
            XUS.allowance(w, address_BAX),
            BAX.directionE(w),
          ])
        ).map((r) => r.toString());
        this.approvedBE = BEa;
        this.approvedBX = BXa;
        this.approvedEB = EBa;
        this.approvedEX = EXa;
        this.approvedX = Xa;
        this.approvedX_dirE = Xd !== "false";
        
        this.approvedBES = BEaS;
        this.approvedBXS = BXaS;
        this.approvedEBS = EBaS;
        this.approvedEXS = EXaS;
        this.approvedXS = XaS;
        this.approvedX_dirES = XdS !== "false";

        this.balanceB = Bb;
        this.balanceE = Eb;
        this.balanceX = Xb;

        this.balanceBS = BbS;
        this.balanceES = EbS;
        this.balanceXS = XbS;

        console.log("this is DBX balanceB ", this.balanceB);
        console.log("this is DBX balanceE ", this.balanceE);
        console.log("this is DBX balanceX ", this.balanceX);

        console.log("this is USDC balanceB ", this.balanceBS);
        console.log("this is USDT balanceE ", this.balanceES);
        console.log("this is XUS balanceX ", this.balanceXS);

        console.log("this is approvedBE ", this.approvedBE);
        console.log("this is approvedBX ", this.approvedBX);
        console.log("this is approvedEX ", this.approvedEX);

        console.log("this is approvedX ", this.approvedX);
        console.log("this is approvedX_dirE ", this.approvedX_dirE);

        console.log("this is approvedEBS ", this.approvedEBS);

        if(this.chainId == 3)
          this.fromChainName = "ETH";
        if(this.chainId == 97)
          this.fromChainName = "BNB";
        if(this.chainId == 48366)
          this.fromChainName = "DBX";
      } catch (error) {
        console.error(error);
      }
      this.loading_contractInfo = false;
    },
    async handleClickRequest() {
      console.log("xxxxxxxxxx");
      this.loading_swapping = true;
      this.hashes = null;
      this.hashes_url = {
        C: this.dirChainExplorer[0],
        D: this.dirChainExplorer[1],
      };
      this.hashes_names = {
        C: this.dirChainName[0],
        D: this.dirChainName[1],
      };
      console.log("this is request of handle click");
      try {
        this.warningMessage = "";
        if (
          !(this.approvedNonZero && this.approvedEqual) ||
          ((this.direction === "XE" || this.direction === "XB") &&
            this.approvedX_dirE !== (this.direction === "XE"))
        ) {
          await this.approve();
          console.log("mcb: approve ended!");
          this.inBetween = true;
        }
        this.inputAmount = "";
        await this.requestSwap();
      } catch (error) {
        this.warningMessage = error.message;
        console.error(error);
      }
      this.inBetween = false;
      this.loading_swapping = false;
      if (this.paused_chainIdHandler) {
        await this.clickConnectMetamask();
        this.paused_chainIdHandler = false;
      }
    },
    async approve() {
      this.loading_approve = true;
      console.log("mcb: approve started!");
      if (this.coinDirection === "SS") {
        const STABLE = new Contract(
          {
            EB: address_USDT,
            EX: address_USDT,
            BE: address_USDC,
            BX: address_USDC,
            XE: address_XUS,
            XB: address_XUS
          }[this.direction],
          abiUSDT.abi,
          this.signer!
        );
        console.log({
          amt: this.amountBN.toString(),
          bal: this.dirBalance[0]
        });
        const tx = await STABLE.approve(
          {
            EB: address_BAEB,
            EX: address_BAEX,
            BE: address_BABE,
            BX: address_BABX,
            XE: address_BAX,
            XB: address_BAX
          }[this.direction],
          this.amountBN,
        );
        console.log({ tx });
        const receipt = await tx.wait();
        console.log({ receipt });
      } else if (this.direction === "XE" || this.direction === "XB" ) {
          const ptx = await BAX.populateTransaction.writeEntry(
            this.direction === "XE"
          );
          ptx.value = this.amountBN;
          console.log({
            amt: this.amountBN.toString(),
            bal: this.dirBalance[0],
          });
          const tx = await this.signer!.sendTransaction(ptx);
          console.log({ tx });
          await _wait();
      } else {
        const TKN = new Contract(
          {
            EB: address_TKNE,
            BE: address_TKNB,
            EX: address_TKNE,
            BX: address_TKNB,
          }[this.direction],
          Token.abi,
          this.signer!
        );
        console.log({
          amt: this.amountBN.toString(),
          bal: this.dirBalance[0],
        });
        const tx = await TKN.approve(
          {
            EB: address_BAEB,
            BE: address_BABE,
            EX: address_BAEX,
            BX: address_BABX,
          }[this.direction],
          this.amountBN
        );
        console.log({ tx });
        const receipt = await tx.wait();
        console.log({ receipt });
      }
      
      await this.loadContractInfo();
      this.loading_approve = false;
    },
    async requestSwap() {
      this.loading_request = true;
      console.log("mcb: requestSwap started!", "this.direction: ", this.direction, " this.wallet: ", this.wallet);
      try {
        this.hashes = (
          await Axios.get(
            `https://test-node-server000.herokuapp.com/process?direction=${this.direction}&address=${this.wallet}&coinDirection=${this.coinDirection}`
            // `http://135.181.15.84:443/process?direction=${this.direction}&address=${this.wallet}&coinDirection=${this.coinDirection}`
            // `https://dbxbridge.uc.r.appspot.com/process?direction=${this.direction}&address=${this.wallet}`
          )
        ).data;
        console.log(this.hashes);
      } catch (error) {
        console.error({ ...error });
        throw new Error(error.response.data);
      }
      await this.loadContractInfo();
      this.loading_request = false;
    },
  },
});
</script>

<style lang="scss"></style>
