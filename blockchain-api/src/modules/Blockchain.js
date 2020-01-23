class Blockchain {
  #api_key;
  #URL = 'https://blockchain.info/';
  
  constructor(api_key) {
    this.#api_key = api_key
  }
  
  checkConfig() {
    return {
      api_key: this.api_key
    }
  }
}

module.exports = Blockchain;