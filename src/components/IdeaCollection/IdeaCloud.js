import React, { useRef, useEffect } from 'react';
import { ForceGraph2D } from 'react-force-graph';
import { useTheme } from '../ThemeContent';

const IdeaCloud = ({ ideas, onIdeaClick }) => {
  const { isDarkMode } = useTheme();
  const fgRef = useRef();

  useEffect(() => {
    if (fgRef.current) {
      fgRef.current.d3Force('charge').strength(-300);
      fgRef.current.d3Force('link').distance(100);
    }
  }, []);

  const graphData = {
    nodes: ideas.map(idea => ({ id: idea.id, label: idea.title })),
    links: ideas.flatMap(idea => 
      idea.relatedProjects.map(projectId => ({ source: idea.id, target: projectId }))
    )
  };

  return (
    <div className="h-[400px] w-full border rounded-lg overflow-hidden">
      <ForceGraph2D
        ref={fgRef}
        graphData={graphData}
        nodeLabel="label"
        nodeColor={node => isDarkMode ? '#8B5CF6' : '#6D28D9'}
        linkColor={() => isDarkMode ? '#4B5563' : '#D1D5DB'}
        nodeCanvasObject={(node, ctx, globalScale) => {
          const label = node.label;
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
        onNodeClick={(node) => {
          const idea = ideas.find(i => i.id === node.id);
          if (idea) onIdeaClick(idea);
        }}
      />
    </div>
  );
};

export default IdeaCloud;