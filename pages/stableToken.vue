<template>
  <div class="stable">
    <!-- Connect Modal>> -->
    <div
      v-if="connectStatus == true"
      class="connect_modal"
      @click="closeConnectModal"
    ></div>
    <div v-if="connectStatus == true" class="connect_modal_body">
      <div class="connect_modal_content">
        <div class="connect_modal_text"><span>Connect using</span></div>
        <div class="chain_btns">
          <div class="metabask_btn" @click="closeConnectModal">
            <div class="metamask_img">
              <img src="/connect/metamask.svg" alt="" />
            </div>
            <div class="metamask_text">MetaMask</div>
          </div>
          <div class="wallet_btn" @click="closeConnectModal">
            <div class="wallet_img">
              <img src="/connect/walletConnect.svg" alt="" />
            </div>
            <div class="wallet_text">
              WalletConnect
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End Connect Modal -->

    <!-- Mobile Header -->
    <div class="mobile_header" v-if="mobileStatus == true">
      <div class="row">
        <div class="col-s-3 col-ss-3" @click="closeMobileHandler"></div>
        <div class="col-s-9 col-ss-9 mobile_content">
          <div class="top_content">
            <div class="mobile_connect" @click="connectHandler">
              <span class="mobile_connect_btn">CONNECT</span>
            </div>
            <div class="mobile_fourBtn">
              <button @click="worksHandler">How It Works</button>
              <button @click="faqHandler">FAQ</button>
              <button @click="userGuideHandler">User guide</button>
              <button @click="videoGuideHandler">Video guide (YouTube)</button>
            </div>
          </div>
          <div class="bottom_content">
            <div class="support_btn" @click="supportHandler">
              <span>Support</span>
              <div class="support_iamge">
                <img
                  src="/mobile/telegram.svg"
                  alt=""
                  width="25px"
                  height="25px"
                />
              </div>
            </div>
            <div class="three_btn">
              <div class="telegram_btn">
                <img src="/mobile/twitter.svg" alt="" @click="twitterHandler" />
              </div>
              <div class="telegram_btn">
                <img src="/mobile/youtube.svg" alt="" @click="youtubeHandler" />
              </div>
              <div class="telegram_btn" @click="telegramHandler">
                <img src="/mobile/telegram.svg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End Mobile Header -->

    <!-- Header -->
    <div class="stable_header">
      <a class="header_logo" href="#">
        <img src="/images/general/headerLogo.svg" alt="" />
        <div class="header_text">Bridge</div>
      </a>
      <div class="account_btn" @click="connectHandler">
        <button>CONNECT</button>
      </div>
      <span class="mobile_icon" @click="mobileHandler">
        <img src="/select/mobileIcon.svg" alt="" />
      </span>
    </div>
    <!-- End Header -->

    <!-- Content -->
    <div class="row content">
      <!-- DBX -->
      <div class="col-3 col-s-1 left_dbx"></div>
      <div class="col-2 content_dbx">
        <div class="dbx_image">
          <img src="/images/general/ufo.svg" alt="" />
          <div class="dbx_large_text">DBX Bridge</div>
          <div class="dbx_small_text">
            Fastest way to transfer you DBX coins through popular blockchain
            system’s
          </div>
        </div>
        <div class="four_button">
          <a href="">How it works</a>
          <a href="">FAQ</a>
          <a href="">User guide</a>
          <a href="">Video guide {Youtube}</a>
        </div>
      </div>
      <!-- Transfer -->
      <div class="col-4 col-s-10 transfer_content">
        <div v-if="transferStatus == true" class="transfer_modal">
          <div class="transfer_modal_layout">
            <div class="close_btn" @click="closeTransfer">
              <img src="/connect/closeBtn.svg" alt="" />
            </div>
            <div class="transfer_modal_text">
              <span>You selected wrong network.</span>
              <span>Change your network to ERC20 in</span>
              <span>your provider (MetaMask)</span>
            </div>
            <div class="transfer_modal_topic_text">Related topics:</div>
            <div class="transfer_one_btn" @click="closeTransfer">
              <span>How to change network in MetaMask</span>
            </div>
            <div class="transfer_two_btn" @click="closeTransfer">
              <span>How to add DBX Smart Network to</span>
              <span>MetaMask</span>
            </div>
          </div>
        </div>
        <div class="from">
          <div class="from_text">From</div>
          <SelectCoin />
        </div>
        <div class="to">
          <div class="to_text">To</div>
          <SelectChangeCoin />
        </div>
        <div class="transfer_btn" @click="transferModalHandler">
          <span class="transfer_text">Transfer</span>
        </div>
      </div>
      <div class="col-3 col-s-1 transfer_right"></div>
    </div>
    <!-- End Content -->
  </div>
