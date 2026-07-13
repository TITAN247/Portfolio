import React, { useState } from 'react';
import { motion } from 'framer-motion';

const dataPoints = [
  { label: 'Jan', value: 30 },
  { label: 'Feb', value: 45 },
  { label: 'Mar', value: 25 },
  { label: 'Apr', value: 65 },
  { label: 'May', value: 40 },
  { label: 'Jun', value: 85 },
  { label: 'Jul', value: 60 },
  { label: 'Aug', value: 100 },
];

const InteractiveChart: React.FC = () => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  // Chart dimensions
  const width = 600;
  const height = 250;
  const padding = 40;

  // Max value for scaling
  const maxValue = Math.max(...dataPoints.map((d) => d.value));

  // Compute points
  const points = dataPoints.map((d, i) => {
    const x = padding + (i * (width - 2 * padding)) / (dataPoints.length - 1);
    const y = height - padding - (d.value / maxValue) * (height - 2 * padding);
    return { x, y, label: d.label, value: d.value };
  });

  // Generate SVG path line
  const pathD = points.map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`)).join(' ');

  // Generate SVG area fill (closes at bottom)
  const areaD = `${pathD} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`;

  return (
    <div className="relative w-full max-w-2xl mx-auto rounded-3xl p-6 bg-[#0C0C0C] border border-[#D7E2EA]/10 shadow-[0_0_40px_rgba(215,226,234,0.05)]">
      
      {/* Chart Title */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-[#D7E2EA] font-semibold tracking-wide uppercase text-sm opacity-80">
          Impact Analytics
        </h3>
        <span className="text-[#D7E2EA] text-xs opacity-50">YTD Growth</span>
      </div>

      <div className="relative w-full overflow-hidden" style={{ aspectRatio: '600/250' }}>
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(232, 168, 48, 0.4)" />
              <stop offset="100%" stopColor="rgba(232, 168, 48, 0)" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Grid lines */}
          {[0, 0.5, 1].map((ratio, i) => (
            <line
              key={i}
              x1={padding}
              y1={padding + ratio * (height - 2 * padding)}
              x2={width - padding}
              y2={padding + ratio * (height - 2 * padding)}
              stroke="rgba(215, 226, 234, 0.1)"
              strokeDasharray="4 4"
            />
          ))}

          {/* Area Fill with Animation */}
          <motion.path
            d={areaD}
            fill="url(#chartGradient)"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            viewport={{ once: true }}
          />

          {/* Line Path with draw animation */}
          <motion.path
            d={pathD}
            fill="none"
            stroke="#e8a830"
            strokeWidth="3"
            filter="url(#glow)"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            viewport={{ once: true }}
          />

          {/* Data Points (Interactive) */}
          {points.map((p, i) => (
            <g key={i}>
              <motion.circle
                cx={p.x}
                cy={p.y}
                r={hoverIndex === i ? 6 : 4}
                fill="#0C0C0C"
                stroke="#e8a830"
                strokeWidth="2"
                style={{ cursor: 'none' }}
                onMouseEnter={() => setHoverIndex(i)}
                onMouseLeave={() => setHoverIndex(null)}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 1 + i * 0.1, type: 'spring' }}
                viewport={{ once: true }}
              />
              
              {/* Tooltip text when hovered */}
              {hoverIndex === i && (
                <g>
                  <rect
                    x={p.x - 20}
                    y={p.y - 35}
                    width="40"
                    height="24"
                    rx="4"
                    fill="#D7E2EA"
                  />
                  <text
                    x={p.x}
                    y={p.y - 18}
                    fill="#0C0C0C"
                    fontSize="12"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    {p.value}
                  </text>
                </g>
              )}
            </g>
          ))}

          {/* X Axis Labels */}
          {points.map((p, i) => (
            <text
              key={i}
              x={p.x}
              y={height - 15}
              fill="#D7E2EA"
              fontSize="12"
              opacity="0.5"
              textAnchor="middle"
            >
              {p.label}
            </text>
          ))}
        </svg>
      </div>
    </div>
  );
};

export default InteractiveChart;
