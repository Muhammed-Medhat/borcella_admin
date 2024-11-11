import prisma from "../db";

export const getTotalSales = async () => {
  const orders = await prisma.order.findMany();
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce(
    (acc, order) => acc + order.totalAmount,
    0
  );
  return { totalOrders, totalRevenue };
};

export const getTotalCustomers = async () => {
  const customers = await prisma.customer.findMany();
  const totalCustomers = customers.length;
  return totalCustomers;
};

export const getSalesPerMonth = async () => {
  // جلب جميع الطلبات من قاعدة البيانات باستخدام Prisma
  const orders = await prisma.order.findMany();

  // حساب المبيعات لكل شهر
  const salesPerMonth = orders.reduce((acc, order) => {
    const monthIndex = new Date(order.createdAt).getMonth(); // 0 ليناير إلى 11 لديسمبر
    acc[monthIndex] = (acc[monthIndex] || 0) + order.totalAmount;
    return acc;
  }, {} as { [key: number]: number });

  // إعداد البيانات للرسم البياني
  const graphData = Array.from({ length: 12 }, (_, i) => {
    const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
      new Date(0, i)
    );
    return { name: month, sales: salesPerMonth[i] || 0 };
  });

  return graphData;
};
