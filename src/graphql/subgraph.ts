import { BigNumberish } from "@ethersproject/bignumber";

export interface KlerosCounter {
    id: string
    courtsCount: BigNumberish
    disputesCount: BigNumberish
    openDisputes: BigNumberish
    closedDisputes: BigNumberish
    evidencePhaseDisputes: BigNumberish
    commitPhaseDisputes: BigNumberish
    votingPhaseDisputes: BigNumberish
    appealPhaseDisputes: BigNumberish
    activeJurors: BigNumberish
    inactiveJurors: BigNumberish
    drawnJurors: BigNumberish
    numberOfArbitrables: BigNumberish
    tokenStaked: BigNumberish
    totalETHFees: BigNumberish
    totalTokenRedistributed: BigNumberish
    totalUSDthroughContract: BigNumberish
}

export const KLEROSCOUNTERS_FIELDS = `
    fragment KlerosCountersFields on KlerosCounter {
        id
        courtsCount
        disputesCount
        openDisputes
        closedDisputes
        evidencePhaseDisputes
        commitPhaseDisputes
        votingPhaseDisputes
        appealPhaseDisputes
        activeJurors
        inactiveJurors
        drawnJurors
        numberOfArbitrables
        tokenStaked
        totalETHFees
        totalTokenRedistributed
        totalUSDthroughContract
    }
`;

export interface StakeData {
    id: BigNumberish
    juror: string
    stake: BigNumberish
    totalStake: BigNumberish
    subcourtId: BigNumberish
    timestamp: BigNumberish
    gascost: BigNumberish
}

export enum DisputePeriod {
    evidence = 0,
    cast = 1,
    vote = 2,
    appeal = 3,
    execution = 4
}

export interface Dispute {
    id: string,
    subcourtID: {
        id: string,
        timePeriods: [BigNumberish]
        policy: {
            policy: string
        }
    }
    arbitrable: { id: string }
    creator: { id: string }
    currentRulling: number
    period: string,
    lastPeriodChange: BigNumberish
    courtName: string
    rounds: [Round]
    startTime: BigNumberish
    ruled: boolean
}

export const DISPUTE_FIELDS = `
    fragment DisputeFields on Dispute {
        id
        subcourtID {
        id
        timePeriods
        policy{policy}
    }
    arbitrable{id}
    creator{id:string}
    currentRulling
    period
    lastPeriodChange
    rounds
    startTime
    ruled
    }
`;


export interface Policy {
    id: string
    subcourtID: BigNumberish
    policy: string
    contractAddress: string
    timestamp: BigNumberish
    blockNumber: BigNumberish
}

export interface Round {
    id: string
    winningChoice: BigNumberish
    startTime: BigNumberish
    votes: [
        {
            address: { id: string }
            choice: BigNumberish
            votes: boolean
            timestamp: BigNumberish
        }]
}

export interface Vote {
    id: string
    dispute: { id: string }
    round: { id: string }
    voteID: BigNumberish
    address: { id: string }
    choice: BigNumberish
    voted: boolean
    salt: BigNumberish
    timestamp: BigNumberish
    commit: string
    commitGasUsed: BigNumberish
    commitGasPrice: BigNumberish
    commitGasCost: BigNumberish
    castGasUsed: BigNumberish
    castGasPrice: BigNumberish
    castGasCost: BigNumberish
    totalGasCost: BigNumberish
}

export const ARBITRABLE_FIELDS = `
    fragment ArbitrableFields on Arbitrable {
        id
        disputesCount
        openDisputes
        closedDisputes
        evidencePhaseDisputes
        commitPhaseDisputes
        votingPhaseDisputes
        appealPhaseDisputes
        ethFees
    }
`;

export interface Arbitrable {
    disputesCount: BigNumberish
    openDisputes: BigNumberish
    closedDisputes: BigNumberish
    evidencePhaseDisputes: BigNumberish
    commitPhaseDisputes: BigNumberish
    votingPhaseDisputes: BigNumberish
    appealPhaseDisputes: BigNumberish
    ethFees: BigNumberish
    ethRewards: BigNumberish
    disputes: [{
        creator: { id: string }
        currentRulling: number
        period: string,
        lastPeriodChange: BigNumberish
        courtName: string
        rounds: [Round]
        startTime: BigNumberish
        ruled: boolean
        subcourtID: {
            id: string,
            timePeriods: [BigNumberish]
            policy: {
                policy: string
            }
        }
    }]
}

export interface Court {
    id: string
    subcourtId: number
    policy: {policy: string}
    parent: {id: string}
    disputesCount: BigNumberish
    openDisputes: BigNumberish
    closedDisputes: BigNumberish
    evidencePhaseDisputes: BigNumberish
    commitPhaseDisputes: BigNumberish
    votingPhaseDisputes: BigNumberish
    appealPhaseDisputes: BigNumberish
    ethFees: BigNumberish
    activeJurors: BigNumberish
    disputesNum: BigNumberish
    disputesClosed: BigNumberish
    disputesOngoing: BigNumberish
    feeForJuror: BigNumberish
    minStake: BigNumberish
    alpha: BigNumberish
    tokenStaked: BigNumberish
}

export const COURT_FIELDS = `
    fragment CourtFields on Court {
        id
        disputesCount
        openDisputes
        closedDisputes
        evidencePhaseDisputes
        commitPhaseDisputes
        votingPhaseDisputes
        appealPhaseDisputes
        ethFees
        activeJurors
        disputesNum
        disputesClosed
        disputesOngoing
        feeForJuror
        minStake
        alpha
        tokenStaked
    }
`;