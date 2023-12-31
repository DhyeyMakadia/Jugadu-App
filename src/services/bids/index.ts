import { AxiosResponse } from 'axios';
import httpClient from '../httpClient';
import {
  BidsListResponse,
  BidsWinnerListResponse,
  ChangeWinnerRequest,
  GetAllUserRashiResponse,
  MyBidsResponse,
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

  GetMyBidsList = async (): Promise<AxiosResponse<MyBidsResponse>> =>
    httpClient.get(`${controller}/mybidding/list`);

  WinnerList = async (): Promise<AxiosResponse<BidsWinnerListResponse>> =>
    httpClient.get(`${controller}/winner/list`);
}

export default new BidsService();
