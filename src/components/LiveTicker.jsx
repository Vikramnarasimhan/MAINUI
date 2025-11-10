import React from "react";

const headlines = [
  "📰 Opposition Walkout - Political developments",
  "🗳️ TN CM Speech - Assembly updates",
  "🇮🇳 Bihar Election Updates - Voting concludes",
  "📈 Market opens flat - Economic indicators",
  "🏏 Sports: India wins series - Cricket triumph",
  "🌍 Global Climate Summit - International news",
  "🤖 Tech Giants Face AI Regulations - Innovation debate",
  "💰 Economic Outlook Brightens - Markets rise",
];

export default function LiveTicker() {
  return (
    <>
      <style>{`
        @keyframes ticker-scroll {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        .ticker-container {
          position: fixed;
          top: 104px;
          left: 0;
          width: 100%;
          height: 36px;
          background: linear-gradient(135deg, #c41e3a 0%, #a31828 100%);
          display: flex;
          align-items: center;
          padding: 0;
          margin: 0;
          overflow: hidden;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          z-index: 999;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        }

        .ticker-label {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 0 16px;
          background: rgba(255, 255, 255, 0.15);
          flex-shrink: 0;
          height: 100%;
          border-right: 1px solid rgba(255, 255, 255, 0.25);
          min-width: fit-content;
        }

        .ticker-dot {
          width: 8px;
          height: 8px;
          background: #ffffff;
          border-radius: 50%;
          animation: pulse 1.5s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { 
            opacity: 1;
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7);
          }
          50% { 
            opacity: 0.7;
            transform: scale(1.1);
            box-shadow: 0 0 0 4px rgba(255, 255, 255, 0);
          }
        }

        .ticker-label-text {
          color: #ffffff;
          font-weight: 700;
          font-size: 0.7rem;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          font-family: 'Segoe UI', sans-serif;
          white-space: nowrap;
        }

        .ticker-content {
          flex: 1;
          overflow: hidden;
          display: flex;
          height: 100%;
          align-items: center;
        }

        .ticker-text {
          display: flex;
          white-space: nowrap;
          animation: ticker-scroll 80s linear infinite;
          font-size: 14px;
          font-weight: 500;
          color: #ffffff;
          padding: 0;
          font-family: 'Segoe UI', sans-serif;
          align-items: center;
          gap: 0;
        }

        .ticker-item {
          display: inline-flex;
          align-items: center;
          min-width: max-content;
          padding: 0 32px;
          border-right: 1px solid rgba(255, 255, 255, 0.2);
        }

        .ticker-item:last-child {
          border-right: 1px solid rgba(255, 255, 255, 0.2);
        }

        /* Hover pause effect */
        .ticker-text:hover {
          animation-play-state: paused;
        }

        /* Mobile responsive */
        @media (max-width: 768px) {
          .ticker-container {
            top: 60px;
            height: 32px;
          }

          .ticker-label {
            padding: 0 12px;
            gap: 4px;
          }

          .ticker-dot {
            width: 6px;
            height: 6px;
          }

          .ticker-label-text {
            font-size: 0.65rem;
            letter-spacing: 1px;
          }

          .ticker-text {
            font-size: 12px;
            animation: ticker-scroll 60s linear infinite;
          }

          .ticker-item {
            padding: 0 20px;
          }
        }
      `}</style>

      <div className="ticker-container">
        {/* LIVE Badge - Compact */}
        <div className="ticker-label">
          <div className="ticker-dot"></div>
          <div className="ticker-label-text">Live</div>
        </div>

        {/* Scrolling Text */}
        <div className="ticker-content">
          <div className="ticker-text">
            {headlines.map((headline, idx) => (
              <span key={idx} className="ticker-item">
                {headline}
              </span>
            ))}
            {/* Repeat for seamless loop */}
            {headlines.map((headline, idx) => (
              <span key={`repeat-${idx}`} className="ticker-item">
                {headline}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
