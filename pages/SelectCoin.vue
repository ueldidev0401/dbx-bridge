<template>
  <div class="select_from">
    <div class="select_home" @click="handleSelectform">
      <div class="left_from">
        <div class="chain">
          <img src="/select/ethereum.svg" alt="" />
          <span class="chain_text">Ethereum</span>
        </div>
        <div>
          <v-icon slot="append" size="12">fa fa-chevron-down</v-icon>
        </div>
      </div>
      <div class="right_from">
        <div class="symbol">
          <img src="/select/usdt.svg" alt="" />
          <div class="">USDT</div>
        </div>
      </div>
    </div>
    <ul v-if="selectStatus == true">
      <li @click="selectBSC">
        <div class="left_from">
          <div class="chain">
            <img src="/select/bsc.svg" alt="" />
            <span class="chain_text">BSC</span>
          </div>
          <div></div>
        </div>
        <div class="right_from">
          <div class="other_symbol">
            <img src="/select/busd.svg" alt="" />
            <div class="">BUSD</div>
          </div>
        </div>
      </li>
      <li>
        <div class="left_from">
          <div class="chain">
            <img src="/select/dbx.svg" alt="" />
            <span class="chain_text">DBX Smart Network</span>
          </div>
          <div></div>
        </div>
        <div class="right_from">
          <div class="other_symbol">
            <img src="/select/xus.svg" alt="" />
            <div class="">XUS</div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      index: 0,
      selectStatus: false,
      selectCoints: [
        {
          Chainname: 'Ehtereum',
          ChainIcon: '/select/bsc.svg',
          SymbolName: 'USDT',
          SymbolIcon: '/select/usdt.svg',
        },
        {
          Chainname: 'BSC',
          ChainIcon: '/select/bsc.svg',
          SymbolName: 'USDT',
          SymbolIcon: '/select/usdt.svg',
        },
        {
          Chainname: 'EDX',
          ChainIcon: '/select/bsc.svg',
          SymbolName: 'USDT',
          SymbolIcon: '/select/usdt.svg',
        },
      ],
    }
  },
  methods: {
    handleSelectform() {
      this.selectStatus = !this.selectStatus
    },
  },
}
</script>
<style scoped>
.select_from {
  position: relative;
  background: white;
  height: 80px;
  border-radius: 25px;
}
.select_home {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}
.select_from ul {
  z-index: 99;
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
  width: 100%;
  top: 80px;
  position: absolute;
  left: 0px;
}
.select_from ul li {
  background: white;
  height: 80px;
  display: flex;
}
.select_from ul li:nth-child(2n-1) {
  background: rgba(191, 133, 245, 1);
  height: 80px;
  display: flex;
}

.from_text {
  margin-top: 20px;
  margin-left: 20px;
  display: flex;
  align-items: center;
}
.left_from {
  width: 70%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 22px;
}
.right_from {
  /* background: rgba(237, 217, 255, 0.42); */
  height: 100%;
  width: 30%;
  padding: 3px;
}
.symbol {
  background: rgba(237, 217, 255, 0.42);
  border-radius: 25px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
}
.other_symbol {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
}
.chain {
  display: flex;
  align-items: center;
}
.chain_text {
  margin-left: 10px;
  font-weight: 600;
}
</style>
