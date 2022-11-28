import React from 'react';

const PicksTable = (props) => {

  let userList = props.userList

  if (userList) {
    return (
      <table>
        <tbody>
          <tr>
            <th>User ID</th>
            <th>Username</th>
            <th>password</th>
          </tr>
          {userList.map((ele) =>
            <tr key={ele.user_id} >
              <td>{ele.user_id}</td>
              <td>{ele.username}</td>
              <td>{ele.password}</td>
            </tr >
          )}
        </tbody>
      </table>
    )
  }

}
export default PicksTable