</template>

<script>
import SelectCoin from './SelectCoin'
import SelectChangeCoin from './SelectChangeCoin'
export default {
  components: {
    SelectCoin,
    SelectChangeCoin,
  },
  data() {
    return {
      mobileStatus: false,
      connectStatus: false,
      transferStatus: false,
    }
  },
  mounted() {},
  created() {},
  methods: {
    mobileHandler() {
      this.mobileStatus = !this.mobileStatus
    },
    closeMobileHandler() {
      this.mobileStatus = false
    },
    closeConnectModal() {
      this.connectStatus = false
    },
    connectHandler() {
      this.connectStatus = true
    },
    transferModalHandler() {
      this.transferStatus = true
    },
    closeTransfer() {
      this.transferStatus = false
    },
    supportHandler() {},
    telegramHandler() {},
    twitterHandler() {},
    youtubeHandler() {},
    worksHandler() {},
    faqHandler() {},
    userGuideHandler() {},
    videoGuideHandler() {},
  },
}
</script>

<style scoped>
/* ALL>> */
.stable {
  position: relative;
  /* overflow-y: hidden; */
}
/* End ALL */
/* TransferModal>> */
.transfer_modal {
  position: absolute;
  top: 0px;
  margin-left: -2%;
  background: rgba(122, 24, 213, 0.4);
  padding: 0px 10px;
  width: 100%;
  height: 100%;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 150;
}
.transfer_modal_layout {
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
  position: relative;
  width: 75%;
  height: 52%;
  z-index: 200;
  border-radius: 25px;
  background: white;
  margin: 20px;
}
.close_btn {
  cursor: pointer;
  position: absolute;
  top: 15px;
  right: 15px;
}
.transfer_modal_text {
  /* position: absolute;
  top: 25px; */
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
}
.transfer_modal_topic_text {
  margin-top: 3px;
  margin-bottom: 5px;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  margin-left: 20px;
}
.transfer_one_btn {
  cursor: pointer;
  display: flex;
  justify-content: center;
  border-radius: 25px;
  margin-left: 20px;
  margin-right: 20px !important;
  width: 88%;
  background: #edd9ff;
  padding: 12px 0px;
  margin-bottom: 8px;
}
.transfer_two_btn {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
  margin-left: 20px;
  margin-right: 20px !important;
  width: 88%;
  background: #edd9ff;
  padding: 12px 0px;
}
@media screen and (max-width: 1400px) {
  .transfer_modal {
    font-size: 11px !important;
  }
}
@media screen and (max-width: 1200px) {
  .transfer_modal {
    font-size: 9px !important;
  }
}
@media screen and (max-width: 768px) {
  .transfer_modal {
    font-size: 14px !important;
  }
}
@media screen and (max-width: 600px) {
  .transfer_modal {
    font-size: 11px !important;
    margin-left: -4% !important;
  }
}
/* End TransferModal>> */

