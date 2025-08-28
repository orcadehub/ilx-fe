import config from "../../config";

const baseURL =
  import.meta.env.MODE === "development"
    ? config.LOCAL_BASE_URL
    : config.BASE_URL;

export const fetchPromotions = async (setPromotions, setError, setIsLoading) => {
  try {
    setIsLoading(true);
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Please log in to view your promotions");
      return;
    }

    const response = await fetch(`${baseURL}/api/promotions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      setPromotions(data);
    } else {
      setError("Failed to fetch promotions");
    }
  } catch (err) {
    setError("Error fetching promotions");
    console.error(err);
  } finally {
    setIsLoading(false);
  }
};

export const generateUniqueUrl = async (campaignId, setError, setIsLoading) => {
  try {
    setIsLoading(true);
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Please log in to generate a URL");
      return null;
    }

    const response = await fetch(`${baseURL}/api/generate-url`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ campaignId }),
    });

    if (response.ok) {
      const data = await response.json();
      return data.unique_url;
    } else {
      const errorData = await response.json();
      setError(errorData.error || "Failed to generate URL");
      return null;
    }
  } catch (err) {
    setError("Error generating URL");
    console.error(err);
    return null;
  } finally {
    setIsLoading(false);
  }
};

export const claimReward = async (promotionId, setSuccess, setError, setIsLoading) => {
  try {
    setIsLoading(true);
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Please log in to claim reward");
      return;
    }

    const response = await fetch(`${baseURL}/api/promotions/claim-reward`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ promotionId }),
    });

    if (response.ok) {
      setSuccess("Reward claimed successfully!");
      return true;
    } else {
      setError("Failed to claim reward");
      return false;
    }
  } catch (err) {
    setError("Error claiming reward");
    console.error(err);
    return false;
  } finally {
    setIsLoading(false);
  }
};