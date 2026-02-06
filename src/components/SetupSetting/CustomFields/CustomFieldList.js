import { Collapse } from "antd";
import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { RiDragMove2Fill } from "react-icons/ri";

const CustomFieldList = () => {
    const [items, setItems] = useState([
        { id: 1, role: "Student", text: "Medical History" },
        { id: 2, role: "Staff", text: "PAN Number" },
        { id: 3, role: "Super Admin", text: "Full access system" },
    ]);

    const onDragStart = (e, index) => {
        e.dataTransfer.setData("dragIndex", index);
    };

    const onDrop = (e, dropIndex) => {
        const dragIndex = e.dataTransfer.getData("dragIndex");
        const updatedItems = [...items];
        const [draggedItem] = updatedItems.splice(dragIndex, 1);
        updatedItems.splice(dropIndex, 0, draggedItem);
        setItems(updatedItems);
    };

    const onDragOver = (e) => e.preventDefault();

    return (
        <div>
            {items.map((item, index) => (
                <Collapse
                    key={item.id}
                    items={[
                        {
                            key: item.id,
                            label: item.role,
                            children: (
                                <p
                                    draggable
                                    onDragStart={(e) => onDragStart(e, index)}
                                    onDrop={(e) => onDrop(e, index)}
                                    onDragOver={onDragOver}
                                    style={{ padding: "8px", border: "1px solid #ccc", cursor: "move" }}
                                >
                                    <div className="" style={{ display: 'flex', justifyContent: "space-between", alignItems:'center' }}>
                                        <div style={{display:"flex", alignItems:"center"}}>
                                            <RiDragMove2Fill style={{marginRight:"0.5rem"}} size={18}/> 
                                            {item.text}
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', marginTop:"0.4rem" }}>
                                            <div style={{cursor:"pointer", color:"#1677ff"}}><FiEdit size={16}/></div>
                                            <div style={{marginLeft:"0.5rem", cursor:"pointer", color:"red"}}><MdDelete size={18}/></div>
                                        </div>
                                    </div>
                                </p>
                            ),
                        },
                    ]}
                    style={{ marginBottom: 16 }}
                />
            ))}
        </div>
    );
};

export default CustomFieldList;
