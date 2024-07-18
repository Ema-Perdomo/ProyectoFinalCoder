import React from "react";
import Item from "../Item/Item"

const ItemList = ({item}) => {
    return (
        <div className="row p-4">
            {item.map(item =>
                <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={item._id}>
                    <Item item = {item}/>
                </div>
                )}
        </div>
    )
}
export default ItemList