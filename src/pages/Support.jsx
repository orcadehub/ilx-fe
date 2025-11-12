
import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
} from "react-bootstrap";
import TabsButton from "../components/TabsButton";
import { Input, Select, Upload, Button as AntdButton, Popover, Button, Modal } from "antd";
import NewTable from "../components/NewTable";
import { Eye } from "lucide-react";
const { Option } = Select;

const Support = () => {
  const [activeTab, setActiveTab] = useState("create");
  const [tickets, setTickets] = useState([
    {
      id: 1,
      subject: "Payment not reflected",
      message: "I paid yesterday but the dashboard still shows pending.",
      status: "active",
      date: "2025-06-17",
    },
    {
      id: 2,
      subject: "Bug in dashboard",
      message: "Unable to generate report after selecting date.",
      status: "resolved",
      date: "2025-06-12",
    },
  ]);

  const [newTicket, setNewTicket] = useState({ subject: "", message: "" });
  const [category, setCategory] = useState("Other");
  const [priority, setPriority] = useState("Medium");
  const [fileList, setFileList] = useState([]);

  const handleCreateTicket = () => {
    if (newTicket.subject && newTicket.message) {
      setTickets([
        ...tickets,
        {
          id: tickets.length + 1,
          subject: newTicket.subject,
          message: newTicket.message,
          status: "active",
          date: new Date().toISOString().split("T")[0],
        },
      ]);
      setNewTicket({ subject: "", message: "" });
      setActiveTab("active");
    }
  };

  const renderCreateTicket = () => (
    <div className="rounded-2xl bg-[var(--card)] text-[var(--text)] p-6  w-full">
      <style>{`
        .ant-select-selector, .ant-select-dropdown {
          background: var(--bgPage2) !important;
          color: var(--text) !important;
          border:1px solid var(--border) !important;
          font-size: 12px !important;
        }
        .ant-select-dropdown .ant-select-item {
          background: var(--card) !important;
          color: var(--text) !important;
        }
        .ant-select-dropdown .ant-select-item-option-active {
          background: var(--hover2) !important;
        }
      `}</style>
      <h3 className="font-semibold  mb-1">Create New Support Ticket</h3>
      <p className="text-[var(--mutedText)] mb-6 text-14">Please provide details about your issue and we'll get back to you as soon as possible.</p>
      <div className="flex flex-col gap-4">
        {/* Subject */}
        <div>
          <label className="block mb-1 font-medium">Subject</label>
          <Input
            size="large"
            placeholder="Enter subject"
            value={newTicket.subject}
            onChange={e => setNewTicket({ ...newTicket, subject: e.target.value })}
            className="rounded-lg !bg-[var(--bgPage2)] !text-[var(--text)] border !border-[var(--border)]"
          />
        </div>
        {/* Category & Priority */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block mb-1 font-medium">Category</label>
            <Select
              size="large"
              value={category}
              onChange={setCategory}
              className="w-full !bg-[var(--bgPage2)] !text-[var(--text)]"
            >
              <Option value="Other">Other</Option>
              <Option value="Payment">Payment</Option>
              <Option value="Technical">Technical</Option>
              <Option value="Account">Account</Option>
              <Option value="Feature">Feature Request</Option>
            </Select>
          </div>
          <div className="flex-1">
            <label className="block mb-1 font-medium">Priority</label>
            <Select
              size="large"
              value={priority}
              onChange={setPriority}
              className="w-full !bg-[var(--bgPage2)] !text-[var(--text)]"
            >
              <Option value="High">High</Option>
              <Option value="Medium">Medium</Option>
              <Option value="Low">Low</Option>
            </Select>
          </div>
        </div>
        {/* Message */}
        <div>
          <label className="block mb-1 font-medium">Message</label>
          <Input.TextArea
            rows={6}
            placeholder="Please describe your issue in detail"
            value={newTicket.message}
            onChange={e => setNewTicket({ ...newTicket, message: e.target.value })}
            className="rounded-lg !bg-[var(--bgPage2)] !text-[var(--text)] border !border-[var(--border)]"
          />
        </div>
        {/* Attachments */}
        <div className="flex justify-between">
          <label className="block mb-1 font-medium">Attachments (Optional)</label>
          <Upload
            fileList={fileList}
            onChange={({ fileList }) => setFileList(fileList)}
            beforeUpload={() => false}
            multiple
            className="!bg-[var(--bgPage2)] !text-[var(--text)]"
          >
            <AntdButton classNames='!bg-[var(--bgPage2)]' icon={<i className="bi bi-paperclip " />} className="mt-1">Add Files</AntdButton>
          </Upload>
        </div>
        {/* Submit Button */}
        <div className="text-left mt-2">
          <AntdButton
            type="primary"
            size="large"
            className="rounded-lg px-8 py-2 bg-[#b3aaff] hover:bg-[#a29bfe] border-0 text-white font-semibold shadow-none"
            onClick={handleCreateTicket}
            style={{ background: '#b3aaff', color: '#fff', border: 0 }}
          >
            Submit Ticket
          </AntdButton>
        </div>
      </div>
    </div>
  );

  // Status badge for table
  const StatusBadge = ({ status }) => {
    let color = '#4096ff', bg = '#eaf2ff', label = 'New';
    if (status === 'inprogress' || status === 'In Progress') {
      color = '#f7b500'; bg = '#fff7e6'; label = 'In Progress';
    } else if (status === 'resolved' || status === 'Resolved') {
      color = '#52c41a'; bg = '#e6ffed'; label = 'Resolved';
    }
    return (
      <span style={{ background: bg, color, fontWeight: 600, fontSize: 13, borderRadius: 8, padding: '2px 14px', display: 'inline-block' }}>{label}</span>
    );
  };
  // Modal state for viewing ticket
  const [viewModal, setViewModal] = useState({ open: false, ticket: null });


  // Track which popover is open
  const [openPopoverKey, setOpenPopoverKey] = useState(null);

  const content = (ticket) => (
    <div
      className="flex items-center gap-2 text-[var(--text)] hover:bg-[var(--hover)] p-1 rounded cursor-pointer"
      onClick={() => {
        setOpenPopoverKey(null); // close popover
        setViewModal({ open: true, ticket });
      }}
    >
      <Eye size={18} /> View Ticket
    </div>
  );

  // Table columns for tickets
  const ticketColumns = [
    {
      title: <span className="text-14 font-semibold">Ticket ID</span>,
      dataIndex: 'id',
      key: 'id',
      width: 110,
      render: (id) => `T100${id}`,
    },
    {
      title: <span className="text-14 font-semibold">Created</span>,
      dataIndex: 'date',
      key: 'created',
      width: 120,
      render: (date) => date,
    },
    {
      title: <span className="text-14 font-semibold">Subject</span>,
      dataIndex: 'subject',
      key: 'subject',
      width: 260,
      render: (subject) => <span className="text-14">{subject}</span>,
    },
    {
      title: <span className="text-14 font-semibold">Status</span>,
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status) => <StatusBadge status={status} />,
    },
    {
      title: <span className="text-14 font-semibold">Last Updated</span>,
      dataIndex: 'date',
      key: 'updated',
      width: 120,
      render: (date) => date,
    },
    {
      title: <span className="text-14 font-semibold">Actions</span>,
      key: 'actions',
      align: 'center',
      width: 60,
      render: (text, record) =>
        <Popover
          placement="topLeft"
          title={<span style={{ color: 'var(--text)' }}>Actions</span>}
          content={content(record)}
          color='var(--bgPage2)'
          trigger="click"
          open={openPopoverKey === record.id}
          onOpenChange={open => setOpenPopoverKey(open ? record.id : null)}
        >
          <span className="hover:bg-[var(--hover)] p-2 rounded" style={{ color: 'var(--text)', cursor: 'pointer' }}>•••</span>
        </Popover>
      ,

    },
  ];

  // Search/filter state for table
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Map status to badge label for filter
  const statusOptions = [
    { label: 'All Statuses', value: 'All' },
    { label: 'New', value: 'active' },
    { label: 'In Progress', value: 'inprogress' },
    { label: 'Resolved', value: 'resolved' },
  ];

  // Table data filtering
  const getFilteredTickets = (status) => {
    let filtered = tickets.filter((t) => t.status === status);
    if (status === 'active') {
      // For demo, treat all 'active' as 'New' or 'In Progress'
      filtered = tickets.filter((t) => t.status === 'active' || t.status === 'inprogress');
    }
    if (statusFilter !== 'All') {
      filtered = filtered.filter((t) => t.status === statusFilter);
    }
    if (search) {
      filtered = filtered.filter((t) =>
        t.subject.toLowerCase().includes(search.toLowerCase()) ||
        String(t.id).includes(search)
      );
    }
    return filtered;
  };

  const renderTickets = (status) => {
    const filtered = getFilteredTickets(status);
    if (filtered.length === 0) {
      return (
        <div className="text-center py-10 text-[var(--textSec)]">No {status} tickets found.</div>
      );
    }
    // Show search/filter only for active tab
    return (
      <div className="p-4 w-[90vw] overflow-hidden">
        {status === 'active' && (
          <div className="text-[var(--text)]">
            <div className="!mb-4">
              <h3>Active Support Tickets</h3>
              <h6>View and manage your ongoing support requests</h6>
            </div>
            <div className="flex flex-col md:flex-row gap-3 mb-4 items-center justify-between">
              <Input
                placeholder="Search tickets..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full md:w-1/2 !bg-[var(--bgPage2)] !text-[var(--text)] border !border-[var(--border)]"
                allowClear
                size="large"
              />
              <Select
                value={statusFilter}
                onChange={setStatusFilter}
                className="w-full md:w-56 !text-[var(--text)] !bg-[var(--bgPage2)]"
                size="large"
              >
                {statusOptions.map(opt => <Option key={opt.value} value={opt.value}>{opt.label}</Option>)}
              </Select>
            </div>
          </div>
        )}
        <NewTable
          columns={ticketColumns}
          dataSource={filtered.map(t => ({ key: t.id, ...t }))}
          tableId={`tickets-${status}`}
          enableResize={false}
        />
      </div>
    );
  };

  const data = [
    { id: 1, label: "Create New Ticket", key: "create" },
    { id: 2, label: "Active Tickets", key: "active" },
    { id: 3, label: "Resolved Tickets", key: "resolved" },
  ]

  // Modal content for viewing ticket (arrow function inside component)
  const RenderViewModal = ({ viewModal, setViewModal, StatusBadge }) => {
    const ticket = viewModal.ticket;
    if (!ticket) return null;
    // Example static data for demo, replace with real ticket fields as needed
    return (
      <Modal
        open={viewModal.open}
        onCancel={() => setViewModal({ open: false, ticket: null })}
        footer={null}
        centered
        width={650}
        bodyStyle={{ background: 'var(--card)', borderRadius: 16, padding: 0 }}
        style={{ borderRadius: 16 }}
        closeIcon={<span style={{ color: 'var(--text)', fontSize: 22 }}>&times;</span>}
      >
        <div>
          <div className=" mb-2">
            <h2 className="text-xl font-semibold mb-0">Ticket: {ticket.subject}</h2>
            {/* <StatusBadge status={ticket.status} /> */}
          </div>
          <div className="flex flex-wrap gap-6 mb-4 text-14 ">
            <div><span className="font-semibold">Created by</span><br />Current User (business)</div>
            <div><span className="font-semibold">Date</span><br />{ticket.date} 11:15:35 AM</div>
            <div><span className="font-semibold">Category</span><br />Payment</div>
            <div><span className="font-semibold">Priority</span><br />High</div>
          </div>
          <div className="bg-[var(--bgPage2)] border !border-[var(--border)] rounded-xl p-4 mb-6">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold">Current User</span>
              <span className="bg-[var(--bgPage2)] border border-[var(--border)] text-12 rounded px-2 py-1">business</span>
              <span className="ml-auto text-12 text-[var(--mutedText)]">{ticket.date} 11:15:35 AM</span>
            </div>
            <div className="text-14">I'm having trouble processing a payment. The transaction fails every time.</div>
          </div>
          <div className="border-t border-[var(--border)] pt-4">
            <Input.TextArea
              rows={6}
              placeholder="Type your reply..."
              className="!bg-[var(--bgPage2)] !text-[var(--text)] border !border-[var(--border)] mb-3"
            />
            <div className="flex justify-between items-center gap-2">
              <AntdButton className="!bg-[var(--bgPage2)] !text-[var(--text)] border !border-[var(--border)]">Attach Files</AntdButton>
              <AntdButton type="primary" className="bg-[#b3aaff] hover:bg-[#a29bfe] border-0 text-white font-semibold shadow-none px-6">Send Reply</AntdButton>
            </div>
          </div>
        </div>
      </Modal>
    );
  };

  return (
    <div
      className="rounded p-1 xl:p-4 !text-[var(--text)] bg-[var(--bgPage2)] min-h-screen"
    >
      <RenderViewModal viewModal={viewModal} setViewModal={setViewModal} StatusBadge={StatusBadge} />
      {/* Gradient Header */}
      <div
      // style={{
      //   background: "linear-gradient(to right, #605cff, #4a00e0)",
      //   color: "#fff",
      //   padding: "20px 0",
      //   borderBottomLeftRadius: 20,
      //   borderBottomRightRadius: 20,
      // }}
      >
        <Container>
          <Row className="align-items-center justify-content-between mb-4">
            <Col>
              <h3 className="!font-bold mb-0 d-flex align-items-center gap-2 !text-3xl">
                Support Center
              </h3>
              <small
                className="mb-0 text-[var(--mutedText)]"
                style={{ fontSize: "0.95rem" }}
              >
                Submit and manage your support tickets here
              </small>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Main Content */}
      <Container fluid className=" pb-5 !border-0">
        <Row className="justify-content-center  !border-0">
          {/* Left column: Create Ticket */}
          {/* <Col lg={3} md={12} className="mb-4">
            {renderCreateTicket()}
          </Col> */}

          {/* Right column: Tickets */}
          <Col md={12} >
            <TabsButton activeKey={activeTab} setActiveKey={setActiveTab} data={data} wfit={true} />
            <Card className="rounded-2xl !overflow-hidden border !border-[var(--border)] !bg-[var(--card)]">
              <div>
                {activeTab === "create" && renderCreateTicket()}
                {activeTab === "active" && (renderTickets("active"))}
                {activeTab === "resolved" && renderTickets("resolved")}
              </div>
              {/* <Tabs
                id="support-ticket-tabs"
                activeKey={activeTab}
                onSelect={(k) => setActiveTab(k)}
                justify
                fill
                variant="underline"
                className="px-3 pt-2"
              >
                <Tab eventKey="active" title="Active Tickets">
                  <div className="p-3">{renderTickets("active")}</div>
                </Tab>
                <Tab eventKey="resolved" title="Resolved Tickets">
                  <div className="p-3">{renderTickets("resolved")}</div>
                </Tab>
              </Tabs> */}
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Support;
