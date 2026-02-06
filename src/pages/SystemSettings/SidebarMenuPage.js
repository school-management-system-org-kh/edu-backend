import React, { useState } from "react";
import { Card, Col, Row } from "antd";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
  DragOverlay,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arraySwap,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DownOutlined, RightOutlined } from "@ant-design/icons";
import schoolMenu from "../../store/menuListData.json";
import { useTranslation } from 'react-i18next';

/* ---------- Sortable Item (used for both parent & child) ---------- */
const SortableItem = ({ id, name, depth = 0 }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: "6px 12px",
    margin: "4px 0",
    border: "1px solid #ddd",
    borderRadius: 6,
    background: isDragging ? "#bae7ff" : "#fafafa",
    cursor: "grab",
    fontWeight: 500,
    marginLeft: depth * 16, // indent children
    width:"100%"
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {name}
    </div>
  );
};

/* ---------- Collapsible Parent Item with Children ---------- */
const MenuItem = ({ item, depth = 0 }) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
        onClick={() => setOpen(!open)}
      >
        {item.items && item.items.length > 0 && (
          <span style={{ marginRight: 6, cursor: "pointer" }}>
            {open ? <DownOutlined /> : <RightOutlined />}
          </span>
        )}
        <SortableItem id={item.id} name={t(item.title) || t(item.name)} depth={depth} />
      </div>
      {open && item.items && item.items.length > 0 && (
        <div style={{ marginLeft: 20, borderLeft: "1px dashed #ddd", paddingLeft: 8 }}>
          <SortableContext
            items={item.items.map((c) => c.id)}
            strategy={verticalListSortingStrategy}
          >
            {item.items.map((child) => (
              <MenuItem key={child.id} item={child} depth={depth + 1} />
            ))}
          </SortableContext>
        </div>
      )}
    </div>
  );
};

/* ---------- Droppable List Container ---------- */
const DroppableList = ({ id, children }) => {
  const { setNodeRef, isOver } = useDroppable({ id });
  return (
    <div
      ref={setNodeRef}
      style={{
        minHeight: 300,
        padding: "10px",
        border: "2px dashed " + (isOver ? "#1890ff" : "#eee"),
        borderRadius: 6,
      }}
    >
      {children}
    </div>
  );
};

/* ---------- Main Component ---------- */
const SidebarMenuPage = () => {
  const { t } = useTranslation();
  const initialMenu = Object.values(schoolMenu.schoolSystem);
  const [menuList, setMenuList] = useState(initialMenu);
  const [selectedList, setSelectedList] = useState([]);
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragStart = ({ active }) => setActiveId(active.id);

  const handleDragEnd = ({ active, over }) => {
    setActiveId(null);
    if (!over) return;

    // Moving between Menu List <-> Selected
    if (over.id === "menu" && !menuList.find((i) => i.id === active.id)) {
      const item = selectedList.find((i) => i.id === active.id);
      if (item) {
        setSelectedList(selectedList.filter((i) => i.id !== active.id));
        setMenuList([...menuList, item]);
      }
    }

    if (over.id === "selected" && !selectedList.find((i) => i.id === active.id)) {
      const item = menuList.find((i) => i.id === active.id);
      if (item) {
        setMenuList(menuList.filter((i) => i.id !== active.id));
        setSelectedList([...selectedList, item]);
      }
    }

    // Reorder inside Menu List
    if (over.id !== "menu" && over.id !== "selected") {
      const oldIndex = menuList.findIndex((i) => i.id === active.id);
      const newIndex = menuList.findIndex((i) => i.id === over.id);
      if (oldIndex !== -1 && newIndex !== -1) {
        setMenuList(arraySwap(menuList, oldIndex, newIndex));
      }

      const oldIndexSel = selectedList.findIndex((i) => i.id === active.id);
      const newIndexSel = selectedList.findIndex((i) => i.id === over.id);
      if (oldIndexSel !== -1 && newIndexSel !== -1) {
        setSelectedList(arraySwap(selectedList, oldIndexSel, newIndexSel));
      }
    }
  };

  return (
    <Card
      style={{ minHeight: "45rem", margin: 0, overflowY: "hidden" }}
      title={<span style={{ fontWeight: 600, fontSize: "1.25rem" }}>{t("Sidebar Menu")}</span>}
    >
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
      >
        <Row gutter={24}>
          {/* Menu List */}
          <Col span={12}>
            <p style={{ fontSize: "1rem", fontWeight: 600 }}>{t("Menu List")}</p>
            <DroppableList id="menu">
              <SortableContext items={menuList.map((i) => i.id)} strategy={verticalListSortingStrategy}>
                {menuList.map((item) => (
                  <MenuItem key={item.id} item={item} />
                ))}
              </SortableContext>
            </DroppableList>
          </Col>

          {/* Selected Sidebar Menus */}
          <Col span={12}>
            <p style={{ fontSize: "1rem", fontWeight: 600 }}>{t("Selected Sidebar Menus")}</p>
            <DroppableList id="selected">
              {selectedList.length === 0 ? (
                <div style={{ color: "#999", textAlign: "center", padding: 20 }}>
                  {t("Drop items here")}
                </div>
              ) : (
                <SortableContext
                  items={selectedList.map((i) => i.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {selectedList.map((item) => (
                    <MenuItem key={item.id} item={item} />
                  ))}
                </SortableContext>
              )}
            </DroppableList>
          </Col>
        </Row>

        <DragOverlay>
          {activeId ? <SortableItem id={activeId} name={activeId} /> : null}
        </DragOverlay>
      </DndContext>
    </Card>
  );
};

export default SidebarMenuPage;
