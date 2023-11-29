import LogOutButton from "./LogOutButton"

const SettingsList = () => {
  return (
    <div className="formTemplate settingsList">
      <div className="settingsFirstDiv">
        <p>Add Profile Information</p>
      </div>
      <div className="line"></div>
      <div>
        <p>Update Information</p>
      </div>
      <div className="line"></div>
      <div>
        <p>Change Password</p>
      </div>
      <div className="line"></div>
      <div>
        <p>Change Username</p>
      </div>
      <div className="line"></div>
      <div>
        <p>Delete Account</p>
      </div>
      <LogOutButton />
    </div>
  )
}

export default SettingsList