import { pdf } from "@react-pdf/renderer";
import InvoicePDF from "./InvoicePDF";

const InvoicePDFButton = ({
  orderDetails,
  logsData,
  orderInitialBalance,
  orderDeductions,
  orderPayment,
  orderTrackingStatus,
  orderPaymentRefNum,
  statusHistoryItems,
}) => {
  const generatePdfDocument = async () => {
    const blob = await pdf(
      <InvoicePDF
        orderDetails={orderDetails}
        logsData={logsData}
        orderInitialBalance={orderInitialBalance}
        orderDeductions={orderDeductions}
        orderPayment={orderPayment}
        orderTrackingStatus={orderTrackingStatus}
        orderPaymentRefNum={orderPaymentRefNum}
        statusHistoryItems={statusHistoryItems}
      />
    ).toBlob();
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Invoice.pdf";
    link.click();
  };

  return (
    <button
      onClick={generatePdfDocument}
      className="bg-white p-4 transition-all duration-100 hover:bg-red-700 border-2 border-red-700 hover:text-red-100 rounded-md"
    >
      Download Invoice
    </button>
  );
};

export default InvoicePDFButton;
