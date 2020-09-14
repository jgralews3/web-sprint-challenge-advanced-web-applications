import React, { useState } from "react";
import axios from "axios";
import {useParams} from 'react-router-dom'
import { axiosWithAuth } from "../utils/axiosWithAuth";
import {useHistory} from 'react-router-dom';

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors}) => {
  console.log(colors)

  const {push} = useHistory();
  const {id} = useParams();
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
    console.log("edit:", color)
  };

  const saveEdit = e => {
    console.log("id: ", colorToEdit.id)
    e.preventDefault();
    axiosWithAuth()
    .put (`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
    .then(res=>{
        updateColors([...colors, res.data]);
        console.log("put response: ", res.data.id-1);
    })
    .catch(err=>console.log("saveEdit error", err))
  };

  const deleteColor = (color) => {
    axiosWithAuth()
      .delete(`http://localhost:5000/api/colors/${colorToEdit.id}`)
      .then(res=>{
        console.log("delete res:", res);
      })
      .catch(err=>console.log("delete error: ", err))
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
