export const generateHTMLTemplate = (
  flatNumber,
  residentName,
  billNumber,
  billingMonth,
  currentAmount,
  outstandingAmount,
  totalPayable
) => {
  const currentDate = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: 'Arial', 'Helvetica', sans-serif;
            padding: 40px;
            background: #ffffff;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 3px solid #2c3e50;
            padding-bottom: 20px;
          }
          .society-name {
            font-size: 32px;
            font-weight: bold;
            color: #2c3e50;
            margin-bottom: 10px;
            letter-spacing: 1px;
          }
          .invoice-title {
            font-size: 20px;
            color: #34495e;
            font-weight: 600;
            margin-top: 8px;
          }
          .invoice-date {
            font-size: 12px;
            color: #7f8c8d;
            margin-top: 10px;
          }
          .details-section {
            margin: 30px 0;
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
          }
          .detail-row {
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            border-bottom: 1px solid #e0e0e0;
          }
          .detail-row:last-child {
            border-bottom: none;
          }
          .detail-label {
            font-weight: 600;
            color: #2c3e50;
            font-size: 14px;
          }
          .detail-value {
            color: #34495e;
            font-size: 14px;
          }
          .charges-table {
            width: 100%;
            margin: 30px 0;
            border-collapse: collapse;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          .charges-table th {
            background: #34495e;
            color: white;
            padding: 15px;
            text-align: left;
            font-size: 14px;
            font-weight: 600;
          }
          .charges-table td {
            padding: 12px 15px;
            border-bottom: 1px solid #e0e0e0;
            font-size: 14px;
            color: #2c3e50;
          }
          .charges-table tr:last-child td {
            border-bottom: none;
          }
          .charges-table tr:nth-child(even) {
            background: #f8f9fa;
          }
          .total-section {
            margin: 30px 0;
            background: #e8f5e9;
            padding: 20px;
            border-radius: 8px;
            border: 2px solid #27ae60;
          }
          .total-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .total-label {
            font-size: 18px;
            font-weight: bold;
            color: #27ae60;
          }
          .total-amount {
            font-size: 24px;
            font-weight: bold;
            color: #27ae60;
          }
          .footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 2px solid #2c3e50;
          }
          .footer-text {
            font-size: 14px;
            color: #7f8c8d;
            font-style: italic;
          }
          .footer-note {
            margin-top: 15px;
            font-size: 12px;
            color: #95a5a6;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="society-name">B-18 SAI DHAM SOCIETY</div>
          <div class="invoice-title">Maintenance Invoice</div>
          <div class="invoice-date">Date: ${currentDate}</div>
        </div>

        <div class="details-section">
          <div class="detail-row">
            <span class="detail-label">Bill Number:</span>
            <span class="detail-value">${billNumber}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Flat Number:</span>
            <span class="detail-value">${flatNumber}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Resident Name:</span>
            <span class="detail-value">${residentName}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Billing Month:</span>
            <span class="detail-value">${billingMonth}</span>
          </div>
        </div>

        <table class="charges-table">
          <thead>
            <tr>
              <th>Description</th>
              <th style="text-align: right;">Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Current Month Charges</td>
              <td style="text-align: right;">₹ ${parseFloat(currentAmount || 0).toFixed(2)}</td>
            </tr>
            <tr>
              <td>Previous Outstanding Dues</td>
              <td style="text-align: right;">₹ ${parseFloat(outstandingAmount || 0).toFixed(2)}</td>
            </tr>
          </tbody>
        </table>

        <div class="total-section">
          <div class="total-row">
            <span class="total-label">TOTAL PAYABLE AMOUNT:</span>
            <span class="total-amount">₹ ${totalPayable.toFixed(2)}</span>
          </div>
        </div>

        <div class="footer">
          <div class="footer-text">Thank you - B-18 Sai Dham Society Committee</div>
          <div class="footer-note">Please make payment on or before the due date</div>
        </div>
      </body>
    </html>
  `;
};

