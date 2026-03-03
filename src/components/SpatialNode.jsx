import { Spatialized2DElementContainer } from '@webspatial/react-sdk';
import './SpatialNode.css';

const TYPE_COLORS = {
  Contact: '#4fc3f7',
  Task: '#aed581',
  Event: '#ffb74d',
  Note: '#ce93d8',
  Reminder: '#ef9a9a',
};

function ContentBlock({ content }) {
  if (!content || typeof content !== 'object') {
    return <p className="spatial-node__text">{String(content)}</p>;
  }
  return (
    <ul className="spatial-node__content-list">
      {Object.entries(content).map(([key, val]) => (
        <li key={key}>
          <span className="spatial-node__key">{key}:</span>{' '}
          <span className="spatial-node__val">{String(val)}</span>
        </li>
      ))}
    </ul>
  );
}

function ConnectionLine({ toId, allNodes }) {
  const target = allNodes.find((n) => n.id === toId);
  if (!target) return null;
  return (
    <span className="spatial-node__connection-tag" title={`→ ${target.type}`}>
      ⟶ {target.type}
    </span>
  );
}

export function SpatialNode({ data, allNodes, index }) {
  const accentColor = TYPE_COLORS[data.type] ?? '#90caf9';

  const spatialStyle = {
    '--xr-back': `${data.z_layer * 0.5}m`,
    '--xr-background-material': 'translucent',
  };

  return (
    <Spatialized2DElementContainer
      className="spatial-node-wrapper"
      style={{
        ...spatialStyle,
        '--node-accent': accentColor,
        top: `${80 + index * 230}px`,
        left: `calc(50% + ${(index % 2 === 0 ? -1 : 1) * 220}px)`,
      }}
      enable-xr
    >
      <div className="spatial-node__card">
        <header className="spatial-node__header">
          <span className="spatial-node__type-badge">{data.type}</span>
          <time className="spatial-node__time">
            {new Date(data.createdAt).toLocaleTimeString()}
          </time>
        </header>
        <ContentBlock content={data.content} />
        {data.connections.length > 0 && (
          <footer className="spatial-node__connections">
            {data.connections.map((cid) => (
              <ConnectionLine
                key={cid}
                toId={cid}
                allNodes={allNodes}
              />
            ))}
          </footer>
        )}
        <p className="spatial-node__raw">"{data.rawInput}"</p>
      </div>
    </Spatialized2DElementContainer>
  );
}
