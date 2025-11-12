import React from "react";
import { Radio } from "antd";
import { Facebook, Instagram } from "lucide-react";

const CustomCard = ({ combo, selected, onSelect, showRadio = true, convertPrice }) => {
  // Platform icon mapping
  const getPlatformIcon = (platform) => {
    const platformLower = platform.toLowerCase();
    switch (platformLower) {
      case 'instagram':
        return <i className="bi bi-instagram text-pink-600"></i>;
      case 'facebook':
        return <i className="bi bi-facebook text-blue-600"></i>;
      case 'youtube':
        return <i className="bi bi-youtube text-red-600"></i>;
      case 'twitter':
        return <i className="bi bi-twitter text-blue-400"></i>;
      default:
        return <i className="bi bi-globe text-gray-500"></i>;
    }
  };

  return (
    <div className="w-full mb-4">
      <div
        className={`
          border border-[var(--border)] rounded-xl p-4 bg-[var(--card)] text-[var(--text)]
          transition-all duration-200 hover:shadow-md cursor-pointer
          ${selected ? 'ring-2 ring-blue-500 ring-opacity-50' : ''}
        `}
        onClick={() => onSelect && onSelect(combo)}
      >
        {/* Header with radio button and price */}
        <div className="flex items-start justify-between mb-0">
          <div className=" gap-3">
            <div className="flex">
            {showRadio && (
              <Radio
                checked={selected}
                onChange={() => onSelect && onSelect(combo)}
                className="!text-[var(--text)]"
              />
            )}
              <h3 className="font-semibold !text-[20px] mb-1 text-[var(--text)] flex items-center gap-2">
                {combo.name}
                {combo.info && (
                  <i className="bi bi-info-circle text-gray-400 text-14"></i>
                )}
              </h3>
            </div>
              <p className="text-[var(--mutedText)] text-12 mb-0 pl-5 !w-full">
                {combo.description || "Perfect for product launches and brand awareness"}
              </p>
          </div>
          <div className="text-right">
            <span className="text-blue-600 font-bold text-lg">{convertPrice ? convertPrice(combo.price) : `₹${combo.price}`}</span>
          </div>
        </div>

        {/* Bottom section with Platforms on left and Includes on right */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between">
          {/* Platforms - Left side */}
          <div className="mb-2 md:mb-0">
          <div className="h-4 w-5"></div>  
          <div className="flex items-center flex-1">
            <div className="text-[var(--mutedText)] text-12 font-medium">
              Platforms:
            </div>
            <div className="flex flex-wrap gap-3">
              {combo.platforms && combo.platforms.length > 0 ? (
                combo.platforms.map((platform, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-2 text-[var(--text)] text-14"
                  >
                    {getPlatformIcon(platform)}
                    <span>{platform}</span>
                  </span>
                ))
              ) : (
                  <div className="text-[var(--mutedText)] text-12 flex justify-center items-center gap-1">
                    <div className="border !border-[var(--border)] bg-[var(--hover2)] rounded-3xl px-[5px] flex justify-center items-center gap-1">
                    <Facebook className="text-blue-500" size={16} />Facebook  
                   </div>
                    <div className="border !border-[var(--border)] bg-[var(--hover2)] rounded-3xl !px-[5px] flex justify-center items-center gap-1">
                    <Instagram className="text-pink-500" size={16} /> Instagram
                   </div>
                </div>
              )}
            </div>
          </div>
          </div>

          {/* Services/Includes - Right side */}
          <div className="flex md:block flex-1 gap-2 md:gap-0">
            <div className="md:text-right mb-0">
              <span className="text-[12px] text-[var(--mutedText)] !text-12 font-medium leading-tight">
                Includes
              </span>
            </div>
            <div className="flex flex-wrap gap-2 justify-end">
              {combo.services && combo.services.length > 0 ? (
                combo.services.map((service, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-12 rounded-lg border"
                    style={{
                      backgroundColor: 'var(--hover)',
                      color: 'var(--text)',
                      borderColor: 'var(--border)'
                    }}
                  >
                    {service}
                  </span>
                ))
              ) : (
                  <div className="border !border-[var(--border)] bg-[var(--hover2)] rounded-3xl px-[5px] flex justify-center items-center gap-1 text-[12px] leading-tight">
Story
                  </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomCard;