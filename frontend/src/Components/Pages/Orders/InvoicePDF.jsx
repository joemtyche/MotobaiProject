import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { formatPeso } from "../../Utils/formHelpers";

// Define styles for the PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    lineHeight: 1.6,
  },
  section: {
    marginBottom: 15,
  },
  bigSection: {
    display: "flex",
    gap: 12,
  },
  span: {
    fontWeight: 700,
  },
  heading: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight: "bold",
  },
  text: {
    marginBottom: 5,
  },
  logItem: {
    marginBottom: 5,
    display: "flex",
    gap: 4,
  },
});

// InvoicePDF Component
const InvoicePDF = ({
  orderDetails,
  logsData,
  orderInitialBalance,
  orderDeductions,
  orderPayment,
  orderTrackingStatus,
  orderPaymentRefNum,
  dateCreated,
  dateValidated,
  dateShipped,
  dateReceived,
  dateCompleted,
}) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.bigSection}>
        {/* Order Details Section */}
        <View style={styles.section}>
          <Text style={styles.heading}>Order Details</Text>
          <Text>Order Type: {orderDetails.order_type || "N/A"}</Text>
          <Text>
            Account Name:{" "}
            {orderDetails.account_name || orderDetails.customer_name || "N/A"}
          </Text>
          <Text>Phone Number: {orderDetails.phone_number || "N/A"}</Text>
          <Text>
            Employee: {orderDetails.employee_first_name}{" "}
            {orderDetails.employee_last_name}
          </Text>
        </View>
        {/* Address Section */}
        {orderDetails.order_type === "Delivery" && (
          <View style={styles.section}>
            <Text style={styles.heading}>Address</Text>
            <Text>City: {orderDetails.city || "N/A"}</Text>
            <Text>Barangay: {orderDetails.barangay || "N/A"}</Text>
            <Text>Street: {orderDetails.street || "N/A"}</Text>
          </View>
        )}
      </View>

      <View style={styles.bigSection}>
        {/* Order Summary Section */}
        <View style={styles.section}>
          <Text style={styles.heading}>Order Summary</Text>
          <Text>
            Sales Reference #: {orderDetails.reference_number || "N/A"}
          </Text>
          <Text>Initial Balance: {formatPeso(orderInitialBalance)}</Text>
          <Text>Deductions: {formatPeso(orderDeductions)}</Text>
          <Text>Total Balance: {formatPeso(orderPayment)}</Text>
          {orderTrackingStatus === "completed" && (
            <Text>Payment Reference #: {orderPaymentRefNum || "N/A"}</Text>
          )}
        </View>
        {/* Status History Section */}
        <View style={styles.section}>
          <Text style={styles.heading}>Status History</Text>
          <Text>Date Created: {dateCreated}</Text>
          <Text>Date Validated: {dateValidated}</Text>
          <Text>Date Shipped: {dateShipped}</Text>
          <Text>Date Received: {dateReceived}</Text>
          <Text>Date Completed: {dateCompleted}</Text>
        </View>
      </View>

      {/* Logs Section */}
      {logsData && logsData.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.heading}>Logs</Text>
          {logsData.map((log, index) => (
            <Text key={index} style={styles.logItem}>
              SKU: {log.sku_hold}, Product Name:{" "}
              {log.product_name || "No description available"}, Quantity:{" "}
              {log.quantity} X {formatPeso(log.product_price)}, Total Price:{" "}
              {formatPeso(log.quantity * log.product_price)}
            </Text>
          ))}
        </View>
      )}
    </Page>
  </Document>
);

export default InvoicePDF;
