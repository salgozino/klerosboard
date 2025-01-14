import React, { useState } from 'react'
import { formatAmount, formatDate, formatPNK, getChainId } from '../lib/helpers';
import {
  DataGrid, GridRenderCellParams,
} from '@mui/x-data-grid'
import { CustomFooter } from '../components/DataGridFooter'
import { Link } from '@mui/material';
import { Link as LinkRouter, useSearchParams } from 'react-router-dom';
import { BigNumberish } from 'ethers';
import Header from '../components/Header';
import { useStakes } from '../hooks/useStakes';
import { Juror } from '../graphql/subgraph';
import { shortenAddress } from '@usedapp/core';
import CourtLink from '../components/CourtLink';

export default function Stakes() {
  let [searchParams] = useSearchParams();
  const chainId = getChainId(searchParams);
  const { data: stakes, isLoading } = useStakes(chainId);
  const [pageSize, setPageSize] = useState<number>(10);
  console.log(stakes);
  const columns = [
    {
      field: 'address', headerName: 'Juror', flex: 1, renderCell: (params: GridRenderCellParams<Juror>) => (
        <Link component={LinkRouter} to={'/profile/' + params.value!.id} children={shortenAddress(params.value!.id)} />
      )
    },
    {
      field: 'subcourtID', headerName: 'Court Name', flex: 2, renderCell: (params: GridRenderCellParams<BigNumberish>) => (
        <CourtLink chainId={chainId} courtId={params.value! as string} />
      )
    },
    {
      field: 'stake', headerName: 'Last Stake', flex: 1, valueFormatter: (params: { value: BigNumberish }) => {
        return formatPNK(params.value);
      }
    },
    {
      field: 'newTotalStake', headerName: 'Total Staked', flex: 1, valueFormatter: (params: { value: BigNumberish }) => {
        return formatAmount(params.value, chainId);
      }
    },
    {
      field: 'timestamp', headerName: 'Date', flex: 1, valueFormatter: (params: { value: BigNumberish }) => {
        return formatDate(params.value as number);
      }
    },
    {
      field: 'gasCost', headerName: 'Gas Cost', flex: 1, valueFormatter: (params: { value: BigNumberish }) => {
        return formatAmount(params.value, chainId);
      }
    },
  ];


  return (
    <div>
      <Header
        logo='../assets/icons/icosahedron_violet.png'
        title='Stakes Data'
        text="Check all juror's stakes, the amount, date, court, and gas spent."
      />


      {<DataGrid
        rows={stakes ? stakes! : []}
        columns={columns}
        loading={isLoading}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[10, 50, 100]}
        pagination
        disableSelectionOnClick
        autoHeight={true}
        components={{
          Footer: CustomFooter
        }}
      />}

    </div>
  )
}