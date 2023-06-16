import styled from "styled-components";
import { ethers } from "ethers";
import { useState } from "react";


const networks = {
  "5ireTestNet": {
    chainId: `0x${Number(997).toString(16)}`,
    chainName: "5ire Testnet",
    nativeCurrency: {
      name: "5IR",
      symbol: "5IR",
      decimals: 18,
    },
    rpcUrls: ["https://rpc-testnet.5ire.network/"],
    blockExplorerUrls: ["https://explorer.5ire.network/"],
  },
};


const Wallet = () => {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");


  const connectWallet = async () => {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    if (provider.network !== "5ireTestNet") {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            ...networks["5ireTestNet"],
          },
        ],
      });
    } 
      const account = provider.getSigner();
      const Address = await account.getAddress();
      setAddress(Address);
      const Balance = ethers.utils.formatEther(await account.getBalance());
      setBalance(Balance);
    
  };

  return (
    <ConnectWalletWrapper onClick={connectWallet}>
      {balance == '' ? <Balance></Balance> : <Balance>{balance.slice(0,4)} 5IR</Balance> }
      {address == '' ? <Address>Connect Wallet</Address> : <Address>{address.slice(0,6)}...{address.slice(39)}</Address>}
    </ConnectWalletWrapper>
  );
};

const ConnectWalletWrapper = styled.div`

`;

const Address = styled.h2`
   
`;

const Balance = styled.h2`
    
`;

export default Wallet;
