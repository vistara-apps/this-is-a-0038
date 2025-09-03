import React, { useEffect, useRef } from 'react';

const TrendChart = ({ trends }) => {
  const canvasRef = useRef(null);
  
  // Draw chart when trends change
  useEffect(() => {
    if (!canvasRef.current || !trends || trends.length === 0) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set dimensions
    const width = canvas.width;
    const height = canvas.height;
    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    
    // Find max growth value for scaling
    const maxGrowth = Math.max(...trends.map(trend => trend.growthValue));
    
    // Colors for each trend
    const colors = [
      'rgba(149, 76, 233, 0.8)', // Purple
      'rgba(236, 72, 153, 0.8)', // Pink
      'rgba(59, 130, 246, 0.8)', // Blue
      'rgba(16, 185, 129, 0.8)', // Green
      'rgba(245, 158, 11, 0.8)'  // Orange
    ];
    
    // Draw axes
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 1;
    
    // Y-axis
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.stroke();
    
    // X-axis
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();
    
    // Draw grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 0.5;
    
    // Horizontal grid lines
    for (let i = 0; i <= 4; i++) {
      const y = padding + (chartHeight / 4) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
      
      // Y-axis labels
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${Math.round((4 - i) * (maxGrowth / 4))}%`, padding - 5, y);
    }
    
    // Draw bars
    const barWidth = chartWidth / (trends.length * 2);
    
    trends.forEach((trend, index) => {
      const x = padding + (index * 2 + 1) * (chartWidth / (trends.length * 2));
      const barHeight = (trend.growthValue / maxGrowth) * chartHeight;
      const y = height - padding - barHeight;
      
      // Draw bar
      ctx.fillStyle = colors[index % colors.length];
      ctx.fillRect(x - barWidth / 2, y, barWidth, barHeight);
      
      // Draw label
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      
      // Truncate long hashtags
      const label = trend.hashtag.length > 10 
        ? trend.hashtag.substring(0, 8) + '...' 
        : trend.hashtag;
      
      ctx.fillText(label, x, height - padding + 5);
    });
    
    // Draw title
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText('Growth Rate (%)', width / 2, 10);
  }, [trends]);
  
  return (
    <div className="w-full h-64 relative">
      <canvas 
        ref={canvasRef} 
        width={600} 
        height={300} 
        className="w-full h-full"
      />
    </div>
  );
};

export default TrendChart;

