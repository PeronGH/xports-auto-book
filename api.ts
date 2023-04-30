import { signURL } from "./sign.ts";
import { splitURLAndParams } from "./utils.ts";
import {
  GetTicketSalesListResult,
  GetUserCouponsByUserIdAndTradeIdResult,
  PayOrderParams,
  PayOrderResult,
  QueryBookDaysByServiceIdResult,
  queryUserByUserIdResult,
  QueryVenueServicesResult,
  SingleTicketOrderParams,
  SingleTicketOrderResult,
} from "./types.ts";

export function queryUserByUserId(
  netUserId: string,
): Promise<queryUserByUserIdResult> {
  const url = new URL(
    "https://api.xports.cn/aisports-api/api/miniApp/user/queryUserByNetUserId",
  );

  url.searchParams.set("netUserId", netUserId);
  signURL(url);
  return fetch(url).then((res) => res.json());
}

export function queryVenueServices(): Promise<QueryVenueServicesResult> {
  const url = new URL(
    "https://api.xports.cn/aisports-api/api/venue/queryVenueServices",
  );

  signURL(url);
  return fetch(url).then((res) => res.json());
}

export function queryBookDaysByServiceId(
  serviceId: string,
): Promise<QueryBookDaysByServiceIdResult> {
  const url = new URL(
    "https://api.xports.cn/aisports-api/api/miniApp/field/queryBookDays",
  );

  url.searchParams.set("serviceId", serviceId);
  signURL(url);
  return fetch(url).then((res) => res.json());
}

export function getTicketSalesList(
  serviceId: string,
  date: string,
): Promise<GetTicketSalesListResult> {
  const url = new URL(
    "https://api.xports.cn/aisports-api/api/ticket/getTicketSaleList",
  );

  url.searchParams.set("serviceId", serviceId);
  url.searchParams.set("date", date);
  signURL(url);
  return fetch(url).then((res) => res.json());
}

export function getUserCouponsByUserIdAndTradeId(
  newUserId: string,
  tradeId: string,
): Promise<GetUserCouponsByUserIdAndTradeIdResult> {
  const url = new URL(
    "https://api.xports.cn/aisports-api/api/pay/getUseCoupons",
  );

  url.searchParams.set("netUserId", newUserId);
  url.searchParams.set("tradeId", tradeId);
  signURL(url);
  return fetch(url).then((res) => res.json());
}

export function singleTicketOrder(
  { netUserId, serviceId, date, ticketInfo }: SingleTicketOrderParams,
): Promise<SingleTicketOrderResult> {
  const url = new URL(
    "https://api.xports.cn/aisports-api/api/ticket/singleTicketOrder",
  );

  url.searchParams.set("netUserId", netUserId);
  url.searchParams.set("serviceId", serviceId);
  url.searchParams.set("date", date);
  url.searchParams.set("ticketInfo", JSON.stringify(ticketInfo));

  signURL(url);
  const [postURL, postParams] = splitURLAndParams(url);

  return fetch(postURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: postParams.toString(),
  }).then((res) => res.json());
}

export function payOrder(
  { netUserId, tradeId, payGroup }: PayOrderParams,
): Promise<PayOrderResult> {
  const url = new URL(
    "https://api.xports.cn/aisports-api/api/pay/payOrder",
  );

  url.searchParams.set("netUserId", netUserId);
  url.searchParams.set("tradeId", tradeId);
  url.searchParams.set("tradeTypeCode", "83");
  url.searchParams.set("payGroup", JSON.stringify(payGroup));

  signURL(url);
  const [postURL, postParams] = splitURLAndParams(url);

  return fetch(postURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: postParams.toString(),
  }).then((res) => res.json());
}
