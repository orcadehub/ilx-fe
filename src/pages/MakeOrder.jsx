import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Spinner,
} from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaTwitter,
  FaArrowUp,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import config from "../config";
import axios from "axios";
import { ArrowUp, BadgeCheck, Check, Dot, Facebook, FileText, Heart, Instagram, Twitter, Upload, Youtube } from "lucide-react";
import TabsButton from "../components/TabsButton";
import { DatePicker, Select } from "antd";
import VisitPromoteContentDetails from "../components/makeorder/VisitPromoteContentDetails";
import PollContentBuilder from "../components/makeorder/PollContentBuilder";
import { detectCurrency, convertPrice, formatCurrency } from "../utils/currency";

const baseURL =
  import.meta.env.MODE === "development"
    ? config.LOCAL_BASE_URL
    : config.BASE_URL;

// K/M/B formatter
const formatFollowers = (num) => {
  if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1) + "B";
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
  if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
  return num;
};

const MakeOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selected = {} } = location.state || {};

  // UI selections
  const [orderType, setOrderType] = useState("Platform Based");
  const [contentType, setContentType] = useState("Post Image/Video");
  const [platform, setPlatform] = useState("Instagram");

  // Inputs
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [affiliatedLinks, setAffiliatedLinks] = useState([]);
  const [linkInput, setLinkInput] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [postDateTime, setPostDateTime] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(selected?.wishlist || false);
  const [currency, setCurrency] = useState('₹');
  const [exchangeRate, setExchangeRate] = useState(60);

  // Tabs: Upload vs Provide
  const [provisionMethod, setProvisionMethod] = useState("Upload Files");
  // For poll builder (expand as needed)
  const [polls, setPolls] = useState([]);

  // Selected services with dynamic pricing from selected.prices
  const [selectedServices, setSelectedServices] = useState([]);
  const [activeTab, setActiveTab] = useState('uploadFiles');

  // Auto-detect currency on component mount
  useEffect(() => {
    const initCurrency = async () => {
      const detectedCurrency = await detectCurrency();
      setCurrency(detectedCurrency);
    };
    initCurrency();
  }, []);

  useEffect(() => {
    let price = 0;
    let serviceName = contentType;

    if (orderType === "Platform Based") {
      // Map contentType to the key in selected.prices[platform]
      const platformKey = platform.toLowerCase();
      const contentKeyMap = {
        "Post Image/Video": "Post Image/Video",
        "Reels/Shorts": "Reels/Shorts",
        "Story Image/Video": "Story (Image/Video)",
        "In Video Promotion <10min": "Short Video (<10m)",
        "Promotion >10min": "Video (>10m)",
        Polls: "Polls",
        "Visit and Promote": "Visit and Promote at Your Business",
      };
      const contentKey = contentKeyMap[contentType] || contentType;
      price = selected?.prices?.[platformKey]?.[contentKey] || 0;
    } else if (orderType === "Combo Package") {
      // Find combo by name or services
      const combo = selected?.prices?.combos?.find(
        (c) =>
          c.name === contentType ||
          c.services.includes(contentType.replace("Combo ", ""))
      );
      price = combo?.price || 0;
      serviceName = combo?.name || contentType;
    } else if (orderType === "Custom Package") {
      // Find combo package by name
      const combo = selected?.prices?.combos?.find(
        (c) => c.name === contentType
      );
      price = combo?.price || 0;
      serviceName = combo?.name || contentType;
    }

    setSelectedServices([
      {
        name: serviceName,
        platform: orderType === "Combo Package" ? "Combo" : platform,
        type: orderType,
        price,
      },
    ]);
  }, [orderType, contentType, platform, selected, currency]);

  const totalPrice = selectedServices.reduce(
    (sum, s) => sum + Number(s.price || 0),
    0
  );

  const handleLinkInput = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const trimmed = linkInput.trim();
      if (trimmed && !affiliatedLinks.includes(trimmed)) {
        setAffiliatedLinks((p) => [...p, trimmed]);
        setLinkInput("");
      }
    }
  };

  const removeLink = (l) => setAffiliatedLinks((p) => p.filter((x) => x !== l));

  const handleFileUploadClick = () => {
    const el = document.getElementById("fileInput");
    if (el) el.click();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile || null);
  };

  const handleWishlist = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${baseURL}/api/wishlist`, 
        { influencerId: selected.id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      if (response.data.success) {
        toast.success(response.data.message);
        setIsWishlisted(!isWishlisted);
      }
    } catch (error) {
      toast.error('Failed to update wishlist');
    }
  };

  const handleMakeOrder = async () => {
    if (selectedServices.length === 0) {
      toast.error(
        "Please select at least one service, combo, or custom package."
      );
      return;
    }
    const localUser = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    const userId = localUser?.id;
    const influencerId = selected?.id;
    const username = localUser?.fullname;
    const influencerName = selected?.name || selected?.username || "Unknown";

    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("influencerId", influencerId);
    formData.append("username", username);
    formData.append("influencer_name", influencerName);
    formData.append("type", orderType);
    formData.append("services", JSON.stringify(selectedServices));
    formData.append("totalPrice", totalPrice);
    formData.append("description", description || "");
    formData.append("affiliatedLinks", JSON.stringify(affiliatedLinks));
    formData.append("couponCode", couponCode || "");
    formData.append("postDateTime", postDateTime || "");
    if (file instanceof File) {
      formData.append("file", file);
    }

    try {
      setIsLoading(true);
      const response = await fetch(`${baseURL}/api/place-order`, {
        method: "POST",
        body: formData,
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to place order");
      toast.success("Order placed successfully!");
      setTimeout(() => navigate("/dashboard/orders"), 1200);
    } catch (err) {
      toast.error(err.message || "Failed to place order");
    } finally {
      setIsLoading(false);
    }
  };

  // Style tokens tuned to screenshot
  const palette = {
    bg: "#F6F7FB",
    card: "#FFFFFF",
    text: "#383A46",
    sub: "#767676",
    label: "#545454",
    light: "#939393",
    hairline: "#EDEDED",
    inputBg: "#F7F8FA",
    inputBorder: "#D5DFEA",
    brand: "#324BFF",
    brandDeep: "#5E60CE",
    chip: "#324BFF",
    danger: "#FF3B30",
    gradientFrom: "#775EDC",
    gradientTo: "#A07BFF",
    gradientBtnFrom: "#6C63FF",
    gradientBtnTo: "#9B79FF",
  };

  const gradient = `linear-gradient(135deg, ${palette.gradientFrom} 0%, ${palette.gradientTo} 100%)`;
  const ctaGradient = `linear-gradient(90deg, ${palette.gradientBtnFrom} 0%, ${palette.gradientBtnTo} 100%)`;

  const contentOptions = {
    "Platform Based": [
      "Post Image/Video",
      "Reels/Shorts",
      "Story Image/Video",
      "In Video Promotion <10min",
      "Promotion >10min",
      "Polls",
    ],
    "Combo Package": [
      "Combo Post Image/Video",
      "Combo Reels/Shorts",
      "Combo Story Image/Video",
      "Combo In Video Promotion <10min",
      "Combo Promotion >10min",
      "Combo Polls",
      "Combo Visit and Promote",
    ],
    "Custom Package": selected?.prices?.combos?.map(combo => combo.name) || [],
  };

  const uploadFile = () => (
    <div>
      {/* Description */}
      <Form.Group>
        <Form.Label
          className="font-bold"
        // style={{ fontWeight: 600, color: palette.label, fontSize: 13 }}
        >
          Description
        </Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={500}
          placeholder="Add any specific instructions or details about your request..."
          // style={{
          //   background: "#FAFBFC",
          //   border: `1px solid #DEDEDE`,
          //   borderRadius: 10,
          //   fontSize: 14.5,
          //   padding: "12px 12px",
          // }}
          className="!bg-[var(--card)] border !border-[var(--border)] !rounded-xl"
        />
        <div
          style={{
            textAlign: "right",
            color: "#B0B0B0",
            fontSize: 12,
            marginTop: 6,
          }}
        >
          {description.length}/500 characters
        </div>
      </Form.Group>

      {/* Upload / Reference Files */}
      <div style={{ marginTop: 14 }}>
        <Form.Label
          // style={{ fontWeight: 600, color: palette.label, fontSize: 13 }}
          className="mb-2"
        >
          Upload Files
        </Form.Label>
        <div
          onClick={handleFileUploadClick}
          // style={{
          //   background: palette.inputBg,
          //   borderRadius: 12,
          //   border: `1.7px dashed ${palette.inputBorder}`,
          //   textAlign: "center",
          //   padding: "34px 0",
          //   position: "relative",
          //   cursor: "pointer",
          // }}
          className="bg-[var(--card)] py-10 flex justify-center items-center flex-col rounded-xl border-2 !border-dashed !border-[var(--border)]"
        >
          <Upload size={35} className="text-[var(--primary)]"
          // style={{ fontSize: 18, color: "#6153CC", marginBottom: 6 }}
          />
          <div
            className="text-14 mt- text-center"
          // style={{ color: palette.light, fontSize: 16, lineHeight: 1.5 }}
          >
            Drag & drop files here
            <br />
            <span className="text-12 text-[var(--mutedText)]" >or click to browse</span>
          </div>
          <input
            id="fileInput"
            type="file"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </div>

        {file instanceof File && (
          <div style={{ marginTop: 10, fontSize: 14, color: "#333" }}>
            {file.type.startsWith("image/") ? (
              <img
                src={URL.createObjectURL(file)}
                alt="Preview"
                style={{
                  maxWidth: "100%",
                  maxHeight: 150,
                  borderRadius: 8,
                }}
              />
            ) : file.type.startsWith("video/") ? (
              <video
                width="100%"
                height={150}
                controls
                src={URL.createObjectURL(file)}
                style={{ borderRadius: 8 }}
              />
            ) : (
              <div>
                <strong>Selected File:</strong> {file.name}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Description */}
      <Form.Group>
        <Form.Label
          className=" mt-4"
        // style={{ fontWeight: 600, color: palette.label, fontSize: 13 }}
        >
          Notes (Optional)
        </Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={300}
          placeholder="Add any additional instructions or notes for the influcer... "
          // style={{
          //   background: "#FAFBFC",
          //   border: `1px solid #DEDEDE`,
          //   borderRadius: 10,
          //   fontSize: 14.5,
          //   padding: "12px 12px",
          // }}
          className="!bg-[var(--card)] border !border-[var(--border)] !rounded-xl text-14"
        />
        <div
          style={{
            textAlign: "right",
            color: "#B0B0B0",
            fontSize: 12,
            marginTop: 6,
          }}
        >
          {description.length}/300 characters
        </div>
      </Form.Group>

    </div>
  )

  const provideContent = () => (
    <div>
      {/* Description */}
      <Form.Group>
        <Form.Label
          className=""
        // style={{ fontWeight: 600, color: palette.label, fontSize: 13 }}
        >
          Content Description
        </Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={500}
          placeholder="Add any specific instructions or details about your request..."
          // style={{
          //   background: "#FAFBFC",
          //   border: `1px solid #DEDEDE`,
          //   borderRadius: 10,
          //   fontSize: 14.5,
          //   padding: "12px 12px",
          // }}
          className="!bg-[var(--card)] border !border-[var(--border)] !rounded-xl"
        />
        <div
          style={{
            textAlign: "right",
            color: "#B0B0B0",
            fontSize: 12,
            marginTop: 6,
          }}
        >
          {description.length}/500 characters
        </div>
      </Form.Group>

      {/* Upload / Reference Files */}
      <div style={{ marginTop: 14 }}>
        <Form.Label
          // style={{ fontWeight: 600, color: palette.label, fontSize: 13 }}
          className="mb-2"
        >
          Upload Files
        </Form.Label>
        <div
          onClick={handleFileUploadClick}
          // style={{
          //   background: palette.inputBg,
          //   borderRadius: 12,
          //   border: `1.7px dashed ${palette.inputBorder}`,
          //   textAlign: "center",
          //   padding: "34px 0",
          //   position: "relative",
          //   cursor: "pointer",
          // }}
          className="bg-[var(--card)] py-10 flex justify-center items-center flex-col rounded-xl border-2 !border-dashed !border-[var(--border)]"
        >
          <Upload size={35} className="text-[var(--primary)]"
          // style={{ fontSize: 18, color: "#6153CC", marginBottom: 6 }}
          />
          <div
            className="text-14 mt- text-center"
          // style={{ color: palette.light, fontSize: 16, lineHeight: 1.5 }}
          >
            Upload reference files
            <br />
            <span className="text-12 text-[var(--mutedText)]" >Add images, documents, or examples to help guide content creation</span>
          </div>
          <input
            id="fileInput"
            type="file"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </div>

        {file instanceof File && (
          <div style={{ marginTop: 10, fontSize: 14, color: "#333" }}>
            {file.type.startsWith("image/") ? (
              <img
                src={URL.createObjectURL(file)}
                alt="Preview"
                style={{
                  maxWidth: "100%",
                  maxHeight: 150,
                  borderRadius: 8,
                }}
              />
            ) : file.type.startsWith("video/") ? (
              <video
                width="100%"
                height={150}
                controls
                src={URL.createObjectURL(file)}
                style={{ borderRadius: 8 }}
              />
            ) : (
              <div>
                <strong>Selected File:</strong> {file.name}
              </div>
            )}
          </div>
        )}
      </div>


    </div>
  )

  {/* Description */ }
  // <Form.Group>
  //   <Form.Label
  //     style={{ fontWeight: 600, color: palette.label, fontSize: 13 }}
  //   >
  //     {provisionMethod === "Provide Content"
  //       ? "Content Description"
  //       : "Description"}
  //   </Form.Label>
  //   <Form.Control
  //     as="textarea"
  //     rows={3}
  //     value={description}
  //     onChange={(e) => setDescription(e.target.value)}
  //     maxLength={500}
  //     placeholder="Add any specific instructions or details about your request..."
  //     style={{
  //       background: "#FAFBFC",
  //       border: `1px solid #DEDEDE`,
  //       borderRadius: 10,
  //       fontSize: 14.5,
  //       padding: "12px 12px",
  //     }}
  //   />
  //   <div
  //     style={{
  //       textAlign: "right",
  //       color: "#B0B0B0",
  //       fontSize: 12,
  //       marginTop: 6,
  //     }}
  //   >
  //     {description.length}/500 characters
  //   </div>
  // </Form.Group>

  {/* Upload / Reference Files */ }
  // <div style={{ marginTop: 14 }}>
  //   <Form.Label
  //     style={{ fontWeight: 600, color: palette.label, fontSize: 13 }}
  //   >
  //     {provisionMethod === "Provide Content"
  //       ? "Reference Files Upload"
  //       : "Upload Files"}
  //   </Form.Label>
  //   <div
  //     onClick={handleFileUploadClick}
  //     style={{
  //       background: palette.inputBg,
  //       borderRadius: 12,
  //       border: `1.7px dashed ${palette.inputBorder}`,
  //       textAlign: "center",
  //       padding: "34px 0",
  //       position: "relative",
  //       cursor: "pointer",
  //     }}
  //   >
  //     <FaArrowUp
  //       style={{ fontSize: 18, color: "#6153CC", marginBottom: 6 }}
  //     />
  //     <div
  //       style={{ color: palette.light, fontSize: 14, lineHeight: 1.5 }}
  //     >
  //       Drag & drop files here
  //       <br />
  //       or <span style={{ color: palette.brand }}>click to browse</span>
  //     </div>
  //     <input
  //       id="fileInput"
  //       type="file"
  //       onChange={handleFileChange}
  //       style={{ display: "none" }}
  //     />
  //   </div>

  //   {file instanceof File && (
  //     <div style={{ marginTop: 10, fontSize: 14, color: "#333" }}>
  //       {file.type.startsWith("image/") ? (
  //         <img
  //           src={URL.createObjectURL(file)}
  //           alt="Preview"
  //           style={{
  //             maxWidth: "100%",
  //             maxHeight: 150,
  //             borderRadius: 8,
  //           }}
  //         />
  //       ) : file.type.startsWith("video/") ? (
  //         <video
  //           width="100%"
  //           height={150}
  //           controls
  //           src={URL.createObjectURL(file)}
  //           style={{ borderRadius: 8 }}
  //         />
  //       ) : (
  //         <div>
  //           <strong>Selected File:</strong> {file.name}
  //         </div>
  //       )}
  //     </div>
  //   )}
  // </div>
  const data = [
    {
      label: "Upload Files",
      key: "uploadFiles"
    },
    {
      label: "Provide Content",
      key: "provideContent"
    },
  ];
  const onOk = value => {
    console.log('onOk: ', value);
  };

  return (
    <Container
      fluid
      style={{
        background: "var(--bgPage2)",
        minHeight: "100vh",
        padding: "24px 28px",
      }}
    >
      <ToastContainer position="top-right" autoClose={2500} />
      <Row className="!text-[var(--text)] md:!flex gap-3 xl:px-15" >
        {/* Left column */}
        <div className="xl:flex-1" style={{ padding: 0 }}>
          {/* Gradient Profile Banner */}
          <div className="!rounded-xl !bg-[var(--card)] border !border-[var(--border)] overflow-hidden"
          // style={{
          //   background: gradient,
          //   borderRadius: 14,
          //   padding: "18px 22px",
          //   display: "flex",
          //   alignItems: "center",
          //   justifyContent: "flex-start",
          //   marginBottom: 18,
          //   boxShadow: "0 6px 24px rgba(64,57,131,0.12)",
          // }}
          >
            <div className="bg-gradient-to-r from-[#3b82f6] to-[#2563eb] p-4"
              style={{ display: "flex", alignItems: "center" }}>
              <img
                src={selected.profilePic || "https://via.placeholder.com/64"}
                alt="Profile"
                width={56}
                height={56}
                className="rounded-circle"
                style={{
                  objectFit: "cover",
                  border: "2px solid rgba(255,255,255,0.6)",
                }}
              />
              <div style={{ marginLeft: 14 }}>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: 16.5,
                    letterSpacing: 0.1,
                  }}
                  className="text-white !text-[22px] flex items-center gap-2"
                >
                  {selected.name || "Influencer Name"}
                  <BadgeCheck className="text-white" size={20} />
                  <Heart 
                    className={`cursor-pointer ${isWishlisted ? "text-red-500 fill-red-400" : "text-white"}`}
                    size={20}
                    onClick={handleWishlist}
                    title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                  />
                </div>
                <div className="flex items-center text-14 text-white" >
                  {selected.category || "Category"} <Dot /> {selected.location_city || "Location"}
                </div>
              </div>
            </div>

            {/* social icons */}
            <div className="!text-[var(--text)] p-2 shadow-xl" style={{ marginLeft: "auto", display: "flex", gap: 12 }}>
              <div className='flex-1 flex flex-col !justify-center items-center  p-2 border-r !border-[var(--border)]'>
                <Instagram size={20} className="text-pink-500" />
                <div className="font-bold">
                  {formatFollowers(selected?.data?.instagram?.total_followers || 0)}
                </div>
                <div className="text-12">
                  Instagram
                </div>
              </div>
              
              <div className='flex-1 flex flex-col !justify-center items-center  p-2 border-r !border-[var(--border)]'>
                <Facebook size={20} className="text-blue-500" />
                <div className="font-bold">
                  {formatFollowers(selected?.data?.facebook?.total_followers || 0)}
                </div>
                <div className="text-12">
                  Facebook
                </div>
              </div>
              
              <div className='flex-1 flex flex-col !justify-center items-center  p-2 border-r !border-[var(--border)]'>
                <Youtube size={20} className="text-red-500" />
                <div className="font-bold">
                  {formatFollowers(selected?.data?.youtube?.total_followers || 0)}
                </div>
                <div className="text-12">
                  YouTube
                </div>
              </div>
              
              <div className='flex-1 flex flex-col !justify-center items-center  p-2'>
                <Twitter size={20} className="text-blue-400" />
                <div className="font-bold">
                  {formatFollowers(selected?.data?.twitter?.total_followers || 0)}
                </div>
                <div className="text-12">
                  Twitter
                </div>
              </div>
              {/* {selected?.data?.twitter?.total_followers ? (
              ) : null} */}
            </div>
          </div>

          {/* Selector Row */}
          <div className="flex my-4 text-[var(--text)]"
          // style={{ display: "flex", gap: 16, marginBottom: 12 }}
          >
            <Form.Group style={{ flex: 1, minWidth: 220 }}>
              <Form.Label
                className="!flex !items-center gap-2"
              // style={{ fontWeight: 600, color: palette.label, fontSize: 13 }}
              >
                <Check size={18} />   Selected Order
              </Form.Label>
              <div
                className="md:!flex !space-y-4 gap-2 !bg-[var(--card)] border !border-[var(--border)] p-3 rounded"
              // style={{ display: "flex", gap: 12 }}
              >
                <div className="!w-full">
                  <div>Order Type</div>
                  <Select
                    value={orderType}
                    onChange={setOrderType}
                    className="w-full"
                    dropdownStyle={{ background: 'var(--bgPage2)', color: 'var(--text)', border: '1px solid var(--border)' }}
                    popupClassName="custom-ant-select-dropdown"
                    style={{
                      background: 'var(--bgPage2)',
                      color: 'var(--text)',
                      border: '1px solid var(--border)',
                      borderRadius: 8,
                      padding: '0',
                      fontSize: 14,
                    }}
                  >
                    <Select.Option value="Platform Based">Platform Based</Select.Option>
                    {/* <Select.Option value="Combo Package">Combo Package</Select.Option> */}
                    <Select.Option value="Custom Package">Custom Package</Select.Option>
                  </Select>
                </div>

                <div className="!w-full">
                  <div>Content</div>
                  <Select
                    value={contentType}
                    onChange={setContentType}
                    className="w-full"
                    dropdownStyle={{ background: 'var(--bgPage2)', color: 'var(--text)', border: '1px solid var(--border)' }}
                    popupClassName="custom-ant-select-dropdown"
                    style={{
                      background: 'var(--bgPage2)',
                      color: 'var(--text)',
                      border: '1px solid var(--border)',
                      borderRadius: 8,
                      padding: '0',
                      fontSize: 14,
                    }}
                  >
                    {contentOptions[orderType].map((opt) => (
                      <Select.Option key={opt} value={opt}>{opt}</Select.Option>
                    ))}
                  </Select>
                </div>
                {orderType !== "Custom Package" && (
                  <div className="!w-full">
                    <div>Platform</div>
                    <Select
                      value={platform}
                      onChange={setPlatform}
                      className="w-full"
                      dropdownStyle={{ background: 'var(--bgPage2)', color: 'var(--text)', border: '1px solid var(--border)' }}
                      popupClassName="custom-ant-select-dropdown"
                      style={{
                        background: 'var(--bgPage2)',
                        color: 'var(--text)',
                        border: '1px solid var(--border)',
                        borderRadius: 8,
                        padding: '0',
                        fontSize: 14,
                      }}
                      disabled={orderType !== "Platform Based"}
                    >
                      <Select.Option value="Instagram">Instagram</Select.Option>
                      <Select.Option value="Facebook">Facebook</Select.Option>
                      <Select.Option value="YouTube">YouTube</Select.Option>
                      <Select.Option value="Twitter">Twitter</Select.Option>
                    </Select>
                  </div>
                )}
                {/* Custom AntD Select Option Hover and Border Styling */}
                <style>{`
        .custom-ant-select-dropdown .ant-select-item-option {
          background: var(--bgPage2) !important;
          color: var(--text) !important;
        }
        .custom-ant-select-dropdown .ant-select-item-option-active:not(.ant-select-item-option-disabled) {
          background: var(--hover) !important;
          color: var(--text) !important;
        }
        .custom-ant-select-dropdown .ant-select-item-option-selected:not(.ant-select-item-option-disabled) {
          background: var(--hover) !important;
          color: var(--text) !important;
        }
        .custom-ant-select-dropdown {
          border: 1px solid var(--border) !important;
        }
      `}</style>
              </div>
            </Form.Group>
          </div>

          {/* <hr
            style={{
              border: "none",
              borderBottom: `1px solid var(--border)`,
              margin: "18px 0 14px",
            }}
          /> */}

          {/* Provide content toggle */}
          <div className="text-14 md:text-[18px] font-semibold flex items-center gap-2"
          // style={{
          //   fontWeight: 700,
          //   fontSize: 15,
          //   color: palette.brandDeep,
          //   marginBottom: 10,
          // }}
          >
            <FileText size={18} />  How would you like to provide the content?
          </div>

          <div className="!w-full mt-3"
          // style={{ display: "flex", gap: 16, marginBottom: 18 }}
          >
            <TabsButton activeKey={activeTab} data={data} setActiveKey={setActiveTab} wfit={false} />
            {/* Platform Based Content Switcher */}
            {console.log('contentType', contentType)}
            {orderType === "Platform Based" && (
              <>
                {contentType === "Visit and Promote" && <VisitPromoteContentDetails />}
                {contentType === "Polls" && <PollContentBuilder polls={polls} setPolls={setPolls} />}
                {contentType !== "Visit and Promote" && contentType !== "Polls" && (
                  <div >
                    {provideContent()}
                  </div>
                )}
              </>
            )}
            {/* Custom Package Content Switcher */}
            {orderType === "Custom Package" && (
              <>
                {contentType && contentType.toLowerCase().includes("visit") && <VisitPromoteContentDetails />}
                {contentType && contentType.toLowerCase().includes("poll") && <PollContentBuilder polls={polls} setPolls={setPolls} />}
                {contentType && !contentType.toLowerCase().includes("visit") && !contentType.toLowerCase().includes("poll") && (
                  <div >
                    {provideContent()}
                  </div>
                )}
              </>
            )}
            {/* {activeTab == "provideContent" && provideContent()} */}
            {/* {activeTab == "uploadFiles" &&  uploadFile()} */}
          </div>


        </div>

        {/* Right rail */}
        <div className="xl:flex-1 !p-0">
          {/* Date & Time + Affiliate + Coupon */}
          <Card
            // style={{
            //   background: palette.card,
            //   border: "none",
            //   borderRadius: 16,
            //   padding: "22px 22px 18px",
            //   boxShadow: "0 2px 12px rgba(143,143,143,0.07)",
            //   marginBottom: 16,
            // }}
            className="!bg-[var(--card)] border !border-[var(--border)] p-3 !text-[var(--text)] xl:mb-10"
          >
            <div
              // style={{
              //   fontWeight: 700,
              //   color: palette.text,
              //   fontSize: 16,
              //   marginBottom: 12,
              // }}
              className="mb-2"
            >
              Select Date & Time
            </div>
            <Form.Group className="mb-3">
              <DatePicker
                showTime={{ format: 'HH:mm' }}
                onChange={(value, dateString) => {
                  setPostDateTime(dateString);
                  console.log('Selected Time: ', dateString);
                }}
                className="!bg-[var(--bgPage2)] !text-[var(--text)] border !border-[var(--border)] py-2 !w-full"
                placeholder="Select date and time"
              />
              {/* <Form.Control
                type="datetime-local"
                value={postDateTime}
                onChange={(e) => setPostDateTime(e.target.value)}
                // style={{
                //   background: palette.inputBg,
                //   border: `1.7px solid ${palette.inputBorder}`,
                //   borderRadius: 8,
                //   padding: "10px 11px",
                //   fontSize: 14.5,
                // }}
              /> */}
            </Form.Group>

            <div
              // style={{
              //   fontWeight: 700,
              //   color: palette.text,
              //   fontSize: 16,
              //   marginBottom: 12,
              // }}
              className="mb-2"
            >
              Affiliate Link (Optional)
            </div>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                value={linkInput}
                onChange={(e) => setLinkInput(e.target.value)}
                onKeyDown={handleLinkInput}
                placeholder="https://example.com/your-affiliate-link"
                // style={{
                //   background: palette.inputBg,
                //   border: `1.7px solid ${palette.inputBorder}`,
                //   borderRadius: 8,
                //   padding: "10px 11px",
                //   fontSize: 14.5,
                // }}
                className="py-2"
              />
              <div
              // style={{
              //   display: "flex",
              //   flexWrap: "wrap",
              //   gap: 6,
              //   marginTop: 8,
              // }}
              >
                {affiliatedLinks.map((l, i) => (
                  <span
                    key={i}
                    style={{
                      background: palette.chip,
                      color: "#fff",
                      borderRadius: 14,
                      padding: "6px 11px",
                      fontSize: 12.5,
                    }}
                  >
                    {l}
                    <button
                      type="button"
                      onClick={() => removeLink(l)}
                      style={{
                        marginLeft: 8,
                        border: "none",
                        background: "transparent",
                        color: "#fff",
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </Form.Group>

            <div
              // style={{
              //   fontWeight: 700,
              //   color: palette.text,
              //   fontSize: 16,
              //   marginBottom: 12,
              // }}
              className="mb-2"
            >
              Coupon Code
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <Form.Control
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Enter coupon code"
              // style={{
              //   background: palette.inputBg,
              //   border: `1.7px solid ${palette.inputBorder}`,
              //   borderRadius: 8,
              //   padding: "10px 11px",
              //   fontSize: 14.5,
              // }}
              />
              <Button
                style={{
                  background: palette.brand,
                  color: "#fff",
                  fontWeight: 600,
                  borderRadius: 8,
                  border: "none",
                  padding: "0 16px",
                  fontSize: 14.5,
                }}
              >
                Apply
              </Button>
            </div>
          </Card>

          {/* Summary */}
          <Card
            // style={{
            //   background: palette.card,
            //   border: "none",
            //   borderRadius: 16,
            //   padding: "22px 22px 20px",
            //   boxShadow: "0 2px 12px rgba(143,143,143,0.07)",
            // }}
            className="!bg-[var(--card)] border !border-[var(--border)] p-3 !text-[var(--text)] mb-3 mt-3 md:0"
          >
            <div
              // style={{
              //   fontWeight: 700,
              //   color: palette.brandDeep,
              //   fontSize: 16,
              //   marginBottom: 14,
              // }}
              className="font-bold !text-[18px]"
            >
              Order Summary
            </div>

            <div
              // style={{
              //   color: palette.sub,
              //   fontWeight: 600,
              //   fontSize: 14,
              //   marginBottom: 6,
              // }}
              className="text-[var(--mutedText)]"
            >
              Order Details
            </div>
            <div
              style={{
                color: "#383838",
                fontWeight: 600,
                fontSize: 15,
                marginBottom: 12,
                lineHeight: 1.6,
              }}
            >
              {selectedServices.map((service, index) => (
                <div className="!text-[var(--text)]" key={index}>
                  <div className="flex justify-between items-center">
                    <span className="!text-[16px] font-medium">Type:</span> <span className='text-[16px] !font-medium'>{service.type}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="!text-[16px] font-medium">Content:</span><span className='text-[16px] !font-medium'>{service.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="!text-[16px] font-medium"> Platform:</span><span className='text-[16px] !font-medium'>{service.platform}</span>
                  </div>
                </div>
              ))}
            </div>

            <hr
              style={{
                border: "none",
                borderBottom: `1px solid ${palette.hairline}`,
                margin: "8px 0 14px",
              }}
            />

            <div>
              <div className="flex justify-between items-center">
                <span className="!text-[16px] font-medium !text-[var(--text)]">Base Price:</span>
                <span className='text-[16px] !font-medium'>{formatCurrency(totalPrice, currency)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="!text-[16px] font-medium !text-[var(--text)]"> Platform Fee:</span>
                <span className='text-[16px] !font-medium'>{formatCurrency(Math.round(totalPrice * 0.1), currency)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="!text-[16px] font-medium !text-[var(--text)]"> Coupon Discount:</span>
                <span className='text-[16px] !font-medium'>-{formatCurrency(0, currency)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="!text-[16px] font-medium !text-[var(--text)]"> GST (18%)</span>
                <span className='text-[16px] !font-medium'>{formatCurrency(Math.round((totalPrice + totalPrice * 0.1) * 0.18), currency)}</span>
              </div>
            </div>

            <hr
              style={{
                border: "none",
                borderBottom: `1px solid ${palette.hairline}`,
                margin: "8px 0 14px",
              }}
            />
            <div className="flex justify-between items-center">
              <span className="!text-[18px] !font-bold"> Total (Inclusive of taxes):</span>
              <span className='!text-[18px] !font-bold'>{formatCurrency(Math.round(totalPrice + totalPrice * 0.1 + (totalPrice + totalPrice * 0.1) * 0.18), currency)}</span>
            </div>
            {/* <div
              style={{ color: palette.brand, fontWeight: 800, fontSize: 24 }}
            >
              ₹{totalPrice || "Not specified"}
            </div> */}

            <Button
              className="w-100 !bg-[var(--primary)]"
              style={{
                marginTop: 18,
                // background: ctaGradient,
                border: "none",
                borderRadius: 10,
                padding: "10px",
                fontSize: 15.5,
                fontWeight: 700,
                boxShadow: "0 8px 22px rgba(98,73,230,0.25)",
              }}
              onClick={handleMakeOrder}
              disabled={isLoading}
            >
              {isLoading ? (
                <Spinner animation="border" size="sm" />
              ) : (
                "Send Request"
              )}
            </Button>
          </Card>
        </div>
      </Row>
    </Container>
  );
};

export default MakeOrder;