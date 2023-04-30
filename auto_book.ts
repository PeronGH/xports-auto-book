import { AutoBookParams } from "./types.ts";
import {
  getTicketSalesList,
  getUserCouponsByUserIdAndTradeId,
  payOrder,
  queryBookDaysByServiceId,
  queryUserByUserId,
  queryVenueServices,
  singleTicketOrder,
} from "./api.ts";
import { parseDate } from "./utils.ts";

export async function autoBook(
  { netUserId, date, timeName, serviceName }: AutoBookParams,
): Promise<void> {
  // step 1. ensure user exists
  const { netUser } = await queryUserByUserId(netUserId);
  if (!netUser) throw new Error(`user ${netUserId} not exists`);

  console.debug(netUser);

  // step 2. find service item for the service name
  const { serviceList } = await queryVenueServices();
  const serviceItem = serviceList.find((item) =>
    item.serviceName === serviceName
  );
  if (!serviceItem) throw new Error(`service ${serviceName} not exists`);

  console.debug(serviceItem);

  // step 3. ensure date is valid
  const dateNumber = date.replaceAll("-", "");
  const { week } = await queryBookDaysByServiceId(
    serviceItem.serviceId.toString(),
  );
  const bookDay = week.find((item) => item.date === dateNumber);
  if (!bookDay) throw new Error(`date ${date} not valid`);

  console.debug(bookDay);

  // step 4. find ticket type item
  const { ticketTypeList, message } = await getTicketSalesList(
    serviceItem.serviceId.toString(),
    date,
  );
  if (!ticketTypeList) throw new Error(message);
  const ticketTypeItem = ticketTypeList.find((item) =>
    item.timeName === timeName
  );
  if (!ticketTypeItem) throw new Error(`time ${timeName} not valid`);

  console.debug(ticketTypeItem);

  // step 5. send order
  const order = await singleTicketOrder({
    netUserId,
    serviceId: serviceItem.serviceId.toString(),
    date,
    ticketInfo: [{
      ticketTimeId: ticketTypeItem.timeId,
      ticketTypeId: ticketTypeItem.ticketTypeId,
      num: 1,
      cashPledge: 0,
      ticketPrice: 0,
    }],
  });

  if (order.error) throw new Error(order.message);

  console.debug(order);

  // step 6. get coupons
  const { couponList } = await getUserCouponsByUserIdAndTradeId(
    netUserId,
    order.tradeId.toString(),
  );

  const couponItem = couponList.find((item) =>
    parseDate(item.expireDate)! > new Date() && item.balance > order.payFee
  );
  if (!couponItem) throw new Error("no coupon available");

  console.debug(couponItem);

  // step 7. pay with coupons
  const payment = await payOrder({
    netUserId,
    tradeId: order.tradeId.toString(),
    payGroup: [{
      couponNo: couponItem.couponNo,
      payMoney: order.payFee,
      realPay: order.payFee,
      payMode: 10,
    }],
  });

  console.debug(payment);
}
