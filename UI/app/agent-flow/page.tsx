'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  ReactFlow,
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  ConnectionMode,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { motion } from 'framer-motion';
import { LayoutWrapper } from '@/components/layout-wrapper';
import { AGENT_FLOW_NODES } from '@/lib/constants';

const initialNodes: Node[] = [
  {
    id: '1',
    data: { label: 'Farmer Profile', description: 'Collect basic farmer information' },
    position: { x: 250, y: 0 },
    style: {
      background: '#16a34a',
      color: '#fff',
      border: '2px solid #15803d',
      padding: '12px',
      borderRadius: '8px',
      width: '180px',
      fontSize: '12px',
      fontWeight: 'bold',
      textAlign: 'center',
    },
  },
  {
    id: '2',
    data: { label: 'Land Details', description: 'Verify land holdings' },
    position: { x: 0, y: 100 },
    style: {
      background: '#16a34a',
      color: '#fff',
      border: '2px solid #15803d',
      padding: '12px',
      borderRadius: '8px',
      width: '180px',
      fontSize: '12px',
      fontWeight: 'bold',
      textAlign: 'center',
    },
  },
  {
    id: '3',
    data: { label: 'Income Verification', description: 'Check annual income' },
    position: { x: 250, y: 100 },
    style: {
      background: '#16a34a',
      color: '#fff',
      border: '2px solid #15803d',
      padding: '12px',
      borderRadius: '8px',
      width: '180px',
      fontSize: '12px',
      fontWeight: 'bold',
      textAlign: 'center',
    },
  },
  {
    id: '4',
    data: { label: 'Document Review', description: 'Validate documents' },
    position: { x: 500, y: 100 },
    style: {
      background: '#16a34a',
      color: '#fff',
      border: '2px solid #15803d',
      padding: '12px',
      borderRadius: '8px',
      width: '180px',
      fontSize: '12px',
      fontWeight: 'bold',
      textAlign: 'center',
    },
  },
  {
    id: '5',
    data: { label: 'Eligibility Result', description: 'Generate report' },
    position: { x: 250, y: 200 },
    style: {
      background: '#16a34a',
      color: '#fff',
      border: '2px solid #15803d',
      padding: '12px',
      borderRadius: '8px',
      width: '180px',
      fontSize: '12px',
      fontWeight: 'bold',
      textAlign: 'center',
    },
  },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e1-3', source: '1', target: '3', animated: true },
  { id: 'e1-4', source: '1', target: '4', animated: true },
  { id: 'e2-5', source: '2', target: '5', animated: true },
  { id: 'e3-5', source: '3', target: '5', animated: true },
  { id: 'e4-5', source: '4', target: '5', animated: true },
];

export default function AgentFlowPage() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node.id);
  }, []);

  return (
    <LayoutWrapper>
      <div className="min-h-screen py-8 px-4">
        <div className="mb-8">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              UFAC Agent Flow
            </h1>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Visualize the step-by-step eligibility assessment process powered by our AI agents.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Flow Visualization */}
          <motion.div
            className="lg:col-span-3 h-[600px] rounded-lg border border-border bg-card overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onNodeClick={onNodeClick}
              connectionMode={ConnectionMode.Loose}
            >
              <Background color="rgba(34, 197, 94, 0.1)" />
              <Controls />
            </ReactFlow>
          </motion.div>

          {/* Details Panel */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="space-y-6">
              <div className="p-6 rounded-lg bg-card border border-border">
                <h3 className="font-semibold text-foreground mb-4">Assessment Stages</h3>
                <ul className="space-y-3">
                  {AGENT_FLOW_NODES.map((node, index) => (
                    <li
                      key={node.id}
                      className={`p-3 rounded-lg cursor-pointer transition-all ${
                        selectedNode === node.id
                          ? 'bg-accent text-accent-foreground'
                          : 'bg-border/50 text-foreground/70 hover:bg-border'
                      }`}
                      onClick={() => setSelectedNode(node.id)}
                    >
                      <div className="font-medium text-sm">Stage {index + 1}</div>
                      <div className="text-xs mt-1">{node.label}</div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Selected Node Details */}
              {selectedNode && (
                <motion.div
                  className="p-6 rounded-lg bg-accent/10 border border-accent/20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {(() => {
                    const node = AGENT_FLOW_NODES.find((n) => n.id === selectedNode);
                    if (!node) return null;
                    return (
                      <>
                        <h4 className="font-semibold text-foreground mb-2">{node.label}</h4>
                        <p className="text-sm text-foreground/70 mb-4">{node.description}</p>
                        <div className="space-y-2 text-xs text-foreground/60">
                          <p>This stage validates:</p>
                          <ul className="list-disc list-inside space-y-1 ml-1">
                            {selectedNode === '1' && (
                              <>
                                <li>Farmer identification</li>
                                <li>Personal details</li>
                                <li>Contact information</li>
                              </>
                            )}
                            {selectedNode === '2' && (
                              <>
                                <li>Land ownership documents</li>
                                <li>Land area & location</li>
                                <li>Agricultural classification</li>
                              </>
                            )}
                            {selectedNode === '3' && (
                              <>
                                <li>Income sources</li>
                                <li>Annual income total</li>
                                <li>Financial documents</li>
                              </>
                            )}
                            {selectedNode === '4' && (
                              <>
                                <li>Aadhar verification</li>
                                <li>Bank account validity</li>
                                <li>Land records</li>
                              </>
                            )}
                            {selectedNode === '5' && (
                              <>
                                <li>Eligibility determination</li>
                                <li>Benefit calculation</li>
                                <li>Report generation</li>
                              </>
                            )}
                          </ul>
                        </div>
                      </>
                    );
                  })()}
                </motion.div>
              )}

              {/* Key Metrics */}
              <div className="p-6 rounded-lg bg-card border border-border">
                <h3 className="font-semibold text-foreground mb-4">Process Metrics</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-foreground/60 mb-1">Average Processing Time</p>
                    <p className="font-bold text-accent">2-5 seconds</p>
                  </div>
                  <div>
                    <p className="text-xs text-foreground/60 mb-1">Accuracy Rate</p>
                    <p className="font-bold text-accent">98%</p>
                  </div>
                  <div>
                    <p className="text-xs text-foreground/60 mb-1">Verification Success</p>
                    <p className="font-bold text-accent">99.2%</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </LayoutWrapper>
  );
}
