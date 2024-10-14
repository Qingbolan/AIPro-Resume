import React, { useState, useEffect, useRef } from 'react';
import { ZoomIn, ZoomOut, Maximize} from 'lucide-react';
import { ForceGraph2D } from 'react-force-graph';
import { useTheme } from '../ThemeContent';

const KnowledgeGraph = ({ data }) => {
    const { isDarkMode } = useTheme();
    const fgRef = useRef();
    const containerRef = useRef();
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
    useEffect(() => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    }, []);
  
    useEffect(() => {
      if (fgRef.current && dimensions.width > 0 && dimensions.height > 0) {
        fgRef.current.d3Force('charge').strength(-100);
        fgRef.current.d3Force('link').distance(50);
        fgRef.current.d3Force('center', null);
        
        // Automatically fit the view after the graph is loaded
        setTimeout(() => {
          handleResetView();
        }, 100); // Small delay to ensure the graph is fully rendered
      }
    }, [data, dimensions]);
  
    const getNodeColor = (node) => {
      const colors = [
        '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', 
        '#98D8C8', '#F7DC6F', '#BB8FCE', '#82E0AA'
      ];
      return colors[node.group % colors.length];
    };
  
    const handleZoomIn = () => {
      fgRef.current.zoom(fgRef.current.zoom() * 1.2);
    };
  
    const handleZoomOut = () => {
      fgRef.current.zoom(fgRef.current.zoom() / 1.2);
    };
  
    const handleResetView = () => {
      if (fgRef.current) {
        fgRef.current.zoomToFit(400, 20);
      }
    };
  
    return (
      <div ref={containerRef} className={`relative h-[400px] w-full ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} rounded-lg overflow-hidden`}>
        {dimensions.width > 0 && dimensions.height > 0 && (
          <ForceGraph2D
            ref={fgRef}
            graphData={data}
            width={dimensions.width}
            height={dimensions.height}
            nodeRelSize={6}
            nodeVal={(node) => node.value || 1}
            nodeAutoColorBy="group"
            nodeCanvasObject={(node, ctx, globalScale) => {
              const label = node.id;
              const fontSize = 14/globalScale;
              ctx.font = `${fontSize}px Arial`;
              const textWidth = ctx.measureText(label).width;
              const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.4);
  
              ctx.beginPath();
              ctx.arc(node.x, node.y, 4, 0, 2 * Math.PI, false);
              ctx.fillStyle = getNodeColor(node);
              ctx.fill();
  
              ctx.fillStyle = isDarkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)';
              ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);
  
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.fillStyle = isDarkMode ? '#FFFFFF' : '#000000';
              ctx.fillText(label, node.x, node.y);
            }}
            linkColor={() => isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'}
            linkWidth={1.5}
            linkDirectionalParticles={2}
            linkDirectionalParticleWidth={2}
            linkDirectionalParticleSpeed={d => d.value * 0.002}
            d3AlphaDecay={0.01}
            d3VelocityDecay={0.08}
            cooldownTime={3000}
            onEngineStop={handleResetView}
          />
        )}
        <div className="absolute top-2 right-2 flex flex-col space-y-2">
          <button onClick={handleZoomIn} className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all">
            <ZoomIn size={20} />
          </button>
          <button onClick={handleZoomOut} className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all">
            <ZoomOut size={20} />
          </button>
          <button onClick={handleResetView} className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all">
            <Maximize size={20} />
          </button>
        </div>
      </div>
    );
  };


export default KnowledgeGraph;