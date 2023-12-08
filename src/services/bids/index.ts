import { AxiosResponse } from 'axios';
import httpClient from '../httpClient';
import {
  BidsListResponse,
  ChangeWinnerRequest,
  GetAllUserRashiResponse,
  PlaceBidRequest
} from '../types/bids';
import { DEFAULT_RESPONSE_TYPE } from '../types/auth';

const controller = 'bid';

class BidsService {
  GetAllUserRashi = async (): Promise<AxiosResponse<GetAllUserRashiResponse>> =>
    httpClient.get(`${controller}/list/userbid`);

  GetBidsList = async (): Promise<AxiosResponse<BidsListResponse>> =>
    httpClient.get(`${controller}/biddingList`);

  PlaceBid = async (
    payload: PlaceBidRequest
  ): Promise<AxiosResponse<DEFAULT_RESPONSE_TYPE>> =>
    httpClient.post(`${controller}/create`, payload);

  ChangeWinner = async (
    payload: ChangeWinnerRequest
  ): Promise<AxiosResponse<DEFAULT_RESPONSE_TYPE>> =>
    httpClient.post(`${controller}/winner/manually`, payload);
}

export default new BidsService();
