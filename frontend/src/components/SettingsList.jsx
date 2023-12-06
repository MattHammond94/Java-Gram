import LogOutButton from "./LogOutButton"
import UpdateInformationForm from "./UpdateInformationForm";
import UpdatePasswordForm from "./UpdatePasswordForm";
import UpdateUsernameForm from "./UpdateUsernameForm";
import DeleteAccountForm from "./DeleteAccountForm";

// Add a useRef to store current modal content so can add a back button.

const SettingsList = ({ setModalContent, setContentLoading }) => {
  return (
    <div className="formTemplate settingsList">
      <div className="settingsFirstDiv">
        <p onClick={ () => setModalContent(<UpdateInformationForm setContentLoading={ setContentLoading } />) }>Update Information</p>
      </div>
      <div className="line"></div>
      <div>
        <p onClick={ () => setModalContent(<UpdatePasswordForm setContentLoading={ setContentLoading } />) }>Change Password</p>
      </div>
      <div className="line"></div>
      <div>
        <p onClick={ () => setModalContent(<UpdateUsernameForm setContentLoading={ setContentLoading } />) }>Change Username</p>
      </div>
      <div className="line"></div>
      <div>
        <p onClick={ () => setModalContent(<DeleteAccountForm setContentLoading={ setContentLoading } />) }>Delete Account</p>
      </div>
      <LogOutButton />
    </div>
  )
}

export default SettingsList