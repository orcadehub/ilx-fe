import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast, ToastContainer } from "react-toastify";
import { Offcanvas, Dropdown } from "react-bootstrap";
import { Country, State, City } from "country-state-city";
import ISO6391 from "iso-639-1";
import { useNavigate, useParams } from "react-router-dom";

import {
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaYoutube,
  FaHeart,
  FaComment,
  FaShareAlt,
  FaEye,
  FaShare,
} from "react-icons/fa";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Card, Row, Col } from "react-bootstrap";
import "./Influencers.css";
import getInfluencersData from "../components/InfluencersData";
import config from "../config";

import LeftPanel from "../components/inflcomp/LeftPanel";
import ProfileHeader from "../components/inflcomp/ProfileHeader";
import TabNavigation from "../components/inflcomp/TabNavigation";
import ServicesTab from "../components/inflcomp/ServicesTab";
import PricesTab from "../components/inflcomp/PricesTab";
import DataTab from "../components/inflcomp/DataTab";
import FiltersOffcanvas from "../components/inflcomp/FiltersOffcanvas";
import NotificationToast from "../components/NotificationToast";
import { detectCurrency, convertPrice } from "../utils/currency";

const baseURL =
  import.meta.env.MODE === "development"
    ? config.LOCAL_BASE_URL
    : config.BASE_URL;

