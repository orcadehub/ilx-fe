import React, { useState } from "react";
import { Radio, Button } from "antd";
import CustomCard from "./CustomCard";

const CustomPackages = ({ packages = [], onSubmit }) => {
    const [selectedPackage, setSelectedPackage] = useState(null);

    const handlePackageSelect = (pkg) => {
        setSelectedPackage(pkg);
    };

    const handleSendForReview = () => {
        if (selectedPackage && onSubmit) {
            onSubmit(selectedPackage);
        }
    };

    // Default packages if none provided
    const defaultPackages = [
        {
            id: 1,
            name: "Brand Boost",
            description: "Perfect for product launches and brand awareness",
            platforms: ["Instagram", "Facebook"],
            services: ["Post Image/Video", "Story"],
            price: 899,
            info: true
        },
        {
            id: 2,
            name: "Social Combo",
            description: "Maximum reach across all major platforms",
            platforms: ["Instagram", "Facebook", "Youtube"],
            services: ["Reels/Shorts", "In-Video Promotion"],
            price: 1499,
            info: true
        },
        {
            id: 3,
            name: "Video Power Pack",
            description: "Great for detailed product demos and tutorials",
            platforms: ["Youtube", "Instagram"],
            services: ["In-Video Promotion", "Detailed Product Demo"],
            price: 2199,
            info: true
        }
    ];

    const packagesToShow = packages.length > 0 ? packages : defaultPackages;

    return (
        <div className="w-full max-w-4xl mx-auto p-4">
            {/* Header */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-[var(--text)] mb-2">
                    Custom Packages
                </h2>
                <p className="text-[var(--mutedText)] text-14">
                    Choose a multi-platform promotion package designed by the influencer. These bundles include posts across 2 or more platforms at a fixed price. Content must be provided by the business.
                </p>
            </div>

            {/* Package Cards */}
            <div className="space-y-4">
                {packagesToShow.map((pkg) => (
                    <div key={pkg.id} onClick={() => handlePackageSelect(pkg)}>
                        <CustomCard
                            combo={pkg}
                            selected={selectedPackage?.id === pkg.id}
                            onSelect={handlePackageSelect}
                            showRadio={true}
                        />
                    </div>
                ))}
            </div>

            {/* Submit Button */}
            <div className="mt-8 flex justify-end">
                <Button
                    type="primary"
                    size="large"
                    onClick={handleSendForReview}
                    disabled={!selectedPackage}
                    className="px-8 py-2 bg-blue-600 hover:bg-blue-700 border-0 text-white font-medium rounded-lg shadow-md"
                >
                    Send for Review
                </Button>
            </div>
        </div>
    );
};

export default CustomPackages;