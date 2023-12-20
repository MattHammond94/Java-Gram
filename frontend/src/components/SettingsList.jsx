import LogOutButton from "./LogOutButton"
import UpdateInformationForm from "./UpdateInformationForm";
import UpdatePasswordForm from "./UpdatePasswordForm";
import UpdateUsernameForm from "./UpdateUsernameForm";
import DeleteAccountForm from "./DeleteAccountForm";

const SettingsList = ({ setModalContent, setContentLoading, setModalOpenStatus, refetch }) => {
  return (
    <div className="formTemplate settingsList">
      <div className="settingsFirstDiv">
        <p onClick={ () => setModalContent(<UpdateInformationForm setContentLoading={ setContentLoading } setModalOpenStatus={ setModalOpenStatus } refetch={ refetch }/>) }>Update Information</p>
      </div>
      <div className="line"></div>
      <div>
        <p onClick={ () => setModalContent(<UpdatePasswordForm setContentLoading={ setContentLoading } />) }>Change Password</p>
      </div>
      <div className="line"></div>
      <div>
        <p onClick={ () => setModalContent(<UpdateUsernameForm setContentLoading={ setContentLoading } setModalOpenStatus={ setModalOpenStatus }/>) }>Change Username</p>
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