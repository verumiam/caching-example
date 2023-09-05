import React from "react";
import {IUserInfoProps} from "./types/UserTypes";

const UserInfo: React.FC<IUserInfoProps> = React.memo(({ user }) => {

    if (!user) return null;
    return (
        <table>
            <thead>
            <tr>
                <th>Username</th>
                <th>Phone number</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>{user.name}</td>
                <td>{user.phone}</td>
            </tr>
            </tbody>
        </table>
    );
});

export default UserInfo;