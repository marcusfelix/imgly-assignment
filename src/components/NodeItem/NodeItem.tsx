import { IconCircle, IconSquare } from "@tabler/icons-react";
import { Node } from "../../types/node";
import styles from "./NodeItem.module.css";
import { useTree } from "../../providers/treeProvider";

type Props = {
  node: Node;
}

export default function NodeItem({ node }: Props) {
  const { selected, setSelected, moveNodeFromTo } = useTree();

  const onClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
    event.stopPropagation();
    setSelected(isSelected ? null : node);
  }

  const onDragStart = (event: React.DragEvent<HTMLDivElement>, node: Node) => {
    event.dataTransfer.setData('node', JSON.stringify(node));
  }

  const onHandleDrop = (event: React.DragEvent<HTMLDivElement>, node: Node) => {
    event.preventDefault();
    const drop = JSON.parse(event.dataTransfer.getData('node')) as Node;

    // Prevent dropping on itself
    if(drop.uniqueId === node.uniqueId) return;
    
    moveNodeFromTo(drop, node);
  }

  const onHandleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }

  const isSelected = node.uniqueId === (selected?.uniqueId ?? '');

  return (
    <div className={`${styles.item} ${isSelected ? styles.selected : ''}`} onClick={onClick}>
      <div className={styles.label}
        draggable
        onDragStart={(event) => onDragStart(event, node)}
        onDrop={(event) => onHandleDrop(event, node)}
        onDragOver={onHandleDragOver}
      >
        {node.id !== undefined ? <IconCircle/> : <IconSquare/>}
        <span>
          {node.label}
        </span>
      </div>
      <div className={styles.children}>
        {node.children?.map((child) => (
          <NodeItem key={child.uniqueId} node={child} />
        ))}
      </div>
    </div>
  );
}