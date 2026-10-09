import { NodeViewContent, NodeViewProps } from '@tiptap/react';

import BlockFrame from './BlockFrame';

const BackgroundView = (props: NodeViewProps) => (
  <BlockFrame view={props}>
    <NodeViewContent className="email-background" />
  </BlockFrame>
);

export default BackgroundView;
