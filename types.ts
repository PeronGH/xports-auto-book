import { z } from "https://deno.land/x/zod@v3.21.4/mod.ts";

export interface SingleTicketOrderParams {
  netUserId: string;
  serviceId: string;
  date: `${number}-${number}-${number}`;
  ticketInfo: TicketInfo[];
}

export interface TicketInfo {
  ticketTypeId: number;
  ticketTimeId: number;
  num: number;
  ticketPrice: number;
  cashPledge: number;
}

export interface PayOrderParams {
  netUserId: string;
  tradeId: string;
  payGroup: PayGroupInfo[];
}

export interface PayGroupInfo {
  couponNo: string;
  payMoney: number;
  realPay: number;
  payMode: number;
}

export interface AutoBookParams {
  netUserId: string;
  serviceName: string;
  date: `${number}-${number}-${number}`;
  timeName: `${number}-${number}`;
}

export interface QueryVenueServicesResult {
  sysdate: string;
  serviceList: ServiceItem[];
  error: number;
  message: string;
}

export interface ServiceItem {
  fieldTag: number;
  centerId: number;
  endDate: string;
  endSegment: number;
  serviceName: string;
  serviceLevel: string;
  fullTag: string;
  startSegment: number;
  picUrl: string;
  bookDays: number;
  bookingChannels: string;
  venueId: number;
  serviceId: number;
  startDate: string;
}

export interface queryUserByUserIdResult {
  sysdate: string;
  netUser?: NetUser;
  error: number;
  message: string;
}

export interface NetUser {
  netUserId: number;
  name: string;
  mobileNum: string;
  email: string;
  gender: string;
  status: string;
  centerId: number;
  createTime: string;
  updateTime: string;
  token: string;
  tokenTime: string;
  avatar: string;
}

export interface QueryBookDaysByServiceIdResult {
  sysdate: string;
  week: BookDay[];
  error: number;
  message: string;
}

export interface BookDay {
  date: `${number}`;
  week: string;
  day: string;
}

export interface GetTicketSalesListResult {
  sysdate: string;
  lowestPrice?: number;
  error: number;
  message: string;
  ticketTypeList?: TicketTypeItem[];
}

export interface TicketTypeItem {
  ticketTypeId: number;
  ticketTypeName: string;
  chargeMode: string;
  venueId: number;
  serviceId: number;
  serviceName: string;
  priceItem: number;
  startDate: string;
  endDate: string;
  useStartDate: string;
  useEndDate: string;
  ticketKind: string;
  groupTag: string;
  validDays: number;
  price: number;
  priceUnit: number;
  priceType: string;
  startSegment: number;
  endSegment: number;
  beginDay: string;
  endDay: string;
  ticketNum: number;
  dayAmount: number;
  dayRemain: number;
  buyLimit: number;
  refundRuleDetails: RefundRuleDetail[];
  timeName: string;
  timeId: number;
  picUrl: string;
  timeout: number;
  timeoutMoney: number;
  timeoutUnit: number;
  fetchBraceletTag: string;
  needPeriodLimit: boolean;
}

export interface RefundRuleDetail {
  ruleId: number;
  ticketState: string;
  valueType: string;
  value: string;
  refundTag: string;
}

export interface SingleTicketOrderResult {
  repeatEnterHallTag: string;
  tickets: Ticket[];
  num: number;
  error: number;
  message: string;
  tradeDesc: string;
  ticketDetails: TicketDetail[];
  sysdate: string;
  expireTime: string;
  payFee: number;
  trade: Trade;
  tradeExpireTime: string;
  showWeixin: boolean;
  venueId: number;
  cashPledgeSum: number;
  tradeId: number;
}

export interface Ticket {
  ticketId: number;
  tradeId: number;
  ticketNo: string;
  serviceId: number;
  venueId: number;
  startSegment: number;
  endSegment: number;
  startTime: string;
  endTime: string;
  payMoney: number;
  discount: number;
  state: string;
  createTime: string;
  ticketSourceType: string;
  effectDate: string;
  expireDate: string;
  ticketType: number;
  priceItem: number;
  couponAmount: number;
  groupTag: string;
  fullTag: string;
  ticketTimeId: number;
  tenantId: number;
}

export interface TicketDetail {
  ticketId: number;
  tradeId: number;
  ticketNo: string;
  serviceId: number;
  venueId: number;
  startSegment: number;
  endSegment: number;
  startTime: string;
  endTime: string;
  payMoney: number;
  discount: number;
  state: string;
  createTime: string;
  ticketSourceType: string;
  effectDate: string;
  expireDate: string;
  ticketType: number;
  priceItem: number;
  couponAmount: number;
  groupTag: string;
  fullTag: string;
  ticketTimeId: number;
  tenantId: number;
  ticketTypeName: string;
}