/* Connect Modal>> */
.connect_modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0px;
  width: 100%;
  height: 100vh;
  background: #4c1481;
  opacity: 0.25;
  z-index: 100 !important;
}
.connect_modal_content {
  border-radius: 25px;
  position: absolute;
  top: 30%;
  background: #edd9ff;
  width: 350px;
  height: 350px;
  z-index: 200;
}
.connect_modal_text {
  margin-top: 17%;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 700;
  font-size: 26px;
  display: flex;
  justify-content: center;
}
.connect_modal_body {
  display: flex;
  justify-content: center;
  /* align-items: start; */
}
.chain_btns {
  margin-top: 10%;
  margin-left: 10%;
  margin-right: 10%;
  /* width: 100%; */
}
.metabask_btn {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  cursor: pointer;
  padding: 20px 0px;
  border-radius: 25px;
  margin-bottom: 10%;
  background: white;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.metabask_btn .metamask_img {
  position: absolute;
  left: 20px;
}
.wallet_btn {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  cursor: pointer;
  padding: 20px 0px;
  border-radius: 25px;
  background: white;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.wallet_btn .wallet_img {
  position: absolute;
  left: 20px;
}
/* End Connect Modal */

/* Mobile >> */
@media screen and (max-width: 768px) {
  .connect_modal_content {
    background: #7a18d5;
    /* opacity: 0.8; */
    width: 250px;
  }
  .connect_modal_text {
    color: white;
  }
  .mobile_header {
    top: 0px;
    position: absolute;
    right: 0px !important;
    /* right: 130% !important; */
    background: rgba(255, 255, 255, 0.7);
    z-index: 100 !important;
    width: 100%;
    height: 100vh;
    display: block !important;
    /* transition: 0.5s !important; */
  }
  .mobile_content {
    width: auto;
    height: 720px !important;
    background: #edd9ff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* margin-left: 10% !important; */
  }

  .top_content .mobile_connect {
    margin-top: 30px;
    display: flex;
    justify-content: center;
  }
  .mobile_connect_btn {
    cursor: pointer;
    background: #7a18d5;
    padding: 25px 40px;
    border-radius: 25px;
    color: white;
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 0%;
    transition: 0.3s;
  }
  .mobile_connect_btn:hover {
    background: white !important;
    color: #7a18d5 !important;
    border: 2px solid #7a18d5 !important;
  }
  .mobile_fourBtn {
    display: flex;
    flex-direction: column;
    align-items: start;
    margin-left: 20% !important;
    margin-top: 20% !important;
  }
  .mobile_fourBtn button {
    color: #490389;
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    margin-top: 20px;
  }

  .bottom_content {
    margin-left: 10% !important;
    margin-right: 10% !important;
    margin-bottom: 30px !important;
  }
  .support_btn {
    cursor: pointer;
    margin-bottom: 20px;
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    padding: 12px 0px;
    background: white;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  .support_iamge {
    position: absolute;
    left: 20px !important;
  }
  .three_btn {
    display: flex;
    justify-content: space-between;
  }
  .telegram_btn {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 12px;
    background: white;
    border-radius: 50%;
  }

  .account_btn {
    display: none;
  }
  .stable_header {
    display: flex;
    justify-content: start !important;
  }
  .header_logo {
    margin-left: 20px;
  }
  .content_dbx {
    display: none !important;
  }
  .transfer_content {
    margin-left: 20px !important;
    margin-right: 20px !important;
    width: 100% !important;
    height: 440px !important;
  }
  .mobile_icon {
    cursor: pointer;
    display: block !important;
  }
}
@media screen and (max-width: 1200px) {
  .dbx_large_text {
    font-size: 16px !important;
    position: absolute;
    bottom: 50px !important;
  }
  .dbx_small_text {
    position: absolute;
    bottom: -30px !important;
    font-size: 9px !important;
  }
  .four_button {
    margin-top: 50px !important;
    margin-left: 5px !important;
  }
}
.mobile_header {
  display: none;
  transition: 0.5;
}
/* End Mobile>> */

/* Header>> */
.stable_header {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #edd9ff;
  height: 100px;
  width: auto;
}
.mobile_icon {
  position: absolute;
  right: 20px;
  display: none;
}
.header_logo {
  cursor: pointer;
  display: flex;
  align-items: center;
}
.header_text {
  font-size: 24px;
  font-family: bold;
}
.account_btn {
  cursor: pointer;
  color: white;
  background: #7a18d5;
  border-radius: 25px;
  padding: 20px 22px;
  transition: 0.5s;
}
.account_btn:hover {
  background: white;
  border: 2px solid #7a18d5;
  /* border-radius: 25px; */
  /* padding: 20px 22px; */
  /* border: 2px solid #7a18d5; */
}
.account_btn:hover button {
  color: #7a18d5;
}
.account_btn button {
  font-size: 18px;
  font-weight: 700;
  font: 'Montserrat';
  color: white;
}
/* Header End */

/* Select>> */
.select {
  width: 100%;
}
/* End Select>> */

/* Content>> */
.content {
  margin-top: 50px;
  margin-left: 1% !important;
  margin-right: 5% !important;
  width: 88%;
}
.content_dbx {
  margin-top: 5%;
  height: 425px !important;
  border-radius: 25px;
  background: #edd9ff;
  margin: 10px;
  width: 100%;
}
.transfer_content {
  margin-top: 5%;
  border-radius: 25px;
  background: #edd9ff;
  margin-left: 2%;
  width: 100%;
  margin: 10px;
  position: relative;
}
.dbx_image {
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.dbx_image .dbx_large_text {
  font-size: 26px;
  position: absolute;
  bottom: 70px;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 700;
}
.dbx_image .dbx_small_text {
  font-size: 11px;
  position: absolute;
  bottom: 20px;
}
.four_button {
  display: flex;
  flex-direction: column;
  justify-content: start;
  margin-left: 30px;
}
.four_button a {
  color: #490389;
  margin-bottom: 5px;
}
.from_text {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 700;
  font-size: 21px;
  margin-top: 40px;
  margin-left: 20px;
  margin-bottom: 10px;
}
.to_text {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 700;
  font-size: 21px;
  margin-top: 20px;
  margin-left: 20px;
  margin-bottom: 10px;
}
.transfer_btn {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 90px;
  margin-top: 30px;
  background: #7a18d5;
  border-radius: 25px;
  color: white;
  transition: 0.5s;
}
.transfer_btn:hover {
  background: white;
  color: #7a18d5 !important;
  border: 2px solid #7a18d5;
}
.transfer_text {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 700;
  font-size: 21px;
  line-height: 100%;
}
/* End Content */

/* Responsive>> */
.row::after {
  content: '' !important;
  clear: both !important;
  display: table !important;
}
[class*='col-'] {
  float: center;
  /* padding: 15px; */
}
[class*='col-'] {
  width: 100%;
}
[class*='col-'] {
  width: 100%;
}
/* For tablets: */
@media only screen and (min-width: 600px) {
  .col-s-1 {
    width: 8.33%;
  }
  .col-s-2 {
    width: 16.66%;
  }
  .col-s-3 {
    width: 25%;
  }
  .col-s-4 {
    width: 33.33%;
  }
  .col-s-5 {
    width: 41.66%;
  }
  .col-s-6 {
    width: 50%;
  }
  .col-s-7 {
    width: 58.33%;
  }
  .col-s-8 {
    width: 66.66%;
  }
  .col-s-9 {
    width: 75%;
  }
  .col-s-10 {
    width: 83.33%;
  }
  .col-s-11 {
    width: 91.66%;
  }
  .col-s-12 {
    width: 100%;
  }
}
@media only screen and (max-width: 600px) {
  .col-ss-1 {
    width: 8.33%;
  }
  .col-ss-2 {
    width: 16.66%;
  }
  .col-ss-3 {
    width: 25%;
  }
  .col-ss-4 {
    width: 33.33%;
  }
  .col-ss-5 {
    width: 41.66%;
  }
  .col-ss-6 {
    width: 50%;
  }
  .col-ss-7 {
    width: 58.33%;
  }
  .col-ss-8 {
    width: 66.66%;
  }
  .col-ss-9 {
    width: 75%;
  }
  .col-ss-10 {
    width: 83.33%;
  }
  .col-ss-11 {
    width: 91.66%;
  }
  .col-ss-12 {
    width: 100%;
  }
}
/* For desktop: */
@media only screen and (min-width: 768px) {
  .col-1 {
    width: 8.33%;
  }
  .col-2 {
    width: 16.66%;
  }
  .col-3 {
    width: 25%;
  }
  .col-4 {
    width: 33.33%;
  }
  .col-5 {
    width: 41.66%;
  }
  .col-6 {
    width: 50%;
  }
  .col-7 {
    width: 58.33%;
  }
  .col-8 {
    width: 66.66%;
  }
  .col-9 {
    width: 75%;
  }
  .col-10 {
    width: 83.33%;
  }
  .col-11 {
    width: 91.66%;
  }
  .col-12 {
    width: 100%;
  }
}
/* End Responsive */
</style>
