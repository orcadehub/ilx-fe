import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast, ToastContainer } from "react-toastify";
import { Offcanvas, Dropdown } from "react-bootstrap";
import { Country, State, City } from "country-state-city";
import ISO6391 from "iso-639-1";
import { useNavigate } from "react-router-dom";

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

const baseURL =
  import.meta.env.MODE === "development"
    ? config.LOCAL_BASE_URL
    : config.BASE_URL;

function Influencers() {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isWishlisted, setIsWishlisted] = useState({});

  useEffect(() => {
    const loadInfluencers = async () => {
      const InfluencersData = await getInfluencersData();
      setData(InfluencersData);
      console.log(InfluencersData);
      // Initialize isWishlisted state from fetched data
      const wishlistState = InfluencersData.reduce((acc, influencer) => {
        acc[influencer.id] = influencer.wishlist || false;
        return acc;
      }, {});
      setIsWishlisted(wishlistState);
      setSelected(InfluencersData[0]); // Set selected after data is available
    };

    loadInfluencers();
  }, []);

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
  const [expandedPlatform, setExpandedPlatform] = useState("instagram");

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

  const toggleWishlist = async (itemId) => {
    const newState = !isWishlisted[itemId];
    try {
      const token = localStorage.getItem("token");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      setIsWishlisted({ ...isWishlisted, [itemId]: newState });

      const response = await fetch(`${baseURL}/api/wishlist`, {
        method: "POST",
        headers,
        body: JSON.stringify({ itemId }),
      });

      if (!response.ok) {
        throw new Error("Failed to update wishlist");
      }

      const { message } = await response.json();
      toast(
        message === "Added to wishlist"
          ? "❤️ Added to Wishlist"
          : "❌ Removed from Wishlist"
      );
    } catch (error) {
      console.error("Wishlist error:", error);
      setIsWishlisted({ ...isWishlisted, [itemId]: !newState });
      toast.error("⚠️ Failed to update wishlist");
    }
  };

  return (
    <div className="d-flex flex-column flex-md-row h-100">
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

      <div
        className="right-panel p-4 overflow-auto"
        style={{
          borderRadius: "1rem",
          backgroundColor: "var(--primary-color)",
          minHeight: "100%",
        }}
      >
        {selected && (
          <>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="fw-bold mb-0">Profile</h4>
              <button
                className="btn"
                style={{
                  background:
                    "linear-gradient(135deg, #1976d2),rgb(87, 52, 226)",
                  border: "none",
                  color: "#fff",
                  borderRadius: "50px",
                  padding: "0.6rem 1.5rem",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  boxShadow: "0 4px 14px rgba(125, 104, 195, 0.25)",
                }}
              >
                Book
              </button>
            </div>

            <ProfileHeader
              selected={selected}
              isWishlisted={isWishlisted}
              toggleWishlist={toggleWishlist}
              navigate={navigate}
            />

            <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

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
              />
            )}

            {activeTab === "data" && <DataTab selected={selected} />}
          </>
        )}
      </div>

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
    </div>
  );
}

export default Influencers;
