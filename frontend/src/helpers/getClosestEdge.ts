export const getClosestEdge = ({ store }: { store: Store }) => {
    (node: any) => {
        const { nodeLookup } = store.getState();
        const internalNode = getInternalNode(node.id);
    
        const closestNode = Array.from(nodeLookup.values()).reduce(
          (res, n) => {
            if (n.id !== internalNode.id) {
              const dx =
                n.internals.positionAbsolute.x -
                internalNode.internals.positionAbsolute.x;
              const dy =
                n.internals.positionAbsolute.y -
                internalNode.internals.positionAbsolute.y;
              const d = Math.sqrt(dx * dx + dy * dy);
    
              if (d < res.distance && d < MIN_DISTANCE) {
                res.distance = d;
                res.node = n;
              }
            }
    
            return res;
          },
          {
            distance: Number.MAX_VALUE,
            node: null,
          },
        );
    
        if (!closestNode.node) {
          return null;
        }
    
        const closeNodeIsSource =
          closestNode.node.internals.positionAbsolute.x <
          internalNode.internals.positionAbsolute.x;
    
        return {
          id: closeNodeIsSource
            ? `${closestNode.node.id}-${node.id}`
            : `${node.id}-${closestNode.node.id}`,
          source: closeNodeIsSource ? closestNode.node.id : node.id,
          target: closeNodeIsSource ? node.id : closestNode.node.id,
        };
      }
}