function Influencers() {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isWishlisted, setIsWishlisted] = useState({});
  const [loading, setLoading] = useState(true);
  const [currency, setCurrency] = useState('₹'); // Default to rupee
  const [exchangeRate, setExchangeRate] = useState(60); // 1 USD = 60 INR
  const { id } = useParams();

  // Auto-detect location based on IP and set currency
  useEffect(() => {
    const initCurrency = async () => {
      const detectedCurrency = await detectCurrency();
      setCurrency(detectedCurrency);
    };
    initCurrency();
  }, []);

  useEffect(() => {
    const loadInfluencers = async () => {
      try {
        setLoading(true);
        const InfluencersData = await getInfluencersData();
        setData(InfluencersData);
        
        // Initialize isWishlisted state from fetched data
        const wishlistState = InfluencersData.reduce((acc, influencer) => {
          acc[influencer.id] = influencer.wishlist || false;
          return acc;
        }, {});
        setIsWishlisted(wishlistState);
        
        // Set selected influencer based on URL parameter or default to first
        console.log('URL ID:', id);
        console.log('Available influencers:', InfluencersData.map(inf => ({ id: inf.id, name: inf.name })));
        
        if (id) {
          const specificInfluencer = InfluencersData.find(inf => inf.id.toString() === id.toString());
          console.log('Found specific influencer:', specificInfluencer);
          setSelected(specificInfluencer || InfluencersData[0]);
        } else {
          setSelected(InfluencersData[0]);
        }
      } catch (error) {
        console.error('Error loading influencers:', error);
      } finally {
        setLoading(false);
      }
    };

    loadInfluencers();
  }, [id]);

  // Convert price based on currency
  const convertPriceLocal = (priceInRupees) => {
    return convertPrice(priceInRupees, currency, exchangeRate);
  };

  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState("services");
  const [engagementRate, setEngagementRate] = useState(0);
  const [selectedService, setSelectedService] = useState("Platform Based");
  const [selectedPlatformServices, setSelectedPlatformServices] = useState({});
  const [selectedCombos, setSelectedCombos] = useState([]);

  const [platformDropdownOpen, setPlatformDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  // const [selectedCombos, setSelectedCombos] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("");

  const [country, setCountry] = useState(null);
  const [countryCode, setCountryCode] = useState("");
  const [stateCode, setStateCode] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [expandedPlatform, setExpandedPlatform] = useState("ChoosePlatform");

  const [niche, setNiche] = useState("");
  const [contentType, setContentType] = useState("");
  const [platform, setPlatform] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 5000 });
  const [hashtags, setHashtags] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [audienceCountry, setAudienceCountry] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Store all selected filters
  const getSelectedFilters = () => ({
    country: countryCode,
    state: stateCode,
    city: selectedCity,
    niche,
    contentType,
    engagementRate: parseInt(engagementRate),
    followers: parseInt(followers),
    platform,
    priceRange,
    hashtags: hashtags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag),
    age,
    gender,
    audienceCountry,
    language: selectedLang,
  });

  // Reset all filters
  const resetFilters = () => {
    setCountryCode("");
    setStateCode("");
    setSelectedCity("");
    setNiche("");
    setContentType("");
    setEngagementRate(0);
    setFollowers(0);
    setPlatform("");
    setPriceRange({ min: 0, max: 5000 });
    setHashtags("");
    setAge("");
    setGender("");
    setAudienceCountry("");
    setSelectedLang("");
  };

  // Handle Update button click
  const handleUpdate = () => {
    console.log("Selected Filters:", getSelectedFilters());
    setShowFilters(false);
    // Force re-render by updating a dummy state
    setActiveTab(prev => prev);
  };

  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  useEffect(() => {
    if (countryCode) {
      setStates(State.getStatesOfCountry(countryCode));
      setStateCode("");
      setCities([]);
      setSelectedCity("");
    }
  }, [countryCode]);

  useEffect(() => {
    if (countryCode && stateCode) {
      setCities(City.getCitiesOfState(countryCode, stateCode));
      setSelectedCity("");
    }
  }, [stateCode]);

  const [languages, setLanguages] = useState([]);
  const [selectedLang, setSelectedLang] = useState("");
  const [toast, setToast] = useState({ open: false });

  const showNotification = ({type, message}) => {
    setToast({
      open: true,
      type,
      message: message,
      // description: `This is a ${type} message displayed at bottom right.`,
    });

    // reset state so it can trigger again later
    setTimeout(() => setToast({ open: false }), 200);
  };


  useEffect(() => {
    const allNames = ISO6391.getAllNames(); // English names
    const allCodes = ISO6391.getAllCodes(); // ISO codes
    const data = allCodes.map((code, i) => ({
      code,
      name: allNames[i],
    }));
    setLanguages(data);
  }, []);

  const [followers, setFollowers] = useState(0);

  const formatFollowers = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num;
  };

  const handlePlatformChange = (key) => {
    const dashIndex = key.indexOf("-");
    const platform = key.substring(0, dashIndex);
    const service = key.substring(dashIndex + 1);

    setSelectedPlatformServices((prev) => {
      let updated = {};

      // Always reset to current platform only
      const currentServices = prev[platform] || [];

      if (currentServices.includes(service)) {
        const filtered = currentServices.filter((s) => s !== service);
        if (filtered.length > 0) {
          updated[platform] = filtered;
        }
      } else {
        updated[platform] = [...currentServices, service];
      }

      return updated;
    });
  };

  const handleComboChange = (comboName) => {
    setSelectedCombos((prev) =>
      prev.includes(comboName)
        ? prev.filter((name) => name !== comboName)
        : [...prev, comboName]
    );
  };

  const handleProceed = () => {
    navigate("/dashboard/make-order", {
      state: {
        selectedPlatformServices,
        selectedCombos,
        selected, // pass the selected user details
      },
    });
  };

  const toggleWishlist = (itemId) => {
    setData(prevData => 
      prevData.map(influencer => 
        influencer.id === itemId 
          ? { ...influencer, wishlist: !influencer.wishlist }
          : influencer
      )
    );
    
    if (selected && selected.id === itemId) {
      setSelected(prev => ({
        ...prev,
        wishlist: !prev.wishlist
      }));
    }
  };

  return (
    <div className="h-[calc(100vh-70px)] overflow-auto !bg-[var(--bgPage2)] text-[var(--text)] p-3 md:p-4">
      {/* header section  */}
      <div >
        <div className="d-flex justify-content-between align-items-center mb-1 ">
          <h6 className="fw-semibold fs-4" style={{ color: "var(--text)" }}>
            Influencers
          </h6>
          <button
            className="btn btn-sm text-white !rounded-xl text-14 !bg-[var(--primary)] px-3 py-2 shadow-lg"
            // style={{
            // background: "linear-gradient(135deg, rgb(87, 52, 226), #1976d2)",
            // border: "none",
            // color: "#fff",
            // borderRadius: "50px",
            // padding: "0.6rem 1.5rem",
            // fontWeight: 600,
            // fontSize: "0.95rem",
            // boxShadow: "0 4px 14px rgba(125, 104, 195, 0.25)",
            // }}
            onClick={() => setShowFilters(true)}
          >
            Filters
          </button>
        </div>

        {/* Selected Filters Badges */}
        <div className="d-flex flex-wrap gap-2 mb-3">
          {countryCode && (
            <span className="badge bg-primary text-white">
              Country: {countryCode}
            </span>
          )}
          {stateCode && (
            <span className="badge bg-primary text-white">
              State: {stateCode}
            </span>
          )}
          {selectedCity && (
            <span className="badge bg-primary text-white">
              City: {selectedCity}
            </span>
          )}
          {niche && (
            <span className="badge bg-success text-white">Niche: {niche}</span>
          )}
          {contentType && (
            <span className="badge bg-info text-dark">
              Content: {contentType}
            </span>
          )}
          {platform && (
            <span className="badge bg-warning text-dark">
              Platform: {platform}
            </span>
          )}
          {engagementRate > 0 && (
            <span className="badge bg-dark text-white">
              Engagement: {engagementRate}%
            </span>
          )}
          {followers > 0 && (
            <span className="badge bg-secondary text-white">
              Followers: {formatFollowers(followers)}
            </span>
          )}
          {selectedLang && (
            <span className="badge bg-light text-dark border">
              Lang: {selectedLang}
            </span>
          )}
        </div>
      </div>

      {/* content section  */}
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
      <div className="flex flex-column flex-xl-row !h-fit">
      <LeftPanel
        data={data}
        selected={selected}
        setSelected={setSelected}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setShowFilters={setShowFilters}
        countryCode={countryCode}
        stateCode={stateCode}
        selectedCity={selectedCity}
        niche={niche}
        contentType={contentType}
        platform={platform}
        engagementRate={engagementRate}
        followers={followers}
        selectedLang={selectedLang}
        formatFollowers={formatFollowers}
      />

      <div className="right-panel py-2 px-0 md:p-3 !pb-0"
        // style={{
          // borderRadius: "1rem",
          // backgroundColor: "var(--primary-color)",
          // minHeight: "100%",
        // }}
      >
        {selected && (
          <>

            <div className="!border !border-[var(--border)] !h-[calc(100vh-195px)] rounded-xl bg-[var(--card)] p-2 md:p-4">
            <div className="d-flex justify-content-between align-items-center mb-1 !pb-2">
              <h4 className="fw-bold mb-0">Profile</h4>
              <button
                className="btn btn-sm text-white !rounded-lg text-14 !bg-[var(--primary)] px-4 py-2 shadow-lg"
                onClick={() => navigate('/dashboard/make-order', { state: { selected } })}
              >
                Book Now
              </button>
            </div>
            <ProfileHeader
              selected={selected}
              isWishlisted={isWishlisted}
              toggleWishlist={toggleWishlist}
              navigate={navigate}
            />

              <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
              
              <div className=' !h-[calc(100vh-425px)] overflow-y-auto'>
            {activeTab === "services" && <ServicesTab selected={selected} />}

            {activeTab === "prices" && (
              <PricesTab
                selected={selected}
                selectedService={selectedService}
                setSelectedService={setSelectedService}
                selectedPlatformServices={selectedPlatformServices}
                setSelectedPlatformServices={setSelectedPlatformServices}
                selectedCombos={selectedCombos}
                setSelectedCombos={setSelectedCombos}
                expandedPlatform={expandedPlatform}
                setExpandedPlatform={setExpandedPlatform}
                handlePlatformChange={handlePlatformChange}
                handleComboChange={handleComboChange}
                handleProceed={handleProceed}
                convertPrice={convertPriceLocal}
              />
            )}

            {activeTab === "data" && <DataTab selected={selected} />}

              </div>


            </div>
          </>
        )}
      </div>
      </div>
      )}

      <FiltersOffcanvas
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        resetFilters={resetFilters}
        handleUpdate={handleUpdate}
        countryCode={countryCode}
        setCountryCode={setCountryCode}
        stateCode={stateCode}
        setStateCode={setStateCode}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        countries={countries}
        states={states}
        cities={cities}
        niche={niche}
        setNiche={setNiche}
        contentType={contentType}
        setContentType={setContentType}
        engagementRate={engagementRate}
        setEngagementRate={setEngagementRate}
        followers={followers}
        setFollowers={setFollowers}
        platform={platform}
        setPlatform={setPlatform}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        hashtags={hashtags}
        setHashtags={setHashtags}
        age={age}
        setAge={setAge}
        gender={gender}
        setGender={setGender}
        audienceCountry={audienceCountry}
        setAudienceCountry={setAudienceCountry}
        selectedLang={selectedLang}
        setSelectedLang={setSelectedLang}
        languages={languages}
        formatFollowers={formatFollowers}
      />
      <NotificationToast
        open={toast.open}
        type={toast.type}
        message={toast.message}
        description={toast.description}
      />
    </div>
  );
}

export default Influencers;
