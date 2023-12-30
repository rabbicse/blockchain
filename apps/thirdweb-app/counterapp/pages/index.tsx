import {
  ConnectWallet,
  Web3Button,
  useAddress,
  useContract,
  useContractRead,
} from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import { NextPage } from "next";
import { CONTRACT_ADDRESS } from "../constants/addresses";

const Home: NextPage = () => {
  const address = useAddress();
  console.log(`address: ${address}`);
  const { contract } = useContract(CONTRACT_ADDRESS);
  const { data: counter, isLoading: isCounterLoading } = useContractRead(
    contract,
    "getCounter"
  );

  const { data: owner } = useContractRead(contract, "owner");

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <ConnectWallet />
        <h1>Counter Dapp</h1>
        <div>{isCounterLoading ? <p>0</p> : <p>{counter.toNumber()}</p>}</div>
        {address && (
          <div className={styles.buttonContainer}>
            <Web3Button
              contractAddress={CONTRACT_ADDRESS}
              action={(contract) => contract.call("decrement")}
            >
              -
            </Web3Button>
            <Web3Button
              contractAddress={CONTRACT_ADDRESS}
              action={(contract) => contract.call("increment")}
            >
              +
            </Web3Button>
          </div>
        )}

        {address == owner ? (
          <Web3Button
            contractAddress={CONTRACT_ADDRESS}
            action={(contract) => contract.call("reset")}
          >
            Reset
          </Web3Button>
        ) : address ? (
          <p>You are not the owner of the contract</p>
        ) : (
          <p>Connect your wallet to interact with the counter</p>
        )}
      </div>
    </main>
  );
};

export default Home;