export interface Trade {
  tradeId: number;
  subscribeId: number;
  tradeTypeCode: number;
  priority: number;
  subscribeState: string;
  acceptDate: string;
  acceptMonth: string;
  tradeStaffId: number;
  finishStaffId: number;
  cancelTag: string;
  payState: string;
  payTfee: number;
  centerId: number;
  venueId: number;
  businessType: string;
  expireTime: string;
  serviceId: number;
  tradeDesc: string;
  channelId: number;
  channelAppId: number;
}

export interface GetUserCouponsByUserIdAndTradeIdResult {
  sysdate: string;
  unUseCouponList: UnUseCouponItem[];
  couponList: CouponItem[];
  error: number;
  message: string;
}

export interface UnUseCouponItem {
  centerId: number;
  couponName: string;
  parValue: number;
  useRuleDesc: string;
  ecardNo: string;
  couponNo: string;
  remark: string;
  couponId: number;
  usableVenueId: number;
  couponValue: string;
  venueName: string;
  collectVenueId: number;
  balance: number;
  venueId: number;
  valueType: string;
  custId: number;
  expireDate: string;
  state: string;
  effectiveDate: string;
  centerName: string;
  recentExpireTag: string;
}

export interface CouponItem {
  couponId: number;
  couponName: string;
  couponCat: string;
  valueType: string;
  value: number;
  startDate: string;
  endDate: string;
  remark: string;
  validDays: number;
  anonymTag: string;
  startSegment: number;
  endSegment: number;
  effectiveDate: string;
  expireDate: string;
  weekDays: string;
  venueId: number;
  centerId: number;
  createTime: string;
  updateTime: string;
  updateStaffId: number;
  useTag: string;
  balance: number;
  services: string;
  custName: string;
  mobileNum: string;
  couponNo: string;
  couponChecked: string;
  tradeTypeCode: number;
  custId: number;
  limitTag: string;
  limitUseTimes: string;
  ecardNo: string;
}

export interface PayOrderResult {
  redirect: string;
  payTradeId: number;
  tradeTicketList: TradeTicketList[];
  printList: PrintList[];
  error: number;
  message: string;
  cardBalances: any[];
  venueName: string;
  sysdate: string;
  trade: Trade;
  balance: number;
  printTag: string;
  venuePhone: string;
  centerName: string;
}

export interface TradeTicketList {
  effectDate: string;
  ecardNo: string;
  discount: number;
  ticketTypeId: number;
  endSegment: number;
  venueName: string;
  startSegment: number;
  payMoney: number;
  ticketNo: string;
  chargeMode: string;
  groupTag: string;
  ticketTypeName: string;
  ticketId: number;
  centerName: string;
}

export interface PrintList {
  printTemplate: PrintTemplate;
  printData: PrintDaum[];
}

export interface PrintTemplate {
  templateId: number;
  templateName: string;
  templateType: string;
  centerId: number;
  content: string;
  updateTime: string;
}

export interface PrintDaum {
  ticketId: number;
  tradeId: number;
  ticketNo: string;
  serviceId: number;
  venueId: number;
  startSegment: number;
  endSegment: number;
  startTime: string;
  endTime: string;
  payMoney: number;
  discount: number;
  state: string;
  createTime: string;
  ticketSourceType: string;
  effectDate: string;
  expireDate: string;
  ecardNo: string;
  custId: number;
  custName: string;
  ticketType: number;
  couponAmount: number;
  groupTag: string;
  ticketName: string;
  venueName: string;
  centerName: string;
  staffId: number;
  startSeg: string;
  endSeg: string;
  ticketKind: string;
  cardBalances: any[];
  printTimes: number;
  venuePhone: string;
  payfeeModes: PayfeeMode[];
  outTime: string;
  serviceName: string;
  lessonNum: number;
  remainNum: number;
}

export interface PayfeeMode {
  payModeCode: string;
  payModeCodeNme: string;
  payModeFee: string;
}

export interface Trade {
  tradeId: number;
  subscribeId: number;
  tradeTypeCode: number;
  priority: number;
  subscribeState: string;
  custId: number;
  userId: number;
  custName: string;
  acctId: number;
  ecardNo: string;
  acceptDate: string;
  acceptMonth: string;
  tradeStaffId: number;
  finishDate: string;
  finishStaffId: number;
  cancelTag: string;
  payState: string;
  payTime: string;
  ecardTradeId: number;
  payTfee: number;
  centerId: number;
  venueId: number;
  businessType: string;
  expireTime: string;
  serviceId: number;
  tradeDesc: string;
  channelId: number;
  channelAppId: number;
}

const serviceName = z.enum([
  "篮球",
  "羽毛球",
  "网球",
  "壁球",
  "乒乓球",
  "健身",
  "足球",
  "武术",
  "桌球",
  "高尔夫",
  "攀岩",
  "击剑",
  "射箭",
  "排球",
  "活动室",
  "更衣室",
]);

export type ServiceName = z.infer<typeof serviceName>;

export const createScheduledTaskParams = z.object({
  newUserId: z.coerce.string(),
  serviceName: z.string(),
  date: z.string(),
  timeName: z.string(),
});

export type CreateScheduledTaskParams = z.infer<
  typeof createScheduledTaskParams
>;
