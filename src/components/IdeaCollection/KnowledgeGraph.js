import React, { useRef, useEffect } from 'react';
import { ForceGraph2D } from 'react-force-graph';
import { useTheme } from '../ThemeContent';
import { ZoomIn, ZoomOut, Maximize } from 'lucide-react';

const KnowledgeGraph = ({ data }) => {
  const { isDarkMode } = useTheme();
  const fgRef = useRef();

  useEffect(() => {
    if (fgRef.current) {
      fgRef.current.d3Force('charge').strength(-300);
      fgRef.current.d3Force('link').distance(100);
    }
  }, []);

  const handleZoomIn = () => {
    if (fgRef.current) {
      fgRef.current.zoom(fgRef.current.zoom() * 1.2);
    }
  };

  const handleZoomOut = () => {
    if (fgRef.current) {
      fgRef.current.zoom(fgRef.current.zoom() / 1.2);
    }
  };

  const handleResetView = () => {
    if (fgRef.current) {
      fgRef.current.zoomToFit(400);
    }
  };

  return (
    <div className="relative h-[600px] w-full border rounded-lg overflow-hidden">
      <ForceGraph2D
        ref={fgRef}
        graphData={data}
        nodeLabel="title"
        nodeColor={node => isDarkMode ? '#8B5CF6' : '#6D28D9'}
        linkColor={() => isDarkMode ? '#4B5563' : '#D1D5DB'}
        nodeCanvasObject={(node, ctx, globalScale) => {
          const label = node.title;
          const fontSize = 12/globalScale;
          ctx.font = `${fontSize}px Sans-Serif`;
          const textWidth = ctx.measureText(label).width;
          const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2);

          ctx.fillStyle = isDarkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)';
          ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);

          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = isDarkMode ? '#ffffff' : '#000000';
          ctx.fillText(label, node.x, node.y);
        }}
      />
      <div className="absolute top-2 right-2 flex flex-col space-y-2">
        <button onClick={handleZoomIn} className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'}`}>
          <ZoomIn size={20} />
        </button>
        <button onClick={handleZoomOut} className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'}`}>
          <ZoomOut size={20} />
        </button>
        <button onClick={handleResetView} className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'}`}>
          <Maximize size={20} />
        </button>
      </div>
    </div>
  );
};

export default KnowledgeGraph;