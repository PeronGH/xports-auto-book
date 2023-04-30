import {
  Input,
  Select,
} from "https://deno.land/x/cliffy@v0.25.7/prompt/mod.ts";
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

// step 1. login user
const netUserId = localStorage.getItem("netUserId") ??
  (await Input.prompt("Enter your net user id")).trim();

const { netUser } = await queryUserByUserId(netUserId);

if (!netUser) {
  localStorage.removeItem("netUserId");
  console.error(`Error: user ${netUserId} not exists`);
  Deno.exit(1);
}

localStorage.setItem("netUserId", netUserId);
console.log("Logged in", netUser.name);

// step 2. select service
const { serviceList } = await queryVenueServices();
const serviceId = await Select.prompt({
  message: "Select service",
  options: serviceList.map(({ serviceName, serviceId }) => ({
    name: serviceName,
    value: serviceId.toString(),
  })),
});

// step 3. auto select next date
const { week } = await queryBookDaysByServiceId(serviceId);
const currentLastDate = week.at(-1)!.date;
const year = currentLastDate.slice(0, 4);
const month = currentLastDate.slice(4, 6);
const day = currentLastDate.slice(6, 8);

const nextDate = new Date(
  Number(year),
  Number(month) - 1,
  Number(day) + 1,
);

const date = [
  nextDate.getFullYear(),
  "-",
  (nextDate.getMonth() + 1).toString().padStart(2, "0"),
  "-",
  nextDate.getDate().toString().padStart(2, "0"),
].join("") as `${number}-${number}-${number}`;

console.log("Auto selected date:", date);

// step 4. select time
const { ticketTypeList, message } = await getTicketSalesList(
  serviceId,
  date,
);

if (!ticketTypeList) {
  console.error("Error:", message);
  Deno.exit(1);
}

const ticketIndex = await Select.prompt({
  message: "Select time",
  options: ticketTypeList.filter(({ dayRemain }) => dayRemain > 0)
    .map(({ timeName, ticketTypeName }, i) => ({
      name: `${ticketTypeName} ${timeName}`,
      value: i.toString(),
    })),
});

const { ticketTypeId, timeId, price, dayRemain } =
  ticketTypeList[Number(ticketIndex)];

if (dayRemain === 0) {
  console.error("Error: no ticket left");
  Deno.exit(1);
}

console.log(
  `It will cost ${price} cents and there is ${dayRemain} tickets left`,
);

async function bookTicket() {
  // step 5. send order
  const order = await singleTicketOrder({
    netUserId,
    serviceId,
    date,
    ticketInfo: [{
      ticketTimeId: timeId,
      ticketTypeId: ticketTypeId,
      num: 1,
      cashPledge: 0,
      ticketPrice: 0,
    }],
  });

  if (order.error) throw new Error(order.message);

  // step 6. get coupons
  const { couponList } = await getUserCouponsByUserIdAndTradeId(
    netUserId,
    order.tradeId.toString(),
  );

  const couponItem = couponList.find((item) =>
    parseDate(item.expireDate) > new Date() && item.balance > order.payFee
  );
  if (!couponItem) throw new Error("no coupon available");

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

  if (!payment.error) {
    console.log("Success");
    return;
  }
}

const currentDate = new Date();
const currentTime = currentDate.getTime();
const tomorrowMidnight = new Date(
  currentDate.getFullYear(),
  currentDate.getMonth(),
  currentDate.getDate() + 1,
).getTime();

const timeout = tomorrowMidnight - currentTime + 30;

console.log(`Waiting for ${Math.floor(timeout / 1000)}s`);

setTimeout(bookTicket, timeout);
