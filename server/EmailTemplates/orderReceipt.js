export const orderReceipt = async (order) => {
  return `
  <style type="text/css" data-hse-inline-css="true">  
    h1 {
      font-size: 1.8rem;
      padding: 1rem !important;
    }
    .details-container {
      padding: 2.5% 2.5% !important;
    }
  </style>
  <div class="details-container">
    <h1 style="text-align: center;">Crown of Life Products Reciept</h1>
    <h3 style="text-align: center;">Order: ${order._id}</h3>
    <h2>Shipping</h2>
    <p><strong class="bold">Name: </strong>${order.user_name}</p>
    <p><strong class="bold">Email: </strong> <a href="mailto:${order.paymentResult.email_address}"}>${order.paymentResult.email_address}</a></p>
    <p><strong class="bold">Address: </strong> ${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.postalCode}, ${order.shippingAddress.country}
    </p>
    <h2>Payment Method</h2>
    <p><strong style="font-weight: bold;"> Method: </strong>${order.paymentMethod}</p>
    <p><strong style="font-weight: bold;">Total: </strong>${order.totalPrice}</p>
    <p>Paid: ${order.isPaid}</p>
  </div>`;
};
