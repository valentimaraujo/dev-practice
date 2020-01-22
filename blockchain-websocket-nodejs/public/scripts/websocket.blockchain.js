const API_BITCOIN = "ws://ws.blockchain.info/inv";
const ADDRESS_BITCOIN = "45675bff-cec1-408f-9b52-d854526f457d";
let blockChainSocket = new WebSocket(API_BITCOIN);

blockChainSocket.onopen = function (e) {
    console.log("block chain connected");
    blockChainSocket.send(JSON.stringify({"op": "addr_sub", "addr": ADDRESS_BITCOIN}));
};

blockChainSocket.onmessage = function (message) {
    try {
        let response = JSON.parse(message.data);
        let getOuts = response.x.out;
        let countOuts = getOuts.length;
        let amount = response.x.out[0].value;
        let calAmount = amount / 100000000;
        document.getElementById('waitingBTC').innerHTML = "RECEIVED: " + calAmount + " BTC";
        console.log(response);
    } catch (e) {
        console.log(e);
    }
};

blockChainSocket.onerror = function (e) {
    console.log(e);
};
blockChainSocket.onclose = function (e) {
    console.log(e);
};
