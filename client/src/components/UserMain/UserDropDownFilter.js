import React, { useEffect, useState } from "react";

function UserDropDownFilter({
    onUserSelection,
    users,
    selectedValue,
    allOptionLabel = "All Users",
    showAutoAssignOption,
    autoAssignLabel = "Auto-Assign"
}){

    return (
        <select className="assign-dropdown" onChange={e => onUserSelection(e.target.value)} value={selectedValue || ''}>
            {allOptionLabel && <option value="all">{allOptionLabel}</option>}
            {showAutoAssignOption && <option value="auto-assign">{autoAssignLabel}</option>}
            {users.map(user => (
                <option key={user.id} value={user.id}>{user.username}</option>
            ))}
        </select>
    )
}

export default UserDropDownFilter