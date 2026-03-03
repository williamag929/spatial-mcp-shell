import './App.css';
import { PhoneUI } from './components/PhoneUI';
import { SpatialNode } from './components/SpatialNode';
import { useNoForms } from './hooks/useNoForms';

function App() {
  const { nodes, normalizeText, isProcessing, error } = useNoForms();

  return (
    <div className="spatial-app">
      <PhoneUI onSubmit={normalizeText} isProcessing={isProcessing} />
      {error && (
        <div className="spatial-app__error" role="alert">
          {error}
        </div>
      )}
      {nodes.map((node, index) => (
        <SpatialNode
          key={node.id}
          data={node}
          allNodes={nodes}
          index={index}
        />
      ))}
    </div>
  );
}

export default App;
