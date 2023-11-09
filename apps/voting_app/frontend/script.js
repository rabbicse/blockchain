const connectWalletMsg = document.querySelector("#connectWalletMessage");
const connectWalletBtn = document.querySelector("#connectWallet");
const votingStation = document.querySelector("#votingStation");
const timerTime = document.querySelector("#time");
const timerMsg = document.querySelector("#timerMessage");
const mainBoard = document.querySelector("#mainBoard");
const voterForm = document.querySelector("#voterForm");
const vote = document.querySelector("#vote");
const voteBtn = document.querySelector("#sendVote");
const showResultContainer = document.querySelector("#showResultContainer");
const showResult = document.querySelector("#showResult");
const result = document.querySelector("#result");
const admin = document.querySelector("#admin");
const candidates = document.querySelector("#candidates");
const electionDuration = document.querySelector("#electionDuration");
const startElection = document.querySelector("#startElection");
const candidate = document.querySelector("#candidate");
const addTheCandidate = document.querySelector("#addTheCandidate");

// Configuring ethers
const contractAddress = "0xfB8632cD517600aaE9B63D7c7Ee5285dFD213E73";
const contractABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
    ],
    name: "addCandidate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "candidates",
    outputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "numberOfVotes",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "checkElectionPeriod",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "electionStarted",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "electionTimer",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "listOfVoters",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "resetAllVoterStatus",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "retrieveVotes",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "numberOfVotes",
            type: "uint256",
          },
        ],
        internalType: "struct Voting.Candidate[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string[]",
        name: "_candidates",
        type: "string[]",
      },
      {
        internalType: "uint256",
        name: "_votingDuration",
        type: "uint256",
      },
    ],
    name: "startElection",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
    ],
    name: "voteTo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_voter",
        type: "address",
      },
    ],
    name: "voterStatus",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "voters",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "votingEnd",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "votingStart",
    outputs: [
      {
        internalType: "uint256",
        name: "",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

let contract;
let signer;
const provider = new ethers.providers.Web3Provider(windom.etherium, 80001);
provider.send("eth_requestAccounts", []).then(() => {
  provider.listAccounts().then((accounts) => {
    signer = provider.getSigner(accounts[0]);
    contract = new ethers.contract(contractAddress, contractABI, signer);
  });
});

// Functions
const getAllCandidates = async function () {
  if (document.getElementById("candidateBoard")) {
    document.getElementById("candidateBoard").remove();
  }

  let board = document.createElement("table");
  board.id = "candidateBoard";
  mainBoard.appendChild(board);

  let tableHeader = document.createElement("tr");
  tableHeader.innerHTML = `<th>ID No.</th>
                             <th>Candidate</th>`;
  board.append(tableHeader);

  let candidates = await contract.retrieveVotes();
  for (let i = 0; i < candidates.length; i++) {
    let candidate = document.createElement("tr");
    candidate.innerHTML = `<td>${parseInt(candidates[i][0])}</td>
                           <td>${candidates[i][1]}</td>`;
    board.appendChild(candidate);
  }
}

const getResult = async function() {
    result.style.display = "flex";

    if(document.getElementById("resultBoard")) {
        document.getElementById("resultBoard").remove();
    }

    let resultBoard = document.createElement("table");
    resultBoard.id = "resultBoard";
    result.appendChild(resultBoard);

    let tableHeader = document.createElement("tr");
    tableHeader.innerHTML = `<th>ID No.</th>
                               <th>Candidate</th>
                               <th>Number of Votes</th>`;
    resultBoard.appendChild(tableHeader);

    let candidates = await contract.retrieveVotes();
  for (let i = 0; i < candidates.length; i++) {
    let candidate = document.createElement("tr");
    candidate.innerHTML = `<td>${parseInt(candidates[i][0])}</td>
                           <td>${candidates[i][1]}</td>
                           <td>${parseInt(candidates[i][2])}</td>`;
    resultBoard.appendChild(candidate);
  }
}

const refreshPage = function() {
    setInterval(async () => {
let time = await contract.electionTimer();
    }, 10000);
}
