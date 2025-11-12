import React from "react";
import { Badge, Button } from "react-bootstrap";
import { Eye, XCircle, CreditCard } from "react-bootstrap-icons";
import { ArrowUp, ArrowDown } from "lucide-react";

const useOrdersColumns = ({
 setSelectedOrder,
 handleReject,
 handleCheckout,
 formatCurrency,
 currency
}) => {
 const parseDate = (dt) =>
  dt
   ? new Date(dt).toLocaleString("default", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
     })
   : "—";

 const columns = [
  {
   title: <div className="text-14 text-[var(--text)]">Name</div>,
   dataIndex: "name",
   key: "name",
   width: 150,
   render: (text, record) => (
    <div className="flex items-center gap-2">
     {record.direction === 'sent' ? 
      <ArrowUp className="text-red-500" size={16} /> : 
      <ArrowDown className="text-green-500" size={16} />
     }
     <span className="text-12 !font-semibold text-[var(--text)]">{text}</span>
    </div>
   ),
  },
  {
   title: <div className="text-14 text-[var(--text)]">Order Date</div>,
   dataIndex: "orderDate",
   key: "orderDate",
   width: 150,
   render: (date) => (
    <span className="text-12 text-[var(--text)]">{parseDate(date)}</span>
   ),
  },
  {
   title: <div className="text-14 text-[var(--text)]">Scheduled Date</div>,
   dataIndex: "scheduledDate",
   key: "scheduledDate",
    width: 150,
    align: "center",
   render: (date) => (
    <span className="text-12 text-[var(--text)]">
     {date
      ? new Date(date).toLocaleDateString("en-US", {
         month: "short",
         day: "numeric",
         year: "numeric",
         timeZone: "Asia/Kolkata",
        })
      : "—"}
    </span>
   ),
  },
  {
   title: <div className="text-14 text-[var(--text)]">Scheduled Time</div>,
   dataIndex: "scheduledTime",
   key: "scheduledTime",
    width: 130,
    align: "center",
   render: (time) => (
    <span className="text-12 text-[var(--text)]">{time || "—"}</span>
   ),
  },
  {
   title: <div className="text-14 text-[var(--text)]">Order Type</div>,
   dataIndex: "orderType",
   key: "orderType",
    width: 120,
   align:"center",
   render: (type) => (
    <span className="text-12 text-[var(--text)]">{type || "Unknown"}</span>
   ),
  },
  {
   title: <div className="text-14 text-[var(--text)]">Service</div>,
   dataIndex: "service",
    key: "service",
    align: "center",
   width: 150,
   render: (service) => (
    <span className="text-12 text-[var(--text)]">
     {service || "Unknown Service"}
    </span>
   ),
  },
  {
   title: <div className="text-14 text-[var(--text)]">Amount</div>,
   dataIndex: "amount",
   key: "amount",
   width: 80,
   align: "center",
   render: (amount) => (
    <span className="text-12 !font-semibold text-[var(--text)]">
     {formatCurrency ? formatCurrency(amount || 0, currency) : `₹${amount?.toLocaleString() || "0"}`}
    </span>
   ),
  },
  {
   title: <div className="text-14 text-[var(--text)]">Status</div>,
   dataIndex: "status",
   key: "status",
   width: 120,
   align: "center",
   render: (status) => (
    <Badge
     bg={
      status === "Completed"
       ? "success"
       : status === "Pending"
       ? "warning"
       : "secondary"
     }
     className="px-2 py-1"
    >
     {status}
    </Badge>
   ),
  },
  {
   title: <div className="text-14 text-[var(--text)]">Actions</div>,
   key: "actions",
    width: 150,
    // fixedWidth: "60px",
    // fixed: "right",
   align: "center",
   render: (_, record) => (
    <div className="d-flex gap-2 justify-content-center text-white">
       <button className='bg-red-600 !rounded-md py-1 px-2 text-12 '>Reject</button>
       <button className='!bg-[var(--primary)] !rounded-md py-1 px-2 text-12 '>Checkout</button>
    </div>
   ),
  },
 ];

 return columns;
};

export default useOrdersColumns;
